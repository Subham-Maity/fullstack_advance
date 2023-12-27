//Validation types
export type Values = {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  address?: string;
  username?: string;
  password?: string;
  confirm_pwd?: string;
};

export type Errors = {
  [key: string]: string;
};
