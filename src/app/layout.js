import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
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
        <Navbar />

        {children}

        <footer className="mt-auto border-t border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-muted-foreground">
            <p>Data UMKM di katalog ini adalah contoh fiktif untuk latihan Kelas Industri UBIG.</p>
            <p className="mt-1">
              Foto produk dari Wikimedia Commons dengan lisensi terbuka.{" "}
              <a href="/images/KREDIT_FOTO.txt" className="underline hover:text-primary">Lihat kredit foto</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
