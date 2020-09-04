import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Scene, SceneModel } from "../entities/Scenes";
import { BaseResolver } from "./resolver";
import { SceneInput } from "./types/scene-input";


@Resolver()
export class SceneResolver extends BaseResolver {
  protected model = SceneModel;

  @Query(() => [Scene])
  async scenes() {
    return super.resolvers();
  }

  @Mutation(() => Scene)
  async newScene(@Arg("data")data: SceneInput): Promise<Scene> {
    // Update story, if any
    // Update arc, if any
    return super.newResolver(data);
  }

  @Mutation(() => Boolean)
  async deleteScene(@Arg("_id") _id: string) {
    // Update story, if any
    // Update arc, if any
    return super.deleteResolver(_id);
  }
}