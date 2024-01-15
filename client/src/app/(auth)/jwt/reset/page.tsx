import React from "react";

import LayoutWrapper from "@/wrapper/Layout";
import ResetPass from "@/components/Auth/Reset";

const Page = () => {
  return (
    <LayoutWrapper className="bg-[url('/background.svg')] bg-cover bg-no-repeat background-gradient">
      <ResetPass />
    </LayoutWrapper>
  );
};

export default Page;
