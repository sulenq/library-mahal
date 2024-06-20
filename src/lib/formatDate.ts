const formatDate = (dateString: Date | string, options?: any) => {
  // Cek jika dateString kosong atau tidak valid
  if (!dateString) {
    return "-";
  }

  const defaultFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const basicShortFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const longFormat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const longShortFormat: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const shortFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const prefixOptions: Record<string, Intl.DateTimeFormatOptions> = {
    basic: defaultFormat,
    basicShort: basicShortFormat,
    long: longFormat,
    longShort: longShortFormat,
    short: shortFormat,
  };

  const date = new Date(dateString);

  const formatOptions =
    typeof options === "string"
      ? prefixOptions[options]
      : options || defaultFormat;

  const formattedDate = date.toLocaleDateString("id-ID", formatOptions);

  return formattedDate;
};

export default formatDate;
