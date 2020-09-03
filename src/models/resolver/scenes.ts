import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Scene, SceneModel } from "../entities/Scenes";
import { BaseResolver } from "./resolver";
import { SceneInput } from "./types/scene-input";


@Resolver()
export class SceneResolver extends BaseResolver {
  protected model = SceneModel;

  @Query(() => [Scene])
  async Scenes() {
    return super.resolvers();
  }

  @Mutation(() => Scene)
  async newScene(@Arg("data")data: SceneInput): Promise<Scene> {
    // Ensure author exists
    // Ensure channel exists
    
    
    return super.newResolver(data);
  }

  @Mutation(() => Boolean)
  async deleteScene(@Arg("id") id: string) {
    return super.deleteResolver({id});
  }
}