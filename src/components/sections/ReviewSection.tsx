// components/sections/ReviewSection.tsx
'use client';

import { useEffect, useState } from 'react';

interface ReviewType {
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string;
  relative_time_description: string;
}

interface ReviewSectionProps {
  placeId: string;
  apiKey: string;
  className?: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ placeId, apiKey, className }) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
        );
        const data = await response.json();
        
        if (data.result?.reviews) {
          const fiveStarReviews = data.result.reviews.filter(
            (review: ReviewType) => review.rating === 5
          );
          setReviews(fiveStarReviews);
        }
      } catch (err) {
        setError('Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId, apiKey]);

  if (loading) return <div className="text-center py-8">Loading reviews...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <section className={`py-16 px-4 max-w-7xl mx-auto ${className || ''}`}>
      <h2 className="text-3xl font-bold text-center mb-12">Customer Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={review.profile_photo_url} 
                alt={review.author_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{review.author_name}</h3>
                <span className="text-sm text-gray-500">{review.relative_time_description}</span>
              </div>
            </div>
            <div className="text-yellow-400 mb-2">{'★'.repeat(5)}</div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
