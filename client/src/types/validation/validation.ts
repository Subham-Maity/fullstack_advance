//Validation types
export type Values = {
  username?: string;
  password?: string;
  confirm_pwd?: string;
};

export type Errors = {
  [key: string]: string;
};
