"use client";

import { useActionState, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Palette, Sparkles } from "lucide-react";
import { updateSettings, initialSettingsState } from "./actions";

type InitialSettings = {
  accent_color?: string | null;
  site_title?: string | null;
  site_description?: string | null;
};

const PRESET_COLORS = [
  { name: "Dusty Rose (Default)", hex: "#a96f6b" },
  { name: "Mauve Lavender", hex: "#8a7590" },
  { name: "Sage Emerald", hex: "#5c8a77" },
  { name: "Warm Amber", hex: "#c28246" },
  { name: "Deep Indigo", hex: "#6366f1" },
  { name: "Crimson Silk", hex: "#c95252" },
];

export default function SettingsForm(props: { initialData?: InitialSettings }) {
  const initialData: InitialSettings = props?.initialData ?? {};
  const [accentColor, setAccentColor] = useState(initialData.accent_color ?? "#a96f6b");
  const [siteTitle, setSiteTitle] = useState(initialData.site_title ?? "Desvita Putri — Portfolio");
  const [siteDescription, setSiteDescription] = useState(initialData.site_description ?? "");

  const [state, formAction, isPending] = useActionState(
    updateSettings,
    initialSettingsState,
  );

  const e = (field: string) => state?.fieldErrors?.[field] ?? null;

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-[var(--accent)]";
  const inputStyle = {
    background: "var(--bg-soft)",
    borderColor: "var(--border)",
    color: "var(--text)",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div
        className="lg:col-span-7 rounded-3xl border p-6 sm:p-8 space-y-6"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div>
          <h2 className="text-base font-semibold" style={{ color: "var(--text)" }}>
            Pengaturan Website
          </h2>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Konfigurasi tema warna dan identitas global situs Anda.
          </p>
        </div>

        {state?.success && (
          <div
            className="flex items-center gap-2 text-xs px-4 py-3 rounded-xl border"
            style={{
              color: "#38a169",
              borderColor: "#38a16944",
              background: "#38a16914",
            }}
          >
            <CheckCircle2 size={16} className="shrink-0" />
            <span>Pengaturan berhasil disimpan dan diinjeksikan ke seluruh website!</span>
          </div>
        )}

        {state?.error && (
          <div
            className="flex items-start gap-2 text-xs px-4 py-3 rounded-xl border"
            style={{
              color: "#e05c5c",
              borderColor: "#e05c5c55",
              background: "#e05c5c14",
            }}
          >
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="space-y-3">
            <label
              htmlFor="accent_color"
              className="text-[10px] tracking-[0.2em] uppercase block font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Warna Aksen Situs (CSS Variable --accent)
            </label>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={accentColor}
                onChange={(ev) => setAccentColor(ev.target.value)}
                className="w-12 h-11 rounded-xl cursor-pointer border p-1"
                style={{
                  background: "var(--bg-soft)",
                  borderColor: "var(--border)",
                }}
              />
              <input
                id="accent_color"
                name="accent_color"
                value={accentColor}
                onChange={(ev) => setAccentColor(ev.target.value)}
                required
                maxLength={7}
                placeholder="#a96f6b"
                className="w-32 px-3 py-2.5 rounded-xl border text-sm font-mono outline-none"
                style={{
                  ...inputStyle,
                  borderColor: e("accent_color") ? "#e05c5c" : "var(--border)",
                }}
              />
              <div
                className="w-8 h-8 rounded-full border shadow-xs"
                style={{
                  backgroundColor: accentColor,
                  borderColor: "var(--border)",
                }}
              />
            </div>
            {e("accent_color") && (
              <p className="text-[11px] text-[#e05c5c]">{e("accent_color")}</p>
            )}

            <div>
              <p className="text-[11px] mb-2 font-medium" style={{ color: "var(--text-muted)" }}>
                Pilihan Palet Siap Pakai:
              </p>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.hex}
                    type="button"
                    onClick={() => setAccentColor(preset.hex)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all hover:scale-105"
                    style={{
                      borderColor:
                        accentColor === preset.hex
                          ? preset.hex
                          : "var(--border)",
                      background:
                        accentColor === preset.hex
                          ? `${preset.hex}22`
                          : "var(--bg-soft)",
                      color: "var(--text)",
                    }}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: preset.hex }}
                    />
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="site_title"
              className="text-[10px] tracking-[0.2em] uppercase block mb-1.5 font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Judul Website (SEO Meta Title)
            </label>
            <input
              id="site_title"
              name="site_title"
              value={siteTitle}
              onChange={(ev) => setSiteTitle(ev.target.value)}
              required
              maxLength={120}
              placeholder="Desvita Putri — Personal Portfolio"
              className={inputClass}
              style={{
                ...inputStyle,
                borderColor: e("site_title") ? "#e05c5c" : "var(--border)",
              }}
            />
            {e("site_title") && (
              <p className="text-[11px] mt-1 text-[#e05c5c]">{e("site_title")}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="site_description"
              className="text-[10px] tracking-[0.2em] uppercase block mb-1.5 font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Deskripsi Website (SEO Meta Description)
            </label>
            <textarea
              id="site_description"
              name="site_description"
              value={siteDescription}
              onChange={(ev) => setSiteDescription(ev.target.value)}
              maxLength={300}
              rows={3}
              placeholder="Portfolio pribadi Desvita Putri Wulandari — Frontend Developer & UI/UX Designer."
              className={`${inputClass} resize-y leading-relaxed`}
              style={{
                ...inputStyle,
                borderColor: e("site_description") ? "#e05c5c" : "var(--border)",
              }}
            />
            {e("site_description") && (
              <p className="text-[11px] mt-1 text-[#e05c5c]">{e("site_description")}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{ background: "var(--accent)", color: "#ffffff" }}
            >
              {isPending && <Loader2 size={14} className="animate-spin" />}
              {isPending ? "Menyimpan..." : "Simpan Pengaturan"}
            </button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-5 space-y-4 sticky top-24">
        <div className="flex items-center justify-between px-1">
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-semibold flex items-center gap-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            <Palette size={13} style={{ color: accentColor }} />
            Pratinjau Efek Aksen
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full border font-mono"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
              color: accentColor,
            }}
          >
            {accentColor}
          </span>
        </div>

        <div
          className="rounded-3xl border p-6 sm:p-7 space-y-5"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div>
            <p className="text-[10px] tracking-wider uppercase mb-1" style={{ color: "var(--text-muted)" }}>
              Tipografi Judul
            </p>
            <h3
              className="text-2xl font-medium leading-snug"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text)" }}
            >
              Koleksi karya &amp;{" "}
              <span className="italic" style={{ color: accentColor }}>
                proyek digital terpilih.
              </span>
            </h3>
          </div>

          <div>
            <p className="text-[10px] tracking-wider uppercase mb-2" style={{ color: "var(--text-muted)" }}>
              Komponen Badge &amp; Chips
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className="text-xs px-3 py-1 rounded-full border font-medium"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                  background: `${accentColor}18`,
                }}
              >
                Web Development
              </span>

              <span
                className="text-xs px-3 py-1 rounded-full text-white font-medium"
                style={{ backgroundColor: accentColor }}
              >
                Aktif
              </span>
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-wider uppercase mb-2" style={{ color: "var(--text-muted)" }}>
              Tombol Aksi Utama
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium text-white transition-all shadow-sm"
              style={{ backgroundColor: accentColor }}
            >
              <Sparkles size={13} />
              Contoh Tombol Call-to-Action
            </button>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span style={{ color: "var(--text-muted)" }}>Level Skill</span>
              <span style={{ color: accentColor }}>92%</span>
            </div>
            <div
              className="w-full h-2 rounded-full overflow-hidden"
              style={{ background: "var(--bg-soft)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: "92%", backgroundColor: accentColor }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}