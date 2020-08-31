import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { Egotisms, EgotismsModel } from "../entities/Egotisms";
import { EgotismsInput } from "./types/egotisms-input";
// import { EgotismsInput } from "./types/egotisms-input";

@Resolver()
export class EgotismResolver {
  @Query((_returns: any) => Egotisms, { nullable: false })
  async egotismByID(@Arg("id") id: string) {
    return await EgotismsModel.findById({_id:id});
  }

  @Query(() => [Egotisms])
  async egotisms() {
    return await EgotismsModel.find();
  }

  @Mutation(() => Egotisms)
  async newEgotism(@Arg("data"){ saying, low, high }: EgotismsInput): Promise<Egotisms> {
    const egotism = (await EgotismsModel.create({
      saying,
      low,
      high
    })).save();
    return egotism;
  }

  @Mutation(() => Boolean)
  async deleteEgotism(@Arg("id") id: string) {
    await EgotismsModel.deleteOne({id});
    return true;
  }
}