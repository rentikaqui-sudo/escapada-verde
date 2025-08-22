
"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, MessageCircle, Leaf } from 'lucide-react'
import Image from 'next/image'
import { trackWhatsAppClick } from '@/lib/analytics'

export default function HeroSection() {
  const scrollToFincas = () => {
    document.getElementById('fincas')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full bg-gradient-to-br from-green-900/20 to-emerald-800/20">
          <Image
            src="/images/hero-portada.png"
            alt="Paisaje sereno del Eje Cafetero - Escapada Verde"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-green-400">Escapada Verde</span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl font-light text-green-100">
              Fincas Turísticas Premium en Quindío
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            Descubre las mejores fincas turísticas del Eje Cafetero para grupos y eventos especiales. 
            Piscinas privadas, BBQ equipado, espacios para retiros corporativos y celebraciones familiares cerca de Salento, Panaca y Parque del Café.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              onClick={scrollToFincas}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Leaf className="mr-2 h-5 w-5" />
              Nuestras Fincas
            </Button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Track WhatsApp click in Google Analytics
                trackWhatsAppClick('hero_button');
                
                const message = encodeURIComponent('Hola! Me interesa conocer más sobre las fincas de Escapada Verde');
                const whatsappUrl = `https://api.whatsapp.com/send?phone=573218613644&text=${message}`;
                console.log('Opening WhatsApp URL:', whatsappUrl);
                
                // Create a link element and click it - this works better for WhatsApp
                const link = document.createElement('a');
                link.href = whatsappUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="inline-flex items-center justify-center border-2 border-white text-white bg-transparent hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
              type="button"
            >
              <Phone className="mr-2 h-5 w-5" />
              WhatsApp Directo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center justify-center text-green-200"
          >
            <MapPin className="h-5 w-5 mr-2" />
            <span className="text-lg">Cerca de Salento, Panaca, Parque del Café y Filandia</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
          <p className="mt-2 text-sm">Desplázate para explorar</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
