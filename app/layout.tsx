import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://escapadaverde.co'),
  title: {
    default: 'Escapada Verde - Fincas Turísticas Premium en Quindío | Eje Cafetero Colombia',
    template: '%s | Escapada Verde - Turismo Rural Quindío'
  },
  description: 'Alquila fincas turísticas premium en Quindío para eventos corporativos, retiros empresariales y celebraciones familiares. Piscinas privadas, zonas BBQ completas, naturaleza pura cerca de Salento, Panaca y Parque del Café. ¡Tu escape perfecto en el Eje Cafetero!',
  keywords: [
    'fincas turísticas Quindío',
    'retiros corporativos Eje Cafetero',
    'eventos empresariales Quindío',
    'fincas cerca Salento',
    'alojamiento grupos grandes Quindío',
    'fincas piscina privada Colombia',
    'turismo empresarial Eje Cafetero',
    'fincas BBQ equipado Quindío',
    'hospedaje corporativo Panaca',
    'fincas cerca Parque del Café',
    'turismo rural Armenia Quindío',
    'fincas Filandia Montenegro',
    'alojamiento eventos especiales Quindío',
    'fincas celebraciones familiares Eje Cafetero',
    'turismo premium paisaje cafetero',
    'retiros empresariales Colombia',
    'eventos corporativos naturaleza',
    'fincas vacacionales grupos empresariales',
    'alquiler fincas turísticas Armenia',
    'hospedaje grupos medianos Quindío'
  ],
  authors: [{ name: 'Escapada Verde', url: 'https://escapadaverde.co' }],
  creator: 'Escapada Verde',
  publisher: 'Escapada Verde',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://escapadaverde.co',
    title: 'Escapada Verde - Fincas Turísticas Premium para Eventos y Retiros en Quindío',
    description: 'Descubre nuestras fincas turísticas de lujo en el Eje Cafetero. Perfectas para eventos corporativos, retiros empresariales y celebraciones con piscinas privadas, zonas BBQ completas y naturaleza espectacular.',
    siteName: 'Escapada Verde',
    images: [
      {
        url: '/images/hero-portada.png',
        width: 1200,
        height: 630,
        alt: 'Finca turística Escapada Verde en Quindío - Piscina y naturaleza',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@EscapadaVerde_CO',
    creator: '@EscapadaVerde_CO',
    title: 'Fincas Turísticas Premium Quindío | Eventos Corporativos y Retiros',
    description: 'Alquila tu finca perfecta en el Eje Cafetero para eventos empresariales. Piscinas privadas, zonas BBQ completas y naturaleza espectacular cerca de Salento y Panaca.',
    images: ['/images/hero-portada.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://escapadaverde.co',
    languages: {
      'es-CO': 'https://escapadaverde.co',
      'es': 'https://escapadaverde.co',
    },
  },
  category: 'travel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        {children}

        {/* Schema.org JSON-LD for SEO */}
        <Script id="schema-org" type="application/ld+json" strategy="beforeInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "TouristInformationCenter",
              "name": "Escapada Verde",
              "description": "Fincas turísticas premium en Quindío para eventos corporativos, retiros empresariales y celebraciones familiares. Piscinas privadas, zonas BBQ completas y naturaleza espectacular en el Eje Cafetero.",
              "url": "https://escapadaverde.co",
              "telephone": "+573155384648",
              "email": "info@escapadaverde.co",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Quindío",
                "addressCountry": "CO",
                "addressLocality": "Eje Cafetero"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "4.5339",
                "longitude": "-75.6811"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "4.5339",
                  "longitude": "-75.6811"
                },
                "geoRadius": "50000"
              },
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "TouristTrip",
                    "name": "Alquiler Fincas Turísticas Grupos",
                    "description": "Fincas turísticas premium para eventos corporativos y retiros empresariales con piscinas privadas, zonas BBQ equipadas y amenidades completas para grupos"
                  },
                  "priceRange": "$$",
                  "availability": "https://schema.org/InStock"
                }
              ],
              "sameAs": [
                "https://www.instagram.com/escapada_verde_fincas",
                "https://wa.me/573155384648"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              },
              "priceRange": "$$",
              "currenciesAccepted": "COP",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer",
              "openingHours": "Mo-Su 08:00-20:00",
              "touristType": [
                "Corporate Events",
                "Business Retreats",
                "Families",
                "Groups",
                "Company Teams",
                "Celebrations"
              ]
            }
          `}
        </Script>

        {/* Google Analytics - con el ID nuevo G-WZNINJTYXW */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WZNINJTYXW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WZNINJTYXW', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
          `}
        </Script>
      </body>
    </html>
  )
}

