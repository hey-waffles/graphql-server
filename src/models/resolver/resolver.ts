import { ReturnModelType } from "@typegoose/typegoose";
import { Options } from "./types/base-input";

export class BaseResolver {
  protected model: ReturnModelType<any>

  async resolvers(options?: Options) {
    return await this.model.find({}, null, options);
  }

  async newResolver(args: any) {
    const resolver = (await this.model.create(args)).save();
    return resolver;
  }

  // TODO - does not work!
  async deleteResolver(args: any) {
    const deleteResult = await this.model.deleteOne(args);
    return deleteResult;
  }
}