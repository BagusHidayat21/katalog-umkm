// Label harga berbentuk potongan kertas harga di toko; harga kosong ditulis "Tanya penjual"
export default function LabelHarga({ harga, awalan = "" }) {
  const teksHarga = typeof harga === "number" ? `Rp${harga.toLocaleString("id-ID")}` : "Tanya penjual";

  return (
    <span className="inline-flex items-baseline gap-1 bg-kunyit py-1 pr-3 pl-5 font-semibold text-kopi tabular-nums [clip-path:polygon(12px_0,100%_0,100%_100%,12px_100%,0_50%)]">
      {awalan && <span className="text-xs font-medium">{awalan}</span>}
      {teksHarga}
    </span>
  );
}
