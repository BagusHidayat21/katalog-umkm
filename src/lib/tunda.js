// Menunda selama beberapa milidetik. Hanya untuk latihan melihat skeleton:
// setiap panggilan await tunda(...) dihapus sebelum commit.
export function tunda(ms) {
  return new Promise((selesai) => setTimeout(selesai, ms));
}
