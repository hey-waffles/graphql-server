import { InputType, Field, Int } from "type-graphql";
import { Scene } from "../../entities/Scenes";
import { MinLength } from "class-validator";

@InputType()
export class SceneInput implements Partial<Scene> {
  @Field()
  @MinLength(3)
  title: string;

  @Field()
  description: string = "";

  @Field()
  storyID: string;

  // Discord author ids are auto-calculated
  @Field(_type => [String], { nullable: true })
  discordAuthorIDs: string[];

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

  @Field()
  inProgress: boolean = false;

  // Start Date is auto calculated
  @Field({ nullable: true })
  startDate?: Date;

  // End Date is auto calculated
  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  driveLink?: string;
}