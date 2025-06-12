export function formatDay(date) {
  if (!date) return '';
  const d = new Date(date);
  d.setHours(d.getHours() + 5); // Add 5 hours
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}