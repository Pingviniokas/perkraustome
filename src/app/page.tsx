import Hero from '@/components/sections/Hero';
import ReviewStats from '@/components/sections/ReviewStats';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import GoogleReviews from '@/components/sections/GoogleReviews';
import MovingChatbot from '../components/MovingChatbot';
import { getGoogleReviews } from '../lib/googleReviews';
import Slider from '@/components/sections/Slider';
import Hover from '@/components/sections/Hover';

export default async function Home() {
  const reviews = await getGoogleReviews();

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Hero />
      <ReviewStats />
      <Slider />
      <ServicesSection />
      <Hover />
      <WhyChooseUs />
      <GoogleReviews reviews={reviews} />
      <MovingChatbot />
    </main>
  );
}
