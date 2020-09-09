import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Author, AuthorModel } from "../entities/Authors";
import { BaseResolver } from "./resolver";
import { AuthorInput } from "./types/author-input";
import { Options } from "./types/base-input";
import { DeleteResponse } from "../entities/DeleteResponse";
import { generateFilterType } from "type-graphql-filter";
import { UpdateResponse } from "../entities/UpdateResponse";

const filterType: () => new () => {} = generateFilterType(Author);

/**
 * Resolves Author queries
 */
@Resolver()
export class AuthorResolver extends BaseResolver {
  protected model = AuthorModel;

  /**
   * Fetches an Author document matching the given id
   * @param _id The id of the Author document to return
   */
  @Query(() => Author)
  async author(@Arg("_id") _id: string): Promise<Author> {
    return super.resolver(_id);
  }

  /**
   * Fetches the Author documents matching the filter and options
   */
  @Query(() => [Author])
  async authors(
    @Arg("filters", filterType, {nullable: true}) filters?: any,
    @Args() options?: Options
  ): Promise<Author[]> {
    return await super.resolvers(filters, options);
  }

  /**
   * Creates a new Author document
   * @param data The data object to make into a new Author
   */
  @Mutation(() => Author)
  newAuthor(@Arg("data") data: AuthorInput): Promise<Author> {
    return super.newResolver(data);
  }

  /**
   * Updates a single Author document
   * @param _id The id of the document to update
   * @param data The data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateAuthor(
    @Arg("_id") _id: string,
    @Arg("data") data: AuthorInput
  ): Promise<UpdateResponse> {
    return super.updateResolver(_id, data)
  }

  /**
   * Updates a single Author document
   * @param data The data to replace in the document
   * @param filters The filters to select the data to replace in the document
   */
  @Mutation(() => UpdateResponse)
  updateAuthors(
    @Arg("data") data: AuthorInput,
    @Arg("filters", filterType, {nullable: true}) filters?: any
  ): Promise<UpdateResponse> {
    return super.updateResolvers(data, filters);
  }

  /**
   * Deletes a single Author document
   * @param _id The id of the Author document to delete
   */
  @Mutation(() => DeleteResponse)
  deleteAuthor(@Arg("_id") _id: string): Promise<DeleteResponse> {
    return super.deleteResolver(_id);
  }

  /**
   * Deletes a single Author document
   * @param filters The id of the Author document to delete
   */
  @Mutation(() => DeleteResponse)
  async deleteAuthors(@Arg("filters", filterType, {nullable: true}) filters?: any): Promise<DeleteResponse> {
    return super.deleteResolvers(filters);
  }
}