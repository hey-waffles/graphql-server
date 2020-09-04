import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Story, StoryModel } from "../entities/Stories";
import { BaseResolver } from "./resolver";
import { StoryInput } from "./types/story-input";
import { Options } from "./types/base-input";


@Resolver()
export class StoryResolver extends BaseResolver {
  protected model = StoryModel;

  /**
   * Fetches an story document matching the given id
   * @param _id The id of the story document to return
   */
  @Query(() => Story)
  async story(@Arg("_id") _id: string): Promise<Story> {
    return super.resolver(_id);
  }

  /**
   * Fetches a collection of stories from the filter and options
   * @param options The options to filter by non-data information
   */
  @Query(() => [Story])
  async Stories(@Args() options: Options): Promise<Story[]> {
    return super.resolvers(null, options);
  }

  /**
   * Creates a new story document
   * @param data The data to create a new story document
   */
  @Mutation(() => Story)
  async newStory(@Arg("data")data: StoryInput): Promise<Story> {
    return super.newResolver(data);
  }

  /**
   * Deletes a single story document
   * @param _id The id of the story document to delete
   */
  @Mutation(() => Boolean)
  async deleteStory(@Arg("_id") _id: string) {
    return super.deleteResolver(_id);
  }
}