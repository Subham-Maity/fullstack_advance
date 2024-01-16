"use client";
import { ReactNode } from "react";
import { cn } from "@/utils/Tailwind/twMerge";

const LayoutWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn("", className)}>{children}</div>;
};

export default LayoutWrapper;
