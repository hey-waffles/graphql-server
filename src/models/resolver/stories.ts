import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Story, StoryModel } from "../entities/Stories";
import { BaseResolver } from "./resolver";
import { StoryInput } from "./types/story-input";
import { Options } from "./types/base-input";
import { generateFilterType } from "type-graphql-filter";
import { UpdateResponse } from "../entities/UpdateResponse";
import { DeleteResponse } from "../entities/DeleteResponse";


const filterType: () => new () => {} = generateFilterType(Story);

/**
 * Resolves Story queries
 */
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
   * Fetches the story documents matching the filter and options
   */
  @Query(() => [Story])
  async stories(
    @Arg("filters", filterType, {nullable: true}) filters?: any,
    @Args() options?: Options
  ): Promise<Story[]> {
    return await super.resolvers(filters, options);
  }

  /**
   * Creates a new story document
   * @param data The data object to make into a new story
   */
  @Mutation(() => Story)
  newStory(@Arg("data") data: StoryInput): Promise<Story> {
    return super.newResolver(data);
  }

  /**
   * Updates a single story document
   * @param _id The id of the document to update
   * @param data The data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateStory(
    @Arg("_id") _id: string,
    @Arg("data") data: StoryInput
  ): Promise<UpdateResponse> {
    return super.updateResolver(_id, data)
  }

  /**
   * Updates a single story document
   * @param data The data to replace in the document
   * @param filters The filters to select the data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateStories(
    @Arg("data") data: StoryInput,
    @Arg("filters", filterType, {nullable: true}) filters?: any
  ): Promise<UpdateResponse> {
    return super.updateResolvers(data, filters);
  }

  /**
   * Deletes a single story document
   * @param _id The id of the story document to delete
   */
  @Mutation(() => DeleteResponse)
  deleteStory(@Arg("_id") _id: string): Promise<DeleteResponse> {
    return super.deleteResolver(_id);
  }

  /**
   * Deletes a single story document
   * @param filters The id of the story document to delete
   */
  @Mutation(() => DeleteResponse)
  async deleteStories(@Arg("filters", filterType, {nullable: true}) filters?: any): Promise<DeleteResponse> {
    return super.deleteResolvers(filters);
  }
}