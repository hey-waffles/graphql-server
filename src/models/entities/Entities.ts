import { ObjectType, Field, ID } from "type-graphql";
import { Filter, FilterOperator } from "type-graphql-filter";

export const booleanFilters: FilterOperator[] = ["eq", "ne"];
export const dateFilters: FilterOperator[] = ["eq", "ne", "gt", "gte", "lt", "lte"];
export const idFilters: FilterOperator[] = ["eq", "ne"];
export const numberFilters: FilterOperator[] = ["eq", "ne", "gt", "gte", "lt", "lte"];
export const stringFilters: FilterOperator[] = ["eq", "ne", "like"];

/**
 * The base entity object for containing shared information, such as an id
 * 
 * @var _id The id of the document. Underscore matches what is used in mongodb
 */
@ObjectType({ description: "The base Entities object for containing shared information" })
export class Entity {
  @Field(() => ID)
  @Filter(idFilters)
  _id: string;
}
