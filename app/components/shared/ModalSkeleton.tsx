'use client';

import { X } from 'lucide-react';

interface ModalSkeletonProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function ModalSkeleton({ isOpen, onClose, children }: ModalSkeletonProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal - Slide in from bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 w-full md:max-w-4xl md:mx-auto md:rounded-t-lg h-[80vh] bg-white rounded-t-lg shadow-lg overflow-y-auto animate-in slide-in-from-bottom duration-300">
        {/* Close Button */}
        <div className="sticky top-0 flex justify-between items-center p-4 bg-white border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </>
  );
}
