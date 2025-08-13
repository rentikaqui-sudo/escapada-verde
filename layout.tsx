
import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'Escapada Verde - Fincas Turísticas en el Quindío, Colombia',
  description: 'Alquiler de fincas turísticas privadas con piscina en el Quindío. Espacios únicos para grupos, eventos y escapadas familiares en Armenia, Filandia y Quimbaya.',
  keywords: 'fincas turísticas Quindío, alquiler fincas Armenia, fincas con piscina Colombia, turismo rural Quindío, fincas Filandia, fincas Quimbaya',
  openGraph: {
    title: 'Escapada Verde - Tu conexión con la naturaleza en el Quindío',
    description: 'Fincas turísticas privadas con piscina, perfectas para grupos y familias',
    images: ['/hero-image.jpg'],
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  )
}
