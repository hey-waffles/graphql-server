import { InputType, Field } from "type-graphql";
import { Egotism } from "../../entities/Egotisms";

/**
 * The input for creating new Egotisms
 * 
 * @var ego The egotistical saying
 * @var low The low bound for a random number to hit
 * @var high The high bound for a random number to hit
 */
@InputType()
export class EgotismInput implements Partial<Egotism> {
  @Field({ nullable: true })
  saying?: string;

  @Field({ nullable: true })
  low?: Number;

  @Field({ nullable: true })
  high?: Number;
}