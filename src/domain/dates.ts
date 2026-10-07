const demoDate = (value: string) => new Date(`${value}T12:00:00`);

export function formatDate(value: string, options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
  return new Intl.DateTimeFormat('en-IN', options).format(demoDate(value));
}

export function formatDueDate(value: string) {
  const target = demoDate(value);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const difference = Math.round((target.getTime() - today.getTime()) / 86_400_000);
  if (difference === 0) return 'Due today';
  if (difference === 1) return 'Due tomorrow';
  if (difference < 0) return `${Math.abs(difference)} days overdue`;
  return `Due ${formatDate(value, { day: 'numeric', month: 'short' })}`;
}

export function daysUntil(value: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((demoDate(value).getTime() - today.getTime()) / 86_400_000);
}

export function examCountdown(value: string) {
  const days = daysUntil(value);
  if (days < 0) return `Held ${formatDate(value)}`;
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `${days} days remaining`;
}

export function currentAcademicDay() {
  const day = new Date().getDay();
  return day >= 1 && day <= 5 ? day : 1;
}

export function dayName(day: number) { return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day] ?? 'Schedule'; }
