export function formatPrice(value?: number) {
  if (value) {
    return `Rp. ${new Intl.NumberFormat('id-ID').format(value)}`;
  } else {
    return '';
  }
}
