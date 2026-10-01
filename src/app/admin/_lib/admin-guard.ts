import "server-only";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

// Gate admin 2 lapis, dipakai semua halaman di bawah /admin.
//
// Proxy (src/proxy.ts) cuma menyembunyikan route, itu bukan pengaman.
// Yang menentukan ada di sini: session Supabase, lalu role dari database
// lewat is_admin() - bukan dari isi cookie.
//
// Client Supabase-nya dikembalikan supaya halaman tidak perlu membuat
// client kedua hanya untuk query afterward.
export async function requireAdmin() {
  const supabase = await createClient();

  // Lapis 1: harus punya session.
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/login");

  // Lapis 2: role admin, dibaca dari tabel profile.
  const { data: isAdmin, error } = await supabase.rpc("is_admin");
  if (error) {
    console.error("Gagal memanggil is_admin():", error.message);
  }
  if (!isAdmin) notFound();

  return supabase;
}
