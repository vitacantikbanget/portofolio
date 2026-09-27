"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase-server";

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email wajib diisi."),
  password: z.string().min(1, "Password wajib diisi."),
});

export type LoginState = {
  error: string | null;
};

export async function signIn(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    // Sengaja tidak dibedakan antara "email tidak ada" dan "password
    // salah", supaya orang tidak bisa memetakan email mana yang
    // terdaftar.
    return { error: "Email atau password salah." };
  }

  // Catat login ke admin_activity. Pakai client yang sama supaya
  // session barunya ikut terbawa. Kegagalan di sini tidak boleh
  // menggagalkan login - jadi tidak dilempar.
  const { error: logError } = await supabase
    .from("admin_activity")
    .insert({ action: "login" });

  if (logError) {
    console.error("Gagal menulis admin_activity:", logError.message);
  }

  redirect("/admin");
}
