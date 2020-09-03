import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Post, PostModel } from "../entities/Posts";
import { BaseResolver } from "./resolver";
import { PostInput } from "./types/post-input";
import { DeleteResponse } from "../entities/DeleteResponse";
import { Options } from "./types/base-input";


@Resolver()
export class PostResolver extends BaseResolver {
  protected model = PostModel;

  // @Query(() => Post)
  // async postByID(@Arg("_id")_id: string)

  @Query(() => [Post])
  async posts(@Args() options?: Options) {
    return super.resolvers(options);
  }

  @Mutation(() => Post)
  async newPost(@Arg("data")data: PostInput): Promise<Post> {
    // Ensure author exists
    // Ensure channel exists

    // Calculate words
    data.words = data.content.trim().split(/\s+/).length;
    
    return super.newResolver(data);
  }

  @Mutation(() => DeleteResponse)
  async deletePost(@Arg("_id") _id: string): Promise<DeleteResponse> {   
    return super.deleteResolver({_id});
  }
}