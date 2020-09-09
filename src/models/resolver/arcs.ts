import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Arc, ArcModel } from "../entities/Arcs";
import { BaseResolver } from "./resolver";
import { ArcInput } from "./types/arc-input";
import { Options } from "./types/base-input";
import { DeleteResponse } from "../entities/DeleteResponse";
import { generateFilterType } from "type-graphql-filter";
import { UpdateResponse } from "../entities/UpdateResponse";

const filterType: () => new () => {} = generateFilterType(Arc);

/**
 * Resolves Arc queries
 */
@Resolver()
export class ArcResolver extends BaseResolver {
  protected model = ArcModel;

  /**
   * Fetches an arc document matching the given id
   * @param _id The id of the arc document to return
   */
  @Query(() => Arc)
  async arc(@Arg("_id") _id: string): Promise<Arc> {
    return super.resolver(_id);
  }

  /**
   * Fetches the arc documents matching the filter and options
   */
  @Query(() => [Arc])
  async arcs(
    @Arg("filters", filterType, {nullable: true}) filters?: any,
    @Args() options?: Options
  ): Promise<Arc[]> {
    return await super.resolvers(filters, options);
  }

  /**
   * Creates a new arc document
   * @param data The data object to make into a new arc
   */
  @Mutation(() => Arc)
  newArc(@Arg("data") data: ArcInput): Promise<Arc> {
    return super.newResolver(data);
  }

  /**
   * Updates a single arc document
   * @param _id The id of the document to update
   * @param data The data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateArc(
    @Arg("_id") _id: string,
    @Arg("data") data: ArcInput
  ): Promise<UpdateResponse> {
    return super.updateResolver(_id, data)
  }

  /**
   * Updates a single arc document
   * @param data The data to replace in the document
   * @param filters The filters to select the data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateArcs(
    @Arg("data") data: ArcInput,
    @Arg("filters", filterType, {nullable: true}) filters?: any
  ): Promise<UpdateResponse> {
    return super.updateResolvers(data, filters);
  }

  /**
   * Deletes a single arc document
   * @param _id The id of the arc document to delete
   */
  @Mutation(() => DeleteResponse)
  deleteArc(@Arg("_id") _id: string): Promise<DeleteResponse> {
    return super.deleteResolver(_id);
  }

  /**
   * Deletes a single arc document
   * @param filters The id of the arc document to delete
   */
  @Mutation(() => DeleteResponse)
  async deleteArcs(@Arg("filters", filterType, {nullable: true}) filters?: any): Promise<DeleteResponse> {
    return super.deleteResolvers(filters);
  }
}