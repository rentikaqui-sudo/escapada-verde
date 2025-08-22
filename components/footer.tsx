
"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { MessageCircle, Phone, Mail, MapPin, Instagram, Facebook, Leaf, Heart } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/analytics'

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openWhatsApp = () => {
    // Track WhatsApp click in Google Analytics
    trackWhatsAppClick('footer_button');
    
    const message = encodeURIComponent('Hola! Me interesa conocer más sobre las fincas de Escapada Verde.');
    const whatsappUrl = `https://api.whatsapp.com/send?phone=573218613644&text=${message}`;
    console.log('Opening WhatsApp URL from footer:', whatsappUrl);
    
    // Create a link element and click it - this works better for WhatsApp
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <footer className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <Leaf className="h-8 w-8 mr-2 text-green-300" />
                <h3 className="text-2xl font-bold text-white">Escapada Verde</h3>
              </div>
              <p className="text-green-100 mb-6 text-lg leading-relaxed">
                Tu refugio natural en el corazón del Quindío. Descubre la magia del turismo rural 
                con nuestras exclusivas fincas turísticas diseñadas para reconectarte con la naturaleza.
              </p>
              <Button
                onClick={openWhatsApp}
                className="bg-green-600 hover:bg-green-500 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Reserva Ahora
              </Button>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center text-green-100">
                  <Phone className="h-4 w-4 mr-3 text-green-300" />
                  <div>
                    <p className="font-medium">+57 321 861 3644</p>
                    <p className="text-sm opacity-75">WhatsApp principal</p>
                  </div>
                </div>

                <div className="flex items-center text-green-100">
                  <Mail className="h-4 w-4 mr-3 text-green-300" />
                  <p>rentikaqui@gmail.com</p>
                </div>
                <div className="flex items-center text-green-100">
                  <MapPin className="h-4 w-4 mr-3 text-green-300" />
                  <p>Quindío, Colombia</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Nuestras Fincas</h4>
              <div className="space-y-2">
                <button
                  onClick={() => document.getElementById('fincas')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-green-100 hover:text-white transition-colors text-left"
                >
                  Chalet 1 - El Cofre
                </button>
                <button
                  onClick={() => document.getElementById('fincas')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-green-100 hover:text-white transition-colors text-left"
                >
                  Chalet 2 - La Más Grande
                </button>
                <button
                  onClick={() => document.getElementById('fincas')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-green-100 hover:text-white transition-colors text-left"
                >
                  Chalet 3 - El Refugio
                </button>
              </div>

              <h4 className="text-lg font-semibold text-white mb-4 mt-6">Síguenos</h4>
              <div className="flex space-x-3">
                <Button
                  onClick={() => window.open('https://www.instagram.com/escapadas_verde', '_blank')}
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-300 hover:bg-green-300 hover:text-green-800"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => window.open('https://www.facebook.com/EscapadaVerde', '_blank')}
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-300 hover:bg-green-300 hover:text-green-800"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-green-600 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-green-200 mb-4 md:mb-0">
              <Heart className="h-4 w-4 mr-2 text-green-300" />
              <p>&copy; {new Date().getFullYear()} Escapada Verde. Hecho con amor en el Eje Cafetero</p>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-green-200 hover:text-white transition-colors"
              >
                Contacto
              </button>
              <button
                onClick={scrollToTop}
                className="text-green-200 hover:text-white transition-colors"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
