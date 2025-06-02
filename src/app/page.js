import { Header } from "@/components/fragments/header";
import HomePage from "@/pages/home";

export default function Home() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen flex flex-col items-center container mx-auto">
        <Header />
        <HomePage />
      </div>
    </>
  );
}