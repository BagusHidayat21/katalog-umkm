// Kelas yang dimiliki semua tombol
const kelasDasar =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50";

// Pilihan warna tombol (variant)
const kelasVariant = {
  primary: "bg-gerabah text-nota hover:bg-gerabah/85",
  secondary: "bg-pasir text-kopi hover:bg-pasir/70",
  ghost: "text-gerabah hover:bg-gerabah/10",
};

// Pilihan ukuran tombol (size)
const kelasUkuran = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export default function Button({ variant = "primary", size = "md", className = "", children, ...props }) {
  const kelas = `${kelasDasar} ${kelasVariant[variant]} ${kelasUkuran[size]} ${className}`;

  return (
    <button className={kelas} {...props}>
      {children}
    </button>
  );
}
