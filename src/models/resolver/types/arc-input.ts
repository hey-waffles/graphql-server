import { InputType, Field, Int } from "type-graphql";
import { Arc } from "../../entities/Arcs";


@InputType()
export class ArcInput implements Partial<Arc> {
  @Field()
  title: string;

  @Field()
  description: string = "";

  @Field(_type => Int, { nullable: true })
  order?: number;

  @Field()
  storyID: string;

  @Field(_type => Int, { nullable: true })
  words?: number;

  @Field(_type => Int, { nullable: true })
  rewindWords?: number;

}