const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const number = new Intl.NumberFormat('en-US')

export function formatCurrency(v) {
  return currency.format(v)
}

export function formatCompactCurrency(v) {
  if (v >= 1000) return `$${Math.round(v / 1000)}k`
  return currency.format(v)
}

export function formatNumber(v) {
  return number.format(v)
}

export function formatPercent(v) {
  return `${v.toFixed(1)}%`
}

export function formatKpi(value, format) {
  if (format === 'currency') return formatCurrency(value)
  if (format === 'percent') return formatPercent(value)
  return formatNumber(value)
}
