import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Author, AuthorModel } from "../entities/Authors";
import { BaseResolver } from "./resolver";
import { AuthorInput } from "./types/author-input";
import { Options } from "./types/base-input";
import { DeleteResponse } from "../entities/DeleteResponse";

/**
 * The resolver for the Author schema
 */
@Resolver()
export class AuthorResolver extends BaseResolver {
  protected model = AuthorModel;

  /**
   * Fetches an author document matching the given id
   * @param _id The id of the author document to return
   */
  @Query(() => Author)
  async author(@Arg("_id") _id: string): Promise<Author> {
    return super.resolver(_id);
  }

  /**
   * Fetches a collection of authors matching the filter and options
   * 
   * @param options A dictionary containing the query options
   */
  @Query(() => [Author])
  async authors(@Args() options: Options): Promise<Author[]> {
    return super.resolvers(null, options);
  }

  /**
   * Creates a new author document from the given data  
   * @param data The data to create a new author document
   */
  @Mutation(() => Author)
  async newAuthor(@Arg("data") data: AuthorInput): Promise<Author> {
    return super.newResolver(data);
  }

  /**
   * Updates a single author document
   * @param _id The id of the document to update
   * @param data The data to replace in the document
   */
  @Mutation(() => Author)
  async updateAuthor(
    @Arg("_id") _id: string,
    @Arg("data") data: AuthorInput
  ): Promise<Author> {
    return super.updateResolver(_id, data)
  }

  /**
   * Deletes a single author document
   * @param _id The id of the author document to delete
   */
  @Mutation(() => Boolean)
  async deleteAuthor(@Arg("_id") _id: string): Promise<DeleteResponse> {
    return super.deleteResolver(_id);
  }
}