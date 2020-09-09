import { ObjectType, Field, Int } from "type-graphql";
import { Entity, stringFilters, idFilters, numberFilters, booleanFilters, dateFilters } from "./Entities";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Filter } from "type-graphql-filter";

/**
 * A roleplaying post
 * 
 * @var content The content of the post in markdown format
 * @var discordAuthorID The id of the author from discord. May be linked to the 'Authors' model
 * @var discordChannelID The id of the Discord channel this was posted to
 * @var words The word count of the post
 * @var sceneID A reference to the scene that this post belongs to 
 * @var isBorder True if the post is a border, false otherwise
 * @var isRewind True if this post has been rewound and is no longer technically canon
 * @var postDate The date this post was submitted
 * @var editDate The date this post was edited, if at all
 */
@ObjectType({ description: "Roleplaying posts" })
export class Post extends Entity {

  @Field()
  @Filter(stringFilters)
  @prop({ required: true })
  content: string;

  @Field()
  @Filter(idFilters)
  @prop({ required: true })
  discordAuthorID: string;

  @Field()
  @Filter(idFilters)
  @prop({ required: true })
  discordChannelID: string;

  @Field()
  @Filter(idFilters)
  @prop({ required: true, unique: true })
  discordMessageID: string;

  @Field(_type => Int)
  @Filter(numberFilters, _type => Int)
  @prop({ required: true })
  words: number;

  @Field({ nullable: true })
  @Filter(idFilters)
  @prop()
  sceneID?: string;

  @Field()
  @Filter(booleanFilters, _type => Boolean)
  @prop({ required: true, default: false })
  isBorder: boolean;

  @Field()
  @Filter(booleanFilters, _type => Boolean)
  @prop({ required: true, default: false })
  isRewind: boolean;

  @Field()
  @Filter(dateFilters, _type => Date)
  @prop({ required: true })
  postDate: Date;

  @Field( { nullable: true })
  @Filter(dateFilters, _type => Date)
  @prop()
  editDate?: Date; 
}

export const PostModel = getModelForClass(Post);
