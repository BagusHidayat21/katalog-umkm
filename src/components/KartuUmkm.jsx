import Image from "next/image";
import Link from "next/link";
import LabelHarga from "@/components/LabelHarga";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function KartuUmkm({ umkm }) {
  const daftarHarga = umkm.produk.map((p) => p.harga);
  const hargaTermurah = daftarHarga.length > 0 ? Math.min(...daftarHarga) : null;

  return (
    <Link href={`/umkm/${umkm.slug}`} className="block rounded-xl transition-transform hover:-translate-y-1">
      <Card className="h-full">
        {umkm.foto_url ? (
          <Image
            src={umkm.foto_url}
            alt={`Produk ${umkm.nama}`}
            width={1600}
            height={1200}
            className="h-auto w-full"
          />
        ) : (
          <div className="bg-muted p-10 text-center text-sm text-muted-foreground">Foto belum tersedia</div>
        )}
        <CardHeader>
          <Badge variant={umkm.kategori} className="capitalize">{umkm.kategori}</Badge>
          <CardTitle className="text-xl">{umkm.nama}</CardTitle>
          <CardDescription>{umkm.alamat}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto justify-between gap-3">
          <LabelHarga harga={hargaTermurah} awalan="mulai" />
          <span className="text-sm text-muted-foreground">{umkm.produk.length} produk</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
