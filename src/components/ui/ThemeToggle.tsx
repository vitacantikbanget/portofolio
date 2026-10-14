"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  // isDark = status tema sekarang (true = gelap, false = terang)
  const [isDark, setIsDark] = useState(false);
  // mounted = penanda komponen udah ke-render di browser
  // (biar gak error pas server-side rendering)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Cek tema yang disimpan sebelumnya
    const theme = localStorage.getItem("theme");

    // Cek settingan sistem (kalau user belum pernah pilih)
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Prioritas: yang disimpan user > settingan sistem
    const dark = theme === "dark" || (!theme && systemDark);

    setIsDark(dark);
    // Tambah/hapus class "dark" di <html>
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  // Fungsi ganti tema
  const toggleTheme = () => {
    const next = !isDark; // kebalikan dari sekarang

    setIsDark(next);
    // Update class di <html> biar CSS dark mode jalan
    document.documentElement.classList.toggle("dark", next);
    // Simpan pilihan biar gak ilang saat refresh
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Tampilkan tombol kosong dulu sebelum mounted
  // Ini biar gak error hydration (server gak punya localStorage)
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
      {/* Kalau dark: tampilkan icon matahari (buat ganti ke light) */}
      {/* Kalau light: tampilkan icon bulan (buat ganti ke dark) */}
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}