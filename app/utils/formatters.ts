export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
    .format(amount / 100)
    .replace(/\s/g, ' ')
}
