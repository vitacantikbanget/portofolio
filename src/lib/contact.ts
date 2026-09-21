import { supabase } from "./supabase";

// Fungsi buat kirim pesan ke Supabase
export async function sendMessage(data: {
  nama: string;   // nama pengirim
  email: string;  // email pengirim
  pesan: string;  // isi pesan
}) {
  // Insert data ke tabel "pesan_kontak"
  const { error } = await supabase.from("pesan_kontak").insert([data]);

  // Kalau ada error → return gagal + pesan error-nya
  if (error) {
    console.error("Error sending message:", error);
    return { success: false, error: error.message };
  }

  // Kalau sukses → return sukses
  return { success: true };
}