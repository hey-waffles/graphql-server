import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

/**
 * A model for a collection of sayings meant to boost the ego of an individual
 * 
 * @var id The id of the model
 * @var saying The ego-boosting saying
 * @var low The low value for calculating random egotisms
 * @var high The high value for calculating random egotisms
 */
@ObjectType({ description: "The Egotisms model"})
export class Egotisms {
  @Field(() => ID)
  id: string;

  @Field()
  @Property()
  saying: String;
  
  @Field(_type => Int)
  @Property()
  low: Number;

  @Field(_type => Int)
  @Property()
  high: Number;
}

export const EgotismsModel = getModelForClass(Egotisms);