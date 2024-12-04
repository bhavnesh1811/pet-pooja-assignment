export const getTodayDate = () => new Date();

export const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

export const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

export const getLastDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const formatDate = (date) => {
  if (!date) return '';
  return date.toISOString().split('T')[0];
};