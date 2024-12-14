import Hero from '@/components/sections/Hero';
import ReviewStats from '@/components/sections/ReviewStats';
import ServicesSection from '@/components/sections/ServicesSection';
import MovingChatbot from '../components/MovingChatbot';
import { getGoogleReviews } from '../lib/googleReviews';

export default async function Home() {
  const reviews = await getGoogleReviews();

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Hero />
      <ReviewStats />
      <ServicesSection />
      <MovingChatbot />

      {/* Google Reviews Widget Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">What Our Customers Say</h2>
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="overflow-y-auto max-h-96 space-y-6 scrollbar-thin scrollbar-thumb-gray-300">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="p-4 border-b last:border-b-0"
                  >
                    <h3 className="font-semibold text-lg mb-1">
                      {review.author_name}
                    </h3>
                    <p className="text-sm text-gray-700 mb-2 italic">"{review.text}"</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500 font-bold">★★★★★</span>
                      <span className="ml-2 text-gray-500 text-sm">
                        {review.rating} / 5
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No 5-star reviews available at the moment.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
