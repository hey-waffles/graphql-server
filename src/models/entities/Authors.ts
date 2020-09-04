import { ObjectType, Field } from "type-graphql";
import { Entity } from "./Entities";
import { prop, getModelForClass } from "@typegoose/typegoose";

/**
 * The authors for roleplaying
 * 
 * @var name The name of the author
 * @var discordUserID The Discord ID of the posting user
 */
@ObjectType({ description: "Roleplaying Authors"})
export class Author extends Entity {
  @Field()
  @prop({ required: true })
  name: string;

  @Field()
  @prop({ required: true })
  discordUserID: string;
}

export const AuthorModel = getModelForClass(Author);
