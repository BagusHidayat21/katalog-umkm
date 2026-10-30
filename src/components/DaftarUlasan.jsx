import { supabase } from "@/lib/supabase";

// Komponen server yang mengambil datanya sendiri, jadi bisa dibungkus Suspense di halaman detail
export default async function DaftarUlasan({ umkmId }) {
  const { data: daftarUlasan, error } = await supabase
    .from("ulasan")
    .select("id, nama, rating, komentar")
    .eq("umkm_id", umkmId)
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-destructive">Ulasan belum bisa dimuat: {error.message}</p>;
  }
  if (daftarUlasan.length === 0) {
    return <p className="text-muted-foreground">Belum ada ulasan. Jadilah yang pertama!</p>;
  }

  return (
    <ul className="grid gap-4">
      {daftarUlasan.map((ulasan) => (
        <li key={ulasan.id} className="rounded-xl border bg-card p-4">
          <p className="font-semibold">{ulasan.nama}</p>
          <p className="text-kunyit" aria-label={`Rating ${ulasan.rating} dari 5`}>
            {"★".repeat(ulasan.rating)}{"☆".repeat(5 - ulasan.rating)}
          </p>
          <p className="mt-2 text-muted-foreground">{ulasan.komentar}</p>
        </li>
      ))}
    </ul>
  );
}
