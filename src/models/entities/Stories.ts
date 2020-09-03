
import { ObjectType, Field, Int } from "type-graphql";
import { Entity } from "./Entities";
import { prop, getModelForClass } from "@typegoose/typegoose";

/**
 * A roleplaying story
 * 
 * @var title The title of the scene
 * @var description A description of the scene
 * @var discordAuthorIDs The authors of the scene
 * @var words The word count of the scene
 * @var rewindWords The word count including posts that were rewound
 * @var startDate The earliest post date and time of the scene
 * @var lastPostAt The latest post date and time of the scene
 * @var driveLink The link to the compiled story folder in Google Drive 
 */
@ObjectType({ description: "A roleplaying story" })
export class Story extends Entity {
  @Field()
  @prop({ required: true })
  title: string;

  @Field()
  @prop({ default: "" })
  description?: string;
  
  @Field(_type => [String])
  @prop({ default: [] })
  discordAuthorIDs: string[]
  
  @Field(_type => Int)
  @prop({ default: 0 })
  words?: number;

  @Field(_type => Int)
  @prop({ default: 0 })
  rewindWords?: number;

  @Field({ nullable: true })
  @prop()
  startDate?: Date;

  @Field({ nullable: true })
  @prop()
  lastPostAt?: Date;

  @Field({ nullable: true })
  @prop()
  driveLink?: string;
}

export const StoryModel = getModelForClass(Story);
