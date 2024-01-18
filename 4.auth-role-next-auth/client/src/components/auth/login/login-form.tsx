import React from "react";
import { CardWrapper } from "@/middleware/wrappers/card/card-wrapper";

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Hey There!"
      backButtonLabel="Don't have an account"
      backButtonHref="/register"
      showSocial
    >
      Login Form
    </CardWrapper>
  );
};

export default LoginForm;
