"use client";

import {
  CardContent,
  CardFooter,
  CardHeader,
  ShadcnCard,
} from "@/components/ui/card/shadcn-card";
import React from "react";
import { Header } from "@/middleware/wrappers/header/header-wrapper";
import { Social } from "@/middleware/wrappers/social/social-wrapper";
import { BackButton } from "@/middleware/wrappers/backbutton/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <ShadcnCard className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </ShadcnCard>
  );
};
