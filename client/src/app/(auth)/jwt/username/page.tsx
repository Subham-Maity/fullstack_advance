import React from "react";
import Username from "@/components/Auth/Username";
import LayoutWrapper from "@/wrapper/Layout";

const Page = () => {
  return (
    <LayoutWrapper className="bg-[url('/background.svg')] bg-cover bg-no-repeat background-gradient">
      <Username />
    </LayoutWrapper>
  );
};

export default Page;
