export const getToday = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs)
    .toISOString()
    .split("T")[0];  // "YYYY-MM-DD"
}