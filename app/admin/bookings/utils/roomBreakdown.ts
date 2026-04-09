/**
 * Extract room breakdown from form_data
 * Returns an organized breakdown of rooms that need cleaning
 */
export function extractRoomBreakdown(formData: Record<string, any>) {
  if (!formData) return null;

  const roomMapping: Record<string, string> = {
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    ensuite: 'En Suite',
    cloakroom: 'Cloakroom',
    floors: 'Staircases',
    kitchen: 'Kitchen',
    utility: 'Utility Room',
    living_rooms: 'Living Rooms',
    dining_rooms: 'Dining Rooms',
    studies: 'Studies/Offices',
  };

  const rooms: Array<{ label: string; count: number }> = [];
  let totalRooms = 0;

  // Extract each room type
  Object.entries(roomMapping).forEach(([key, label]) => {
    const count = formData[key];
    if (count && count > 0) {
      rooms.push({ label, count });
      totalRooms += count;
    }
  });

  // Add other rooms
  const otherSpaces = formData.other_spaces || {};
  const otherRoomsCount = typeof otherSpaces === 'object' ? otherSpaces.other_rooms : 0;
  if (otherRoomsCount && otherRoomsCount > 0) {
    rooms.push({ label: 'Other Rooms', count: otherRoomsCount });
    totalRooms += otherRoomsCount;
  }

  return {
    totalRooms,
    rooms,
  };
}

/**
 * Format service type for display
 */
export function formatServiceType(serviceType?: string): string {
  const typeMap: Record<string, string> = {
    deep: 'Deep Clean',
    spring: 'Spring Clean',
  };

  return typeMap[serviceType?.toLowerCase() || ''] || serviceType || 'N/A';
}

/**
 * Format property type for display
 */
export function formatPropertyType(propertyType?: string): string {
  const typeMap: Record<string, string> = {
    apartment: 'Apartment',
    flat: 'Flat',
    house: 'House',
    semi_detached: 'Semi-Detached',
    detached: 'Detached',
    terraced: 'Terraced',
    bungalow: 'Bungalow',
    cottage: 'Cottage',
    studio: 'Studio',
    office: 'Office',
    commercial: 'Commercial',
  };

  return typeMap[propertyType?.toLowerCase() || ''] || propertyType || 'N/A';
}
