import Image from "next/image";
import Link from "next/link";
import UmkmUnggulan from "@/components/UmkmUnggulan";
import { buttonVariants } from "@/components/ui/button";

export default function Beranda() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:py-16">
      <section className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Katalog UMKM Lokal &middot; Malang
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
            Etalase usaha tetangga, dalam satu halaman.
          </h1>
          <p className="mt-5 max-w-prose text-lg text-muted-foreground">
            Keripik yang digoreng setiap pagi, batik yang dicanting berminggu-minggu, sampai jahitan
            yang rapi. Kenali UMKM di sekitar sekolah beserta produk andalannya.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Image
            src="/images/kain-tenun-ikat.webp"
            alt="Tumpukan kain tenun ikat berwarna cerah"
            width={1600}
            height={1200}
            sizes="(min-width: 768px) 45vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="col-span-2 h-auto w-full rounded-2xl"
          />
          <Image
            src="/images/keripik-pisang-kepok.webp"
            alt="Keripik pisang kepok bergelombang di atas piring"
            width={1600}
            height={1200}
            sizes="(min-width: 768px) 22vw, 50vw"
            className="h-auto w-full rounded-2xl"
          />
          <Image
            src="/images/aneka-gerabah-hias.webp"
            alt="Aneka gerabah hias dari tanah liat bakar"
            width={1280}
            height={960}
            sizes="(min-width: 768px) 22vw, 50vw"
            className="-mt-10 h-auto w-full rounded-2xl border-4 border-background md:-mt-16"
          />
        </div>
      </section>

      <section className="mt-16">
        <div className="border-b pb-3">
          <h2 className="font-serif text-2xl md:text-3xl">UMKM pilihan minggu ini</h2>
        </div>
        <UmkmUnggulan />
        <Link href="/umkm" className={buttonVariants({ size: "lg", className: "mt-8" })}>
          Lihat semua UMKM
        </Link>
      </section>
    </main>
  );
}
