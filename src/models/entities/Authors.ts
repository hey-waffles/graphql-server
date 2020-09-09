import { ObjectType, Field } from "type-graphql";
import { Entity, stringFilters, idFilters } from "./Entities";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Filter } from "type-graphql-filter";

/**
 * The authors for roleplaying
 * 
 * @var name The name of the author
 * @var discordUserID The Discord ID of the posting user
 */
@ObjectType({ description: "Roleplaying Authors"})
export class Author extends Entity {
  @Field()
  @Filter(stringFilters)
  @prop({ required: true })
  name: string;

  @Field()
  @Filter(idFilters)
  @prop({ required: true })
  discordUserID: string;
}

export const AuthorModel = getModelForClass(Author);
