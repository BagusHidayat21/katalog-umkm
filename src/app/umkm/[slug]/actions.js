"use server";

import { revalidatePath } from "next/cache";
import { periksaRecaptcha } from "@/lib/recaptcha";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { ambilUlasan, validasiUlasan } from "@/lib/validasi";

// Skor reCAPTCHA v3: 1,0 hampir pasti manusia, 0,0 hampir pasti bot
const SKOR_MINIMAL = 0.5;

export async function kirimUlasan(stateSebelum, formData) {
  const data = ambilUlasan(formData);

  // 1. Token v3 harus sah, dibuat untuk aksi "ulasan", dan skornya cukup tinggi
  const recaptcha = await periksaRecaptcha(formData.get("token"), process.env.RECAPTCHA_V3_SECRET_KEY);
  if (!recaptcha.lolos || recaptcha.aksi !== "ulasan" || recaptcha.skor < SKOR_MINIMAL) {
    return { pesan: "Ulasan ditolak karena terdeteksi seperti bot. Coba lagi beberapa saat lagi." };
  }

  // 2. Validasi ulang di server
  const error = validasiUlasan(data);
  if (Object.keys(error).length > 0) {
    return { error };
  }

  // 3. Simpan dengan secret key
  const { error: errorDb } = await supabaseAdmin.from("ulasan").insert({
    umkm_id: Number(formData.get("umkmId")),
    nama: data.nama,
    rating: Number(data.rating),
    komentar: data.komentar,
  });
  if (errorDb) {
    return { pesan: `Ulasan gagal disimpan: ${errorDb.message}` };
  }

  revalidatePath(`/umkm/${formData.get("slug")}`);
  return { berhasil: `Terima kasih, ${data.nama}! Ulasanmu sudah tampil.` };
}
