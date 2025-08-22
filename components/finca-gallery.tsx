
"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Users, Tag, Camera, MessageCircle, Wifi, Car, Utensils, Waves } from 'lucide-react'
import { trackWhatsAppClick, trackFincaView, trackGalleryView, trackPriceInquiry } from '@/lib/analytics'

interface Finca {
  id: string
  name: string
  subtitle: string
  capacity: string
  price: string
  description: string
  features: string[]
  images: string[]
  mainImage: string
}

const fincas: Finca[] = [
  {
    id: 'finca1',
    name: 'Chalet Escapada Verde 1',
    subtitle: 'Ideal para Eventos Grandes',
    capacity: 'Hasta 35 personas',
    price: '¡Consulta nuestras ofertas especiales para grupos grandes!',
    description: 'Perfecta para eventos grandes, retiros corporativos, celebraciones familiares extensas y grupos que buscan un ambiente espacioso con todas las comodidades premium. Ideal para empresas, equipos de trabajo y eventos especiales. ¡Pregunta por nuestros paquetes corporativos y descuentos por estadías largas!',
    features: [
      'Piscina privada climatizada de gran tamaño',
      'Zona de BBQ completamente equipada para grupos grandes',
      'Cancha de minifútbol regulation',
      'Salón social amplio para eventos empresariales',
      'Kiosco con hamacas y zona chill-out',
      'Juegos recreativos para todas las edades',
      'Cocina industrial completamente equipada',
      'Restaurantes gourmet y mercados orgánicos cerca',
      'WiFi de alta velocidad en toda la propiedad',
      'Estacionamiento para múltiples vehículos',
      'Espacios para reuniones y presentaciones',
      'Capacidad para eventos corporativos'
    ],
    mainImage: '/images/FINCA 1 PORTADA.JPEG',
    images: [
      '/images/FINCA 1 PORTADA.JPEG',
      '/images/FINCA 1 PISCINA.JPEG',
      '/images/FINCA 1 EXTERIOR.JPEG',
      '/images/FINCA 1 SALON DE EVENTOS.JPEG',
      '/images/FINCA 1 COCINA.JPEG',
      '/images/FINCA 1 HABITACIONES 1.JPEG',
      '/images/FINCA 1 KIOSKO.JPEG',
      '/images/FINCA 1 SALON DE JUEGOS.JPEG'
    ]
  },
  {
    id: 'finca2',
    name: 'Chalet Escapada Verde 2',
    subtitle: 'Perfecta para Grupos Medianos',
    capacity: '10-20 personas',
    price: 'Tarifas preferenciales para grupos',
    description: 'Ideal para reuniones familiares, celebraciones especiales y grupos medianos que buscan comodidad y privacidad. Perfecta para empresas pequeñas, equipos de trabajo y eventos íntimos con todas las amenidades.',
    features: [
      'Múltiples habitaciones en dos niveles',
      'Piscina privada',
      'Salones cómodos para eventos',
      'Cocina completamente equipada',
      'Parqueadero para vehículos',
      'Espacios versátiles para grupos medianos',
      'Zona de descanso al aire libre',
      'Restaurantes y mercados cerca',
      'Sistema de entretenimiento',
      'WiFi de alta velocidad'
    ],
    mainImage: '/images/FINCA 2 PORTADA.jpg',
    images: [
      '/images/FINCA 2 PORTADA.jpg',
      '/images/FINCA 2 COCINA.JPEG',
      '/images/FINCA 2 COMEDOR.JPEG',
      '/images/FINCA 2 HABITACION 1.3.JPEG',
      '/images/FINCA 2 PASILLO.jpg'
    ]
  },
  {
    id: 'finca3',
    name: 'Chalet Escapada Verde 3',
    subtitle: 'Experiencia Premium Exclusiva',
    capacity: '15-18 personas - 6 habitaciones',
    price: '¡Consulta por paquetes premium y descuentos de temporada!',
    description: 'Perfecta para retiros corporativos, celebraciones familiares íntimas o grupos que buscan la máxima tranquilidad y lujo en el Eje Cafetero. Pregunta por nuestras tarifas preferenciales para reservas anticipadas y paquetes todo incluido.',
    features: [
      'Ambiente íntimo y acogedor de lujo',
      'Piscina privada con vista panorámica al valle',
      'Jacuzzi privado con hidroterapia',
      'Mirador exclusivo con vista al paisaje cafetero',
      'Cancha de fútbol regulation privada',
      'Sendero ecológico guiado disponible',
      'Cocina integral moderna completamente equipada',
      '6 habitaciones premium con baño privado',
      'Zona de meditación y yoga al aire libre',
      'Servicio de catering gourmet disponible'
    ],
    mainImage: '/images/FINCA 3 PORTADA.jpg',
    images: [
      '/images/FINCA 3 PORTADA.jpg',
      '/images/FINCA 3 PISCINA.jpg',
      '/images/FINCA 3 CASA 1.JPEG',
      '/images/FINCA 3 ATARDECER MIRADOR.jpg',
      '/images/FINCA 3 CANCHA DE FUTBOL Y EVENTOS.jpg',
      '/images/FINCA 3 CAMAS.jpg',
      '/images/FINCA 3 CAMAS 2.jpg'
    ]
  }
]

