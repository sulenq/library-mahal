export default function getTotalCurrentWeek(): number {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Menghitung jumlah hari dalam bulan
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  // Menghitung jumlah pekan dengan membagi total hari dalam bulan dengan 7
  const totalWeeks = Math.ceil(totalDaysInMonth / 7);

  return totalWeeks;
}
