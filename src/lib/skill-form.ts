import { z } from "zod";

export const SKILL_CATEGORIES = [
  { value: "frontend", label: "Frontend Development" },
  { value: "design", label: "Design & UI/UX" },
  { value: "tools", label: "Tools & Backend" },
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number]["value"];

export type SkillInput = {
  name: string;
  category: string;
  level: number;
  icon: string | null;
};

export type SkillState = {
  error: string | null;
  fieldErrors: Record<string, string>;
};

export const initialSkillState: SkillState = {
  error: null,
  fieldErrors: {},
};

const skillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama skill wajib diisi.")
    .max(60, "Nama skill maksimal 60 karakter."),
  category: z
    .string()
    .trim()
    .min(1, "Kategori wajib dipilih."),
  level: z
    .coerce
    .number()
    .int("Level harus bilangan bulat.")
    .min(1, "Level minimal 1%.")
    .max(100, "Level maksimal 100%."),
  icon: z
    .string()
    .trim()
    .max(40, "Nama icon maksimal 40 karakter.")
    .optional(),
});

function getString(formData: FormData, key: string): string {
  const val = formData.get(key);
  return typeof val === "string" ? val : "";
}

export function parseSkill(formData: FormData):
  | { data: SkillInput; fieldErrors: Record<string, string> }
  | { error: string; fieldErrors: Record<string, string> } {
  const parsed = skillSchema.safeParse({
    name: getString(formData, "name"),
    category: getString(formData, "category"),
    level: formData.get("level") || 80,
    icon: getString(formData, "icon"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: "Periksa kembali kolom yang ditandai.", fieldErrors };
  }

  return {
    data: {
      name: parsed.data.name,
      category: parsed.data.category,
      level: parsed.data.level,
      icon: parsed.data.icon ? parsed.data.icon : null,
    },
    fieldErrors: {},
  };
}
