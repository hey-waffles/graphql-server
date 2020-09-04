import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Channel, ChannelsModel } from "../entities/Channels";
import { BaseResolver } from "./resolver";
import { ChannelsInput } from "./types/channel-input";
import { Options } from "./types/base-input";


@Resolver()
export class ChannelResolver extends BaseResolver {
  protected model = ChannelsModel;

  /**
   * Fetches an Channel document matching the given id
   * @param _id The id of the Channel document to return
   */
  @Query(() => Channel)
  async channel(@Arg("_id") _id: string): Promise<Channel> {
    return super.resolver(_id);
  }

  /**
   * Fetches the channel documents by the given filters and options
   * @param options The options to control the format of the data returned
   */
  @Query(() => [Channel])
  async channels(@Args() options: Options) {
    return super.resolvers(null, options);
  }

  /**
   * Creates a new channel document
   * @param data The data to use in a new channel document
   */
  @Mutation(() => Channel)
  async newChannel(@Arg("data") data: ChannelsInput): Promise<Channel> {
    return super.newResolver(data);
  }

  /**
   * Deletes a single channel document
   * @param _id The id of the channel document to delete
   */
  @Mutation(() => Boolean)
  async deleteChannel(@Arg("_id") _id: string) {
    return super.deleteResolver(_id);
  }
}