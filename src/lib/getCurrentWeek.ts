export default function getCurrentWeek() {
  const today: Date = new Date();
  const firstDayOfMonth: Date = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  const firstDayOfWeek: number = firstDayOfMonth.getDay();
  const weekNumber: number = Math.ceil((today.getDate() + firstDayOfWeek) / 7);

  return {
    value: weekNumber - 1,
    label: `Minggu ${weekNumber}`,
  };
}
