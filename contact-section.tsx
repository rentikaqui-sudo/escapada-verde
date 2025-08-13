
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { MessageCircle, Phone, Mail, Calendar, Users, MapPin } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    numero: '',
    correo: '',
    fecha: '',
    fincaInteres: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fincasOptions = [
    { value: '', label: 'Selecciona una finca' },
    { value: 'finca-el-caimo', label: 'Finca El Caimo (hasta 36 personas)' },
    { value: 'finca-quimbaya', label: 'Finca Quimbaya (hasta 14 personas)' },
    { value: 'finca-vista-montana', label: 'Finca Vista Montaña (hasta 15 personas)' },
    { value: 'finca-filandia', label: 'Finca Filandia (hasta 15 personas)' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar datos a Google Sheets
      const selectedFinca = fincasOptions?.find(f => f?.value === formData?.fincaInteres)
      const dataToSend = {
        nombre: formData?.nombre || '',
        numero: formData?.numero || '',
        correo: formData?.correo || '',
        fecha: formData?.fecha || '',
        fincaInteres: selectedFinca?.label || 'No especificada'
      }

      // Llamada a la API para guardar en Google Sheets
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        })
        const result = await response.json()
        console.log('✅ Datos guardados:', result)
        
        // Guardar también en localStorage como respaldo
        if (typeof window !== 'undefined') {
          const existingData = JSON.parse(localStorage.getItem('escapada_verde_leads') || '[]')
          const newRecord = {
            ...dataToSend,
            timestamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
            id: Date.now()
          }
          existingData.push(newRecord)
          localStorage.setItem('escapada_verde_leads', JSON.stringify(existingData))
          console.log('💾 Respaldo local guardado')
        }
        
      } catch (apiError) {
        console.error('Error al guardar en Google Sheets:', apiError)
        // Continuar con WhatsApp aunque falle Sheets
      }
      
      // Abrir WhatsApp con la información del formulario
      const message = encodeURIComponent(
        `Hola! Me interesa hacer una reservación:\n\n` +
        `Nombre: ${dataToSend.nombre}\n` +
        `Número: ${dataToSend.numero}\n` +
        `Correo: ${dataToSend.correo}\n` +
        `Fecha deseada: ${dataToSend.fecha || 'No especificada'}\n` +
        `Finca de interés: ${dataToSend.fincaInteres}\n\n` +
        `Por favor, bríndenme más información sobre disponibilidad y precios.`
      )
      
      window.open(`https://wa.me/573218613644?text=${message}`, '_blank')
      
      // Resetear formulario
      setFormData({
        nombre: '',
        numero: '',
        correo: '',
        fecha: '',
        fincaInteres: ''
      })
      
    } catch (error) {
      console.error('Error al enviar formulario:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const openDirectWhatsApp = () => {
    const message = encodeURIComponent("Hola! Me gustaría hablar con un asesor sobre las fincas de Escapada Verde")
    window.open(`https://wa.me/573218613644?text=${message}`, '_blank')
  }

  return (
    <section className="relative section-padding bg-gray-50 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://sprudge.com/wp-content/uploads/2017/10/Cafe_San_Alberto_terrace_landscape_Lucia_Hernandez_03.jpg"
          alt="Paisaje cafetero del Quindío"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            ¡Reserva tu <span className="text-green-600">Escapada</span>!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Completa el formulario y nos pondremos en contacto contigo en menos de 2 horas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Solicita información</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  value={formData?.nombre || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-2">
                  Número de WhatsApp *
                </label>
                <input
                  type="tel"
                  id="numero"
                  name="numero"
                  required
                  value={formData?.numero || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ej: 3147014651"
                />
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  required
                  value={formData?.correo || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="tu@correo.com"
                />
              </div>

              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha deseada
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData?.fecha || ''}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="fincaInteres" className="block text-sm font-medium text-gray-700 mb-2">
                  Finca de interés
                </label>
                <select
                  id="fincaInteres"
                  name="fincaInteres"
                  value={formData?.fincaInteres || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  {fincasOptions?.map((option, index) => (
                    <option key={option?.value || `option-${index}`} value={option?.value || ''}>
                      {option?.label || 'Opción no disponible'}
                    </option>
                  )) || []}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contacto directo</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">WhatsApp</p>
                    <p className="text-gray-600">321 861 3644</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">rentikaqui@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Ubicación</p>
                    <p className="text-gray-600">Quindío, Colombia</p>
                  </div>
                </div>
              </div>

              <button
                onClick={openDirectWhatsApp}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Habla con un asesor ahora
              </button>
            </div>

            {/* Horarios de atención */}
            <div className="bg-green-600 text-white rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Horarios de atención</h3>
              <div className="space-y-2 text-green-100">
                <div className="flex justify-between">
                  <span>Lunes a Viernes:</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados y Domingos:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between font-semibold text-white mt-4">
                  <span>WhatsApp 24/7:</span>
                  <span>Siempre disponible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
