import { formatPrice } from './formatters'

export function generateWhatsAppMessage(items, total) {
  let message = '*PEDIDO QB HOME*\n\n'
  
  items.forEach(item => {
    message += `• ${item.name}\n`
    message += `  Qtd: ${item.quantity} x ${formatPrice(item.price)}\n`
    message += `  Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`
  })
  
  message += '------------------------\n'
  message += `*TOTAL: ${formatPrice(total)}*`
  
  return encodeURIComponent(message)
}

export function createWhatsAppLink(phoneNumber, message) {
  return `https://wa.me/${phoneNumber}?text=${message}`
}