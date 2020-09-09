
import { ObjectType, Field, Int } from "type-graphql";
import { Entity, stringFilters, dateFilters, booleanFilters, idFilters, numberFilters } from "./Entities";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Filter } from "type-graphql-filter";

/**
 * A roleplaying scene
 * 
 * @var title The title of the scene
 * @var description A description of the scene
 * @var storyID The story this scene belongs to
 * @var discordAuthorIDs The authors of the scene
 * @var words The word count of the scene
 * @var rewindWords The word count including posts that were rewound
 * @var inProgress True if this scene is still a work in progress
 * @var startDate The earliest post date and time of the scene
 * @var endDate The latest post date and time of the scene
 * @var driveLink The link to the compiled scene in Google Drive
 */
@ObjectType({ description: "Roleplaying scenes" })
export class Scene extends Entity {
  @Field()
  @Filter(stringFilters)
  @prop({ required: true })
  title: string;

  @Field({ nullable: true })
  @Filter(stringFilters)
  @prop({ default: "" })
  description?: string;

  @Field()
  @Filter(idFilters)
  @prop({ required: true })
  storyID: string;
  
  @Field(_type => [String])
  @Filter(idFilters)
  @prop({ default: [] })
  discordAuthorIDs: string[]

  @Field({ nullable: true })
  @Filter(idFilters)
  @prop()
  arcID?: string;

  @Field(_type => Int, { nullable: true })
  @Filter(numberFilters, _type => Int)
  @prop()
  order?: number;
  
  @Field(_type => Int)
  @Filter(numberFilters, _type => Int)
  @prop({ default: 0 })
  words?: number;

  @Field(_type => Int)
  @Filter(numberFilters, _type => Int)
  @prop({ default: 0 })
  rewindWords?: number;

  @Field()
  @Filter(booleanFilters, _type => Boolean)
  @prop({ default: false })
  inProgress?: boolean;

  @Field({ nullable: true })
  @Filter(dateFilters, _type => Date)
  @prop()
  startDate?: Date;

  @Field({ nullable: true })
  @Filter(dateFilters, _type => Date)
  @prop()
  endDate?: Date;

  @Field({ nullable: true })
  @Filter(stringFilters)
  @prop()
  driveLink?: string;
}

export const SceneModel = getModelForClass(Scene);
