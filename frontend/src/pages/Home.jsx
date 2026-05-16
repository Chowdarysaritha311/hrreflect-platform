import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import IndustriesSection from '../components/sections/IndustriesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTABanner from '../components/sections/CTABanner';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <IndustriesSection />
      <WhyChooseUs />
      <ProcessTimeline />
      <TestimonialsSection />
      <CTABanner />
      <ContactSection />
    </main>
  );
}
