import ParticlesBackground from "@/components/ParticlesBackground";
import LoginCard from "./LoginCard";

export const metadata = {
  title: "Masuk Admin — Desvita Putri",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full relative flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Partikel + blob hanya di halaman login */}
      <ParticlesBackground />

      {/* Background decor statis */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "42vw",
          height: "42vw",
          maxWidth: "520px",
          maxHeight: "520px",
          top: "-18%",
          left: "-10%",
          background: "var(--accent)",
          opacity: 0.16,
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "34vw",
          height: "34vw",
          maxWidth: "440px",
          maxHeight: "440px",
          bottom: "-16%",
          right: "-10%",
          background: "var(--lavender)",
          opacity: 0.16,
          filter: "blur(100px)",
        }}
      />

      <LoginCard />
    </main>
  );
}