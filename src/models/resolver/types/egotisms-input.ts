import { InputType, Field } from "type-graphql";
import { Egotisms } from "../../entities/Egotisms";

/**
 * The input for creating new Egotisms
 * 
 * @var ego The egotistical saying
 * @var low The low bound for a random number to hit
 * @var high The high bound for a random number to hit
 */
@InputType()
export class EgotismsInput implements Partial<Egotisms> {
  @Field()
  saying: string;

  @Field()
  low: Number;

  @Field()
  high: Number;
}