-- ============================================================
-- Tahap 2 (A): kunci akses tulis ke admin saja.
--
-- Dua masalah yang ditutup di sini:
--   1. projects: policy INSERT/UPDATE/DELETE memakai role
--      'authenticated', jadi user mana pun yang berhasil login
--      bisa mengubah atau MENGHAPUS semua project. Selama signup
--      Supabase masih terbuka, orang bisa mendaftar sendiri lalu
--      menghapus isi portofolio.
--   2. pesan_kontak: policy SELECT juga 'true', jadi isi kotak
--      masuk (nama + email + pesan) bisa dibaca siapa pun yang
--      memegang anon key - termasuk pengunjung biasa.
--
-- Yang SENGAJA dipertahankan:
--   - projects public read  : portofolio harus terlihat publik.
--   - pesan_kontak public insert : form kontak harus bisa diisi
--     orang yang belum punya akun.
--
-- Catatan: karena policy projects sekarang is_admin() saja, role
-- 'editor' di tabel profile tidak punya privilege apa pun. Itu
-- disengaja untuk tahap ini.
--
-- sudah diterapkan: 20260927032313
-- ============================================================

-- (1) projects: buang policy yang terlalu longgar
drop policy if exists "Allow authenticated insert" on public.projects;
drop policy if exists "Allow authenticated update" on public.projects;
drop policy if exists "Allow authenticated delete" on public.projects;

-- (2) projects: ganti dengan versi admin-only
create policy "projects_insert_admin" on public.projects
  for insert to authenticated
  with check (public.is_admin());

create policy "projects_update_admin" on public.projects
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "projects_delete_admin" on public.projects
  for delete to authenticated
  using (public.is_admin());

-- (3) pesan_kontak: SELECT dari publik -> admin saja
drop policy if exists "Enable public read" on public.pesan_kontak;

create policy "pesan_kontak_select_admin" on public.pesan_kontak
  for select to authenticated
  using (public.is_admin());
