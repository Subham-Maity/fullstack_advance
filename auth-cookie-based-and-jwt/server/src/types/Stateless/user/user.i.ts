// Define the fields for User2
interface IUser2Fields {
  username?: any;
  password?: any;
  email?: any;
  firstName?: string;
  lastName?: string;
  mobile?: number;
  address?: string;
  profile?: string;
}

// Define the interface extending IUser2Fields and Document
export interface IUser2 extends IUser2Fields, Document {}
