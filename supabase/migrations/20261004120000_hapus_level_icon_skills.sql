-- ============================================================
-- Hapus kolom level & icon pada tabel skills.
-- Kolom level tidak dipakai, kolom icon kosong semua.
-- Setelah migrasi ini: skills hanya punya id, name, category, created_at.
-- ============================================================

alter table public.skills drop column if exists level;
alter table public.skills drop column if exists icon;