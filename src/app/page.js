import { Header } from "@/components/fragments/header";
import HomePage from "@/pages/home";

export default function Home() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen container mx-auto">
        <Header />
        <HomePage />
      </div>
    </>
  );
}