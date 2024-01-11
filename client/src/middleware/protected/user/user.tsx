"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/store/redux/store";

export default function UserProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = useAppSelector((state) => state.user.username);

  if (!username) {
    redirect("/");
  }

  return children;
}
