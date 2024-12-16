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
      <Head>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
        ></script>
      </Head>
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
