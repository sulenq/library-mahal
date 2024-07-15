export default function getWeekOfMonth(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;

  if (!(d instanceof Date)) {
    throw new Error("Invalid date");
  }

  const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
  const dayOfWeek = startOfMonth.getDay(); // 0 (Minggu) hingga 6 (Sabtu)

  // Menghitung minggu ke berapa dalam bulan itu
  return Math.ceil((d.getDate() + dayOfWeek) / 7);
}
