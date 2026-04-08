'use client';

interface WhatsNextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsNextModal({ isOpen, onClose }: WhatsNextModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-300">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-lg sm:text-2xl font-poppins font-thin" style={{ color: '#48546A' }}>
            What Happens Next?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-poppins font-thin mb-3" style={{ color: '#48546A' }}>
              Here's what to expect:
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-2xl">📞</div>
                <div>
                  <p className="font-poppins font-thin" style={{ color: '#4B5368' }}>We'll contact you</p>
                  <p className="text-gray-600 text-sm">A member of our team will reach out within 24 hours to confirm your booking and answer any questions.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 text-2xl">📅</div>
                <div>
                  <p className="font-poppins font-thin" style={{ color: '#4B5368' }}>Schedule your clean</p>
                  <p className="text-gray-600 text-sm">We'll work with you to find a convenient time that suits your schedule.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 text-2xl">✨</div>
                <div>
                  <p className="font-poppins font-thin" style={{ color: '#4B5368' }}>Professional service</p>
                  <p className="text-gray-600 text-sm">Our team will arrive on time and deliver the high-quality cleaning service you requested.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 text-2xl">💬</div>
                <div>
                  <p className="font-poppins font-thin" style={{ color: '#4B5368' }}>Your feedback</p>
                  <p className="text-gray-600 text-sm">After your clean, we'd love to hear your thoughts to help us improve our service.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
            <p className="text-sm text-gray-600">
              <span className="font-poppins font-thin" style={{ color: '#48546A' }}>Have questions?</span> Feel free to contact us anytime. We're here to help!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 p-6 sm:p-8">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-white font-poppins font-thin rounded-lg transition"
            style={{ backgroundColor: '#48546A' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#48546A'}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
