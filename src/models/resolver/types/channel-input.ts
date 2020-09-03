import { InputType, Field } from "type-graphql";
import { Channels } from "../../entities/Channels";


@InputType()
export class ChannelsInput implements Partial<Channels> {
  @Field()
  channelName: string;

  @Field()
  discordChannelID: string;

  @Field()
  isRPChannel: boolean;

  @Field()
  lastPulledAt: Date;
}