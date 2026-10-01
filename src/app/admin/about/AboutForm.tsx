"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { AlertCircle, CheckCircle2, Loader2, Sparkles, User } from "lucide-react";
import { updateAbout } from "./actions";
import { initialAboutState } from "./state";

type InitialProfile = {
  username?: string | null;
  headline?: string | null;
  tagline?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
};

export default function AboutForm(props: { initialData?: InitialProfile }) {
  const initialData: InitialProfile = props?.initialData ?? {};
  const [username, setUsername] = useState(initialData.username ?? "");
  const [headline, setHeadline] = useState(initialData.headline ?? "");
  const [tagline, setTagline] = useState(initialData.tagline ?? "");
  const [bio, setBio] = useState(initialData.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatar_url ?? "/profile.jpeg");

  const [state, formAction, isPending] = useActionState(
    updateAbout,
    initialAboutState,
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
            Edit Profil About
          </h2>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Perubahan disimpan ke tabel profil dan otomatis tampil di halaman beranda.
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
            <span>Profil About berhasil diperbarui!</span>
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

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-[10px] tracking-[0.2em] uppercase block mb-1.5 font-medium" style={{ color: "var(--text-muted)" }}>
              Nama Tampilan / Username
            </label>
            <input
              id="username"
              name="username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              required
              maxLength={50}
              placeholder="Desvita Putri"
              className={inputClass}
              style={{ ...inputStyle, borderColor: e("username") ? "#e05c5c" : "var(--border)" }}
            />
            {e("username") && <p className="text-[11px] mt-1 text-[#e05c5c]">{e("username")}</p>}
          </div>

          <div>
            <label htmlFor="headline" className="text-[10px] tracking-[0.2em] uppercase block mb-1.5 font-medium" style={{ color: "var(--text-muted)" }}>
              Headline / Peran Utama
            </label>
            <input
              id="headline"
              name="headline"
              value={headline}
              onChange={(ev) => setHeadline(ev.target.value)}
              maxLength={120}
              placeholder="Frontend Developer & UI/UX Enthusiast"
              className={inputClass}
              style={{ ...inputStyle, borderColor: e("headline") ? "#e05c5c" : "var(--border)" }}
            />
            {e("headline") && <p className="text-[11px] mt-1 text-[#e05c5c]">{e("headline")}</p>}
          </div>

          <div>
            <label htmlFor="tagline" className="text-[10px] tracking-[0.2em] uppercase block mb-1.5 font-medium" style={{ color: "var(--text-muted)" }}>
              Tagline Pengantar
            </label>
            <input
              id="tagline"
              name="tagline"
              value={tagline}
              onChange={(ev) => setTagline(ev.target.value)}
              maxLength={180}
              placeholder="Merancang antarmuka web yang estetis, interaktif, dan mudah digunakan."
              className={inputClass}
              style={{ ...inputStyle, borderColor: e("tagline") ? "#e05c5c" : "var(--border)" }}
            />
            {e("tagline") && <p className="text-[11px] mt-1 text-[#e05c5c]">{e("tagline")}</p>}
          </div>

          <div>
            <label htmlFor="avatar_url" className="text-[10px] tracking-[0.2em] uppercase block mb-1.5 font-medium" style={{ color: "var(--text-muted)" }}>
              Path Foto Avatar (Folder public/)
            </label>
            <input
              id="avatar_url"
              name="avatar_url"
              value={avatarUrl}
              onChange={(ev) => setAvatarUrl(ev.target.value)}
              maxLength={300}
              placeholder="/profile.jpeg"
              className={inputClass}
              style={{ ...inputStyle, borderColor: e("avatar_url") ? "#e05c5c" : "var(--border)" }}
            />
            <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
              Gunakan path yang ada di folder <code>public/</code>.
            </p>
          </div>

          <div>
            <label htmlFor="bio" className="text-[10px] tracking-[0.2em] uppercase block mb-1.5 font-medium" style={{ color: "var(--text-muted)" }}>
              Biografi Lengkap
            </label>
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(ev) => setBio(ev.target.value)}
              maxLength={3000}
              rows={6}
              className={`${inputClass} resize-y leading-relaxed`}
              style={{ ...inputStyle, borderColor: e("bio") ? "#e05c5c" : "var(--border)" }}
            />
            {e("bio") && <p className="text-[11px] mt-1 text-[#e05c5c]">{e("bio")}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{ background: "var(--accent)", color: "#ffffff" }}
            >
              {isPending && <Loader2 size={14} className="animate-spin" />}
              {isPending ? "Menyimpan..." : "Simpan Perubahan About"}
            </button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-5 space-y-4 sticky top-24">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
            <Sparkles size={13} style={{ color: "var(--accent)" }} />
            Pratinjau Langsung
          </span>
        </div>

        <div className="rounded-3xl border p-6 sm:p-7 relative overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full border overflow-hidden relative shrink-0 flex items-center justify-center" style={{ background: "var(--accent-soft)", borderColor: "var(--accent)" }}>
              {avatarUrl && avatarUrl.startsWith("/") ? (
                <Image src={avatarUrl} alt={username || "Avatar"} fill className="object-cover" unoptimized />
              ) : (
                <User size={24} style={{ color: "var(--accent)" }} />
              )}
            </div>
            <div>
              <h3 className="text-xl font-medium leading-tight" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text)" }}>
                {username || "Nama Anda"}
              </h3>
              <p className="text-xs font-medium mt-0.5" style={{ color: "var(--accent)" }}>
                {headline || "Frontend Developer"}
              </p>
            </div>
          </div>

          {tagline && (
            <p className="text-xs italic mb-4 leading-relaxed pl-3 border-l-2" style={{ borderColor: "var(--accent)", color: "var(--text-muted)" }}>
              &ldquo;{tagline}&rdquo;
            </p>
          )}

          <div className="text-xs leading-relaxed space-y-2 pt-2 border-t" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            {bio ? (
              bio.split("\n").filter(Boolean).map((par, i) => (
                <p key={i} className="opacity-90">{par}</p>
              ))
            ) : (
              <p className="opacity-50 italic">Belum ada biografi yang diisi.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}