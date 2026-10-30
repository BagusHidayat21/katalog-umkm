// Verifikasi token reCAPTCHA ke Google; dijalankan hanya di server karena memakai secret key
export async function periksaRecaptcha(token, secretKey) {
  if (!token) return { lolos: false };
  const jawaban = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: secretKey, response: token }),
  });
  const hasil = await jawaban.json();
  return { lolos: hasil.success === true, skor: hasil.score, aksi: hasil.action };
}
