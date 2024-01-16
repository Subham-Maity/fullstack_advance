import React from "react";
import Password from "@/components/Auth/Password";
import LayoutWrapper from "@/wrapper/Layout";
import UserProtected from "@/middleware/protected/user/user";

const Page = () => {
  return (
    <UserProtected>
      <LayoutWrapper className="bg-[url('/background.svg')] bg-cover bg-no-repeat background-gradient">
        <Password />
      </LayoutWrapper>
    </UserProtected>
  );
};

export default Page;
