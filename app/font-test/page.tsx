'use client';

export default function FontTestPage() {
  return (
    <div className="min-h-screen bg-white p-6 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-outfit font-thin mb-2">Font Test Page</h1>
        <p className="text-gray-600 mb-12">Compare different fonts and weights to choose the best for your design system.</p>

        {/* Outfit Font */}
        <section className="mb-16">
          <h2 className="text-3xl font-outfit font-semibold mb-6 pb-3 border-b-2 border-gray-300">Outfit (Headings Font)</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Outfit - font-thin (100)</p>
              <p className="text-3xl sm:text-4xl font-outfit font-thin text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Outfit - font-normal (400)</p>
              <p className="text-3xl sm:text-4xl font-outfit font-normal text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Outfit - font-semibold (600)</p>
              <p className="text-3xl sm:text-4xl font-outfit font-semibold text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Outfit - font-bold (700)</p>
              <p className="text-3xl sm:text-4xl font-outfit font-bold text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </section>

        {/* Inter Font */}
        <section className="mb-16">
          <h2 className="text-3xl font-outfit font-semibold mb-6 pb-3 border-b-2 border-gray-300">Inter (Body Font)</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Inter - font-normal (400)</p>
              <p className="text-lg font-inter font-normal text-gray-700">
                The quick brown fox jumps over the lazy dog. This is a sample paragraph demonstrating body text readability and clarity.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Inter - font-medium (500)</p>
              <p className="text-lg font-inter font-medium text-gray-700">
                The quick brown fox jumps over the lazy dog. This is a sample paragraph demonstrating body text readability and clarity.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Inter - font-semibold (600)</p>
              <p className="text-lg font-inter font-semibold text-gray-700">
                The quick brown fox jumps over the lazy dog. This is a sample paragraph demonstrating body text readability and clarity.
              </p>
            </div>
          </div>
        </section>

        {/* Poppins Font */}
        <section className="mb-16">
          <h2 className="text-3xl font-outfit font-semibold mb-6 pb-3 border-b-2 border-gray-300">Poppins (Alternative Font)</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Poppins - font-normal (400)</p>
              <p className="text-3xl sm:text-4xl font-poppins font-normal text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Poppins - font-semibold (600)</p>
              <p className="text-3xl sm:text-4xl font-poppins font-semibold text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Poppins - font-bold (700)</p>
              <p className="text-3xl sm:text-4xl font-poppins font-bold text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </section>

        {/* Heading Hierarchy Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-outfit font-semibold mb-6 pb-3 border-b-2 border-gray-300">Heading Hierarchy Examples</h2>
          
          <div className="space-y-8">
            <div className="border border-gray-300 p-6 rounded-lg">
              <p className="text-sm text-gray-500 mb-4">H1 - Outfit Thin (100) - 4xl</p>
              <h1 className="text-4xl font-outfit font-thin mb-4 text-[#48546A]">This is an H1 Heading</h1>
              <p className="text-base font-inter font-normal text-gray-700">
                This is body text using Inter font at normal weight. It should be easy to read and provide good contrast with the heading.
              </p>
            </div>

            <div className="border border-gray-300 p-6 rounded-lg">
              <p className="text-sm text-gray-500 mb-4">H2 - Outfit Semibold (600) - 2xl</p>
              <h2 className="text-2xl font-outfit font-semibold mb-4 text-[#48546A]">This is an H2 Heading</h2>
              <p className="text-base font-inter font-normal text-gray-700">
                This is body text using Inter font at normal weight. It should be easy to read and provide good contrast with the heading.
              </p>
            </div>

            <div className="border border-gray-300 p-6 rounded-lg">
              <p className="text-sm text-gray-500 mb-4">H3 - Outfit Semibold (600) - lg</p>
              <h3 className="text-lg font-outfit font-semibold mb-4 text-[#48546A]">This is an H3 Heading</h3>
              <p className="text-base font-inter font-normal text-gray-700">
                This is body text using Inter font at normal weight. It should be easy to read and provide good contrast with the heading.
              </p>
            </div>
          </div>
        </section>

        {/* Side-by-side Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-outfit font-semibold mb-6 pb-3 border-b-2 border-gray-300">Font Comparison</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-300 p-6 rounded-lg">
              <h3 className="text-lg font-outfit font-semibold mb-4 text-[#48546A]">Outfit (Current)</h3>
              <p className="text-sm text-gray-600 mb-4">Modern, geometric, great for headings</p>
              <div className="space-y-3">
                <p className="text-2xl font-outfit font-thin">Thin (100)</p>
                <p className="text-2xl font-outfit font-normal">Normal (400)</p>
                <p className="text-2xl font-outfit font-semibold">Semibold (600)</p>
                <p className="text-2xl font-outfit font-bold">Bold (700)</p>
              </div>
            </div>

            <div className="border border-gray-300 p-6 rounded-lg">
              <h3 className="text-lg font-outfit font-semibold mb-4 text-[#48546A]">Inter (Current)</h3>
              <p className="text-sm text-gray-600 mb-4">Clean, readable, excellent for body text</p>
              <div className="space-y-3">
                <p className="text-base font-inter font-normal">Normal (400)</p>
                <p className="text-base font-inter font-medium">Medium (500)</p>
                <p className="text-base font-inter font-semibold">Semibold (600)</p>
                <p className="text-base font-inter font-bold">Bold (700)</p>
              </div>
            </div>

            <div className="border border-gray-300 p-6 rounded-lg">
              <h3 className="text-lg font-outfit font-semibold mb-4 text-[#48546A]">Poppins (Alternative)</h3>
              <p className="text-sm text-gray-600 mb-4">Rounded, friendly, semi-geometric</p>
              <div className="space-y-3">
                <p className="text-2xl font-poppins font-normal">Normal (400)</p>
                <p className="text-2xl font-poppins font-medium">Medium (500)</p>
                <p className="text-2xl font-poppins font-semibold">Semibold (600)</p>
                <p className="text-2xl font-poppins font-bold">Bold (700)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cleanwich-Inspired Design Recreation */}
        <section className="mb-20 sm:mb-24 mt-20 sm:mt-24">
          <h2 className="text-3xl sm:text-5xl font-poppins font-thin mb-6 pb-3 border-b-2 border-gray-300 text-[#48546A]">Cleanwich Design Audit Recreation</h2>
          <p className="text-base text-gray-600 mb-12 leading-relaxed">How our design system translates the Cleanwich aesthetic with Poppins headings, generous spacing, and prominent CTAs.</p>

          {/* Hero Section */}
          <div className="mb-20 sm:mb-24 bg-white border border-gray-300 rounded-lg p-6 sm:p-12">
            <h3 className="text-3xl sm:text-4xl font-poppins font-thin text-[#48546A] mb-4">Streamline Your Operations Instantly</h3>
            <p className="text-base sm:text-lg font-inter font-normal text-gray-700 mb-8 max-w-2xl leading-relaxed">
              Automate client bookings, scheduling, and service flow with just a few clicks. No spreadsheets or phone calls — everything integrated in one clean interface.
            </p>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#48546A] text-white rounded-lg font-poppins font-semibold text-base hover:opacity-90 transition">
              Get Started Free →
            </button>
          </div>

          {/* Features Grid */}
          <div className="mb-20 sm:mb-24">
            <h3 className="text-2xl sm:text-3xl font-poppins font-thin text-[#48546A] mb-8">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Real-Time Availability', desc: 'Let customers book instantly.' },
                { title: 'Advanced Pricing', desc: 'Tailor pricing to your needs.' },
                { title: 'Smart Dashboard', desc: 'Monitor all metrics in one place.' },
              ].map((feature, i) => (
                <div key={i} className="bg-white border border-gray-300 rounded-lg p-6 hover:border-[#48546A] transition">
                  <h4 className="text-lg font-poppins font-thin text-[#48546A] mb-2">{feature.title}</h4>
                  <p className="text-sm font-inter font-normal text-gray-700">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-20 sm:mb-24">
            <h3 className="text-2xl sm:text-3xl font-poppins font-thin text-[#48546A] mb-8">What Users Say</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { review: 'Made things so much easier. I am honestly glad I got it.', author: 'Tidy Hell', rating: 5 },
                { review: 'Great platform. Easy to use and helps attract customers.', author: 'MintyMaids', rating: 5 },
              ].map((testimonial, i) => (
                <div key={i} className="bg-white border border-gray-300 rounded-lg p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <span key={j} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-sm font-inter font-normal text-gray-700 mb-4 leading-relaxed">
                    {testimonial.review}
                  </p>
                  <p className="font-poppins font-thin text-[#48546A] text-sm">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-20 sm:mb-24">
            <h3 className="text-2xl sm:text-3xl font-poppins font-thin text-[#48546A] mb-8">Simple Pricing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { plan: 'Flex', price: '£5', desc: '/month', featured: false },
                { plan: 'Flat', price: '£69', desc: '/month', featured: true },
              ].map((pricing, i) => (
                <div key={i} className={`border-2 rounded-lg p-6 sm:p-8 ${pricing.featured ? 'border-[#48546A] bg-gray-50' : 'border-gray-300 bg-white'}`}>
                  <h4 className="text-xl font-poppins font-thin text-[#48546A] mb-2">{pricing.plan}</h4>
                  <p className="text-lg font-semibold text-[#48546A] mb-2">{pricing.price}</p>
                  <p className="text-sm text-gray-600 mb-6">{pricing.desc}</p>
                  <button className="w-full px-4 py-3 bg-[#48546A] text-white rounded-lg font-poppins font-semibold text-base hover:opacity-90 transition">
                    Start Free Trial
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-[#48546A] text-white rounded-lg p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-poppins font-thin mb-4">Ready to Transform Your Business?</h3>
            <p className="text-base sm:text-lg font-inter font-normal mb-8 max-w-xl mx-auto">Join cleaning providers streamlining operations and growing their business.</p>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#48546A] rounded-lg font-poppins font-semibold text-base hover:opacity-90 transition">
              Start Your Free Trial
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
