export default function getCurrentWeeksDateRange() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  const dayDiffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // if today is Sunday, set the difference to 6, else subtract 1
  startOfWeek.setDate(today.getDate() - dayDiffToMonday);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // 6 days after Monday is Sunday

  return { from: startOfWeek, to: endOfWeek };
}
