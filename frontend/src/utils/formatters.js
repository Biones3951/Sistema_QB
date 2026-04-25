export function formatPrice(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

export function formatDate(dateString) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString))
}