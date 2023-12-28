// Create schema for User2
import { model, Schema } from "mongoose";
import { IUser2 } from "../../../types/Stateless/user/user";

const User2Schema: Schema<IUser2> = new Schema({
  username: {
    type: String,
    required: [true, "Please provide unique Username"],
    unique: [true, "Username Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
  profile: {
    type: String,
  },
});

// Create User2 Model
const User2Model = model<IUser2>("User2", User2Schema);
export default User2Model;

/* ❗ User2 Actions ❗ */

// Get all Users from the database
export const getUsers2 = () => User2Model.find();

// Get a single User2 by email
export const getUserByEmail2 = (email: string) => User2Model.findOne({ email });

// Get an User2 by ID
export const getUserById2 = (id: string) => User2Model.findById(id);

// Create a new User2
export const createUser2 = (values: Record<string, any>) =>
  new User2Model(values).save().then((user) => user.toObject());

// Delete a User2 by ID
export const deleteUserById2 = (id: string) =>
  User2Model.findOneAndDelete({ _id: id });

// Update an User2 by ID
export const updateUserById2 = (id: string, values: Record<string, any>) =>
  User2Model.findByIdAndUpdate(id, values);
