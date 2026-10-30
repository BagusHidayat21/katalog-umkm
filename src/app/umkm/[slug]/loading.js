import Link from "next/link";
import { ImageSkeleton, TextSkeleton } from "@/components/Kerangka";
import { Skeleton } from "@/components/ui/skeleton";

// Kerangka halaman detail: foto 4:3 di kiri, kategori, nama, alamat, dan deskripsi di kanan
export default function MemuatDetailUmkm() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <Link href="/umkm" className="text-sm font-medium text-primary hover:underline">
        Kembali ke Daftar UMKM
      </Link>

      <section className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
        <ImageSkeleton className="rounded-2xl" />
        <div>
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="mt-3 h-12 w-3/4" />
          <Skeleton className="mt-2 h-5 w-1/2" />
          <TextSkeleton baris={4} className="mt-6" />
        </div>
      </section>
    </main>
  );
}
