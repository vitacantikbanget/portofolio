import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SiteAccent from "@/components/SiteAccent";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
});

// Domain website untuk OpenGraph & canonical URL
// Bisa diubah via environment variable NEXT_PUBLIC_SITE_URL di .env.local
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://desvitaputri.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Desvita Putri — Personal Portfolio",
    template: "%s | Desvita Putri",
  },
  description:
    "Portfolio pribadi Desvita Putri Wulandari — Frontend Developer & UI/UX Designer.",
  keywords: [
    "Desvita Putri",
    "Desvita Putri Wulandari",
    "Frontend Developer",
    "UI/UX Designer",
    "Portfolio",
    "Web Developer Indonesia",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Desvita Putri Wulandari" }],
  creator: "Desvita Putri Wulandari",
  publisher: "Desvita Putri Wulandari",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Desvita Putri Portfolio",
    title: "Desvita Putri — Personal Portfolio",
    description:
      "Portfolio pribadi Desvita Putri Wulandari — Frontend Developer & UI/UX Designer.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Desvita Putri — Personal Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desvita Putri — Personal Portfolio",
    description:
      "Portfolio pribadi Desvita Putri Wulandari — Frontend Developer & UI/UX Designer.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        <SiteAccent />
      </head>
      <body className={`${cormorant.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}