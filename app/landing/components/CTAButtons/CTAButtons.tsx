'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function CTAButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleFullPageBackdropClick = () => {
    setShowAboutUs(false);
    setShowContact(false);
  };

  return (
    <>
      <section className="py-8 sm:py-12 px-3 sm:px-4 bg-white">
        <div className="max-w-2xl mx-auto flex flex-row gap-4 items-center">
          <Link href="/01-estimate" className="btn-primary px-8 py-4 flex-1 text-center">
            Get Estimate
          </Link>
          <div className="relative">
            <button 
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)} 
              className="btn-secondary px-4 py-2 flex items-center justify-center text-2xl min-w-12 h-12"
              aria-label="More options"
            >
              ⋮
            </button>

            {isOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={handleBackdropClick}
                />
                <div 
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg z-50 w-screen sm:w-80 max-w-[50vw]"
                  onClick={handleModalClick}
                >
                  <div className="p-2">
                    <Link href="/01-estimate" className="block text-primary hover:underline text-sm font-semibold px-4 py-2 hover:bg-gray-50 rounded">
                      Get Estimate
                    </Link>
                    <Link href="/bookings" className="block text-primary hover:underline text-sm font-semibold px-4 py-2 hover:bg-gray-50 rounded">
                      Book Now
                    </Link>
                    <button 
                      onClick={() => { setShowAboutUs(true); setIsOpen(false); }}
                      className="w-full text-left text-primary hover:underline text-sm font-semibold px-4 py-2 hover:bg-gray-50 rounded"
                    >
                      About Us
                    </button>
                    <button 
                      onClick={() => { setShowContact(true); setIsOpen(false); }}
                      className="w-full text-left text-primary hover:underline text-sm font-semibold px-4 py-2 hover:bg-gray-50 rounded"
                    >
                      Contact Information
                    </button>
                    <a href="mailto:info@example.com" className="block text-primary hover:underline text-sm font-semibold px-4 py-2 hover:bg-gray-50 rounded">
                      Email Us
                    </a>
                    <a href="tel:+1234567890" className="block text-primary hover:underline text-sm font-semibold px-4 py-2 hover:bg-gray-50 rounded">
                      Call Us
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About Us Modal */}
      {showAboutUs && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleFullPageBackdropClick}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-h2 text-primary">About Us</h2>
              <button 
                onClick={() => setShowAboutUs(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="body-text space-y-4">
              <p>
                We are a professional cleaning company dedicated to providing exceptional service to our clients. With years of experience in the industry, we have built a reputation for reliability, attention to detail, and customer satisfaction.
              </p>
              <p>
                Our team is trained, professional, and committed to delivering the highest quality cleaning services. We use eco-friendly products and modern techniques to ensure your home or business is spotless.
              </p>
              <p>
                We take pride in our work and always go the extra mile to exceed our clients' expectations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information Modal */}
      {showContact && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleFullPageBackdropClick}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-h2 text-primary">Contact Information</h2>
              <button 
                onClick={() => setShowContact(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="body-text space-y-4">
              <div>
                <h3 className="heading-h3 text-primary mb-2">Phone</h3>
                <a href="tel:+1234567890" className="text-primary hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
              <div>
                <h3 className="heading-h3 text-primary mb-2">Email</h3>
                <a href="mailto:info@example.com" className="text-primary hover:underline">
                  info@example.com
                </a>
              </div>
              <div>
                <h3 className="heading-h3 text-primary mb-2">Address</h3>
                <p>
                  123 Cleaning Street<br />
                  London, UK<br />
                  Postal Code: SW1A 1AA
                </p>
              </div>
              <div>
                <h3 className="heading-h3 text-primary mb-2">Business Hours</h3>
                <p>
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
