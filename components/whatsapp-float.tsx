
"use client"

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { trackWhatsAppClick } from '@/lib/analytics'

export default function WhatsAppFloat() {
  const openWhatsApp = () => {
    // Track WhatsApp click in Google Analytics
    trackWhatsAppClick('floating_button');
    
    const message = encodeURIComponent(`¡Hola! Vi su página de Escapada Verde y me encantó 😍

¿Tienen ofertas especiales disponibles? Me gustaría saber:
- Precios actuales con descuentos
- Fechas disponibles
- Paquetes promocionales
- Descuentos por reserva anticipada

¡Espero puedan ayudarme! 🌿`);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=573218613644&text=${message}`;
    console.log('Opening WhatsApp URL from float button:', whatsappUrl);
    
    // Create a link element and click it - this works better for WhatsApp
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={openWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20 pointer-events-none"></div>
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        ¡Cotiza GRATIS aquí! 💬
        <div className="absolute top-full right-4 w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
    </motion.div>
  );
}
