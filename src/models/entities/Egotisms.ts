import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

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