
import { ObjectType, Field, Int } from "type-graphql";
import { Entity } from "./Entities";
import { prop, getModelForClass } from "@typegoose/typegoose";

/**
 * A roleplaying scene
 * 
 * @var title The title of the scene
 * @var description A description of the scene
 * @var storyID The story this scene belongs to
 * @var discordAuthorIDs The authors of the scene
 * @var words The word count of the scene
 * @var rewindWords The word count including posts that were rewound
 * @var inProgress True if this scene is still a work in progress
 * @var startDate The earliest post date and time of the scene
 * @var endDate The latest post date and time of the scene
 * @var driveLink The link to the compiled scene in Google Drive
 */
@ObjectType({ description: "Roleplaying posts" })
export class Scene extends Entity {
  @Field()
  @prop({ required: true })
  title: string;

  @Field({ nullable: true })
  @prop({ default: "" })
  description?: string;

  @Field()
  @prop({ required: true })
  storyID: string;
  
  @Field(_type => [String])
  @prop({ default: [] })
  discordAuthorIDs: string[]
  
  @Field(_type => Int)
  @prop({ default: 0 })
  words?: number;

  @Field(_type => Int)
  @prop({ default: 0 })
  rewindWords?: number;

  @Field()
  @prop({ default: false })
  inProgress?: boolean;

  @Field({ nullable: true })
  @prop()
  startDate?: Date;

  @Field({ nullable: true })
  @prop()
  endDate?: Date;

  @Field({ nullable: true })
  @prop()
  driveLink?: string;
}

export const SceneModel = getModelForClass(Scene);
