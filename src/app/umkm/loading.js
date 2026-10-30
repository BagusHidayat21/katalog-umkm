import { CardSkeleton } from "@/components/Kerangka";

// Tampil otomatis selama page.js di folder ini masih mengambil data
export default function MemuatDaftarUmkm() {
  return (
    <main className="mx-auto w-full max-w-6xl 3xl:max-w-7xl px-4 py-10">
      <h1 className="font-serif text-4xl md:text-5xl">Daftar UMKM</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        Usaha kecil di sekitar sekolah. Pilih salah satu untuk melihat produk andalannya.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
