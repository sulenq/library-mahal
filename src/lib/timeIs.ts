export default function timeIs() {
  // Dapatkan waktu saat ini
  const currentHour = new Date().getHours();

  // Tentukan rentang waktu pagi, siang, sore, dan malam
  const startMorning = 6;
  const endMorning = 12;
  const startNoon = 12;
  const endNoon = 15;
  const startEvening = 15;
  const endEvening = 19;

  // Tentukan waktu saat ini berada di rentang waktu yang mana
  if (currentHour >= startMorning && currentHour < endMorning) {
    return "morning";
  } else if (currentHour >= startNoon && currentHour < endNoon) {
    return "noon";
  } else if (currentHour >= startEvening && currentHour < endEvening) {
    return "evening";
  } else {
    return "night";
  }
}
