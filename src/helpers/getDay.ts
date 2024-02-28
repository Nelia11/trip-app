export const getDay = (date: string, weekdays: string[]) => {
  const forecastDate = new Date(date).getDay();
  return weekdays[forecastDate];
};
