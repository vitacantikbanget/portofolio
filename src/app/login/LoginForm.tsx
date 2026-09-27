"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, LogIn, Lock, Mail } from "lucide-react";
import { signIn, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signIn,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      {/* Input Email */}
      <div>
        <label
          htmlFor="email"
          className="text-[10px] tracking-[0.2em] uppercase block mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          Email
        </label>
        <div className="relative">
          <Mail
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="email@example.com"
            className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--accent)]"
            style={{
              background: "var(--bg-soft)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
        </div>
      </div>

      {/* Input Password */}
      <div>
        <label
          htmlFor="password"
          className="text-[10px] tracking-[0.2em] uppercase block mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          Password
        </label>
        <div className="relative">
          <Lock
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password kamu"
            className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--accent)]"
            style={{
              background: "var(--bg-soft)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
        </div>
      </div>

      {/* Pesan error */}
      {state.error && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs px-3.5 py-2.5 rounded-xl border"
          style={{
            color: "#e05c5c",
            borderColor: "#e05c5c55",
            background: "#e05c5c14",
          }}
        >
          <AlertCircle size={14} className="shrink-0" />
          {state.error}
        </motion.p>
      )}

      {/* Tombol masuk */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "var(--accent)", color: "#fff" }}
      >
        {isPending ? (
          "Memeriksa..."
        ) : (
          <>
            <LogIn size={15} />
            Masuk
          </>
        )}
      </button>
    </form>
  );
}
