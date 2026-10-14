"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Scroll ke atas setiap kali halaman dibuka
    window.scrollTo(0, 0);
  }, []);

  return null;
}