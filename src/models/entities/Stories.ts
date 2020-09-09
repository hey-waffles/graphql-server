
import { ObjectType, Field, Int } from "type-graphql";
import { Entity, stringFilters, idFilters, numberFilters, dateFilters } from "./Entities";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Filter } from "type-graphql-filter";

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
  @Filter(stringFilters)
  @prop({ required: true })
  title: string;

  @Field()
  @Filter(stringFilters)
  @prop({ default: "" })
  description?: string;
  
  @Field(_type => [String])
  @Filter(idFilters)
  @prop({ default: [] })
  discordAuthorIDs: string[]
  
  @Field(_type => Int)
  @Filter(numberFilters, _type => Int)
  @prop({ default: 0 })
  words?: number;

  @Field(_type => Int)
  @Filter(numberFilters, _type => Int)
  @prop({ default: 0 })
  rewindWords?: number;

  @Field({ nullable: true })
  @Filter(dateFilters, _type => Date)
  @prop()
  startDate?: Date;

  @Field({ nullable: true })
  @Filter(dateFilters, _type => Date)
  @prop()
  lastPostAt?: Date;

  @Field({ nullable: true })
  @Filter(stringFilters)
  @prop()
  driveLink?: string;
}

export const StoryModel = getModelForClass(Story);
