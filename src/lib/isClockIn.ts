export default function isClockIn(waktuMasuk: string): boolean {
  // Waktu masuk dalam bentuk objek Date
  const waktuMasukObj: Date = new Date(waktuMasuk);

  // Waktu saat ini
  const waktuSekarang: Date = new Date();

  // Bandingkan waktu saat ini dengan waktu masuk
  return waktuSekarang >= waktuMasukObj;
}
