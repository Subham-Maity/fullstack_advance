import React from "react";
import Register from "@/components/Auth/Register";
import LayoutWrapper from "@/wrapper/Layout";

const Page = () => {
  return (
    <LayoutWrapper className="bg-[url('/background.svg')] bg-cover bg-no-repeat background-gradient">
      <Register />
    </LayoutWrapper>
  );
};

export default Page;
