import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client Supabase untuk Server Component / Server Action.
// Session dibaca dari cookie request, bukan dari singleton modul,
// jadi aman dipakai di server yang melayani beberapa user sekaligus.
//
// Jangan pakai ini untuk data publik - pakai ./supabase yang sudah ada.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet, _headers) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component tidak bisa menulis cookie. Diabaikan
            // karena src/proxy.ts yang menanganinya.
          }
        },
      },
    },
  );
}
