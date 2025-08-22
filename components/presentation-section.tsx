
"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Leaf, Heart, Star, Shield } from 'lucide-react'

export default function PresentationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const features = [
    {
      icon: Leaf,
      title: "Naturaleza Pura",
      description: "Rodeadas de paisajes naturales del Eje Cafetero"
    },
    {
      icon: Heart,
      title: "Experiencias Únicas",
      description: "Momentos inolvidables para toda la familia"
    },
    {
      icon: Star,
      title: "Comodidad Premium",
      description: "Todas las amenidades para tu descanso perfecto"
    },
    {
      icon: Shield,
      title: "Confianza Total",
      description: "Años de experiencia en turismo rural"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-green-600">Escapada Verde</span>
            <br />
            <span className="text-2xl md:text-3xl font-light text-green-800">
              Turismo Rural de Excelencia
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Somos tu empresa líder en turismo rural del Eje Cafetero, especializada en alquiler de fincas turísticas premium para eventos corporativos, retiros empresariales y celebraciones familiares. 
            Ubicadas estratégicamente cerca de Salento, Panaca, Parque del Café y Filandia, nuestras propiedades combinan 
            la autenticidad del paisaje cafetero con amenidades de lujo: piscinas privadas, zonas BBQ completas y espacios diseñados para crear experiencias inolvidables.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
                <feature.icon className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Tu base perfecta para explorar el Eje Cafetero
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Ubicadas estratégicamente en el Quindío, nuestras fincas te ofrecen acceso fácil 
                a los destinos más emblemáticos de la región:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Salento:</strong> Pueblo pintoresco y valle de Cocora
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Panaca:</strong> Parque temático agropecuario
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Parque del Café:</strong> Diversión y cultura cafetera
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Filandia:</strong> El mirador más hermoso del Quindío
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-8 text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Por qué elegir Escapada Verde?</h4>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <span className="text-2xl font-bold text-green-600">3</span>
                  <p className="text-gray-700">Fincas exclusivas</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <span className="text-2xl font-bold text-amber-600">100%</span>
                  <p className="text-gray-700">Satisfacción garantizada</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <span className="text-2xl font-bold text-green-600">24/7</span>
                  <p className="text-gray-700">Atención personalizada</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
