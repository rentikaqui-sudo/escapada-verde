
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Users, DollarSign, Wifi, Car, UtensilsCrossed, Gamepad2, Phone, Camera, ChevronRight, Clock } from 'lucide-react'
import ImageGalleryModal from './image-gallery-modal'

interface Finca {
  id: number
  nombre: string
  ubicacion: string
  capacidad: number
  precioMin: number
  precioMax?: number
  imagen: string
  imagenes: string[]
  comodidades: string[]
  descripcion: string
  destacado?: string
  checkIn?: string
  checkOut?: string
  contacto: {
    nombre: string
    telefono: string
  }
}

const fincas: Finca[] = [
  {
    id: 1,
    nombre: "Chalet Escapada Verde 1",
    ubicacion: "Cerca de Armenia, Quindío",
    capacidad: 15,
    precioMin: 2300000,
    precioMax: 2800000,
    imagen: "/fincas/finca1/FINCA 1 PORTADA.JPEG",
    imagenes: [
      "/fincas/finca1/FINCA 1 PORTADA.JPEG",
      "/fincas/finca1/FINCA 1 PISCINA.JPEG",
      "/fincas/finca1/FINCA 1 SALON DE EVENTOS.JPEG",
      "/fincas/finca1/FINCA 1 HABITACIONES 1.JPEG",
      "/fincas/finca1/FINCA 1 HABITACIONES 1.1.JPEG",
      "/fincas/finca1/FINCA 1 HABITACIONES 1.2.JPEG",
      "/fincas/finca1/FINCA 1 KIOSKO.JPEG",
      "/fincas/finca1/FINCA 1 CNACHA DE FUTBOL.JPEG",
      "/fincas/finca1/FINCA 1 SALON DE JUEGOS.JPEG",
      "/fincas/finca1/FINCA 1 HALL.JPEG",
      "/fincas/finca1/FINCA 1 EXTERIOR.JPEG",
      "/fincas/finca1/FINCA 1 COCINA.JPEG"
    ],
    comodidades: [
      "1 mascota raza pequeña permitida", 
      "Billar y ping pong", 
      "Fogón de leña y asador BBQ", 
      "Internet Wi-Fi", 
      "Hamacas y kiosco", 
      "Juegos infantiles", 
      "Piscina privada", 
      "Planta eléctrica", 
      "Salón para eventos", 
      "Televisión satelital", 
      "Ventiladores", 
      "Zona de parqueadero", 
      "Cancha de minifútbol y voleibol"
    ],
    descripcion: "Vive una experiencia inolvidable muy cerca de Armenia, en una finca de fácil acceso y rodeada de naturaleza. El Cofre es perfecta para grupos grandes que buscan relajarse y divertirse, con amplias zonas verdes, múltiples espacios recreativos y todas las comodidades para tu estadía. Ideal para reuniones familiares, escapadas con amigos o celebraciones especiales.",
    destacado: "Ideal para grupos grandes",
    contacto: {
      nombre: "Federico Arango",
      telefono: "3147014651"
    }
  },
  {
    id: 2,
    nombre: "Chalet Escapada Verde 2",
    ubicacion: "Campo Quindiano",
    capacidad: 15,
    precioMin: 1000000,
    imagen: "/fincas/finca2/FINCA 2 PORTADA.jpg",
    imagenes: [
      "/fincas/finca2/FINCA 2 PORTADA.jpg",
      "/fincas/finca2/FINCA 2 PISCINA.jpg",
      "/fincas/finca2/FINCA 2 HABITACION 1.1.jpg",
      "/fincas/finca2/FINCA 2 HABITACION 1.3.JPEG",
      "/fincas/finca2/FINCA 2 COCINA.JPEG",
      "/fincas/finca2/FINCA 2 COMEDOR.JPEG",
      "/fincas/finca2/FINCA 2 PASILLO.jpg"
    ],
    comodidades: [
      "Piscina privada", 
      "Zonas verdes y áreas sociales", 
      "Internet Wi-Fi", 
      "Aseo diario con 2 empleadas (incluido)", 
      "Desayuno básico: café y jugo de temporada",
      "5 habitaciones distribuidas en 2 pisos",
      "Hall amplio, sala y comedor",
      "Cocina totalmente equipada",
      "Balcón con vista panorámica"
    ],
    descripcion: "Esta finca combina espacios amplios y confortables con la tranquilidad del campo. Distribuida en dos niveles, cuenta con todo lo necesario para que tu estadía sea placentera. Primer piso: hall amplio, sala, comedor, cocina totalmente equipada, zona de ropas, baño social y 2 alcobas con baño compartido. Segundo piso: 3 alcobas, 2 baños, hall de televisión y balcón con vista panorámica. Precio: hasta 10 personas $1.000.000, personas adicionales $120.000 c/u.",
    destacado: "Dos niveles de comodidad",
    contacto: {
      nombre: "Federico Arango",
      telefono: "3147014651"
    }
  },
  {
    id: 3,
    nombre: "Chalet Escapada Verde 3",
    ubicacion: "Paisaje Cafetero",
    capacidad: 16,
    precioMin: 1500000,
    imagen: "/fincas/finca3/FINCA 3 PORTADA.jpg",
    imagenes: [
      "/fincas/finca3/FINCA 3 PORTADA.jpg",
      "/fincas/finca3/FINCA 3 PISCINA.jpg",
      "/fincas/finca3/FINCA 3 ATARDECER MIRADOR.jpg",
      "/fincas/finca3/FINCA 3 CASA 1.JPEG",
      "/fincas/finca3/FINCA 3 CAMAS.jpg",
      "/fincas/finca3/FINCA 3 CAMAS 2.jpg",
      "/fincas/finca3/FINCA 3 CANCHA DE FUTBOL Y EVENTOS.jpg",
      "/fincas/finca3/FINCA 3 AIRE.jpg",
      "/fincas/finca3/FINCA 3 AIRE.JPEG"
    ],
    comodidades: [
      "Piscina privada",
      "Jacuzzi", 
      "Cancha de minifútbol y voleibol", 
      "Kiosco y zona de hamacas", 
      "Cocina Integral", 
      "Mirador",
      "Zonas verdes y áreas sociales", 
      "Internet Wi-Fi", 
      "2 empleadas para servicio incluidas", 
      "TV Señal Nacional",
      "5 habitaciones para 16 personas"
    ],
    descripcion: "Vive el encanto del Quindío en esta finca familiar rodeada de naturaleza, con amplias zonas verdes, piscina cristalina y espacios diseñados para tu descanso. Disfruta de cómodas habitaciones, balcones con vista, y la calidez del café y jugo fresco cada mañana. El lugar perfecto para relajarte, compartir en familia o celebrar momentos especiales. La finca dispone de 5 habitaciones con capacidad total para 16 personas, distribuidas en camas dobles y sencillas.",
    destacado: "Encanto familiar",
    checkIn: "3:00 p.m.",
    checkOut: "12:00 m.",
    contacto: {
      nombre: "Federico Arango",
      telefono: "3147014651"
    }
  }
]

