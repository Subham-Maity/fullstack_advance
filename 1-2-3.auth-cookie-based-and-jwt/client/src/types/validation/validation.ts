//Validation types
export type Values = {
  firstName?: string;
  lastName?: string;
  email?: any;
  mobile?: string;
  address?: string;
  username?: any;
  password?: any;
  confirm_pwd?: string;
  profile?: any;
};

export type Errors = {
  [key: string]: string;
};
