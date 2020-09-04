import { InputType, Field } from "type-graphql";
import { Channel } from "../../entities/Channels";


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