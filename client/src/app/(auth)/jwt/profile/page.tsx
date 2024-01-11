import React from "react";
import Profile from "@/components/Auth/Profile";
import LayoutWrapper from "@/wrapper/Layout";
import AuthProtected from "@/middleware/protected/auth/auth";

const Page = () => {
  return (
    <LayoutWrapper className="bg-[url('/background.svg')] bg-cover bg-no-repeat background-gradient">
      <AuthProtected>
        <Profile />
      </AuthProtected>
    </LayoutWrapper>
  );
};

export default Page;
