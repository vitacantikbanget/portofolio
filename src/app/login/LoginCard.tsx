"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md"
    >
      {/* ====== KARTU ====== */}
      <div
        className="rounded-3xl border p-8 sm:p-10 relative overflow-hidden"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border mb-5"
            style={{
              borderColor: "var(--accent)",
              background: "var(--accent-soft)",
              color: "var(--accent)",
            }}
          >
            <ShieldCheck size={24} />
          </motion.div>

          <h1
            className="text-2xl sm:text-3xl font-medium leading-tight mb-2"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--text)",
            }}
          >
            Masuk
            <br />
            <span className="italic" style={{ color: "var(--accent)" }}>
              Dashboard Admin
            </span>
          </h1>

          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Area khusus pengelola. Bukan untuk pengunjung.
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 pt-5 border-t text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs mb-2.5" style={{ color: "var(--text-muted)" }}>
            Bukan pengelola website atau ingin melihat portofolio?
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-medium border transition-all hover:scale-[1.01]"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-soft)",
              color: "var(--text)",
            }}
          >
            <ArrowLeft size={14} />
            Kembali ke Homepage (Beranda)
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
