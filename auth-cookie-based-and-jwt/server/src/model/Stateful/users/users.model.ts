import { model, Schema } from "mongoose";
import { IUser } from "../../../types/Stateful/user/user";

// User Config
const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false, // Excluded from default queries
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

// Create User Model
const UserModel = model<IUser>("User", UserSchema);
export default UserModel;

/* ❗ User Actions ❗ */

// Get all users from the database
export const getUsers = () => UserModel.find();

// Get a single user by email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// Get a user by session token
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

// Get a user by ID
export const getUserById = (id: string) => UserModel.findById(id);

// Create a new user
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

// Delete a user by ID
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

// Update a user by ID
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
