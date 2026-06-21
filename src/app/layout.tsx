import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import { currentSite } from "../config/sites";
import { basePath } from "../lib/basePath";

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const metadataBase = new URL(basePath ? `${basePath}/` : "/", siteOrigin);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase,
  title: currentSite.title,
  description: currentSite.description,
  openGraph: {
    title: currentSite.title,
    description: currentSite.description,
    siteName: currentSite.name,
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: currentSite.ogImage,
        width: 1200,
        height: 630,
        alt: currentSite.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: currentSite.title,
    description: currentSite.description,
    images: [currentSite.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
