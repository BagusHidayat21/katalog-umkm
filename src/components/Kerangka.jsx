import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Kerangka teks: beberapa baris, baris terakhir lebih pendek seperti akhir paragraf
export function TextSkeleton({ baris = 3, className = "" }) {
  return (
    <div className={`grid gap-2 ${className}`}>
      {Array.from({ length: baris }, (_, i) => (
        <Skeleton key={i} className={baris > 1 && i === baris - 1 ? "h-4 w-2/3" : "h-4 w-full"} />
      ))}
    </div>
  );
}

// Kerangka gambar: rasionya sama dengan foto asli, jadi halaman tidak bergeser saat foto muncul
export function ImageSkeleton({ rasio = "aspect-4/3", className = "" }) {
  return <Skeleton className={`w-full ${rasio} ${className}`} />;
}

// Kerangka kartu: susunannya meniru KartuUmkm (foto, kategori, nama, alamat, harga, jumlah produk)
export function CardSkeleton() {
  return (
    <Card className="h-full pt-0">
      <ImageSkeleton className="rounded-none" />
      <CardHeader>
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-6 w-3/4" />
        <TextSkeleton baris={1} />
      </CardHeader>
      <CardFooter className="mt-auto justify-between gap-3">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-4 w-16" />
      </CardFooter>
    </Card>
  );
}

// Kerangka daftar: baris-baris yang meniru daftar ulasan (nama, bintang, komentar)
export function ListSkeleton({ jumlah = 3 }) {
  return (
    <ul className="grid gap-4">
      {Array.from({ length: jumlah }, (_, i) => (
        <li key={i} className="rounded-xl border bg-card p-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="mt-2 h-4 w-20" />
          <TextSkeleton baris={2} className="mt-3" />
        </li>
      ))}
    </ul>
  );
}
