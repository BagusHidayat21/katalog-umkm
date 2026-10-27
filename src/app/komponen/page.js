import LabelHarga from "@/components/LabelHarga";
import Button from "@/components/buatan/Button";
import Card from "@/components/buatan/Card";
import { Badge } from "@/components/ui/badge";
import { Button as ButtonUi } from "@/components/ui/button";
import { Card as CardUi, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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

        </section>
      </div>
    </main>
  );
}
