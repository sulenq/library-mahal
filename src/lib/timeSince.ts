export default function timeSince(date: Date | string): string {
  const givenDate = new Date(date);
  const now = new Date();

  const diffInMs = now.getTime() - givenDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays >= 1) {
    return `${diffInDays} hari lalu`;
  } else if (diffInHours >= 1) {
    const remainingMinutes = diffInMinutes % 60;
    return `${diffInHours} jam ${remainingMinutes} menit lalu`;
  } else {
    return `${diffInMinutes} menit lalu`;
  }
}
