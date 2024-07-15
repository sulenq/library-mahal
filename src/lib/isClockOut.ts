export default function isClockOut(keluar: string): boolean {
  const waktuKeluar: Date = new Date(keluar);
  const waktuSekarang: Date = new Date();

  // Menggunakan nilai getTime() untuk membandingkan waktu dalam milidetik
  return waktuSekarang.getTime() > waktuKeluar.getTime();
}
