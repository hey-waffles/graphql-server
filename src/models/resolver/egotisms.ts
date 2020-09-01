import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { Egotisms, EgotismsModel } from "../entities/Egotisms";
import { EgotismsInput } from "./types/egotisms-input";

/**
 * The GQL Resolver for viewing and editing egostisms 
 */
@Resolver()
export class EgotismResolver {
  /**
   * Fetches a single Egotism by a given id
   * @param id The id of the Egotism to fetch
   */
  @Query((_returns: any) => Egotisms, { nullable: false })
  async egotismByID(@Arg("id") id: string) {
    return await EgotismsModel.findById({_id:id});
  }

  /**
   * Fetches all egotisms
   * TODO - add searching
   */
  @Query(() => [Egotisms])
  async egotisms() {
    return await EgotismsModel.find();
  }

  /**
   * Creates a new Egotism
   * @param data The data to create new Egotism
   */
  @Mutation(() => Egotisms)
  async newEgotism(@Arg("data"){ saying, low, high }: EgotismsInput): Promise<Egotisms> {
    const egotism = (await EgotismsModel.create({
      saying,
      low,
      high
    })).save();
    return egotism;
  }

  /**
   * Deletes an egotism
   * @param id The id of the egotism to delete
   */
  @Mutation(() => Boolean)
  async deleteEgotism(@Arg("id") id: string) {
    await EgotismsModel.deleteOne({id});
    return true;
  }
}