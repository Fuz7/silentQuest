function isObject(variable) {
  return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
}

function getMonthNameFromNumber(monthNumber) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error("Month number must be between 1 and 12.");
  }

  return months[monthNumber - 1]; // Subtract 1 because arrays are zero-indexed
}

function getMonthNumber(monthName) {
  const months = {
    "january": 1, "february": 2, "march": 3, "april": 4, "may": 5, "june": 6,
    "july": 7, "august": 8, "september": 9, "october": 10, "november": 11, "december": 12
  };

  return months[monthName.toLowerCase()] || "Invalid month";
}
export { isObject,getMonthNameFromNumber,getMonthNumber }