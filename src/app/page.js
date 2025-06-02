import { Header } from "@/components/fragments/header";
import { Footer } from "@/components/fragments/footer";
import HomePage from "@/pages/home";

export default function Home() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto">
          <HomePage />
        </div>
        <Footer />
      </div>
    </>
  );
}