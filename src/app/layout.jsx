import "./globals.css";
import { Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/theme/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "Morime - Anime & Manga Discovery",
    template: "%s | Morime",
  },
  description:
    "Discover and track anime and manga with Morime. Browse thousands of titles, explore seasonal anime, get schedules, and find your next favorite series. Powered by MyAnimeList data.",
  keywords: [
    "anime",
    "manga",
    "anime tracking",
    "manga tracking",
    "anime list",
    "manga list",
    "seasonal anime",
    "anime schedule",
    "MyAnimeList",
    "anime discovery",
    "anime database",
  ],
  authors: [
    {
      name: "Dawn-o",
      url: "https://github.com/dawn-o/morime",
    },
  ],
  creator: "Morime",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://morime.vercel.app",
    siteName: "Morime",
    title: "Morime - Anime & Manga Discovery",
    description:
      "Discover and track anime and manga with Morime. Browse thousands of titles, explore seasonal anime, and find your next favorite series.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morime - Anime & Manga Discovery",
    description:
      "Discover and track anime and manga. Browse thousands of titles and explore seasonal anime.",
    creator: "Dawn-o",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
