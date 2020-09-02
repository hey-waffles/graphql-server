import { ObjectType, Field, Int } from "type-graphql";
import { Entity } from "./Entities";
import { prop, getModelForClass } from "@typegoose/typegoose";

/**
 * A roleplaying post
 * 
 * @var discordAuthorID The id of the author from discord. May be linked to the 'Authors' model
 * @var content The content of the post in markdown format
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
  @prop({ required: true })
  discordAuthorID: string;

  @Field()
  @prop({ required: true })
  content: string;

  @Field()
  @prop({ required: true })
  discordChannelID: string;

  @Field()
  @prop({ required: true, unique: true })
  discordMessageID: string;

  @Field(_type => Int)
  @prop({ required: true })
  words: number;

  @Field({ nullable: true })
  @prop()
  sceneID?: string;

  @Field()
  @prop({ required: true, default: false })
  isBorder: boolean;

  @Field()
  @prop({ required: true, default: false })
  isRewind: boolean;

  @Field()
  @prop({ required: true })
  postDate: Date;

  @Field( { nullable: true })
  @prop()
  editDate?: Date; 

}

export const EPostModel = getModelForClass(Post);
