import { ShadcnButton } from "@/components/ui/button/ShadcnButton";
import { NavigationMenuDemo } from "@/components/navbar/navbar";
import { Mail } from "lucide-react";
import * as React from "react";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <NavigationMenuDemo />
      <div className="space-y-6 text-center">
        <p className="text-white text-lg">XAM</p>
        <div>
          <ShadcnButton
            size={"lg"}
            className="w-40 text-lg font-semibold"
            // onClick={() => router.push("/login?showDialog=y")}
          >
            <Mail className="mr-2 h-5 w-5" /> Login
          </ShadcnButton>
        </div>
      </div>
    </main>
  );
}
