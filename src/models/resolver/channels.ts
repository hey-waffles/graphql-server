import { Resolver, Query } from "type-graphql";
import { Channels, ChannelsModel } from "../entities/Channels";


@Resolver()
export class ChannelResolver {
  // @Query((_returns: any) => Channels, { nullable: }
  @Query(() => [Channels])
  async channels() {
    return await ChannelsModel.find();
  }
}