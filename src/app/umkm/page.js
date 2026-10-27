import KartuUmkm from "@/components/KartuUmkm";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Daftar UMKM",
  description: "Semua UMKM di Katalog UMKM Lokal: kuliner, kerajinan, dan jasa di sekitar sekolah.",
};

export default async function DaftarUmkm() {
  const { data: daftarUmkm, error } = await supabase
    .from("umkm")
    .select("id, slug, nama, kategori, alamat, foto_url, produk(harga)")
    .order("nama");

  return (
    <main className="mx-auto w-full max-w-6xl 3xl:max-w-7xl px-4 py-10">
      <h1 className="font-serif text-4xl md:text-5xl">Daftar UMKM</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        Usaha kecil di sekitar sekolah. Pilih salah satu untuk melihat produk andalannya.
      </p>

      {/* Data gagal diambil atau tabel masih kosong */}
      {error && (
        <p className="mt-8 rounded-xl border border-dashed border-destructive p-6 text-center text-destructive">
          Daftar UMKM belum bisa dibuka: {error.message}
        </p>
      )}
      {daftarUmkm && daftarUmkm.length === 0 && (
        <p className="mt-8 rounded-xl border border-dashed p-6 text-center text-muted-foreground">
          Belum ada UMKM di database.
        </p>
      )}

      {daftarUmkm && daftarUmkm.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
          {daftarUmkm.map((umkm) => (
            <KartuUmkm key={umkm.id} umkm={umkm} />
          ))}
        </div>
      )}
    </main>
  );
}
