import React from 'react';

interface StatusBadgeProps {
  status: string;
  statusColors: Record<string, string>;
}

export default function StatusBadge({ status, statusColors }: StatusBadgeProps) {
  return (
    <div className="pt-2 border-t border-gray-200">
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
}
