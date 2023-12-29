import mongoose, { model, Schema, Document } from "mongoose";
import { IUserToken } from "../../../types/Stateless/token/token";

const UserTokenSchema: Schema<IUserToken> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 86400, // Token expires in 30 days
  },
});

export const UserTokenModel = model<IUserToken>("UserToken", UserTokenSchema);

//It will find the token in the database
export const UserToken = async (token: string) => {
  return UserTokenModel.findOne({ token });
};

export const findUserTokenById = async (userId: string) => {
  return UserTokenModel.findOne({ userId });
};

export const deleteUserTokenById = async (userId: string) => {
  return UserTokenModel.deleteOne({ userId });
};

export const createUserToken = async (userId: string, token: string) => {
  return new UserTokenModel({ userId, token }).save();
};
