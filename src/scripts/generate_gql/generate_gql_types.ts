const fs = require("fs");

const modelsFolder = "src/models";
const entitiesFolder = "/entities";
const filterFolder = "/resolver/filters";
const inputsFolder = "/resolver/inputs";
const generationFolder = "/_generated";

interface EntityComposition {
  gqlImports: string[];
  variables: EntityClump[];
}

interface EntityClump {
  name: string;
  type: string;
  fieldType?: string;
  fieldOptions: any;
}

/**
 * Creates a relative path from the current entity to the target entity and returns it
 * @param targetEntity The entity to build a path for
 * @param currentEntity The current entity that the target entity is relative from
 */
function calculateEntityName(targetEntity: string, currentEntity: string) {
  // Grabs the filepath from the current Entity, if any
  const filepathRegex = /^(.*\/)/i;
  const currentFilepath = currentEntity.match(filepathRegex);
  let targetFilepath = "";
  if (currentFilepath != null) {
    targetFilepath = currentFilepath[1];
  }

  targetFilepath += targetEntity;
  return targetFilepath;
}

/**
 * Converts a clump of code describing a variable from an entity to a dict
 * @param entityCodeClump A string of code between '@Field' and the variable.
 */
function fetchEntityClumpComposition(entityCodeClump: string): EntityClump {
  const entityClump: EntityClump = {name: "", type: "", fieldOptions: {}};

  // Regex for getting the name and type of the variable
  const nameTypeRegex = /\s{3}(.+?)\??:\s*(\S+)(\s+=.+)?;/i;

  // Regex for getting the options (if any) of the Field
  const fieldOptionsRegex = /@Field\(.*?({.+})\s*\)/i;

  // Regex for 
  const fieldOptionQuotationRegex = /\s*([^\{\s"'][^\,\s]*?[^\s"']):/i;

  // Regex for getting the Field type, if any
  const fieldTypeRegex = /@Field\((\S+\s*?=>\s*?\S+){0,1}[,\)]/i

  // Extracts and saves the name and type of variable from the clump
  const nameType = entityCodeClump.match(nameTypeRegex);
  if (nameType != null) {
    entityClump.name = nameType[1];
    entityClump.type = nameType[2];
  }

  // Extracts field options and converts into a valid object
  const fieldOptions = entityCodeClump.match(fieldOptionsRegex);
  if (fieldOptions != null) {
    const fieldOptionsJson = fieldOptions[1].replace(fieldOptionQuotationRegex, "\"$1\":");
    entityClump.fieldOptions = JSON.parse(fieldOptionsJson);
  }

  // Extracts the field type, if any, from the code clump
  const fieldType = entityCodeClump.match(fieldTypeRegex);
  if (fieldType != null) {
    entityClump.fieldType = fieldType[1];
  }

  return entityClump;
}

/**
 * Extracts type-graphql imports and returns them in an array
 * @param entityCode The entity code to extract imports from
 */
function fetchEntityGQLImports(entityCode: string): string[] {
  // Regex that extracts the imports from type-graphql
  const typeGqlImportRegex = /import \{\s+(.+)\s+\}\s+from\s+['"]type-graphql['"]/i

  const typeGqlImports = entityCode.match(typeGqlImportRegex);
  if (typeGqlImports == null) {
    return [];
  }

  const typeGqlImportArray = typeGqlImports[1].split(", ");
  console.log(typeGqlImportArray);
  return typeGqlImportArray;
}

function fetchEntityComposition(entityName: string): EntityComposition {
  const entityPath = `${modelsFolder}/entities/${entityName}.ts`
  let entityComposition: EntityComposition = {
    gqlImports: [],
    variables: []
  }

  if (!fs.existsSync(entityPath)) {
    console.log(`Entity ${entityName}.ts does not exist at ${entityPath}`);
    // TODO - throw?
    return entityComposition;
  }

  // Open entity
  const entityCode = fs.readFileSync(entityPath).toString();
  const entityExtendsRegex = /export\s+class\s+.+?extends\s+(\S+)\s+\{/i;
  const entityClumpRegex = /@Field\(.*\)[\s\S\n]+?;/gm;

  // Check extensions?
  const entityExtends = entityCode.match(entityExtendsRegex);
  if (entityExtends != null) {
    const entityImportRegex = new RegExp(`import\\s+\\{\\s*${entityExtends[1]}\\s*\\}\\s+from\\s+['"](.+)['"]`, "i");
    const entityImport = entityCode.match(entityImportRegex);

    if (entityImport != null) {
      const extendingEntityName = calculateEntityName(entityImport[1], entityName)
      const extendingEntityComposition = fetchEntityComposition(extendingEntityName);
      entityComposition = extendingEntityComposition;
    }
  }
  const gqlImports = fetchEntityGQLImports(entityCode)
  entityComposition.gqlImports = entityComposition.gqlImports.concat(gqlImports);
  
  // Load clumps 
  const entityCodeClumps = entityCode.match(entityClumpRegex);
  entityCodeClumps.forEach((entityCodeClump: string) => {
    entityComposition.variables.push(fetchEntityClumpComposition(entityCodeClump));
  });

  return entityComposition;
}

/**
 * Ensures that the full directory path exists by checking and making it if it does not exist
 * @param directoryPath The directory path to ensure
 */
function ensureDirectory(directoryPath: string) {
  const directories = directoryPath.split("/");
  let partialPath = "";

  directories.forEach((directory: string) => {
    partialPath += `${directory}/`;
    if(fs.existsSync(partialPath)) {
      return;
    }

    fs.mkdirSync(partialPath);
  });
}

function generateInput(entityName: string, entityComposition: EntityComposition) {
  const fullInputDirectory = modelsFolder + inputsFolder;

  // Ensure folders exist
  ensureDirectory(fullInputDirectory + generationFolder);

  const gqlImportSet = new Set(entityComposition.gqlImports);
  gqlImportSet.delete("ObjectType");
  let gqlImports = "";
  gqlImportSet.forEach((gqlImport: string) => {
    gqlImports += `${gqlImport}, `;
  });

  // Create header comments
  const header = fs.readFileSync("src/scripts/generate_gql/header.txt").toString();
  const imports = `
import { ${gqlImports}InputType } from "type-graphql";
import { ${entityName} } from "../../..${entitiesFolder}/${entityName}";
  `;

  let variableClumps = "";
  entityComposition.variables.forEach((clump: EntityClump) => {
    // Builds out the field line
    let field = "@Field( ";
    if(clump.fieldType) {field += `${clump.fieldType}, `};
    clump.fieldOptions.nullable = true;
    field += JSON.stringify(clump.fieldOptions);
    field += " )";

    // Builds the full variable clump
    const clumpCode = `
  ${field}
  ${clump.name}?: ${clump.type};
`;
    variableClumps += clumpCode;
  });

  const className = `${entityName}GeneratedInput`;

  // Builds the class definition
  const classDefinition = `
@InputType()
export class ${className} implements Partial<${entityName}> {
${variableClumps}
}`;

  // Builds out the full file 
  const inputFileContents = `${header}
${imports}
${classDefinition}
`;

  // Outputs the file
  const filename = `${entityName.toLowerCase()}-input`;
  const outputFile = fs.openSync(
    `${fullInputDirectory}${generationFolder}/${filename}.ts`,
    "w"
  );
  fs.writeSync(outputFile, inputFileContents)
  fs.closeSync(outputFile);

  // Ensure that the base input exists
  if (fs.existsSync(`${fullInputDirectory}/${filename}.ts`)) {
    return;
  }

  const baseInputFileContents = `
import { InputType } from "type-graphql";
import { ${className} } from ".${generationFolder}/${filename}";

@InputType()
export class ${entityName}Input extends ${className} {}
  `;

  const baseOutputFile = fs.openSync(
    `${fullInputDirectory}/${filename}.ts`,
    "w"
  );
  fs.writeSync(baseOutputFile, baseInputFileContents)
  fs.closeSync(baseOutputFile);
}

async function generate(entityName: string): Promise<number> {
  // Collect all variables and types
  const entityComposition = fetchEntityComposition(entityName);
  generateInput(entityName, entityComposition);
  

  return 0;
}

generate(process.argv[2])