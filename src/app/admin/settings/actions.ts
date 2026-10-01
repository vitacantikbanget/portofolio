"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "../_lib/admin-guard";
import { type SettingsState } from "./state";

const settingsSchema = z.object({
  accent_color: z
    .string()
    .trim()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Warna harus berupa kode hex (contoh: #a96f6b)."),
  site_title: z
    .string()
    .trim()
    .min(1, "Judul website wajib diisi.")
    .max(120, "Judul website maksimal 120 karakter."),
  site_description: z
    .string()
    .trim()
    .max(300, "Deskripsi website maksimal 300 karakter.")
    .optional(),
});

export async function updateSettings(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const supabase = await requireAdmin();
  const { data: claimData } = await supabase.auth.getClaims();
  const userId = claimData?.claims?.sub;

  if (!userId) {
    return { error: "Sesi tidak valid.", fieldErrors: {} };
  }

  const parsed = settingsSchema.safeParse({
    accent_color: formData.get("accent_color"),
    site_title: formData.get("site_title"),
    site_description: formData.get("site_description"),
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
      accent_color: parsed.data.accent_color,
      site_title: parsed.data.site_title,
      site_description: parsed.data.site_description || null,
    })
    .eq("id", userId);

  if (error) {
    return {
      error: `Gagal menyimpan pengaturan: ${error.message}`,
      fieldErrors: {},
    };
  }

  await supabase.from("admin_activity").insert({
    action: "update",
    project_title: "Pengaturan Website (Accent & Title)",
    user_id: userId,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/settings");

  return { success: true, error: null, fieldErrors: {} };
}
