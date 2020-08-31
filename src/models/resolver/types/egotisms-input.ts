import { InputType, Field } from "type-graphql";
import { Egotisms } from "../../entities/Egotisms";

@InputType()
export class EgotismsInput implements Partial<Egotisms> {
  @Field()
  saying: string;

  @Field()
  low: Number;

  @Field()
  high: Number;

}