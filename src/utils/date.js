import { DateTime } from "luxon";

export const parseDate = (value) => {
  if (!value) return DateTime.invalid("Missing date");

  const isoDate = DateTime.fromISO(value);
  if (isoDate.isValid) return isoDate;

  const httpDate = DateTime.fromHTTP(value);
  if (httpDate.isValid) return httpDate;

  const sqlDate = DateTime.fromSQL(value);
  if (sqlDate.isValid) return sqlDate;

  const knownFormats = [
    "dd/MM/yyyy HH:mm",
    "dd/MM/yyyy HH:mm:ss",
    "dd/MM/yyyy",
    "yyyy-MM-dd HH:mm:ss",
    "yyyy-MM-dd HH:mm",
  ];

  for (const format of knownFormats) {
    const formattedDate = DateTime.fromFormat(value, format);
    if (formattedDate.isValid) return formattedDate;
  }

  return DateTime.fromJSDate(new Date(value));
};

export const formatDate = (value, format) => {
  const date = parseDate(value);
  return date.isValid ? date.toFormat(format) : value || "";
};
