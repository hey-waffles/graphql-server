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
  @Field()
  channelName: string;

  @Field()
  discordChannelID: string;

  @Field()
  isRPChannel: boolean;

  @Field()
  lastPulledAt: Date;
}