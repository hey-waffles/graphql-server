import { InputType, Field } from "type-graphql";
import { Post } from "../../entities/Posts";

/**
 * Input for creating or updating post documents
 * 
 * @var content The content of the roleplaying post
 * @var discordAuthorID The discord user id of the author
 * @var discordChannelID The discord channel id that this was posted to
 * @var discordMessageID The id of the discord message
 * @var words The word count of the post
 * @var isBorder If this post is a border between scenes
 * @var isRewind If this post is part of a rewind
 * @var postDate The datetime this was posted
 * @var editDate The datetime this was last edited
 */
@InputType()
export class PostInput implements Partial<Post> {
  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  discordAuthorID?: string;

  @Field({ nullable: true })
  discordChannelID?: string;

  @Field({ nullable: true })
  discordMessageID?: string;

  // Words auto-calculated
  @Field({ nullable: true })
  words: number;

  @Field({ nullable: true })
  sceneID?: string;

  // isBorder auto-calculated
  @Field({ nullable: true })
  isBorder?: boolean = false;

  @Field({ nullable: true })
  isRewind?: boolean = false;

  @Field({ nullable: true })
  postDate?: Date;

  @Field({ nullable: true })
  editDate?: Date;
}