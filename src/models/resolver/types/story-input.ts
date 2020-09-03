import { InputType, Field } from "type-graphql";
import { Story } from "../../entities/Stories";
import { MinLength } from "class-validator";

@InputType()
export class StoryInput implements Partial<Story> {
  @Field()
  @MinLength(3)
  title: string
  
  @Field()
  description: string = "";

  // DiscordAuthorIDs are auto-calculated
  // Words are auto-calculated
  // Rewind Words are auto-calculated
  // Start date is auto calculated
  // Last post at is auto calculated
  
  @Field({ nullable: true })
  driveLink?: string;

}