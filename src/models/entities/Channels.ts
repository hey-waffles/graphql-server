import { ObjectType, Field} from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Entities } from "./Entities";

/**
 * The model collecting Channels Ozone is connected to for multiple purposes
 * 
 * @var id The id of the Channel in MongoDB
 * @var channelName The name of the channel for human readability. This is not updated
 *  with channel changes, so this may be out of date
 * @var discordChannelID The id of the channel in Discord
 * @var isRPChannel Boolean. True if this channel should be scraped or monitored for RPs
 * @var lastPulledAt The datetime object that this was last pulled from  
 */
@ObjectType({ description: "The Channels used for specific Ozone purposes"})
export class Channels extends Entities {
  @Field()
  @Property()
  channelName: String;

  @Field()
  @Property()
  discordChannelID: String;

  @Field()
  @Property()
  isRPChannel: Boolean;

  @Field()
  @Property()
  lastPulledAt: Date;
}

export const ChannelsModel = getModelForClass(Channels);