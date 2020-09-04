import { ReturnModelType } from "@typegoose/typegoose";
import { Options } from "./types/base-input";

export class BaseResolver {
  protected model: ReturnModelType<any>

  /**
   * Finds a single resolver by ID
   * 
   * @param _id The id of the model to find
   */
  async resolver(_id: string) {
    return await this.model.findByID(_id);
  }

  /**
   * Finds up to fifty items matching the filters and the options
   * 
   * @param filters Object that filters the returned data to match
   * @param options Options that change how what is found is returned
   */
  async resolvers(filters?: any, options?: Options) {
    return await this.model.find(filters, null, options);
  }

  /**
   * Creates a new object from the given data
   * 
   * @param data The data to save into the model
   */
  async newResolver(data: any) {
    const resolver = (await this.model.create(data)).save();
    return resolver;
  }

  /**
   * Updates a single document
   * 
   * @param _id The id of the document to update
   * @param data The data to change in the document
   */
  async updateResolver(_id: string, data: any) {
    return (await this.model.findByIdAndUpdate(_id, data));
  }

  /**
   * Updates multiple documents based on filters 
   * 
   * @param filters Object that filters what data is updated
   * @param options Options that change what's updated
   */
  async updateResolvers(filters?: any, options?: Options) {
    return await this.model.update(filters, null, options);
  }

  /**
   * Deletes a single document by id
   * 
   * @param _id The ID of the document to delete
   */
  async deleteResolver(_id: string) {
    const deleteResult = await this.model.findByIdAndDelete(_id);
    return deleteResult;
  }

  /**
   * Deletes multiple documents
   * @param filters An object the filtrs out what is deleted
   */
  async deleteResolvers(filters?: any, options?: Options) {
    const deleteResult = await this.model.deleteMany(filters, options);
    return deleteResult;
  }
}