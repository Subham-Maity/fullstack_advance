import React from "react";
import Password from "@/components/Auth/Password";
import LayoutWrapper from "@/wrapper/Layout";

const Page = () => {
  return (
    <LayoutWrapper className="bg-[url('/background.svg')] bg-cover bg-no-repeat background-gradient">
      <Password />
    </LayoutWrapper>
  );
};

export default Page;
