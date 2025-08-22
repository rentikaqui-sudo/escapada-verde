
import HeroSection from '@/components/hero-section'
import PresentationSection from '@/components/presentation-section'
import FincaGallery from '@/components/finca-gallery'
import ContactForm from '@/components/contact-form'
import Footer from '@/components/footer'
import WhatsAppFloat from '@/components/whatsapp-float'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PresentationSection />
      <FincaGallery />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
