"use client";
import React from "react";
import { selectAccessToken } from "@/features/slice/auth/v1/authSlice";
import { store } from "@/store/redux/store";
import { redirect } from "next/navigation";

export default function AuthProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = selectAccessToken(store.getState());

  if (!token) {
    redirect("/");
  }

  return children;
}
