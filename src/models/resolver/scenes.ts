import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Scene, SceneModel } from "../entities/Scenes";
import { BaseResolver } from "./resolver";
import { SceneInput } from "./types/scene-input";
import { Options } from "./types/base-input";

/**
 * The resolver for the scene schema
 */
@Resolver()
export class SceneResolver extends BaseResolver {
  protected model = SceneModel;

  /**
   * Fetches an scene document matching the given id
   * @param _id The id of the scene document to return
   */
  @Query(() => Scene)
  async scene(@Arg("_id") _id: string): Promise<Scene> {
    return super.resolver(_id);
  }

  /**
   * Fetches a collection of scenes determined by the given filter and options
   * @param options The options to format the returned documents
   */
  @Query(() => [Scene])
  async scenes(@Args() options: Options): Promise<Scene[]> {
    return super.resolvers(null, options);
  }

  /**
   * Creates a new scene document
   * @param data The data to create a new scene
   */
  @Mutation(() => Scene)
  async newScene(@Arg("data")data: SceneInput): Promise<Scene> {
    return super.newResolver(data);
  }

  /**
   * Updates a single scene document
   * @param _id The id of the document to update
   * @param data The data to replace in the document
   */
  @Mutation(() => Scene)
  async updateScene(
    @Arg("_id") _id: string,
    @Arg("data") data: SceneInput
  ): Promise<Scene> {
    return super.updateResolver(_id, data)
  }

  /**
   * Deletes a single scene document
   * @param _id The id of the scene document to delete
   */
  @Mutation(() => Boolean)
  async deleteScene(@Arg("_id") _id: string) {
    return super.deleteResolver(_id);
  }
}