import { InputType, Field } from "type-graphql";
import { Author } from "../../entities/Authors";

@InputType()
export class AuthorInput implements Partial<Author> {
  @Field()
  name: string = "";
  
  @Field()
  discordAuthorID: string;
}