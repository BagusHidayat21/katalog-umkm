import FormDaftar from "@/components/FormDaftar";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Daftarkan UMKM",
  description: "Form pendaftaran UMKM baru ke Katalog UMKM Lokal.",
};

export default function Daftar() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="font-serif text-4xl">Daftarkan UMKM</h1>
      <p className="mt-3 text-muted-foreground">
        Isi data usahamu dengan lengkap. Setelah lolos pemeriksaan, UMKM langsung tampil di katalog.
      </p>
      <Card className="mt-8">
        <CardContent>
          <FormDaftar />
        </CardContent>
      </Card>
    </main>
  );
}
