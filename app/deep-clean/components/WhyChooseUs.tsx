'use client';

export default function WhyChooseUs() {
  const reasons = [
    { title: 'Experienced Team', desc: 'Professional cleaners with years of expertise in deep cleaning' },
    { title: 'Quality Guaranteed', desc: 'We stand behind our work with 100% satisfaction guarantee' },
    { title: 'Eco-Friendly', desc: 'We use safe, environmentally conscious cleaning products' },
    { title: 'Fully Insured', desc: 'Peace of mind with comprehensive insurance coverage' },
  ];

  return (
    <section className="mb-12 sm:mb-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 rounded-lg">
      <h2 className="heading-h2 text-primary mb-8">Why Choose Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {reasons.map((reason, index) => (
          <div key={index}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <h3 className="font-poppins font-semibold text-primary">{reason.title}</h3>
            </div>
            <p className="text-gray-600 ml-5">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
