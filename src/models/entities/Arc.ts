import { ObjectType, Field, Int } from "type-graphql";
import { Entity } from "./Entities";
import { prop, getModelForClass } from "@typegoose/typegoose";

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
  @prop({ required: true })
  title: string;

  @Field()
  @prop({ default: "" })
  description: string = "";

  @Field(_type => Int, { nullable: true })
  @prop()
  order?: number;
  
  @Field()
  @prop({ required: true })
  storyID: string;

  @Field(_type => Int, { nullable: true })
  @prop()
  words?: number;

  @Field(_type => Int, { nullable: true })
  @prop()
  rewindWords?: number;

}

export const ArcModel = getModelForClass(Arc);
