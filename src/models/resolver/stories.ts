import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Story, StoryModel } from "../entities/Stories";
import { BaseResolver } from "./resolver";
import { StoryInput } from "./types/story-input";


@Resolver()
export class StoryResolver extends BaseResolver {
  protected model = StoryModel;

  @Query(() => [Story])
  async Storys() {
    return super.resolvers();
  }

  @Mutation(() => Story)
  async newStory(@Arg("data")data: StoryInput): Promise<Story> {
    // Update story, if any
    // Update Story, if any
    return super.newResolver(data);
  }

  @Mutation(() => Boolean)
  async deleteStory(@Arg("_id") _id: string) {
    // Update story, if any
    // Update Story, if any
    return super.deleteResolver(_id);
  }
}