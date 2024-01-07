import React from "react";
import Profile from "@/components/Auth/Profile";
import LayoutWrapper from "@/wrapper/Layout";

const Page = () => {
  return (
    <LayoutWrapper className="bg-[url('/background.svg')] bg-cover bg-no-repeat background-gradient">
      <Profile />
    </LayoutWrapper>
  );
};

export default Page;
