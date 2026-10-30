import Image from "next/image";
import LabelHarga from "@/components/LabelHarga";
import Button from "@/components/buatan/Button";
import Card from "@/components/buatan/Card";
import { Badge } from "@/components/ui/badge";
import { Button as ButtonUi } from "@/components/ui/button";
import { Card as CardUi, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import InputBerlabel from "@/components/InputBerlabel";

export const metadata = {
  title: "Komponen",
  description: "Etalase komponen buatan sendiri dan komponen shadcn/ui yang dipakai Katalog UMKM.",
};

export default function Komponen() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-serif text-4xl">Etalase Komponen</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        Komponen buatan sendiri di kiri, komponen shadcn/ui di kanan. Keduanya dipakai ulang di seluruh katalog.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="font-serif text-2xl">Buatan sendiri</h2>

          <h3 className="mt-6 font-semibold">Button: variant</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button>Pesan sekarang</Button>
            <Button variant="secondary">Simpan</Button>
            <Button variant="ghost">Lihat detail</Button>
          </div>

          <h3 className="mt-6 font-semibold">Button: size</h3>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button size="sm">Kecil</Button>
            <Button size="md">Sedang</Button>
            <Button size="lg">Besar</Button>
            <Button disabled>Stok habis</Button>
          </div>

          <h3 className="mt-6 font-semibold">Container query</h3>
          <div className="mt-3 grid gap-3">
            {["max-w-56", "max-w-md"].map((lebarWadah) => (
              <div key={lebarWadah} className={`@container rounded-xl border border-dashed p-3 ${lebarWadah}`}>
                <div className="flex flex-col gap-2 @xs:flex-row @xs:items-center @xs:justify-between">
                  <span className="font-semibold">Keripik Tempe Original</span>
                  <LabelHarga harga={15000} />
                </div>
              </div>
            ))}
          </div>

          <h3 className="mt-6 font-semibold">Card: composition pattern</h3>
          <Card className="mt-3 max-w-sm">
            <Card.Header>
              <p className="text-xs font-semibold uppercase tracking-widest text-gerabah">Kuliner</p>
              <h4 className="mt-1 font-serif text-xl">Keripik Tempe Original</h4>
            </Card.Header>
            <Card.Body>Tempe diiris setipis kertas, dibalut tepung bumbu bawang dan ketumbar.</Card.Body>
            <Card.Footer>
              <LabelHarga harga={15000} />
              <Button size="sm">Pesan</Button>
            </Card.Footer>
          </Card>
        </section>

        <section>
          <h2 className="font-serif text-2xl">shadcn/ui</h2>

          <h3 className="mt-6 font-semibold">Button: variant</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            <ButtonUi>Pesan sekarang</ButtonUi>
            <ButtonUi variant="secondary">Simpan</ButtonUi>
            <ButtonUi variant="ghost">Lihat detail</ButtonUi>
            <ButtonUi variant="outline">Bagikan</ButtonUi>
          </div>

          <h3 className="mt-6 font-semibold">Button: size</h3>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <ButtonUi size="sm">Kecil</ButtonUi>
            <ButtonUi>Sedang</ButtonUi>
            <ButtonUi size="lg">Besar</ButtonUi>
            <ButtonUi disabled>Stok habis</ButtonUi>
          </div>

          <h3 className="mt-6 font-semibold">Card dan Badge</h3>
          <CardUi className="mt-3 max-w-sm">
            <CardHeader>
              <Badge variant="secondary">Kuliner</Badge>
              <CardTitle className="text-xl">Keripik Tempe Original</CardTitle>
              <CardDescription>Dapur Renyah Bu Ratmi</CardDescription>
            </CardHeader>
            <CardContent>Tempe diiris setipis kertas, dibalut tepung bumbu bawang dan ketumbar.</CardContent>
            <CardFooter className="justify-between">
              <LabelHarga harga={15000} />
              <ButtonUi size="sm">Pesan</ButtonUi>
            </CardFooter>
          </CardUi>


          <h3 className="mt-6 font-semibold">Badge: variant kategori</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="kuliner">Kuliner</Badge>
            <Badge variant="kerajinan">Kerajinan</Badge>
            <Badge variant="jasa">Jasa</Badge>
          </div>

          <h3 className="mt-6 font-semibold">InputBerlabel</h3>
          <div className="mt-3 grid max-w-sm gap-4">
            <InputBerlabel id="nama-usaha" label="Nama usaha" placeholder="Contoh: Dapur Renyah Bu Ratmi" />
            <InputBerlabel id="email-usaha" label="Email" type="email" defaultValue="dapurrenyah@" error="Format email belum benar, contoh: nama@example.com" />
          </div>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-2xl">Rasio dan object-fit</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Foto guci ini tegak (900 x 1600 piksel). Kotak menentukan bentuk, object-fit menentukan cara foto mengisi kotak.
        </p>

        <h3 className="mt-6 font-semibold">Tiga rasio dengan object-cover</h3>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-4">
          {["aspect-square", "aspect-4/3", "aspect-video"].map((rasio) => (
            <figure key={rasio}>
              <div className={`relative ${rasio} overflow-hidden rounded-xl bg-muted`}>
                <Image src="/images/guci-gerabah.webp" alt="Guci gerabah tanah liat" fill sizes="33vw" className="object-cover" />
              </div>
              <figcaption className="mt-2 font-mono text-xs sm:text-sm">{rasio}</figcaption>
            </figure>
          ))}
        </div>

        <h3 className="mt-6 font-semibold">Empat cara mengisi kotak aspect-square</h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {["object-cover", "object-contain", "object-fill", "object-cover object-top"].map((cara) => (
            <figure key={cara}>
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <Image src="/images/guci-gerabah.webp" alt="Guci gerabah tanah liat" fill sizes="(min-width: 640px) 25vw, 50vw" className={cara} />
              </div>
              <figcaption className="mt-2 font-mono text-xs sm:text-sm">{cara}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
