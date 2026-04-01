'use client';
import { landingConfig } from '@/app/config/landingConfig';

export default function Reviews() {
  const reviewsConfig = (landingConfig as any).reviews || {};
  const { title = '', reviewsList = [] } = reviewsConfig;

  if (reviewsList.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl text-[#48546A] mb-8 sm:mb-10" style={{ fontWeight: 50 }}>
          {title}
        </h2>

        <div className="relative">
          <div 
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {reviewsList.map((review: any, index: number) => (
              <div key={index} className="flex-shrink-0 w-72 sm:w-96">
                <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <span key={i} className="bg-[#48546A] rounded w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base text-white">★</span>
                    ))}
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 font-normal mb-6 leading-relaxed flex-grow">
                    "{review.text}"
                  </p>
                  <p className="text-sm sm:text-base text-[#48546A] font-semibold">
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
