import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({ description: "The base Entities object for containing shared information" })
export class Entities {
  @Field(() => ID)
  id: string;
}