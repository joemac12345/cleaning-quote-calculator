'use client';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-poppins font-light text-gray-900 mb-3">Ready to Book?</h1>
        <p className="text-gray-600 text-base sm:text-lg mb-20 sm:mb-24">Thank you for getting your quote! We're excited to help you keep your space clean and fresh.</p>

        {/* Content Sections */}
        <div className="space-y-6 mb-20 sm:mb-24">
          {/* Option 1: Book Online */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h2 className="text-lg sm:text-xl font-poppins font-normal text-gray-900 mb-3">🗓️ Book Your Appointment</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 font-inter font-normal">
              Choose your preferred date and time to get started. Our booking system makes it easy to find a slot that works for you.
            </p>
            <button className="w-full px-6 py-3 bg-[#48546A] text-white rounded-lg hover:opacity-90 font-poppins font-semibold transition">
              Browse Available Times
            </button>
          </div>

          {/* Option 2: Request a Call */}
          <div className="border border-gray-300 rounded-lg p-6">
            <h2 className="text-lg sm:text-xl font-poppins font-normal text-gray-900 mb-3">📞 Request a Call Back</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 font-inter font-normal">
              Prefer to discuss your booking over the phone? Let us know your availability and we'll call you at a time that suits you best.
            </p>
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-poppins font-light transition">
              Request a Call Back
            </button>
          </div>

          {/* Option 3: Contact Info */}
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
            <h2 className="text-lg sm:text-xl font-poppins font-normal text-gray-900 mb-3">💬 Get in Touch</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 font-inter font-normal">
              Have questions? Contact us directly and we'll be happy to help.
            </p>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-poppins font-light transition text-sm sm:text-base">
                Email Us
              </button>
              <button className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-poppins font-light transition text-sm sm:text-base">
                Call Us
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 text-center">
          Your quote is waiting for you. Book your first appointment today and experience our professional cleaning service.
        </p>
      </div>
    </div>
  );
}
