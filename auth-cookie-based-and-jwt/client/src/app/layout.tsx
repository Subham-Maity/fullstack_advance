import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import LayoutWrapper from "@/wrapper/Layout";
import React from "react";
import { ReduxProvider } from "@/providers/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JWT Authentication Best Practices",
  description:
    "This is a demo of JWT authentication best practices and this code is open source but owned by the author(subham-maity).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
