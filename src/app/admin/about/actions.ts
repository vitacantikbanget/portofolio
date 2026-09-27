"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-guard";

const aboutSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Nama panggilan wajib diisi.")
    .max(50, "Nama panggilan maksimal 50 karakter."),
  headline: z
    .string()
    .trim()
    .max(120, "Headline maksimal 120 karakter.")
    .optional(),
  tagline: z
    .string()
    .trim()
    .max(180, "Tagline maksimal 180 karakter.")
    .optional(),
  bio: z
    .string()
    .trim()
    .max(3000, "Bio maksimal 3000 karakter.")
    .optional(),
  avatar_url: z
    .string()
    .trim()
    .max(300, "Path avatar maksimal 300 karakter.")
    .optional(),
});

export type AboutState = {
  success?: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
};

export const initialAboutState: AboutState = {
  error: null,
  fieldErrors: {},
};

export async function updateAbout(
  _prev: AboutState,
  formData: FormData,
): Promise<AboutState> {
  const supabase = await requireAdmin();
  const { data: claimData } = await supabase.auth.getClaims();
  const userId = claimData?.claims?.sub;

  if (!userId) {
    return { error: "Sesi tidak valid.", fieldErrors: {} };
  }

  const parsed = aboutSchema.safeParse({
    username: formData.get("username"),
    headline: formData.get("headline"),
    tagline: formData.get("tagline"),
    bio: formData.get("bio"),
    avatar_url: formData.get("avatar_url"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: "Periksa kembali kolom yang ditandai.", fieldErrors };
  }

  const { error } = await supabase
    .from("profile")
    .update({
      username: parsed.data.username,
      headline: parsed.data.headline || null,
      tagline: parsed.data.tagline || null,
      bio: parsed.data.bio || null,
      avatar_url: parsed.data.avatar_url || "/profile.jpeg",
    })
    .eq("id", userId);

  if (error) {
    return {
      error: `Gagal menyimpan profil: ${error.message}`,
      fieldErrors: {},
    };
  }

  // Catat ke admin_activity
  await supabase.from("admin_activity").insert({
    action: "update",
    project_title: "Informasi Profil About",
    user_id: userId,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/about");
  revalidatePath("/");

  return { success: true, error: null, fieldErrors: {} };
}
