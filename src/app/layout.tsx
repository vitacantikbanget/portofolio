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

export const metadata: Metadata = {
  metadataBase: new URL("https://val-krn.vercel.app"),
  title: "Desvita Putri — Junior Web Developer",
  description: "Portfolio pribadi Desvita Putri Wulandari.",
  openGraph: {
    title: "Desvita Putri — Junior Web Developer",
    description: "Portfolio pribadi Desvita Putri Wulandari.",
    url: "https://val-krn.vercel.app",
    siteName: "Desvita Putri",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desvita Putri — Junior Web Developer",
    description: "Portfolio pribadi Desvita Putri Wulandari.",
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