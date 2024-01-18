"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { ShadcnButton } from "@/components/ui/button/shadcn-button";

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <ShadcnButton size="lg" className="w-full" variant="outline">
        <FcGoogle className="h-5 w-5" />
      </ShadcnButton>
      <ShadcnButton size="lg" className="w-full" variant="outline">
        <FaGithub className="h-5 w-5" />
      </ShadcnButton>
    </div>
  );
};
