export default function calculateDuration(finishTime: string): number {
  const waktuMasuk: Date = new Date();

  const waktuKeluar: Date = new Date(finishTime);

  // console.log(waktuMasuk, waktuKeluar);
  // ms
  const jarakWaktu: number = waktuKeluar.getTime() - waktuMasuk.getTime();

  return jarakWaktu / 1000;
}
