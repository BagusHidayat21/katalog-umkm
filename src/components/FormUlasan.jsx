"use client";

import Script from "next/script";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { kirimUlasan } from "@/app/umkm/[slug]/actions";
import InputBerlabel from "@/components/InputBerlabel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ambilUlasan, validasiUlasan } from "@/lib/validasi";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;

// Meminta token reCAPTCHA v3 untuk satu aksi; tidak ada kotak yang dicentang, Google menilai di latar belakang
function mintaToken(aksi) {
  return new Promise((selesai) => {
    window.grecaptcha.ready(() => window.grecaptcha.execute(SITE_KEY, { action: aksi }).then(selesai));
  });
}

export default function FormUlasan({ umkmId, slug }) {
  const [state, formAction, sedangMengirim] = useActionState(kirimUlasan, {});
  const [errorLokal, setErrorLokal] = useState({});
  const form = useRef(null);
  const error = Object.keys(errorLokal).length > 0 ? errorLokal : (state.error ?? {});

  // Ulasan berhasil disimpan: kosongkan form
  useEffect(() => {
    if (state.berhasil) form.current?.reset();
  }, [state]);

  async function kirim(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const hasil = validasiUlasan(ambilUlasan(formData));
    setErrorLokal(hasil);
    if (Object.keys(hasil).length > 0) return;
    formData.set("token", await mintaToken("ulasan"));
    startTransition(() => formAction(formData));
  }

  return (
    <form ref={form} onSubmit={kirim} noValidate className="grid gap-4">
      <Script src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`} />
      <input type="hidden" name="umkmId" value={umkmId} />
      <input type="hidden" name="slug" value={slug} />
      <InputBerlabel id="nama-ulasan" name="nama" label="Nama" error={error.nama} placeholder="Nama panggilan" />
      <div className="grid gap-2">
        <Label htmlFor="rating">Rating</Label>
        <select id="rating" name="rating" defaultValue="" aria-invalid={error.rating ? true : undefined} className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-base md:text-sm aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20">
          <option value="" disabled>Pilih rating</option>
          {[5, 4, 3, 2, 1].map((angka) => (
            <option key={angka} value={angka}>{"★".repeat(angka)} ({angka})</option>
          ))}
        </select>
        {error.rating && <p className="text-sm text-destructive">{error.rating}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="komentar">Komentar</Label>
        <Textarea id="komentar" name="komentar" rows={3} aria-invalid={error.komentar ? true : undefined} placeholder="Ceritakan pengalamanmu membeli di UMKM ini" />
        {error.komentar && <p className="text-sm text-destructive">{error.komentar}</p>}
      </div>
      {state.pesan && <p className="text-sm text-destructive">{state.pesan}</p>}
      {state.berhasil && <p className="text-sm font-medium text-primary">{state.berhasil}</p>}
      <Button type="submit" disabled={sedangMengirim}>
        {sedangMengirim ? "Mengirim..." : "Kirim Ulasan"}
      </Button>
    </form>
  );
}
