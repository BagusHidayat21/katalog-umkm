"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { periksaRecaptcha } from "@/lib/recaptcha";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { ambilIsian, validasiPendaftaran } from "@/lib/validasi";

// "Warung Pecel Bu Sri" menjadi "warung-pecel-bu-sri"
function buatSlug(nama) {
  return nama.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function daftarUmkm(stateSebelum, formData) {
  const data = ambilIsian(formData);

  // 1. Token reCAPTCHA harus lolos verifikasi Google
  const recaptcha = await periksaRecaptcha(formData.get("g-recaptcha-response"), process.env.RECAPTCHA_SECRET_KEY);
  if (!recaptcha.lolos) {
    return { pesan: "Centang kotak \"Saya bukan robot\" terlebih dahulu." };
  }

  // 2. Validasi ulang di server, karena pemeriksaan di browser bisa dilewati
  const error = validasiPendaftaran(data);
  if (Object.keys(error).length > 0) {
    return { error };
  }

  // 3. Simpan dengan secret key
  const slug = buatSlug(data.nama);
  const { error: errorDb } = await supabaseAdmin.from("umkm").insert({
    slug,
    nama: data.nama,
    kategori: data.kategori,
    email: data.email,
    telepon: data.telepon,
    tahun_berdiri: Number(data.tahunBerdiri),
    alamat: data.alamat,
    deskripsi: data.deskripsi,
  });
  if (errorDb) {
    // 23505 = melanggar unique: slug (nama) sudah dipakai UMKM lain
    if (errorDb.code === "23505") return { error: { nama: "Nama usaha ini sudah terdaftar." } };
    return { pesan: `Pendaftaran gagal disimpan: ${errorDb.message}` };
  }

  revalidatePath("/umkm");
  redirect(`/umkm/${slug}`);
}
