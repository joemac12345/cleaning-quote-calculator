'use client';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-12 sm:pt-16 pb-12">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[#48546A]">Ready to Book?</h1>
        <p className="text-gray-600 text-sm sm:text-base mb-8">Thank you for getting your quote! We're excited to help you keep your space clean and fresh.</p>

        {/* Content Sections */}
        <div className="space-y-6 sm:space-y-8">
          {/* Option 1: Book Online */}
          <div className="border-2 border-[#48546A] rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#48546A] mb-3">🗓️ Book Your Appointment</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Choose your preferred date and time to get started. Our booking system makes it easy to find a slot that works for you.
            </p>
            <button className="w-full px-6 py-3 bg-[#48546A] text-white rounded-lg hover:bg-[#3a3f52] font-medium transition">
              Browse Available Times
            </button>
          </div>

          {/* Option 2: Request a Call */}
          <div className="border-2 border-gray-300 rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#48546A] mb-3">📞 Request a Call Back</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Prefer to discuss your booking over the phone? Let us know your availability and we'll call you at a time that suits you best.
            </p>
            <button className="px-6 py-3 bg-gray-200 text-[#48546A] rounded-lg hover:bg-gray-300 font-medium transition">
              Request a Call Back
            </button>
          </div>

          {/* Option 3: Contact Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#48546A] mb-3">💬 Get in Touch</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Have questions? Contact us directly and we'll be happy to help.
            </p>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-white border border-gray-300 text-[#48546A] rounded-lg hover:bg-gray-100 font-medium transition text-sm sm:text-base">
                Email Us
              </button>
              <button className="px-6 py-2 bg-white border border-gray-300 text-[#48546A] rounded-lg hover:bg-gray-100 font-medium transition text-sm sm:text-base">
                Call Us
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-xs sm:text-sm text-gray-500 mt-8 sm:mt-12 text-center">
          Your quote is waiting for you. Book your first appointment today and experience our professional cleaning service.
        </p>
      </div>
    </div>
  );
}
