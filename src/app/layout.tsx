import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SiteAccent from "@/components/SiteAccent";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://desvita-putri.my.id"),
  title: "Desvita Putri Wulandari | Full-stack Developer",
  description:
    "Portfolio resmi Desvita Putri Wulandari, siswi SMK Rekayasa Perangkat Lunak dan Full-stack Developer yang berfokus pada Web Development, UI/UX Design, dan teknologi.",
  openGraph: {
    title: "Desvita Putri Wulandari | Full-stack Developer",
    description:
      "Portofolio resmi Desvita Putri Wulandari, siswi SMKN 1 PASURUAN Rekayasa Perangkat Lunak & Full-stack Developer, Membangun dan mendesain website dan aplikasi modern",
    url: "https://desvita-putri.my.id",
    siteName: "Desvita Putri Wulandari",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desvita Putri Wulandari | Full-stack Developer",
    description:
      "Portofolio resmi Full-stack Developer Desvita Putri W siswi SMKN 1 PASURUAN (RPL)",
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
        {/* Pause animasi loop saat tab inactive (document.hidden) atau
            saat elemen keluar layar (IntersectionObserver).
            Script inline kecil — tidak menambah request JS baru. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;function s(){d.classList.toggle('anim-paused',document.hidden)}document.addEventListener('visibilitychange',s);s();function go(){if(!('IntersectionObserver' in window))return;var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('anim-off',!e.isIntersecting)})},{rootMargin:'80px'});document.querySelectorAll('[data-anim]').forEach(function(el){io.observe(el)})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go()})();`,
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
