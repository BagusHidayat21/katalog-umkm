import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Isian berlabel: label di atas, pesan error merah di bawah bila ada
export default function InputBerlabel({ id, label, error = "", ...props }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} aria-invalid={error ? true : undefined} {...props} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
