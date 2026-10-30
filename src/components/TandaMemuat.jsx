"use client";

import { useLinkStatus } from "next/link";

// Titik kecil yang berdenyut selama halaman tujuan Link induknya sedang dimuat.
// Selalu dirender (hanya opacity yang berubah), jadi menu tidak bergeser.
export default function TandaMemuat() {
  const { pending } = useLinkStatus();
  return (
    <span
      aria-hidden
      className={`ml-1.5 inline-block size-1.5 rounded-full bg-primary align-middle transition-opacity ${pending ? "animate-pulse opacity-100" : "opacity-0"}`}
    />
  );
}
