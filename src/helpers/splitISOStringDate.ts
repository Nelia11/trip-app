export const splitISOStringDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};
