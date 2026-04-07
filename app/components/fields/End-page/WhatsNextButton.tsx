'use client';

import { useState } from 'react';
import WhatsNextModal from './WhatsNextModal';

export default function WhatsNextButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* What Happens Next Button */}
      <div className="mt-8 sm:mt-10">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-6 sm:px-8 py-3 sm:py-4 text-white font-medium rounded-lg transition"
          style={{ backgroundColor: '#48546A' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#48546A'}
        >
          What Happens Next?
        </button>
      </div>

      {/* Modal */}
      <WhatsNextModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
