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
  reviews: ReviewType[];
  className?: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, className }) => {
  if (!reviews.length) {
    return <div className="text-center py-8">No reviews available</div>;
  }

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
            <div className="text-yellow-400 mb-2">{'★'.repeat(review.rating)}</div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;