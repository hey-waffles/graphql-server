import { InputType, Field, Int } from "type-graphql";
import { Arc } from "../../entities/Arcs";

/**
 * Input for creating or updating arc documents
 * 
 * @var title The title of the arc
 * @var description A description of the arc
 * @var order The order this arc occurs in relative to other arcs
 * @var storyID The id of the story this arc belongs to
 * @var words The number of words in this arc
 * @var rewindWords The number of words in this arc including from rewinds
 */
@InputType()
export class ArcInput implements Partial<Arc> {
  @Field({nullable: true})
  title?: string;

  @Field({nullable: true})
  description?: string;

  @Field(_type => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  storyID?: string;

  @Field(_type => Int, { nullable: true })
  words?: number;

  @Field(_type => Int, { nullable: true })
  rewindWords?: number;

}