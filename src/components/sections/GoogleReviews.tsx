interface Review {
    author_name: string;
    text: string;
    rating: number;
  }
  
  interface GoogleReviewsProps {
    reviews: Review[];
  }
  
  const GoogleReviews = ({ reviews }: GoogleReviewsProps) => {
    return (
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            {/* Left Side - Rating Summary */}
            <div className="lg:w-1/4">
              <h2 className="text-3xl font-bold mb-6">Klientų atsiliepimai</h2>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/images/google.svg" 
                  alt="Google" 
                  className="h-8 object-contain"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">4.5</span>
                    <div className="text-yellow-400 flex">
                      ★★★★★
                    </div>
                  </div>
                  <span className="text-gray-600 text-sm">
                    Remiantis 44 atsiliepimais
                  </span>
                </div>
              </div>
            </div>
  
            {/* Right Side - Reviews Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xl font-semibold">
                          {review.author_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {review.author_name}
                        </h3>
                        <div className="flex text-yellow-400">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-4">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default GoogleReviews;
  