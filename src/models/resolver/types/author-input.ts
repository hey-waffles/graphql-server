import { InputType, Field } from "type-graphql";
import { Author } from "../../entities/Authors";

/**
 * Input for creating or updating author documents
 * 
 * @var name The name of the author
 * @var discordUserID The discord user ID of the author
 */
@InputType()
export class AuthorInput implements Partial<Author> {
  @Field()
  name: string = "";
  
  @Field()
  discordUserID: string;
}