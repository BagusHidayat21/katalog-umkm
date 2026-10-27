// Bingkai kartu: wadah untuk bagian-bagian di dalamnya
function Card({ className = "", children }) {
  return (
    <article className={`overflow-hidden rounded-2xl border border-kopi/15 bg-white/70 ${className}`}>
      {children}
    </article>
  );
}

// Bagian atas kartu: judul dan keterangan singkat
function CardHeader({ children }) {
  return <div className="px-5 pt-5">{children}</div>;
}

// Bagian isi kartu
function CardBody({ children }) {
  return <div className="px-5 py-3 text-sm text-kopi/80">{children}</div>;
}

// Bagian bawah kartu: harga dan tombol
function CardFooter({ children }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-dashed border-kopi/25 px-5 py-4">
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
