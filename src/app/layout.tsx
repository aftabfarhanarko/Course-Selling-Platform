import { AppProviders } from "@/providers";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Navbar";
import RouteMeta from "@/components/RouteMeta";
import Footer from "@/components/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});


// ✅ Production Ready SEO Metadata for EduNova
export const metadata: Metadata = {
  metadataBase: new URL("https://edunova.com"),

  title: {
    default: "EduNova — Learn High-Demand Engineering & Tech Skills",
    template: "%s | EduNova",
  },

  description:
    "EduNova is the premier e-learning platform for mastering Web Development, AI & ML, Cloud DevOps, and System Architecture with verified industry mentors.",

  keywords: [
    "EduNova",
    "EduNova Learning Platform",
    "Online Tech Courses",
    "Software Engineering Courses",
    "Web Development",
    "Fullstack React Next.js",
    "AI Machine Learning Courses",
    "Cloud DevOps Kubernetes",
    "Learn Programming",
    "Tech Mentorship",
  ],

  authors: [
    {
      name: "EduNova Engineering Team",
      url: "https://edunova.com",
    },
    {
      name: "Aftab Farhan Arko",
      url: "https://aftabfarhan.tech",
    },
  ],

  creator: "EduNova Inc.",
  publisher: "EduNova Platform",
  applicationName: "EduNova",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "EduNova — Learn High-Demand Engineering & Tech Skills",
    description:
      "Master real-world tech skills, build production microservices, and land high-income engineering roles with top industry leads.",
    url: "https://edunova.com",
    siteName: "EduNova",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "EduNova — Master High Demand Tech Skills",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EduNova — Learn High-Demand Engineering & Tech Skills",
    description:
      "Master real-world tech skills, build production microservices, and land high-income engineering roles with top industry leads.",
    creator: "@edunova",
    images: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&h=630&q=80"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white text-slate-900">
        <AppProviders>
          <Header />
          <RouteMeta />

          <main className="flex-1">{children}</main>

          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
