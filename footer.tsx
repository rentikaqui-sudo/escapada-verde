
"use client"

import { Instagram, MessageCircle, Mail, MapPin, Heart, Facebook } from 'lucide-react'

export default function Footer() {
  const openInstagram = () => {
    window.open('https://instagram.com/escapadas_verdes', '_blank')
  }

  const openFacebook = () => {
    window.open('https://facebook.com/escapadaverde', '_blank')
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola! Me gustaría obtener más información sobre Escapada Verde")
    window.open(`https://wa.me/573218613644?text=${message}`, '_blank')
  }

  const openEmail = () => {
    window.open('mailto:rentikaqui@gmail.com?subject=Consulta sobre fincas turísticas', '_blank')
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-green-400 mb-4">Escapada Verde</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Tu conexión con la naturaleza en el corazón del Quindío. 
              Ofrecemos fincas turísticas privadas con piscina, rodeadas de paisajes únicos 
              y todas las comodidades para tu descanso perfecto.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={openInstagram}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 p-3 rounded-full transition-all duration-300 hover:scale-105"
                aria-label="Síguenos en Instagram @escapadas_verdes"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                onClick={openFacebook}
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 hover:scale-105"
                aria-label="Síguenos en Facebook Escapada Verde"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={openWhatsApp}
                className="bg-green-500 hover:bg-green-600 p-3 rounded-full transition-all duration-300 hover:scale-105"
                aria-label="Contáctanos por WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button
                onClick={openEmail}
                className="bg-gray-600 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-105"
                aria-label="Envíanos un email"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-green-400">Enlaces rápidos</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <button 
                  onClick={() => document.getElementById('fincas')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  Nuestras fincas
                </button>
              </li>
              <li>
                <button 
                  onClick={openWhatsApp}
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  Reservar ahora
                </button>
              </li>
              <li>
                <button 
                  onClick={openWhatsApp}
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  Preguntas frecuentes
                </button>
              </li>
              <li>
                <button 
                  onClick={openWhatsApp}
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  Términos y condiciones
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-green-400">Contacto</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <MessageCircle className="w-5 h-5 mr-3 mt-0.5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm">321 861 3644</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-0.5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm">rentikaqui@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Ubicación</p>
                  <p className="text-sm">Quindío, Colombia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 mx-2 text-red-500" />
              <span>para conectarte con la naturaleza</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} Escapada Verde. Todos los derechos reservados.</p>
            </div>
          </div>
          
          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              Términos populares de búsqueda: fincas turísticas en el Quindío • alquiler de fincas Armenia • 
              fincas con piscina Colombia • turismo rural Quindío • fincas Filandia • fincas Quimbaya • 
              escapadas de fin de semana Colombia • fincas para grupos
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
