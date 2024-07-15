export default function isDatePassed(
  date: string | Date,
  isTodayCounted?: boolean
): boolean {
  const inputDate = new Date(date);
  const today = new Date();

  if (isTodayCounted) {
    return inputDate <= today;
  } else {
    return inputDate < today;
  }
}
