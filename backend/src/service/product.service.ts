import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";
import { CreateProductInput } from "../schema/product.schema";

// Hyväksytään myös user-id osana inputtia
type CreateProductWithUser = CreateProductInput["body"] & { user: string };

export async function createProduct(input: CreateProductWithUser) {
  return ProductModel.create(input);
}

export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return ProductModel.findOne(query, {}, options);
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}
