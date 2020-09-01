import { ReturnModelType } from "@typegoose/typegoose";

export class BaseResolver {
  protected model: ReturnModelType<any>

  async resolvers() {
    return await this.model.find();
  }

  async newResolver(args: any) {
    const resolver = (await this.model.create(args)).save();
    return resolver;
  }

  // TODO - does not work!
  async deleteResolver(args: any) {
    await this.model.deleteOne(args);
    return true;
  }
}