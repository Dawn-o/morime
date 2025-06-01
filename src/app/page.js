import { Header } from "@/components/fragments/header";
import { HomePage } from "../pages/home";

export default function Home() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <Header />
        {/* <HomePage /> */}
      </div>
    </>
  );
}
