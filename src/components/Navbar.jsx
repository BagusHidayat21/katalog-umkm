"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Daftar menu dipakai bersama oleh tampilan desktop dan menu ponsel
const daftarMenu = [
  { href: "/", label: "Beranda" },
  { href: "/umkm", label: "Daftar UMKM" },
  { href: "/komponen", label: "Komponen" },
  { href: "/daftar", label: "Daftarkan UMKM" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  // Menu aktif: sama persis untuk Beranda, awalan alamat untuk halaman lain
  const aktif = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-serif text-xl font-semibold">
          Katalog <span className="text-primary">UMKM</span>
        </Link>

        <div className="hidden gap-6 text-sm font-medium md:flex">
          {daftarMenu.map((menu) => (
            <Link key={menu.href} href={menu.href} className={aktif(menu.href) ? "text-primary" : "hover:text-primary"}>
              {menu.label}
            </Link>
          ))}
        </div>

        <Sheet open={menuTerbuka} onOpenChange={setMenuTerbuka}>
          <SheetTrigger render={<Button variant="ghost" size="icon-lg" className="md:hidden" aria-label="Buka menu" />}>
            <MenuIcon className="size-6" />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="text-xl">Katalog UMKM</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col px-4">
              {daftarMenu.map((menu) => (
                <Link
                  key={menu.href}
                  href={menu.href}
                  onClick={() => setMenuTerbuka(false)}
                  className={`border-b border-border py-3 text-base font-medium ${aktif(menu.href) ? "text-primary" : ""}`}
                >
                  {menu.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