export default function FincaGallery() {
  const [selectedFinca, setSelectedFinca] = useState<Finca | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const openWhatsApp = (fincaName: string) => {
    // Track WhatsApp click in Google Analytics
    trackWhatsAppClick(fincaName);
    trackPriceInquiry(fincaName);
    
    const message = encodeURIComponent(`¡Hola! Vi su página web y me interesa ${fincaName}. 

¿Tienen ofertas especiales disponibles? Me gustaría conocer:
- Precios y promociones
- Fechas disponibles  
- Paquetes incluidos
- Descuentos por estadía larga

¡Espero su respuesta! 😊`);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=573218613644&text=${message}`;
    console.log('Opening WhatsApp URL from gallery:', whatsappUrl);
    
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
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50" id="fincas" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-green-600">Nuestras Fincas</span>
            <br />
            <span className="text-2xl md:text-3xl font-light text-amber-800">
              Elige tu refugio perfecto
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Descubre nuestras exclusivas fincas turísticas en el Eje Cafetero, diseñadas para diferentes tipos de experiencias. 
            Desde retiros corporativos hasta celebraciones familiares, cada propiedad ofrece piscinas privadas, BBQ profesional y la tranquilidad del paisaje cafetero colombiano.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {fincas.map((finca, index) => (
            <motion.div
              key={finca.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={finca.mainImage}
                  alt={`${finca.name} - vista principal`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Button
                  onClick={() => {
                    setSelectedFinca(finca)
                    setSelectedImageIndex(0)
                  }}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  size="sm"
                >
                  <Camera className="h-4 w-4 mr-1" />
                  {finca.images.length}
                </Button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{finca.name}</h3>
                <p className="text-green-600 font-semibold mb-3">{finca.subtitle}</p>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">{finca.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-green-600" />
                    {finca.capacity}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Tag className="h-4 w-4 mr-2 text-amber-600" />
                    {finca.price}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Características principales:</h4>
                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                    {finca.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  {finca.features.length > 4 && (
                    <p className="text-xs text-gray-500 mt-2">+{finca.features.length - 4} características más...</p>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openWhatsApp(finca.name);
                    }}
                    type="button"
                    className="w-full inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    ¡Quiero mi Cotización GRATIS!
                  </button>
                  <Button
                    onClick={() => {
                      trackFincaView(finca.name);
                      trackGalleryView(finca.name);
                      setSelectedFinca(finca)
                      setSelectedImageIndex(0)
                    }}
                    variant="outline"
                    className="w-full border-green-200 hover:bg-green-50"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Ver Galería Completa
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Modal */}
        <Dialog open={!!selectedFinca} onOpenChange={() => setSelectedFinca(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-green-600">
                {selectedFinca?.name}
              </DialogTitle>
            </DialogHeader>
            
            {selectedFinca && (
              <div className="space-y-6">
                {/* Main Image */}
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={selectedFinca.images[selectedImageIndex] || selectedFinca.mainImage}
                    alt={`${selectedFinca.name} - imagen ${selectedImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Image Thumbnails */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {selectedFinca.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index ? 'border-green-500' : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${selectedFinca.name} miniatura ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Información General</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-green-600" />
                        Capacidad: {selectedFinca.capacity}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Tag className="h-4 w-4 mr-2 text-amber-600" />
                        Oferta: {selectedFinca.price}
                      </div>
                    </div>
                    <p className="text-gray-700 mt-3 text-sm">{selectedFinca.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Características Completas</h4>
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      {selectedFinca.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openWhatsApp(selectedFinca.name);
                    }}
                    type="button"
                    className="w-full inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold rounded-lg transition-colors duration-300"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    ¡Solicitar Precio Especial para {selectedFinca.name}!
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
