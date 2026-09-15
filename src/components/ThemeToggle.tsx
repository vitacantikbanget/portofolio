"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const dark = theme === "dark" || (!theme && systemDark);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Placeholder sebelum mounted (biar gak error hydration)
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="w-10 h-10 rounded-full border flex items-center justify-center"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
        }}
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Aktifkan light mode" : "Aktifkan dark mode"}
      className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        color: "var(--text)",
      }}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}