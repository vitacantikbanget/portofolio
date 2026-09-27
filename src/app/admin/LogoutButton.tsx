"use client";

import { useFormStatus } from "react-dom";
import { LogOut } from "lucide-react";
import { signOut } from "./actions";

function Tombol() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface-2)",
        color: "var(--text)",
      }}
    >
      <LogOut size={14} />
      {pending ? "Keluar..." : "Keluar"}
    </button>
  );
}

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <Tombol />
    </form>
  );
}
