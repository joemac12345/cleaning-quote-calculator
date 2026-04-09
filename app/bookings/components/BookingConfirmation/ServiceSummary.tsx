interface ServiceSummaryProps {
  formData: Record<string, any>;
}

export default function ServiceSummary({ formData }: ServiceSummaryProps) {
  const serviceTypeMap: Record<string, string> = {
    deep: 'Deep Cleaning',
    spring: 'Spring Cleaning',
  };

  const serviceType = formData.service_type || '';
  const serviceLabel = serviceTypeMap[serviceType] || '';

  const roomItems = [
    { id: 'bedrooms', label: 'Bedrooms' },
    { id: 'bathrooms', label: 'Bathrooms' },
    { id: 'ensuite', label: 'En Suite' },
    { id: 'cloakroom', label: 'Cloakroom' },
    { id: 'kitchen', label: 'Kitchens' },
    { id: 'utility', label: 'Utility Rooms' },
    { id: 'floors', label: 'Staircases' },
    { id: 'living_rooms', label: 'Living Rooms' },
    { id: 'dining_rooms', label: 'Dining Rooms' },
    { id: 'studies', label: 'Studies/Offices' },
  ];

  const selectedRooms = roomItems.filter(
    (item) => formData[item.id] && formData[item.id] > 0
  );

  const otherSpaces = formData.other_spaces || {};
  const otherRoomsCount = otherSpaces.other_rooms || 0;

  if (selectedRooms.length === 0 && otherRoomsCount === 0 && !serviceLabel) {
    return null;
  }

  return (
    <div className="space-y-3 mb-8">
      <h3 className="text-sm font-semibold text-primary">What's Included</h3>
      
      {/* Service Type */}
      {serviceLabel && (
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-inter">
            <span className="text-primary font-semibold">
              {serviceLabel}
            </span>
          </div>
        </div>
      )}
      
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

      {/* Other Rooms */}
      {otherRoomsCount > 0 && (
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-inter">
            <span className="text-primary font-semibold">
              {otherRoomsCount}x Other Rooms
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
