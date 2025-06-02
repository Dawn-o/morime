import { Header } from "@/components/fragments/header";
import { Footer } from "@/components/fragments/footer";

export default function AnimeDetailsLayout({ children }) {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}