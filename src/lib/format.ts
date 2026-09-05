export function formatEventDate(date: Date): { day: string; month: string; weekday: string } {
  return {
    day: date.toLocaleDateString('en-US', { day: 'numeric' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
  };
}

export const eventStatusLabel: Record<string, string> = {
  open: 'Open',
  'few-spots': 'Few spots left',
  full: 'Full',
  past: 'Past',
};
