import { InputType, Field, Int } from "type-graphql";
import { Scene } from "../../entities/Scenes";
import { MinLength } from "class-validator";

/**
 * Input for creating or updating scene documents
 * 
 * @var title The title of the scene
 * @var description A description of the scene
 * @var storyID The id of the story this scene belongs to
 * @var discordAuthorIDs the discord user ids of the authors of this scene
 * @var arcID The id of the arc that this scene belongs to
 * @var order The order this scene appears in within its arc
 * @var words The word count of this scene
 * @var rewindWords the word count of this scene including rewinds
 * @var inProgress True if this scene is currently in progress
 * @var startDate The start date of this scene
 * @var endDate The end date of this scene
 * @var driveLink The link to the google drive document containing this scene
 */
@InputType()
export class SceneInput implements Partial<Scene> {
  @Field({ nullable: true })
  @MinLength(3)
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  storyID?: string;

  // Discord author ids are auto-calculated
  @Field(_type => [String], { nullable: true })
  discordAuthorIDs?: string[];

  @Field({ nullable: true })
  arcID?: string;

  @Field(_type => Int, { nullable: true })
  order?: number;

  // Words are auto-calculated
  @Field(_type => Int, { nullable: true })
  words?: number;

  // Rewind words are auto-calculated
  @Field(_type => Int, { nullable: true })
  rewindWords?: number;

  @Field({ nullable: true })
  inProgress?: boolean = false;

  // Start Date is auto calculated
  @Field({ nullable: true })
  startDate?: Date;

  // End Date is auto calculated
  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  driveLink?: string;
}