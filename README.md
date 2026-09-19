# Portfolio Desvita Putri

Website portfolio pribadi dengan Next.js + Supabase.

## Tabel Database

### 1. `projects`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | int8 | Primary Key |
| slug | text | URL slug |
| title | text | Judul project |
| category | text | web / uiux |
| description | text | Deskripsi singkat |
| long_description | text | Deskripsi panjang |
| technologies | text[] | Array teknologi |
| image | text | Path gambar |
| link | text | Link project |
| created_at | timestamptz | Waktu dibuat |

### 2. `skills`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | int8 | Primary Key |
| name | text | Nama skill |
| category | text | frontend / design / tools |
| created_at | timestamptz | Waktu dibuat |

### 3. `pesan_kontak`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | int8 | Primary Key |
| nama | text | Nama pengirim |
| email | text | Email pengirim |
| pesan | text | Isi pesan |
| created_at | timestamptz | Waktu dibuat |

## Policy RLS

- **projects:** SELECT (public)
- **skills:** SELECT (public)
- **pesan_kontak:** INSERT + SELECT (public)

## Environment Variables

Buat file `.env.local`:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

## Cara Menjalankan

npm install
npm run dev