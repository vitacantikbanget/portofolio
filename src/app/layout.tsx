import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SiteAccent from "@/components/SiteAccent";
import ParticlesBackground from "@/components/ParticlesBackground";

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
  title: "Desvita Putri — Personal Portfolio",
  description:
    "Portfolio pribadi Desvita Putri Wulandari — Frontend Developer & UI/UX Designer.",
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
        <ParticlesBackground />
        {children}
      </body>
    </html>
  );
}