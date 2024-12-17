import Head from 'next/head';
import Hero from '@/components/sections/Hero';
import ReviewStats from '@/components/sections/ReviewStats';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import ReviewSection from '@/components/sections/ReviewSection';
import MovingChatbot from '../components/MovingChatbot';
import { getGoogleReviews } from '../lib/googleReviews';

export default async function Home() {
  const reviews = await getGoogleReviews();

  return (
    <>
    
      <main className="min-h-screen bg-[#FAFAFA]">
        <Hero />
        <ReviewStats />
        <ServicesSection />
        <WhyChooseUs />
        <ReviewSection reviews={reviews} />
        <MovingChatbot />
      </main>
    </>
  );
}
