"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase-server";
import { DOORPASS_COOKIE } from "@/lib/auth-cookie";

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  // Arahkan langsung ke halaman login admin
  redirect("/login");
}
