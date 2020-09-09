import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Scene, SceneModel } from "../entities/Scenes";
import { BaseResolver } from "./resolver";
import { SceneInput } from "./types/scene-input";
import { Options } from "./types/base-input";
import { generateFilterType } from "type-graphql-filter";
import { UpdateResponse } from "../entities/UpdateResponse";
import { DeleteResponse } from "../entities/DeleteResponse";

const filterType: () => new () => {} = generateFilterType(Scene);

/**
 * Resolves Scene queries
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
   * Fetches the scene documents matching the filter and options
   */
  @Query(() => [Scene])
  async scenes(
    @Arg("filters", filterType, {nullable: true}) filters?: any,
    @Args() options?: Options
  ): Promise<Scene[]> {
    return await super.resolvers(filters, options);
  }

  /**
   * Creates a new scene document
   * @param data The data object to make into a new scene
   */
  @Mutation(() => Scene)
  newScene(@Arg("data") data: SceneInput): Promise<Scene> {
    return super.newResolver(data);
  }

  /**
   * Updates a single scene document
   * @param _id The id of the document to update
   * @param data The data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateScene(
    @Arg("_id") _id: string,
    @Arg("data") data: SceneInput
  ): Promise<UpdateResponse> {
    return super.updateResolver(_id, data)
  }

  /**
   * Updates a single scene document
   * @param data The data to replace in the document
   * @param filters The filters to select the data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateScenes(
    @Arg("data") data: SceneInput,
    @Arg("filters", filterType, {nullable: true}) filters?: any
  ): Promise<UpdateResponse> {
    return super.updateResolvers(data, filters);
  }

  /**
   * Deletes a single scene document
   * @param _id The id of the scene document to delete
   */
  @Mutation(() => DeleteResponse)
  deleteScene(@Arg("_id") _id: string): Promise<DeleteResponse> {
    return super.deleteResolver(_id);
  }

  /**
   * Deletes a single scene document
   * @param filters The id of the scene document to delete
   */
  @Mutation(() => DeleteResponse)
  async deleteScenes(@Arg("filters", filterType, {nullable: true}) filters?: any): Promise<DeleteResponse> {
    return super.deleteResolvers(filters);
  }
}