"use client";
import { ShadcnButton } from "@/components/ui/button/shadcn-button";
import { NavigationMenuDemo } from "@/components/ui/navbar/navbar";
import { Mail } from "lucide-react";
import * as React from "react";
import { LoginButton } from "@/components/auth/login/login-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <NavigationMenuDemo />
      <div className="space-y-6 text-center">
        <p className="text-white text-lg">XAM</p>
        <div>
          <LoginButton>
            <ShadcnButton size={"lg"} className="w-40 text-lg font-semibold">
              <Mail className="mr-2 h-5 w-5" /> Login
            </ShadcnButton>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
