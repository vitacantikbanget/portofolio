// Bentuk state form + nilai awalnya dipisah ke sini, bukan di actions.ts.
//
// Alasannya: file "use server" HANYA boleh mengekspor async function. Kalau
// initialSettingsState diekspor dari sana, Next mendaftarkannya sebagai server
// reference, bukan objek biasa, sehingga useActionState() di client menerima
// stub dan tampilan error form mati. Modul ini tidak ber-"use server", jadi
// aman dipakai bareng oleh actions.ts (server) dan SettingsForm.tsx (client).

export type SettingsState = {
  success?: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
};

export const initialSettingsState: SettingsState = {
  error: null,
  fieldErrors: {},
};
