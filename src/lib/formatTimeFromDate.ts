export default function formatTimeFromDate(
  dateRaw: Date | string,
  includeSeconds?: boolean
) {
  let date = new Date(dateRaw);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Format jam dan menit menjadi dua digit
  let formattedHours = String(hours).padStart(2, "0");
  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedMSeconds = String(seconds).padStart(2, "0");

  // Gabungkan jam dan menit dalam format yang diinginkan
  let formattedTime = `${formattedHours}:${formattedMinutes}`;
  let formattedTimeIncludeSeconds = `${formattedHours}:${formattedMinutes}:${formattedMSeconds}`;

  return includeSeconds ? formattedTimeIncludeSeconds : formattedTime;
}
