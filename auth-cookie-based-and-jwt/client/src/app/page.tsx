import Image from "next/image";
import Username from "../components/Auth/Username";
import LayoutWrapper from "@/wrapper/Layout";

export default function Home() {
  return (
    <LayoutWrapper className="bg-[url('/background.svg')] bg-cover bg-no-repeat background-gradient">
      <Username />
    </LayoutWrapper>
  );
}
