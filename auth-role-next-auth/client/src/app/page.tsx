import { cn } from "@/lib/utils";
import { ShadcnButton } from "@/components/ui/button/ShadcnButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <p className="text-white text-lg">XAM</p>
        <div>
          <ShadcnButton variant="secondary" size="lg" className="text-white">
            <Link href={`/login?showDialog=y`}>LOGIN HERE</Link>
          </ShadcnButton>
        </div>
      </div>
    </main>
  );
}
