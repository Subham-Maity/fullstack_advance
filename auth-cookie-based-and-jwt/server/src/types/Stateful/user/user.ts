import { Document } from "mongoose";

export type TUser = {
  email: string;
  username: string;
  authentication: {
    password: any;
    salt?: any;
    sessionToken?: any;
  };
};

export interface IUser extends TUser, Document {}
