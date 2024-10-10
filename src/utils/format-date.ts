export function formatDate(date?: string) {
  if (date) {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  } else {
    return '';
  }
}
