-- ============================================================
-- Tahap 4: Kolom About & Settings pada tabel profile, serta policy publik.
-- ============================================================

-- (1) Tambah kolom About & Settings ke tabel profile
alter table public.profile
  add column if not exists headline text,
  add column if not exists bio text,
  add column if not exists avatar_url text default '/profile.jpeg',
  add column if not exists tagline text,
  add column if not exists accent_color text default '#a96f6b',
  add column if not exists site_title text default 'Desvita Putri — Personal Portfolio',
  add column if not exists site_description text default 'Portfolio pribadi Desvita Putri Wulandari — Frontend Developer & UI/UX Designer.';

comment on column public.profile.headline is 'Judul peran utama, misal: Frontend Developer & UI/UX Enthusiast';
comment on column public.profile.bio is 'Deskripsi diri / perkenalan lengkap.';
comment on column public.profile.avatar_url is 'Path foto profil (contoh: /profile.jpeg).';
comment on column public.profile.tagline is 'Slogan singkat pengantar.';
comment on column public.profile.accent_color is 'Warna aksen utama situs dalam format hex (contoh: #a96f6b).';
comment on column public.profile.site_title is 'Judul situs untuk tag meta / head.';
comment on column public.profile.site_description is 'Deskripsi situs untuk tag meta.';

-- (2) Berikan akses SELECT publik ke tabel profile
-- Supaya beranda dan root layout bisa membaca accent_color dan bio
drop policy if exists "profile_select_public" on public.profile;
create policy "profile_select_public" on public.profile
  for select
  using (true);
