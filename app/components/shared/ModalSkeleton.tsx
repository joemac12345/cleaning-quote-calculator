'use client';

export default function ModalSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-gray-300 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="mt-6 flex gap-3">
          <div className="h-10 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}
