'use client';

import { FormField } from '@/app/config/formConfig';
import { useState } from 'react';

interface AddressFieldProps {
  field: FormField;
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
  error?: string;
}

export default function AddressField({
  field,
  value,
  onChange,
  error,
}: AddressFieldProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);

  const handleGeolocation = async () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data.address;

          onChange({
            street: [
              address.house_number,
              address.road || address.street || address.pedestrian || address.highway,
            ]
              .filter(Boolean)
              .join(' '),
            city: address.city || address.town || address.suburb || address.village || '',
            county: address.county || address.state || '',
            postcode: address.postcode || '',
          });

          setLocationError(null);
        } catch (err) {
          setLocationError('Failed to retrieve address. Please try again.');
          console.error('Reverse geocoding error:', err);
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setLocationError(`Location error: ${err.message}`);
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="space-y-3">
      {!showManualEntry ? (
        // GEOLOCATION MODE
        <>
          {/* Error Message - Only show in geolocation mode */}
          {locationError && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700 font-poppins font-light">Unable to access location</p>
              <p className="text-xs text-yellow-600 mt-1">
                {locationError === 'Location error: User denied Geolocation'
                  ? 'Please enter your address manually below, or check your browser location permissions.'
                  : locationError}
              </p>
            </div>
          )}

          {/* Display Current Address */}
          {(value.street || value.city || value.postcode) && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
              <p className="text-sm font-poppins font-light text-gray-900">Your Address:</p>
              <p className="text-sm text-gray-700 mt-1">
                {value.street}
                {value.city && `, ${value.city}`}
                {value.postcode && ` ${value.postcode}`}
              </p>
            </div>
          )}

          {/* Buttons - Side by Side */}
          <div className="flex gap-3">
            {/* Use My Location Button */}
            <button
              type="button"
              onClick={handleGeolocation}
              disabled={isLocating}
              className="flex-1 btn-primary px-4 py-2 flex items-center justify-center gap-2 text-base"
            >
              {isLocating ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Finding...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  My Location
                </>
              )}
            </button>

            {/* Toggle to Manual Entry */}
            <button
              type="button"
              onClick={() => {
                setShowManualEntry(true);
                setLocationError(null);
              }}
              className="flex-1 btn-secondary px-4 py-2 text-base"
            >
              Manual Entry
            </button>
          </div>
        </>
      ) : (
        // MANUAL ENTRY MODE
        <>
          {/* Street Address */}
          <div>
            <label className="hidden">Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={value.street || ''}
              onChange={(e) => onChange({ ...value, street: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-base font-inter font-normal"
              required={field.required}
              autoComplete="street-address"
            />
          </div>

          {/* City */}
          <div>
            <label className="hidden">City</label>
            <input
              type="text"
              placeholder="City"
              value={value.city || ''}
              onChange={(e) => onChange({ ...value, city: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-base font-inter font-normal"
              required={field.required}
              autoComplete="address-level2"
            />
          </div>

          {/* County */}
          <div>
            <label className="hidden">County</label>
            <input
              type="text"
              placeholder="County"
              value={value.county || ''}
              onChange={(e) => onChange({ ...value, county: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-base font-inter font-normal"
              autoComplete="address-level1"
            />
          </div>

          {/* Postcode */}
          <div>
            <label className="hidden">Postcode</label>
            <input
              type="text"
              placeholder="Postcode"
              value={value.postcode || ''}
              onChange={(e) => onChange({ ...value, postcode: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-base font-inter font-normal"
              required={field.required}
              autoComplete="postal-code"
            />
          </div>

          {/* Toggle Back to Geolocation */}
          <button
            type="button"
            onClick={() => {
              setShowManualEntry(false);
              setLocationError(null);
            }}
            className="flex-1 btn-secondary px-4 py-2 text-base"
          >
            Use My Location Instead
          </button>
        </>
      )}

      {error && (
        <p className="text-red-500 text-sm font-poppins font-light">{error}</p>
      )}
    </div>
  );
}
