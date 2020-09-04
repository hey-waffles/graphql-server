import { ObjectType, Field, ID } from "type-graphql";

/**
 * The base entity object for containing shared information, such as an id
 * 
 * @var _id The id of the document. Underscore matches what is used in mongodb
 */
@ObjectType({ description: "The base Entities object for containing shared information" })
export class Entity {
  @Field(() => ID)
  _id: string;
}