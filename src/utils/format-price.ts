export function formatPrice(value?: number) {
  if (value !== undefined) {
    return `Rp. ${new Intl.NumberFormat('id-ID').format(value)}`;
  } else {
    return '';
  }
}
