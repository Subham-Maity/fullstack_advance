import React from "react";
import Recovery from "@/components/Auth/Recovery";
import LayoutWrapper from "@/wrapper/Layout";

const Page = () => {
  return (
    <LayoutWrapper className="bg-[url('/background.svg')] bg-cover bg-no-repeat background-gradient">
      <Recovery />
    </LayoutWrapper>
  );
};

export default Page;
