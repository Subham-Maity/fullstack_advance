import React from "react";

//Purpose: Common template for all pages
const Template = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-screen bg-[#34324a]">{children}</div>;
};

export default Template;
