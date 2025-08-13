
import HeroSection from '@/components/hero-section'
import IntroSection from '@/components/intro-section'
import FincasGallery from '@/components/fincas-gallery'
import VentajasSection from '@/components/ventajas-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'
import WhatsAppFloat from '@/components/whatsapp-float'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IntroSection />
      <FincasGallery />
      <VentajasSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
