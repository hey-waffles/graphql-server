import { ObjectType, Field, Int } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Entity, stringFilters, numberFilters } from "./Entities";
import { Filter } from "type-graphql-filter";

/**
 * A model for a collection of sayings meant to boost the ego of an individual
 * 
 * @var id The id of the model
 * @var saying The ego-boosting saying
 * @var low The low value for calculating random egotisms
 * @var high The high value for calculating random egotisms
 */
@ObjectType({ description: "The Egotisms model"})
export class Egotism extends Entity {

  @Field()
  @Filter(stringFilters)
  @prop()
  saying: String;
  
  @Field(_type => Int)
  @Filter(numberFilters, _type => Int)
  @prop()
  low: Number;

  @Field(_type => Int)
  @Filter(numberFilters, _type => Int)
  @prop()
  high: Number;
}

export const EgotismModel = getModelForClass(Egotism);