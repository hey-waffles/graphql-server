import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Post, PostModel } from "../entities/Posts";
import { BaseResolver } from "./resolver";
import { PostInput } from "./types/post-input";
import { DeleteResponse } from "../entities/DeleteResponse";
import { Options } from "./types/base-input";
import { generateFilterType } from "type-graphql-filter";
import { UpdateResponse } from "../entities/UpdateResponse";

const filterType: () => new () => {} = generateFilterType(Post);

/**
 * Resolves Post queries
 */
@Resolver()
export class PostResolver extends BaseResolver {
  protected model = PostModel;

  /**
   * Fetches an post document matching the given id
   * @param _id The id of the post document to return
   */
  @Query(() => Post)
  async post(@Arg("_id") _id: string): Promise<Post> {
    return super.resolver(_id);
  }

  /**
   * Fetches the post documents matching the filter and options
   */
  @Query(() => [Post])
  async posts(
    @Arg("filters", filterType, {nullable: true}) filters?: any,
    @Args() options?: Options
  ): Promise<Post[]> {
    return await super.resolvers(filters, options);
  }

  /**
   * Creates a new post document
   * @param data The data object to make into a new post
   */
  @Mutation(() => Post)
  newPost(@Arg("data") data: PostInput): Promise<Post> {
    return super.newResolver(data);
  }

  /**
   * Updates a single post document
   * @param _id The id of the document to update
   * @param data The data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updatePost(
    @Arg("_id") _id: string,
    @Arg("data") data: PostInput
  ): Promise<UpdateResponse> {
    return super.updateResolver(_id, data)
  }

  /**
   * Updates a single post document
   * @param data The data to replace in the document
   * @param filters The filters to select the data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updatePosts(
    @Arg("data") data: PostInput,
    @Arg("filters", filterType, {nullable: true}) filters?: any
  ): Promise<UpdateResponse> {
    return super.updateResolvers(data, filters);
  }

  /**
   * Deletes a single post document
   * @param _id The id of the post document to delete
   */
  @Mutation(() => DeleteResponse)
  deletePost(@Arg("_id") _id: string): Promise<DeleteResponse> {
    return super.deleteResolver(_id);
  }

  /**
   * Deletes a single post document
   * @param filters The id of the post document to delete
   */
  @Mutation(() => DeleteResponse)
  async deletePosts(@Arg("filters", filterType, {nullable: true}) filters?: any): Promise<DeleteResponse> {
    return super.deleteResolvers(filters);
  }
}