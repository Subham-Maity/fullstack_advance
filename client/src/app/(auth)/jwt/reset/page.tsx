import React from "react";
import Reset from "@/components/Auth/Reset";
import LayoutWrapper from "@/wrapper/Layout";

const Page = () => {
  return (
    <LayoutWrapper className="bg-[url('/background.svg')] bg-cover bg-no-repeat background-gradient">
      <Reset />
    </LayoutWrapper>
  );
};

export default Page;
