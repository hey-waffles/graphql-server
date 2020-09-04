import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Channels, ChannelsModel } from "../entities/Channels";
import { BaseResolver } from "./resolver";
import { ChannelsInput } from "./types/channel-input";


@Resolver()
export class ChannelResolver extends BaseResolver {
  protected model = ChannelsModel;

  @Query(() => [Channels])
  async channels() {
    return super.resolvers();
  }

  @Mutation(() => Channels)
  async newChannel(@Arg("data")data: ChannelsInput): Promise<Channels> {
    return super.newResolver(data);
  }

  @Mutation(() => Boolean)
  async deleteChannel(@Arg("id") id: string) {
    return super.deleteResolver(id);
  }
}