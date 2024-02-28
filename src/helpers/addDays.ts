export const addDays = (initDate: Date, days: number) => {
  let result = new Date(initDate);
  result.setDate(result.getDate() + days);
  return result;
};
