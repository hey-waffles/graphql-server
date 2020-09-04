import { Field, ArgsType, Int } from "type-graphql";
import { Min, Max } from "class-validator";

/**
 * Base input across multiple documents
 * 
 * @var _id The document id
 */
@ArgsType()
export class BaseArgs {
  @Field({ nullable: true })
  _id?: string;
}

/**
 * Standard arguments for querying options
 * 
 * @var skip The number of documents to skip
 * @var limit The maximum number of documents to return
 */
@ArgsType()
export class Options {
  @Field(_type => Int)
  @Min(0)
  skip: number = 0;

  @Field(_type => Int)
  @Min(1)
  @Max(50)
  limit: number = 25;
}
