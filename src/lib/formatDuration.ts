function formatDuration(detik: number) {
  if (detik >= 3600) {
    // Jika lebih dari atau sama dengan 3600 detik, konversi menjadi jam dan menit
    const jam = Math.floor(detik / 3600);
    const sisaDetik = detik % 3600;
    const menit = Math.floor(sisaDetik / 60);

    // Tambahkan kondisi jika menitnya 0, hanya tampilkan jam
    if (menit === 0) {
      return `${jam} jam`;
    } else {
      return `${jam} jam ${menit} menit`;
    }
  } else if (detik >= 60) {
    // Jika lebih dari atau sama dengan 60 detik, konversi menjadi menit
    const menit = Math.floor(detik / 60);
    return `${menit} menit`;
  } else {
    // Jika kurang dari 60 detik, kembalikan nilai detik asli
    return `${detik} detik`;
  }
}

export default formatDuration;
