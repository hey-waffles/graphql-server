import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Channel, ChannelModel } from "../entities/Channels";
import { BaseResolver } from "./resolver";
import { ChannelInput } from "./types/channel-input";
import { Options } from "./types/base-input";
import { generateFilterType } from "type-graphql-filter";
import { UpdateResponse } from "../entities/UpdateResponse";
import { DeleteResponse } from "../entities/DeleteResponse";


const filterType: () => new () => {} = generateFilterType(Channel);

/**
 * Resolves Channel queries
 */
@Resolver()
export class ChannelResolver extends BaseResolver {
  protected model = ChannelModel;

  /**
   * Fetches an channel document matching the given id
   * @param _id The id of the channel document to return
   */
  @Query(() => Channel)
  async channel(@Arg("_id") _id: string): Promise<Channel> {
    return super.resolver(_id);
  }

  /**
   * Fetches the channel documents matching the filter and options
   */
  @Query(() => [Channel])
  async channels(
    @Arg("filters", filterType, {nullable: true}) filters?: any,
    @Args() options?: Options
  ): Promise<Channel[]> {
    return await super.resolvers(filters, options);
  }

  /**
   * Creates a new channel document
   * @param data The data object to make into a new channel
   */
  @Mutation(() => Channel)
  newChannel(@Arg("data") data: ChannelInput): Promise<Channel> {
    return super.newResolver(data);
  }

  /**
   * Updates a single channel document
   * @param _id The id of the document to update
   * @param data The data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateChannel(
    @Arg("_id") _id: string,
    @Arg("data") data: ChannelInput
  ): Promise<UpdateResponse> {
    return super.updateResolver(_id, data)
  }

  /**
   * Updates a single channel document
   * @param data The data to replace in the document
   * @param filters The filters to select the data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateChannels(
    @Arg("data") data: ChannelInput,
    @Arg("filters", filterType, {nullable: true}) filters?: any
  ): Promise<UpdateResponse> {
    return super.updateResolvers(data, filters);
  }

  /**
   * Deletes a single channel document
   * @param _id The id of the channel document to delete
   */
  @Mutation(() => DeleteResponse)
  deleteChannel(@Arg("_id") _id: string): Promise<DeleteResponse> {
    return super.deleteResolver(_id);
  }

  /**
   * Deletes a single channel document
   * @param filters The id of the channel document to delete
   */
  @Mutation(() => DeleteResponse)
  async deleteChannels(@Arg("filters", filterType, {nullable: true}) filters?: any): Promise<DeleteResponse> {
    return super.deleteResolvers(filters);
  }
}