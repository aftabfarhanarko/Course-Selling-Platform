import { AppProviders } from "@/providers";
import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Navbar";
import "./globals.css";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
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
      className={`  ${baiJamjuree.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full flex flex-col font-bai-jamjuree">
        <AppProviders>
          <Header />
        </AppProviders>
        <main className="flex-1 ">
          <AppProviders>{children}</AppProviders>
        </main>
        <Footer />
      </body>
    </html>
  );
}
