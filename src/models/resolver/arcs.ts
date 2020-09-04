import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Arc, ArcModel } from "../entities/Arcs";
import { BaseResolver } from "./resolver";
import { ArcInput } from "./types/arc-input";


@Resolver()
export class ArcResolver extends BaseResolver {
  protected model = ArcModel;

  @Query(() => [Arc])
  async arcs() {
    return super.resolvers();
  }

  @Mutation(() => Arc)
  async newArc(@Arg("data")data: ArcInput): Promise<Arc> {
    // Update story, if any
    // Update arc, if any
    return super.newResolver(data);
  }

  @Mutation(() => Boolean)
  async deleteArc(@Arg("_id") _id: string) {
    // Update story, if any
    // Update arc, if any
    return super.deleteResolver(_id);
  }
}