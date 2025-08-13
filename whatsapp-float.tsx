
"use client"

import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola! Me interesa conocer más sobre las fincas de Escapada Verde")
    window.open(`https://wa.me/573218613644?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={openWhatsApp}
      className="whatsapp-float flex items-center"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6 mr-2" />
      <span className="font-semibold">WhatsApp</span>
    </button>
  )
}
