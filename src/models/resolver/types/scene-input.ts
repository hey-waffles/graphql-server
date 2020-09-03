import { InputType, Field } from "type-graphql";
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
  // Words are auto-calculated
  // Rewind words are auto-calculated

  @Field()
  inProgress: boolean = false;

  // Start Date is auto calculated
  // End Date is auto calculated

  @Field({ nullable: true })
  driveLink?: string;
}