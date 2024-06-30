export default function countDateRange(fromDate: Date, toDate: Date): number {
  // Satu hari dalam milidetik
  const oneDay = 1000 * 60 * 60 * 24;

  // Menghitung perbedaan antara dua tanggal dalam milidetik
  const diffInMs = toDate.getTime() - fromDate.getTime();

  // Menghitung jumlah hari
  const days = Math.ceil(diffInMs / oneDay);

  return days + 1;
}
