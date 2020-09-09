import { Resolver, Arg, Query, Mutation, Args } from "type-graphql";
import { Egotism, EgotismModel } from "../entities/Egotisms";
import { EgotismInput } from "./types/egotisms-input";
import { BaseResolver } from "./resolver";
import { generateFilterType } from "type-graphql-filter";
import { Options } from "./types/base-input";
import { UpdateResponse } from "../entities/UpdateResponse";
import { DeleteResponse } from "../entities/DeleteResponse";

const filterType: () => new () => {} = generateFilterType(Egotism);

/**
 * Resolves Egotism queries
 */
@Resolver()
export class EgotismResolver extends BaseResolver {
  protected model = EgotismModel;

  /**
   * Fetches an Egotism document matching the given id
   * @param _id The id of the Egotism document to return
   */
  @Query(() => Egotism)
  async egotism(@Arg("_id") _id: string): Promise<Egotism> {
    return super.resolver(_id);
  }

  /**
   * Fetches the Egotism documents matching the filter and options
   */
  @Query(() => [Egotism])
  async egotisms(
    @Arg("filters", filterType, {nullable: true}) filters?: any,
    @Args() options?: Options
  ): Promise<Egotism[]> {
    return await super.resolvers(filters, options);
  }

  /**
   * Creates a new Egotism document
   * @param data The data object to make into a new Egotism
   */
  @Mutation(() => Egotism)
  newEgotism(@Arg("data") data: EgotismInput): Promise<Egotism> {
    return super.newResolver(data);
  }

  /**
   * Updates a single Egotism document
   * @param _id The id of the document to update
   * @param data The data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateEgotism(
    @Arg("_id") _id: string,
    @Arg("data") data: EgotismInput
  ): Promise<UpdateResponse> {
    return super.updateResolver(_id, data)
  }

  /**
   * Updates a single Egotism document
   * @param data The data to replace in the document
   * @param filters The filters to select the data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateEgotisms(
    @Arg("data") data: EgotismInput,
    @Arg("filters", filterType, {nullable: true}) filters?: any
  ): Promise<UpdateResponse> {
    return super.updateResolvers(data, filters);
  }

  /**
   * Deletes a single Egotism document
   * @param _id The id of the Egotism document to delete
   */
  @Mutation(() => DeleteResponse)
  deleteEgotism(@Arg("_id") _id: string): Promise<DeleteResponse> {
    return super.deleteResolver(_id);
  }

  /**
   * Deletes a single Egotism document
   * @param filters The id of the Egotism document to delete
   */
  @Mutation(() => DeleteResponse)
  async deleteEgotisms(@Arg("filters", filterType, {nullable: true}) filters?: any): Promise<DeleteResponse> {
    return super.deleteResolvers(filters);
  }
}