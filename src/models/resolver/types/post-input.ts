import { InputType, Field } from "type-graphql";
import { Post } from "../../entities/Posts";

@InputType()
export class PostInput implements Partial<Post> {
  @Field()
  content: string;

  @Field()
  discordAuthorID: string;

  @Field()
  discordChannelID: string;

  @Field()
  discordMessageID: string;

  // Words auto-calculated
  @Field()
  words: number;

  @Field({ nullable: true })
  sceneID?: string;

  // isBorder auto-calculated
  @Field()
  isBorder: boolean = false;

  @Field()
  isRewind: boolean = false;

  @Field()
  postDate: Date;

  @Field({ nullable: true })
  editDate?: Date;
}