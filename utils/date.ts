/** @format */

export const formatDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp));

  // Format the day with ordinal suffix (1st, 2nd, 3rd, etc.)
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Ensures AM/PM format
    timeZone: "UTC", // Ensure timezone is UTC for accurate time
  })
    .format(date)
    .replace(",", ""); // Remove the default comma
};
