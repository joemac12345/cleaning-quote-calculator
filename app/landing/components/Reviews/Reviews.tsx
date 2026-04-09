'use client';

export default function Reviews() {
  const title = 'Customer Reviews';
  const reviewsList = [
    {
      text: 'Excellent service! The team was professional and thorough. My home has never looked better.',
      author: 'Sarah Johnson',
      title: 'Verified Customer',
      rating: 5
    },
    {
      text: 'Great value for money and reliable service. I\'ve been using them for over a year now.',
      author: 'Michael Roberts',
      title: 'Verified Customer',
      rating: 5
    },
    {
      text: 'Very impressed with the attention to detail. Highly recommended!',
      author: 'Emma Wilson',
      title: 'Verified Customer',
      rating: 5
    }
  ];

  if (reviewsList.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="heading-h2 mb-8 sm:mb-10">
          {title}
        </h2>

        <div className="relative">
          <div 
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {reviewsList.map((review: any, index: number) => (
              <div key={index} className="flex-shrink-0 w-72 sm:w-96">
                <div className="bg-gray-50 p-6 sm:p-8 rounded-lg border border-gray-300 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <span key={i} className="bg-primary rounded w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base text-white">★</span>
                    ))}
                  </div>
                  <p className="body-text mb-6 leading-relaxed flex-grow">
                    "{review.text}"
                  </p>
                  <p className="text-sm sm:text-base text-primary font-semibold">
                    {review.author}
                  </p>
                  {review.title && (
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
                      {review.title}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">
            Scroll to see more reviews
          </p>
        </div>
      </div>
    </section>
  );
}
