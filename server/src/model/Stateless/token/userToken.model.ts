import { model, Schema } from "mongoose";
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

// ****************************************
// 🏭 Creating the UserToken Model
// ****************************************
export const UserTokenModel = model<IUserToken>("UserToken", UserTokenSchema);

// ****************************************
// ❗ UserToken Actions ❗
// ****************************************

// 🔍 Find the token in the database
// ✅ (used in logoutHandler , verifyRefreshToken)
export const UserToken = async (token: string) => {
  return UserTokenModel.findOne({ token });
};

// 🔍 Find a UserToken by ID
// ✅ (used in saveToken)
export const findUserTokenById = async (userId: string) => {
  return UserTokenModel.findOne({ userId });
};

// ❌ Delete a UserToken by ID
// ✅ (used in saveToken , logoutHandler)
export const deleteUserTokenById = async (userId: string) => {
  return UserTokenModel.deleteOne({ userId });
};

// ➕ Create a new UserToken
// ✅ (used in saveToken)
export const createUserToken = async (userId: string, token: string) => {
  return new UserTokenModel({ userId, token }).save();
};
