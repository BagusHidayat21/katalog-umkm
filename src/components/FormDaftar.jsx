"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { daftarUmkm } from "@/app/daftar/actions";
import InputBerlabel from "@/components/InputBerlabel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ambilIsian, daftarKategori, validasiPendaftaran } from "@/lib/validasi";

export default function FormDaftar() {
  const [state, formAction, sedangMengirim] = useActionState(daftarUmkm, {});
  const [errorLokal, setErrorLokal] = useState({});
  const recaptcha = useRef(null);
  // Error dari browser lebih dulu; bila tidak ada, tampilkan error dari server
  const error = Object.keys(errorLokal).length > 0 ? errorLokal : (state.error ?? {});

  // Setiap jawaban server membuat token lama tidak berlaku, jadi kotak reCAPTCHA dikosongkan lagi
  useEffect(() => {
    recaptcha.current?.reset();
  }, [state]);

  // Periksa di browser dulu; hanya data yang lolos yang dikirim ke Server Action
  function kirim(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const hasil = validasiPendaftaran(ambilIsian(formData));
    setErrorLokal(hasil);
    if (Object.keys(hasil).length > 0) return;
    startTransition(() => formAction(formData));
  }

  return (
    <form onSubmit={kirim} noValidate className="grid gap-5">
      <InputBerlabel id="nama" name="nama" label="Nama usaha" error={error.nama} placeholder="Contoh: Warung Pecel Bu Sri" />
      <div className="grid gap-2">
        <Label htmlFor="kategori">Kategori</Label>
        <select
          id="kategori"
          name="kategori"
          defaultValue=""
          aria-invalid={error.kategori ? true : undefined}
          className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-base capitalize md:text-sm aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
        >
          <option value="" disabled>Pilih kategori</option>
          {daftarKategori.map((kategori) => (
            <option key={kategori} value={kategori}>{kategori}</option>
          ))}
        </select>
        {error.kategori && <p className="text-sm text-destructive">{error.kategori}</p>}
      </div>
      <InputBerlabel id="email" name="email" type="email" label="Email" error={error.email} placeholder="nama@example.com" />
      <InputBerlabel id="telepon" name="telepon" type="tel" label="Nomor telepon" error={error.telepon} placeholder="081234567890" />
      <InputBerlabel id="tahunBerdiri" name="tahunBerdiri" type="number" label="Tahun berdiri" error={error.tahunBerdiri} placeholder="2015" />
      <InputBerlabel id="alamat" name="alamat" label="Alamat" error={error.alamat} placeholder="Jalan, kelurahan, kecamatan, kota" />
      <div className="grid gap-2">
        <Label htmlFor="deskripsi">Deskripsi usaha</Label>
        <Textarea id="deskripsi" name="deskripsi" rows={4} aria-invalid={error.deskripsi ? true : undefined} placeholder="Produk andalan, sejak kapan, dan apa yang membuatnya istimewa" />
        {error.deskripsi && <p className="text-sm text-destructive">{error.deskripsi}</p>}
      </div>
      <ReCAPTCHA ref={recaptcha} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} hl="id" />
      {state.pesan && <p className="text-sm text-destructive">{state.pesan}</p>}
      <Button type="submit" size="lg" disabled={sedangMengirim}>
        {sedangMengirim ? "Mengirim..." : "Daftarkan UMKM"}
      </Button>
    </form>
  );
}
