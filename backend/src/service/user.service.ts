import { FilterQuery } from "mongoose";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { omit } from "lodash";

export async function createUser(input: UserInput): Promise<UserDocument> {
  try {
    const user = await UserModel.create(input);
    return user;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Partial<UserDocument> | false> {
  const user = await UserModel.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), ["password"]);
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
