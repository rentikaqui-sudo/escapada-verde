
"use client"

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { trackFormSubmit } from '@/lib/analytics'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  finca: string
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    finca: ''
  })
  
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent multiple submissions
    if (status.type === 'loading') {
      return;
    }
    
    setStatus({ type: 'loading', message: 'Enviando información...' })

    console.log('Form data being submitted:', formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      console.log('Response status:', response.status);

      const result = await response.json()

      if (result.success) {
        // Track successful form submission
        trackFormSubmit('contact_form');
        
        setStatus({
          type: 'success',
          message: '¡Perfecto! Tu información fue enviada exitosamente. Nos pondremos en contacto contigo muy pronto.'
        })
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          finca: ''
        })
        
        // Auto-reset status after 5 seconds to allow new submissions
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setStatus({ type: 'idle', message: '' });
        }, 5000);
        
        // Store WhatsApp URL for manual opening if needed
        console.log('WhatsApp URL available:', result.whatsappUrl);
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Hubo un error al enviar la información. Intenta de nuevo.'
        })
        
        // Auto-reset error status after 5 seconds
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setStatus({ type: 'idle', message: '' });
        }, 5000);
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Error de conexión. Por favor, intenta de nuevo.'
      })
      
      // Auto-reset error status after 5 seconds
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setStatus({ type: 'idle', message: '' });
      }, 5000);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Form field changed: ${name} = ${value}`);
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      console.log('Updated form data:', newData);
      return newData;
    });
  }

  const directWhatsApp = () => {
    const message = encodeURIComponent('Hola! Me interesa conocer más sobre las fincas de Escapada Verde.');
    const whatsappUrl = `https://api.whatsapp.com/send?phone=573218613644&text=${message}`;
    console.log('Opening WhatsApp URL from contact form:', whatsappUrl);
    
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
    <section className="py-20 bg-gradient-to-br from-green-100 via-white to-emerald-50" id="contact" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-green-600">Contáctanos</span>
            <br />
            <span className="text-2xl md:text-3xl font-light text-green-800">
              Comienza tu escapada perfecta
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Estamos aquí para ayudarte a planificar la experiencia perfecta. 
            Déjanos tus datos y nos pondremos en contacto contigo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="+57 XXX XXX XXXX"
                  />
                </div>
                <div>
                  <label htmlFor="finca" className="block text-sm font-medium text-gray-700 mb-2">
                    Finca de interés
                  </label>
                  <select
                    id="finca"
                    name="finca"
                    value={formData.finca}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Selecciona una finca</option>
                    <option value="Chalet Escapada Verde 1">Chalet 1 - Ideal para Familias</option>
                    <option value="Chalet Escapada Verde 2">Chalet 2 - Perfecta para Grupos</option>
                    <option value="Chalet Escapada Verde 3">Chalet 3 - Ambiente Íntimo</option>
                    <option value="Consulta general">Consulta general</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full"
                  placeholder="Cuéntanos sobre tu plan de viaje, fechas de interés, número de personas, etc."
                />
              </div>

              {/* Status Message */}
              {status.type !== 'idle' && (
                <div className={`flex items-center p-4 rounded-lg border ${
                  status.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' :
                  status.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' :
                  'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  {status.type === 'success' && <CheckCircle className="h-6 w-6 mr-3 text-green-600" />}
                  {status.type === 'error' && <AlertCircle className="h-6 w-6 mr-3 text-red-600" />}
                  {status.type === 'loading' && <div className="animate-spin h-6 w-6 mr-3 border-2 border-current border-t-transparent rounded-full" />}
                  <div>
                    <span className="font-medium">{status.message}</span>
                    {status.type === 'success' && (
                      <div className="text-sm text-green-600 mt-1">
                        El formulario se limpiará automáticamente en unos segundos.
                      </div>
                    )}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={status.type === 'loading' || status.type === 'success'}
                className={`w-full py-3 transition-all duration-300 ${
                  status.type === 'success' 
                    ? 'bg-green-500 hover:bg-green-500 cursor-not-allowed opacity-90' 
                    : status.type === 'loading'
                    ? 'bg-blue-500 hover:bg-blue-500 cursor-wait'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {status.type === 'loading' ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                    Enviando...
                  </>
                ) : status.type === 'success' ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    ¡Enviado Exitosamente!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Información
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Habla con un Asesor</h3>
              <p className="text-gray-700 mb-6">
                ¿Prefieres hablar directamente con nosotros? Nuestros asesores están listos para ayudarte.
              </p>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  directWhatsApp();
                }}
                type="button"
                className="w-full inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white mb-4 px-6 py-3 text-lg font-semibold rounded-lg transition-colors duration-300"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chatea por WhatsApp
              </button>
              
              <div className="text-center text-sm text-gray-600">
                Respuesta inmediata • Atención personalizada
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Phone className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <p className="font-semibold">+57 321 861 3644</p>
                    <p className="text-sm text-gray-500">WhatsApp y llamadas</p>
                  </div>
                </div>
                

                
                <div className="flex items-center text-gray-700">
                  <Mail className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <p className="font-semibold">rentikaqui@gmail.com</p>
                    <p className="text-sm text-gray-500">Email principal</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <p className="font-semibold">Quindío, Colombia</p>
                    <p className="text-sm text-gray-500">Eje Cafetero</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <Button
                  onClick={() => window.open('https://www.instagram.com/escapadas_verde', '_blank')}
                  variant="outline"
                  className="flex-1 border-green-200 hover:bg-green-100"
                >
                  @escapadas_verde
                </Button>
                <Button
                  onClick={() => window.open('https://www.facebook.com/EscapadaVerde', '_blank')}
                  variant="outline"
                  className="flex-1 border-green-200 hover:bg-green-100"
                >
                  Facebook
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
