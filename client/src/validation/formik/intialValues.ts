//userName
import password from "@/components/Auth/Password";

export const INITIAL_FORM_STATE_USERNAME: { username: string } = {
  username: "subham_xam_😎",
};

//password
export const INITIAL_FORM_STATE_PASSWORD: { password: string } = {
  password: "SubhamXam@123_😎",
};

//reset password
export const INITIAL_FORM_STATE_RESET_PASSWORD: {
  password: string;
  confirm_pwd: string;
} = {
  password: "SubhamXam@123_😎",
  confirm_pwd: "SubhamXam@123_😎",
};

//Register

export const INITIAL_FORM_STATE_REGISTER: {
  email: string;
  username: string;
  password: string;
} = {
  email: "subham@codexam.com",
  username: "subham_xam_😎",
  password: "SubhamXam@123_😎",
};
