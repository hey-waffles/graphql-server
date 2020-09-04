import { InputType, Field } from "type-graphql";
import { Channel } from "../../entities/Channels";

/**
 * Input for creating or updating channel documents
 * 
 * @var channelName The name of the channel
 * @var discordChannelID The discord channel id
 * @var isRPChannel True if the channel is meant to be for roleplaying
 * @var lastPulledAt The last date this channel was scraped for roleplaying
 */
@InputType()
export class ChannelsInput implements Partial<Channel> {
  @Field({ nullable: true })
  channelName?: string;

  @Field({ nullable: true })
  discordChannelID?: string;

  @Field({ nullable: true })
  isRPChannel?: boolean;

  @Field({ nullable: true })
  lastPulledAt?: Date;
}