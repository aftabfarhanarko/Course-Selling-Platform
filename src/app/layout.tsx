import { AppProviders } from "@/providers";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Navbar";
import "./globals.css";

// ? Fonts setup
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// ? Metadata
export const metadata: Metadata = {
  title: "Course Selling Platform",
  description: "A comprehensive platform for selling and learning courses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full flex flex-col">
        <Header />
        <main className="flex-1">
          <AppProviders>{children}</AppProviders>
        </main>
        <Footer />
      </body>
    </html>
  );
}
