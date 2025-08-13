
"use client"

import { Heart, Waves, Mountain } from 'lucide-react'

export default function IntroSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container-max">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Conectamos turistas con espacios únicos
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed">
            En el corazón del <strong>Quindío</strong>, ofrecemos fincas turísticas exclusivas donde la naturaleza se convierte en tu hogar temporal. Cada una de nuestras propiedades cuenta con <strong>piscina privada</strong> y todas las comodidades necesarias para que vivas una experiencia inolvidable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Experiencias Auténticas</h3>
              <p className="text-gray-600">Vive la verdadera esencia del campo quindiano en espacios cuidadosamente seleccionados</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Waves className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Piscinas Privadas</h3>
              <p className="text-gray-600">Todas nuestras fincas incluyen piscina privada para tu comodidad y diversión</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Mountain className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Paisajes Únicos</h3>
              <p className="text-gray-600">Desde montañas cafeteras hasta valles verdes, cada vista es una postal natural</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
