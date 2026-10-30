import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LabelHarga from "@/components/LabelHarga";
import VideoProfil from "@/components/VideoProfil";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default async function DetailUmkm({ params }) {
  const { slug } = await params;
  const { data: umkm, error } = await supabase
    .from("umkm")
    .select("nama, kategori, deskripsi, alamat, telepon, email, foto_url, video_youtube, produk(id, nama, harga, deskripsi, foto_url)")
    .eq("slug", slug)
    .maybeSingle();

  // Gagal mengambil data atau slug tidak ada di database
  if (error) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <p className="rounded-xl border border-dashed border-destructive p-6 text-center text-destructive">
          Detail UMKM belum bisa dibuka: {error.message}
        </p>
      </main>
    );
  }
  if (!umkm) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <Link href="/umkm" className="text-sm font-medium text-primary hover:underline">
        Kembali ke Daftar UMKM
      </Link>

      <section className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
        {umkm.foto_url && (
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src={umkm.foto_url}
              alt={`Produk ${umkm.nama}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              loading="eager"
              className="object-cover"
            />
          </div>
        )}
        <div>
          <Badge variant={umkm.kategori} className="capitalize">{umkm.kategori}</Badge>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">{umkm.nama}</h1>
          <p className="mt-2 text-muted-foreground">{umkm.alamat}</p>
          <p className="mt-6 text-lg">{umkm.deskripsi}</p>
          <dl className="mt-6 grid gap-2 text-sm">
            <div className="flex gap-2">
              <dt className="w-20 text-muted-foreground">Telepon</dt>
              <dd>{umkm.telepon}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-20 text-muted-foreground">Email</dt>
              <dd>{umkm.email}</dd>
            </div>
          </dl>
        </div>
      </section>

      {umkm.video_youtube && (
        <section className="mt-14">
          <h2 className="border-b pb-3 font-serif text-2xl md:text-3xl">Video profil</h2>
          <div className="mt-6 max-w-3xl">
            <VideoProfil idVideo={umkm.video_youtube} judul={umkm.nama} />
          </div>
        </section>
      )}

      <section className="mt-14">
        <h2 className="border-b pb-3 font-serif text-2xl md:text-3xl">Produk dari {umkm.nama}</h2>
        {umkm.produk.length === 0 && (
          <p className="mt-6 text-muted-foreground">UMKM ini belum menambahkan produk.</p>
        )}
        <div className="mt-6 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3">
          {umkm.produk.map((produk) => (
            <Card key={produk.id} className="pt-0">
              {produk.foto_url ? (
                <div className="relative aspect-square">
                  <Image src={produk.foto_url} alt={produk.nama} fill sizes="(min-width: 1024px) 33vw, (min-width: 480px) 50vw, 100vw" className="object-cover" />
                </div>
              ) : (
                <div className="flex aspect-square items-center justify-center bg-muted text-sm text-muted-foreground">
                  Foto belum tersedia
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{produk.nama}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{produk.deskripsi}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <LabelHarga harga={produk.harga} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
