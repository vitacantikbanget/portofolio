"use client";

import { useEffect, useState } from "react";

const words = [
  "Frontend Developer",
  "UI/UX Designer",
  "Creative Developer",
];

export default function TypingText() {
  const [index, setIndex] = useState(0); // kata ke-berapa
  const [text, setText] = useState(""); // teks yang tampil
  const [deleting, setDeleting] = useState(false); // hapus / ketik

  useEffect(() => {
    const current = words[index];
    let timeout: NodeJS.Timeout;

    if (!deleting && text === current) {
      // selesai ketik → pause lalu hapus
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      // selesai hapus → ganti kata
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      // sedang ketik atau hapus
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? current.substring(0, text.length - 1)
              : current.substring(0, text.length + 1)
          );
        },
        deleting ? 50 : 90
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="inline-flex items-center">
      <span>{text}</span>
      {/* Cursor berkedip */}
      <span
        className="inline-block w-[2px] h-[1em] ml-1 align-middle animate-pulse"
        style={{ background: "var(--accent)" }}
      />
    </span>
  );
}