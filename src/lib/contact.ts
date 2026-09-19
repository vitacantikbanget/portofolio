import { supabase } from "./supabase";

export async function sendMessage(data: {
  nama: string;
  email: string;
  pesan: string;
}) {
  const { error } = await supabase.from("pesan_kontak").insert([data]);

  if (error) {
    console.error("Error sending message:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}