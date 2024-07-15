export default function getCurrentYearDateRange() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1); // January 1st of the current year
  const endOfYear = new Date(today.getFullYear(), 11, 31); // December 31st of the current year

  return { from: startOfYear, to: endOfYear };
}
