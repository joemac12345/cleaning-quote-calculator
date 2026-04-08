'use client';

import { useState } from 'react';

export default function FontTestPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const services = [
    { name: 'End of Tenancy Cleaning', price: 'from £170', icon: '🧹' },
    { name: 'Deep Cleaning', price: 'Custom quote', icon: '✨' },
    { name: 'Post-Construction', price: 'Custom quote', icon: '🏗️' },
  ];

  const faqs = [
    { q: 'What cleaning services do we offer?', a: 'We specialize in end of tenancy, deep cleaning, post-construction, and move-in/move-out services.' },
    { q: 'Are our cleaners trained and insured?', a: 'Yes, all our cleaners are fully trained, insured, and use high-grade equipment.' },
    { q: 'Do I need to provide equipment or products?', a: 'No, we provide all professional cleaning products and equipment.' },
    { q: 'Can I book last-minute appointments?', a: 'We do our best to accommodate urgent requests. Contact us to check availability.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-300 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <h1 className="text-4xl sm:text-5xl font-poppins font-thin text-gray-900 mb-3">MQ MAID Glasgow</h1>
          <p className="text-lg sm:text-xl font-inter font-normal text-gray-600 max-w-2xl">Professional Domestic Cleaning in Glasgow</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        {/* About Section */}
        <section className="mb-20 sm:mb-24">
          <p className="text-base sm:text-lg font-inter font-normal text-gray-600 leading-relaxed mb-6">
            At MQ MAID, we provide specialist domestic cleaning services across the UK, tailored for homes that need a deep and detailed clean. Whether you're moving out, preparing a property for new tenants, or need help after renovation works — our team delivers reliable, high-standard cleaning every time.
          </p>
          <p className="text-base sm:text-lg font-inter font-normal text-gray-600 leading-relaxed mb-6">
            We don't offer regular housekeeping — instead, we focus on intensive one-off services such as end of tenancy cleaning, deep cleaning, post-construction cleaning, and move-in/move-out cleaning. Our fully insured and trained cleaners use high-grade products and equipment to leave your property spotless and refreshed.
          </p>
          <p className="text-base sm:text-lg font-inter font-normal text-gray-600 leading-relaxed">
            With MQ MAID, you can expect punctual service, honest pricing, and real results.
          </p>
        </section>

        {/* Services Section */}
        <section className="mb-20 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-poppins font-thin text-gray-900 mb-8">Our Cleaning Services in Glasgow</h2>
          <p className="text-gray-600 mb-8">Discover the full range of professional cleaning services we offer, tailored to meet your specific needs.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white border border-gray-300 rounded-lg p-6 hover:border-primary transition">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-base sm:text-lg font-poppins font-thin text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm font-inter font-normal text-gray-600">{service.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-poppins font-thin text-gray-900 mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition text-left"
                >
                  <h3 className="font-poppins font-thin text-gray-900 text-base">{faq.q}</h3>
                  <span className={`text-primary transition-transform inline-block ${expandedFAQ === i ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFAQ === i && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-300">
                    <p className="text-sm sm:text-base font-inter font-normal text-gray-600">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Info Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20 sm:mb-24">
          {/* Business Info */}
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-poppins font-thin text-gray-900 mb-4">Quick Overview</h3>
            <div className="space-y-3 text-sm font-inter font-normal text-gray-600">
              <p><span className="font-semibold">Business Type:</span> Limited Company</p>
              <p><span className="font-semibold">Years in Business:</span> 9</p>
              <p><span className="font-semibold">Staff:</span> Trained professionals</p>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-poppins font-thin text-gray-900 mb-4 flex items-center gap-2">
              <span>🕐</span>
              Open Hours
            </h3>
            <div className="space-y-2 text-sm font-inter font-normal text-gray-600">
              <p><span className="font-semibold">Monday - Friday:</span> 10:30 - 18:00</p>
              <p><span className="font-semibold">Saturday - Sunday:</span> Closed</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white border border-gray-300 rounded-lg p-6 sm:p-8 mb-20 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-poppins font-thin text-gray-900 mb-8">Contact Us</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-primary text-base flex-shrink-0 mt-1">☎</span>
              <div>
                <p className="font-poppins font-thin text-gray-900 text-sm mb-1">Emergency Call</p>
                <a href="tel:07451285929" className="text-base font-inter font-normal text-primary hover:underline">
                  07451 285 929
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-primary text-base flex-shrink-0 mt-1">📍</span>
              <div>
                <p className="font-poppins font-thin text-gray-900 text-sm mb-1">Address</p>
                <p className="text-base font-inter font-normal text-gray-600">
                  Glasgow, G1 2AN
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-primary text-base flex-shrink-0 mt-1">✉</span>
              <div>
                <p className="font-poppins font-thin text-gray-900 text-sm mb-1">Email</p>
                <a href="mailto:help@mqmaid.co.uk" className="text-base font-inter font-normal text-primary hover:underline">
                  help@mqmaid.co.uk
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white rounded-lg p-8 sm:p-12 text-center mb-20 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-poppins font-thin mb-4">Ready to Book?</h2>
          <p className="text-base sm:text-lg font-inter font-normal mb-8 max-w-xl mx-auto">
            Get in touch with our team or book your cleaning service online today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary rounded-lg font-poppins font-semibold text-base hover:opacity-90 transition">
              Book Now
            </button>
            <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-lg font-poppins font-thin text-base hover:opacity-90 transition">
              Contact Us
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-300 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-sm font-inter font-normal text-gray-600">
            MQ MAID Glasgow © 2026. All rights reserved.
          </p>
          <p className="text-xs font-inter font-normal text-gray-500 mt-2">
            Powered by Cleanwich
          </p>
        </div>
      </footer>
    </div>
  );
}
