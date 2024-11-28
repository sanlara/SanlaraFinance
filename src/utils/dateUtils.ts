export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

export function getDateRange() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return {
    start: startOfMonth,
    end: endOfMonth,
    formatted: `${formatDate(startOfMonth)} - ${formatDate(endOfMonth)}`
  };
}

export function startOfDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

export function endOfDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
}

export function startOfMonth(date: Date): Date {
  const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

export function endOfMonth(date: Date): Date {
  const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
}

export function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

export function isWithinRange(date: Date, start: Date, end: Date): boolean {
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  
  return targetDate >= startDate && targetDate <= endDate;
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString('es', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}