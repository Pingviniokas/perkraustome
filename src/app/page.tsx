import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/ServicesSection';
import MovingChatbot from '../components/MovingChatbot';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <Hero />
      <ServicesSection />
      <MovingChatbot />
    </main>
  );
}