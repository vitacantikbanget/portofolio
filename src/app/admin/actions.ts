"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase-server";
import { DOORPASS_COOKIE } from "@/lib/auth-cookie";

export async function signOut() {
  const cookieStore = await cookies();
  const supabase = await createClient();

  await supabase.auth.signOut();

  // Hapus cookie doorpass supaya /admin?doorpass=<nilai> wajib
  // diketik ulang setiap kali mau masuk lagi.
  // path harus sama persis dengan cara proxy menyetelnya (/), kalau
  // tidak cookie tidak terhapus. maxAge 0 = minta browser hapus.
  cookieStore.set(DOORPASS_COOKIE, "", { path: "/", maxAge: 0 });

  // Ke beranda, bukan ke /login: /login sekarang juga 404 kalau
  // doorpass tidak ada, jadi mengarahkan ke sana akan berakhir di
  // halaman kosong setelah user menekan Keluar.
  redirect("/");
}
