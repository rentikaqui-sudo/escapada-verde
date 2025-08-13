
"use client"

import Image from 'next/image'

const ventajas = [
  {
    id: 1,
    titulo: "Fincas privadas con piscina",
    descripcion: "Todas nuestras propiedades cuentan con piscina privada y espacios exclusivos para tu grupo",
    icono: "https://cdn.abacus.ai/images/abf70f2b-e283-4546-811c-f35bc97af16c.png"
  },
  {
    id: 2,
    titulo: "Atención personalizada",
    descripcion: "Servicio dedicado antes, durante y después de tu estadía para garantizar la mejor experiencia",
    icono: "https://cdn.abacus.ai/images/c7052126-3ba8-439e-a884-1a972a501525.png"
  },
  {
    id: 3,
    titulo: "Espacios para grupos",
    descripcion: "Desde 14 hasta 36 personas, tenemos el espacio perfecto para tu familia o grupo de amigos",
    icono: "https://cdn.abacus.ai/images/b034be31-4fa1-4f63-b2e4-dda0969b4012.png"
  },
  {
    id: 4,
    titulo: "Ubicaciones privilegiadas",
    descripcion: "En el corazón del Quindío, rodeadas de paisajes cafeteros y montañas espectaculares",
    icono: "https://cdn.abacus.ai/images/5c4a7aca-744b-4089-a768-770c20a73c87.png"
  },
  {
    id: 5,
    titulo: "Precios transparentes",
    descripcion: "Sin sorpresas ni costos ocultos. Precios claros desde $950.000 por noche",
    icono: "https://cdn.abacus.ai/images/f7f1f9fe-3cb2-4b83-9cd8-5f470e48c40c.png"
  }
]

export default function VentajasSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-green-600 via-green-700 to-emerald-800">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            ¿Por qué elegir <span className="text-green-300">Escapada Verde</span>?
          </h2>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Más de 5 años conectando a las familias colombianas con la naturaleza del Quindío
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ventajas?.map((ventaja, index) => (
            <div key={ventaja?.id || `ventaja-${index}`} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4 flex-shrink-0">
                  <Image
                    src={ventaja?.icono || ''}
                    alt={`Ícono ${ventaja?.titulo || 'ventaja'}`}
                    width={48}
                    height={48}
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {ventaja?.titulo || 'Título no disponible'}
                </h3>
              </div>
              
              <p className="text-green-100 leading-relaxed">
                {ventaja?.descripcion || 'Descripción no disponible'}
              </p>
            </div>
          )) || []}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¡Atención Personalizada!
            </h3>
            <p className="text-green-100 mb-6">
              Te brindamos atención personalizada antes y durante toda tu estadía. Estamos aquí para hacer que tu experiencia sea inolvidable desde el primer contacto hasta el final de tu visita.
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent("Hola! Me gustaría conocer más sobre la atención personalizada de Escapada Verde")
                window.open(`https://wa.me/573218613644?text=${message}`, '_blank')
              }}
              className="bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Conocer más detalles
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
