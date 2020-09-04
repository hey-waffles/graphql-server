import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Post, PostModel } from "../entities/Posts";
import { BaseResolver } from "./resolver";
import { PostInput } from "./types/post-input";
import { DeleteResponse } from "../entities/DeleteResponse";
import { Options } from "./types/base-input";

/**
 * Resolves requests to the Post schema
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
   * Fetches a collection of post documents based on filters and options
   * @param options The options to format the response documents by
   */
  @Query(() => [Post])
  async posts(@Args() options?: Options) {
    return super.resolvers(null, options);
  }

  /**
   * Creates a new post document
   * @param data The data to create a new Post document
   */
  @Mutation(() => Post)
  async newPost(@Arg("data") data: PostInput): Promise<Post> {
    // Ensure author exists
    // Ensure channel exists
    // Update scene, if any

    // Calculate words
    if(data.content) {
      data.words = data.content!.trim().split(/\s+/).length;
    }
    
    return super.newResolver(data);
  }

  /**
   * Deletes a single post document
   * @param _id The id of the post document to delete
   */
  @Mutation(() => DeleteResponse)
  async deletePost(@Arg("_id") _id: string): Promise<DeleteResponse> {   
    return super.deleteResolver(_id);
  }
}