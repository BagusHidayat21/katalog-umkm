import Image from "next/image";
import LabelHarga from "@/components/LabelHarga";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default async function UmkmUnggulan() {
  const { data: daftarUmkm, error } = await supabase
    .from("umkm")
    .select("id, slug, nama, kategori, deskripsi, alamat, email, foto_url, produk(harga)")
    .order("id")
    .limit(3);

  // Data gagal diambil atau tabel masih kosong
  if (error) {
    return (
      <p className="mt-6 rounded-xl border border-dashed border-destructive p-6 text-center text-destructive">
        Etalase belum bisa dibuka: {error.message}
      </p>
    );
  }
  if (daftarUmkm.length === 0) {
    return (
      <p className="mt-6 rounded-xl border border-dashed p-6 text-center text-muted-foreground">
        Belum ada UMKM di database. Jalankan SQL data contoh di Supabase.
      </p>
    );
  }

  return (
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      {daftarUmkm.map((umkm, urutan) => {
        const daftarHarga = umkm.produk.map((p) => p.harga);
        const hargaTermurah = daftarHarga.length > 0 ? Math.min(...daftarHarga) : null;

        return (
          <Card key={umkm.id} className={urutan === 0 ? "md:col-span-2 md:grid md:grid-cols-2 md:grid-rows-[auto_1fr_auto] md:gap-x-0 md:py-0" : ""}>
            {umkm.foto_url ? (
              <Image
                src={umkm.foto_url}
                alt={`Produk ${umkm.nama}`}
                width={1600}
                height={1200}
                loading="eager"
                className={urutan === 0 ? "h-auto w-full md:row-span-3" : "h-auto w-full"}
              />
            ) : (
              <div className="bg-muted p-10 text-center text-sm text-muted-foreground">Foto belum tersedia</div>
            )}
            <CardHeader className={urutan === 0 ? "md:pt-6" : ""}>
              <Badge variant={umkm.kategori} className="capitalize">{umkm.kategori}</Badge>
              <CardTitle className={urutan === 0 ? "text-3xl" : "text-xl"}>{umkm.nama}</CardTitle>
              <CardDescription>{umkm.alamat}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{umkm.deskripsi}</p>
            </CardContent>
            <CardFooter className="mt-auto flex-wrap justify-between gap-3">
              <LabelHarga harga={hargaTermurah} awalan="mulai" />
              <a href={`mailto:${umkm.email}`} className={buttonVariants({ variant: "outline" })}>
                Sapa lewat email
              </a>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