export default function FincasGallery() {
  const [selectedFinca, setSelectedFinca] = useState<Finca | null>(null)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const openWhatsApp = (finca: Finca) => {
    const message = encodeURIComponent(`Hola! Me interesa conocer más sobre las fincas de Escapada Verde, especialmente sobre ${finca.nombre}. ¿Podrían darme más información?`)
    window.open(`https://wa.me/573218613644?text=${message}`, '_blank')
  }

  const handleVerMas = (finca: Finca) => {
    setSelectedFinca(finca)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
    setSelectedFinca(null)
  }

  return (
    <section id="fincas" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Nuestras <span className="text-green-600">Fincas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre espacios únicos en el Quindío, cada uno con su propia personalidad y comodidades exclusivas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {fincas?.map((finca, index) => (
            <div key={finca?.id || `finca-${index}`} className="card group">
              {/* Image Container */}
              <div className="relative h-64 bg-gray-200">
                <Image
                  src={finca?.imagen || ''}
                  alt={`${finca?.nombre || 'Finca'} - ${finca?.ubicacion || 'Quindío'}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder-finca.jpg'
                  }}
                />
                {finca?.destacado && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {finca.destacado}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{finca?.nombre || 'Finca Sin Nombre'}</h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      {finca?.precioMax 
                        ? `${formatPrice(finca.precioMin)} - ${formatPrice(finca.precioMax)}`
                        : formatPrice(finca?.precioMin || 0)
                      }
                    </p>
                    <p className="text-sm text-gray-500">por noche</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{finca?.ubicacion || 'Ubicación no disponible'}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">Hasta {finca?.capacidad || 0} personas</span>
                </div>

                {(finca?.checkIn || finca?.checkOut) && (
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      {finca.checkIn && `Check-in: ${finca.checkIn}`}
                      {finca.checkIn && finca.checkOut && ' | '}
                      {finca.checkOut && `Check-out: ${finca.checkOut}`}
                    </span>
                  </div>
                )}

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {finca?.descripcion || 'Descripción no disponible'}
                </p>

                {/* Comodidades */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Comodidades:</h4>
                  <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                    {finca?.comodidades?.slice(0, 6)?.map((comodidad, idx) => (
                      <div key={`${finca.id}-comodidad-${idx}`} className="flex items-center">
                        <ChevronRight className="w-3 h-3 mr-1 text-green-600 flex-shrink-0" />
                        <span>{comodidad}</span>
                      </div>
                    )) || []}
                  </div>
                  {(finca?.comodidades?.length || 0) > 6 && (
                    <p className="text-xs text-gray-500 mt-1">
                      +{(finca?.comodidades?.length || 0) - 6} comodidades más
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleVerMas(finca)}
                    className="flex-1 btn-secondary flex items-center justify-center text-sm"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Ver más fotos
                  </button>
                  <button
                    onClick={() => openWhatsApp(finca)}
                    className="flex-1 btn-primary flex items-center justify-center text-sm"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Pregunta por tus fincas
                  </button>
                </div>
              </div>
            </div>
          )) || []}
        </div>

        {/* Ubicación Central */}
        <div className="bg-green-50 rounded-2xl p-8 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              📍 Ubicación <span className="text-green-600">Estratégica</span>
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              Todas nuestras fincas están centralmente ubicadas para que puedas conocer los principales atractivos del Quindío
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-gray-600">
              <div className="flex items-center justify-center bg-white rounded-lg p-3 shadow-sm">
                <span className="text-sm font-medium">🌄 Salento</span>
              </div>
              <div className="flex items-center justify-center bg-white rounded-lg p-3 shadow-sm">
                <span className="text-sm font-medium">🐘 Panaca</span>
              </div>
              <div className="flex items-center justify-center bg-white rounded-lg p-3 shadow-sm">
                <span className="text-sm font-medium">☕ Parque del Café</span>
              </div>
              <div className="flex items-center justify-center bg-white rounded-lg p-3 shadow-sm">
                <span className="text-sm font-medium">🏘️ Filandia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            ¿No encuentras lo que buscas? Contáctanos y te ayudamos a encontrar la finca perfecta
          </p>
          <button
            onClick={() => {
              const message = encodeURIComponent("Hola! Me gustaría obtener más información sobre las fincas de Escapada Verde")
              window.open(`https://wa.me/573218613644?text=${message}`, '_blank')
            }}
            className="btn-primary"
          >
            Contactar asesor
          </button>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {selectedFinca && (
        <ImageGalleryModal
          images={selectedFinca.imagenes}
          isOpen={isGalleryOpen}
          onClose={closeGallery}
          fincaName={selectedFinca.nombre}
        />
      )}
    </section>
  )
}
