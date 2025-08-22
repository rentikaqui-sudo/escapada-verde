
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Escapada Verde - Fincas Turísticas Quindío',
    short_name: 'Escapada Verde',
    description: 'Alquila fincas turísticas premium en Quindío para grupos de 15-30 personas. Piscinas privadas, BBQ y naturaleza del Eje Cafetero.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#16a34a',
    lang: 'es',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/hero-portada.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/hero-portada.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['travel', 'tourism', 'accommodation'],
    shortcuts: [
      {
        name: 'Ver Fincas',
        url: '/#fincas',
        description: 'Ver nuestras fincas turísticas disponibles'
      },
      {
        name: 'Contacto WhatsApp',
        url: 'https://wa.me/573155384648',
        description: 'Contactar por WhatsApp'
      }
    ]
  }
}
