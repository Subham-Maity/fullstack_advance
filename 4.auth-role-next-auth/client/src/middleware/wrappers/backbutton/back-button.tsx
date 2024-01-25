"use client";

import Link from "next/link";
import { ShadcnButton } from "@/components/ui/button/shadcn-button";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <ShadcnButton
      variant="link"
      className="font-normal w-full"
      size="sm"
      asChild
    >
      <Link href={href}>{label}</Link>
    </ShadcnButton>
  );
};
