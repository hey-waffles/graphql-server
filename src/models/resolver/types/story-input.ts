import { InputType, Field, Int } from "type-graphql";
import { Story } from "../../entities/Stories";
import { MinLength } from "class-validator";

/**
 * Input for creating or updating story documents
 * 
 * @var title The title of the story
 * @var description A description of the story
 * @var discordAuthorIDs The discord user ids of the authors
 * @var words The word count of the story
 * @var rewindWords The word count of the story including rewinds
 * @var startDate The start date of the story
 * @var endDate The last date this story was added to
 * @var driveLink the link to the google drive folder with this story
 */
@InputType()
export class StoryInput implements Partial<Story> {
  @Field()
  @MinLength(3)
  title: string
  
  @Field()
  description: string = "";

  // DiscordAuthorIDs are auto-calculated
  @Field(_type => [String])
  discordAuthorIDs: string[] = [];

  // Words are auto-calculated
  @Field(_type => Int)
  words: number = 0;

  // Rewind Words are auto-calculated
  @Field(_type => Int)
  rewindWords: number = 0;
  
  // Start date is auto calculated
  @Field({ nullable: true })
  startDate?: Date;

  // Last post at is auto calculated
  @Field({ nullable: true })
  endDate?: Date;
  
  @Field({ nullable: true })
  driveLink?: string;

}