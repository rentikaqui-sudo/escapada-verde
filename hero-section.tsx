
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ArrowDown, MapPin, Phone } from 'lucide-react'

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false)

  const scrollToFincas = () => {
    document.getElementById('fincas')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola! Me interesa conocer más sobre las fincas de Escapada Verde")
    window.open(`https://wa.me/573147014651?text=${message}`, '_blank')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://a0.muscache.com/im/pictures/miso/Hosting-944277477098420763/original/4af7d16f-ca16-40c4-a9d8-e1255050c94f.jpeg"
          alt="Finca turística en el Quindío con piscina y paisaje montañoso"
          fill
          className={`object-cover transition-all duration-700 ${imageLoaded ? 'scale-100' : 'scale-110'}`}
          onLoad={() => setImageLoaded(true)}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-green-400">Escapada</span>
            <span className="text-white"> Verde</span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl mb-8 font-light opacity-90">
            Tu conexión con la naturaleza en el corazón del Quindío
          </p>
          
          <div className="flex items-center justify-center mb-8 text-lg">
            <MapPin className="w-5 h-5 mr-2 text-green-400" />
            <span>Armenia, Filandia, Quimbaya - Quindío, Colombia</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToFincas}
              className="btn-primary min-w-[200px] flex items-center justify-center"
            >
              <ArrowDown className="w-5 h-5 mr-2" />
              Ver nuestras fincas
            </button>
            
            <button 
              onClick={openWhatsApp}
              className="btn-secondary min-w-[200px] flex items-center justify-center bg-white/10 backdrop-blur-sm border-white text-white hover:bg-green-600"
            >
              <Phone className="w-5 h-5 mr-2" />
              Reserva por WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <ArrowDown className="w-6 h-6 text-white opacity-70" />
        </div>
      </div>
    </section>
  )
}
