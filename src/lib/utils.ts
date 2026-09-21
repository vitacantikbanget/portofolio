// Fungsi buat gabungin class Tailwind
export function cn(...classes: (string | false | null | undefined)[]) {
  // Buang yang false/null, terus gabung jadi 1 string
  return classes.filter(Boolean).join(" ");
}