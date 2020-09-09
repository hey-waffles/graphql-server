import { ObjectType, Field, Int } from "type-graphql";
import { Entity, idFilters, stringFilters, numberFilters } from "./Entities";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Filter } from "type-graphql-filter";

/**
 * An arc connects a collection of scenes within a story
 * 
 * @var title The title of the arc
 * @var description A description of the arc
 * @var order The order of the arc in the story
 * @var storyID The id of the story the arc belongs to
 * @var words The word count of the arc
 * @var rewindWords The word count of the arc
 */
@ObjectType({ description: "An arc connects a collection of scenes within a story"})
export class Arc extends Entity {
  @Field()
  @Filter(stringFilters)
  @prop({ required: true })
  title: string;

  @Field()
  @Filter(stringFilters)
  @prop({ default: "" })
  description: string = "";

  @Field(_type => Int, { nullable: true })
  @Filter(numberFilters, _type => Int)
  @prop()
  order?: number;
   
  @Field()
  @Filter(idFilters)
  @prop({ required: true })
  storyID: string;

  @Field(_type => Int, { nullable: true })
  @Filter(numberFilters, _type => Int)
  @prop()
  words?: number;

  @Field(_type => Int, { nullable: true })
  @Filter(numberFilters, _type => Int)
  @prop()
  rewindWords?: number;

}

export const ArcModel = getModelForClass(Arc);
