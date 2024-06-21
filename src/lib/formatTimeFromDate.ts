export default function formatTimeFromDate(dateRaw: Date | string) {
  // Buat objek Date dari string waktu yang diberikan
  let date = new Date(dateRaw);

  // Ambil jam dan menit dari objek Date
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Format jam dan menit menjadi dua digit
  let formattedHours = String(hours).padStart(2, "0");
  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedMSeconds = String(seconds).padStart(2, "0");

  // Gabungkan jam dan menit dalam format yang diinginkan
  let formattedTime = `${formattedHours}:${formattedMinutes}:${formattedMSeconds}`;

  return formattedTime;
}
