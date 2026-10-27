import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Katalog UMKM Lokal",
    template: "%s | Katalog UMKM Lokal",
  },
  description: "Etalase usaha kecil di sekitar sekolah: kuliner, kerajinan, dan jasa beserta produk andalannya.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <header className="border-b border-kopi/15">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
            <Link href="/" className="font-serif text-xl font-semibold">
              Katalog <span className="text-gerabah">UMKM</span>
            </Link>
            <div className="flex gap-5 text-sm font-medium">
              <Link href="/" className="hover:text-gerabah">Beranda</Link>
              <Link href="/komponen" className="hover:text-gerabah">Komponen</Link>
            </div>
          </nav>
        </header>

        {children}

        <footer className="mt-auto border-t border-kopi/15">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-kopi/70">
            <p>Data UMKM di katalog ini adalah contoh fiktif untuk latihan Kelas Industri UBIG.</p>
            <p className="mt-1">
              Foto produk dari Wikimedia Commons dengan lisensi terbuka.{" "}
              <a href="/images/KREDIT_FOTO.txt" className="underline hover:text-gerabah">Lihat kredit foto</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
