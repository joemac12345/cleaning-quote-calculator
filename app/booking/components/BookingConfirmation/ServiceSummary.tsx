interface ServiceSummaryProps {
  formData: Record<string, any>;
}

export default function ServiceSummary({ formData }: ServiceSummaryProps) {
  const roomItems = [
    { id: 'bedrooms', label: 'Bedrooms' },
    { id: 'bathrooms', label: 'Bathrooms' },
    { id: 'ensuite', label: 'En Suite' },
    { id: 'cloakroom', label: 'Cloakroom' },
    { id: 'kitchen', label: 'Kitchens' },
    { id: 'utility', label: 'Utility Rooms' },
    { id: 'floors', label: 'Staircases' },
  ];

  const selectedRooms = roomItems.filter(
    (item) => formData[item.id] && formData[item.id] > 0
  );

  const extras = (formData.extras || {}) as Record<string, number>;
  const selectedExtras = Object.entries(extras)
    .filter(([, count]) => count > 0)
    .map(([key]) => {
      const extraNames: Record<string, string> = {
        oven: 'Oven Cleaning',
        fridge: 'Fridge Cleaning',
      };
      return extraNames[key] || key;
    });

  if (selectedRooms.length === 0 && selectedExtras.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 mb-8">
      <h3 className="text-sm font-semibold text-primary font-poppins">What's Included</h3>
      
      {/* Rooms */}
      {selectedRooms.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedRooms.map((item) => (
            <div
              key={item.id}
              className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-inter"
            >
              <span className="text-primary font-semibold">
                {formData[item.id]}x {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Extras */}
      {selectedExtras.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedExtras.map((extra) => (
            <div
              key={extra}
              className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 rounded-full text-xs font-inter"
            >
              <span className="text-pink-500 font-semibold">+ {extra}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
