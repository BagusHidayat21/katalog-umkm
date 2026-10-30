// Aturan validasi form pendaftaran UMKM, dipakai dua kali: di browser (FormDaftar) dan di server (actions.js)
export const daftarKategori = ["kuliner", "kerajinan", "jasa"];
const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Diawali 08 atau +628, lalu 8 sampai 12 angka (nomor 08 berjumlah 10 sampai 14 digit)
const polaTelepon = /^(08|\+628)[0-9]{8,12}$/;

// Ambil isian dari FormData; spasi di awal dan akhir dibuang, spasi dan tanda hubung di nomor telepon juga
export function ambilIsian(formData) {
  return {
    nama: String(formData.get("nama") ?? "").trim(),
    kategori: String(formData.get("kategori") ?? ""),
    email: String(formData.get("email") ?? "").trim(),
    telepon: String(formData.get("telepon") ?? "").replace(/[\s-]/g, ""),
    tahunBerdiri: String(formData.get("tahunBerdiri") ?? "").trim(),
    alamat: String(formData.get("alamat") ?? "").trim(),
    deskripsi: String(formData.get("deskripsi") ?? "").trim(),
  };
}

// Mengembalikan object berisi pesan error per isian; object kosong berarti semua isian benar
export function validasiPendaftaran(data) {
  const error = {};
  const tahunIni = new Date().getFullYear();

  if (data.nama === "") error.nama = "Nama usaha wajib diisi.";
  else if (data.nama.length < 3) error.nama = "Nama usaha minimal 3 karakter.";

  if (!daftarKategori.includes(data.kategori)) error.kategori = "Pilih salah satu kategori.";

  if (data.email === "") error.email = "Email wajib diisi.";
  else if (!polaEmail.test(data.email)) error.email = "Format email belum benar, contoh: nama@example.com.";

  if (data.telepon === "") error.telepon = "Nomor telepon wajib diisi.";
  else if (!polaTelepon.test(data.telepon)) error.telepon = "Nomor diawali 08 atau +62 dan berisi 10 sampai 14 angka.";

  const tahun = Number(data.tahunBerdiri);
  if (data.tahunBerdiri === "") error.tahunBerdiri = "Tahun berdiri wajib diisi.";
  else if (!Number.isInteger(tahun) || tahun < 1950 || tahun > tahunIni) error.tahunBerdiri = `Tahun berdiri berupa angka 1950 sampai ${tahunIni}.`;

  if (data.alamat === "") error.alamat = "Alamat wajib diisi.";

  if (data.deskripsi.length < 30) error.deskripsi = `Deskripsi minimal 30 karakter (sekarang ${data.deskripsi.length}).`;

  return error;
}

// Isian form ulasan
export function ambilUlasan(formData) {
  return {
    nama: String(formData.get("nama") ?? "").trim(),
    rating: String(formData.get("rating") ?? ""),
    komentar: String(formData.get("komentar") ?? "").trim(),
  };
}

export function validasiUlasan(data) {
  const error = {};
  const rating = Number(data.rating);
  if (data.nama === "") error.nama = "Nama wajib diisi.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) error.rating = "Pilih rating 1 sampai 5.";
  if (data.komentar.length < 10) error.komentar = `Komentar minimal 10 karakter (sekarang ${data.komentar.length}).`;
  return error;
}
