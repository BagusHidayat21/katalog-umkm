import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LabelHarga from "@/components/LabelHarga";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default async function DetailUmkm({ params }) {
  const { slug } = await params;
  const { data: umkm, error } = await supabase
    .from("umkm")
    .select("nama, kategori, deskripsi, alamat, telepon, email, foto_url, produk(id, nama, harga, deskripsi, foto_url)")
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
          <Image
            src={umkm.foto_url}
            alt={`Produk ${umkm.nama}`}
            width={1600}
            height={1200}
            loading="eager"
            className="h-auto w-full rounded-2xl"
          />
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

      <section className="mt-14">
        <h2 className="border-b pb-3 font-serif text-2xl md:text-3xl">Produk dari {umkm.nama}</h2>
        {umkm.produk.length === 0 && (
          <p className="mt-6 text-muted-foreground">UMKM ini belum menambahkan produk.</p>
        )}
        <div className="mt-6 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3">
          {umkm.produk.map((produk) => (
            <Card key={produk.id}>
              {produk.foto_url ? (
                <Image src={produk.foto_url} alt={produk.nama} width={800} height={600} className="h-auto w-full" />
              ) : (
                <div className="bg-muted p-10 text-center text-sm text-muted-foreground">Foto belum tersedia</div>
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
