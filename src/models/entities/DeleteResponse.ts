import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class DeleteResponse {
  @Field({ nullable: true })
  ok?: number;

  @Field({ nullable: true })
  n?: number; 

  @Field({ nullable: true })
  deletedCount?: number; 
}