import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Author, AuthorModel } from "../entities/Authors";
import { BaseResolver } from "./resolver";
import { AuthorInput } from "./types/author-input";


@Resolver()
export class AuthorResolver extends BaseResolver {
  protected model = AuthorModel;

  @Query(() => [Author])
  async authors() {
    return super.resolvers();
  }

  @Mutation(() => Author)
  async newAuthor(@Arg("data")data: AuthorInput): Promise<Author> {
    // Update story, if any
    // Update Author, if any
    return super.newResolver(data);
  }

  @Mutation(() => Boolean)
  async deleteAuthor(@Arg("_id") _id: string) {
    // Update story, if any
    // Update Author, if any
    return super.deleteResolver(_id);
  }
}