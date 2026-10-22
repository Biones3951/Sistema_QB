// Configuracao central do site QB Home.
// Os valores podem ser sobrescritos por variaveis de ambiente (.env / painel da Vercel).

// Numero do WhatsApp que recebe os pedidos, no formato internacional: 55 + DDD + numero.
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999'

// Endereco do backend Django (API).
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const whatsappLink = (text) =>
  text
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`
