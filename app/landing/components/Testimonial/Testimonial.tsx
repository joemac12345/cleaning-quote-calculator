'use client';

export default function Testimonial() {
  const rating = 5;
  const customers = 0;

  return (
    <section className="py-3 sm:py-4 px-3 sm:px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex gap-0.5">
            {[...Array(rating)].map((_, i) => (
              <span key={i} className="bg-primary rounded w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base text-white">★</span>
            ))}
          </div>
          <p className="text-sm sm:text-base text-gray-600 font-inter font-normal">
            Proudly trusted by {customers} customers
          </p>
        </div>
      </div>
    </section>
  );
}
