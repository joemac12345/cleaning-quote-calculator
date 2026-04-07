/**
 * Estimate Calculation Utilities - TIME-BASED PRICING MODEL
 * Calculates price based on time spent on rooms and add-ons
 */

import { formSteps, FIRST_CLEAN_HOURLY_RATE, MAINTENANCE_HOURLY_RATE } from '@/app/config/formConfig';

export interface EstimateStats {
  totalMinutes: number;
  hours: number;
  minutes: number;
  firstCleanHours: number;
  firstCleanMinutes: number;
  maintenanceHours: number;
  maintenanceMinutes: number;
  basePrice: number;
  maintenanceReduction: number;
  maintenanceDiscount: number;
  serviceMultiplierPercent: number;
  servicePremium: number;
  discountPercent: number;
  saving: number;
  totalPrice: number;
  firstCleanPrice: number;
  maintenancePrice: number;
  isRecurring: boolean;
}

/**
 * Calculate total time in minutes from form data (only for room-type fields without prices)
 */
function calculateTotalMinutes(formData: Record<string, any>, frequency: string = 'one-off'): number {
  let totalMinutes = 0;

  // Iterate through all steps and fields
  formSteps.forEach((step) => {
    step.fields.forEach((field) => {
      const fieldValue = formData[field.id];

      if (fieldValue === null || fieldValue === undefined || fieldValue === '') return;

      // Handle different field types
      switch (field.type) {
        case 'counter':
          // Counter type: multiply count by time per unit
          if (typeof fieldValue === 'number' && fieldValue > 0) {
            // Only add time if this field doesn't have price options
            const hasPrice = field.options?.some(opt => opt.price !== undefined);
            if (!hasPrice) {
              totalMinutes += fieldValue * field.time;
              if (process.env.NODE_ENV === 'development') console.log(`${field.id}: ${fieldValue} × ${field.time}m = ${fieldValue * field.time}m`);
            }
          }
          // For object types (extras, windows, other_spaces)
          else if (typeof fieldValue === 'object' && !Array.isArray(fieldValue)) {
            field.options?.forEach((option) => {
              const count = fieldValue[String(option.value)] || 0;
              // Add time if this option has a time value (for display, regardless of price)
              if (count > 0 && option.time) {
                totalMinutes += count * option.time;
                if (process.env.NODE_ENV === 'development') console.log(`${field.id}.${option.value}: ${count} × ${option.time}m = ${count * option.time}m`);
              }
            });
          }
          break;

        case 'radio':
          // Radio type: if selected, add the option's time value (for display, regardless of price)
          if (fieldValue) {
            const selectedOption = field.options?.find((opt) => String(opt.value) === String(fieldValue));
            if (selectedOption?.time && selectedOption.time > 0) {
              totalMinutes += selectedOption.time;
              if (process.env.NODE_ENV === 'development') console.log(`${field.id}: ${selectedOption.time}m`);
            }
          }
          break;

        // text, email, select, checkbox don't add to time by default
      }
    });
  });

  if (process.env.NODE_ENV === 'development') console.log(`Total minutes (${frequency}): ${totalMinutes}m`);

  return totalMinutes;
}

/**
 * Calculate total price additions from option prices (fixed costs)
 */
function calculateOptionPrices(formData: Record<string, any>): number {
  let totalPrice = 0;

  formSteps.forEach((step) => {
    step.fields.forEach((field) => {
      const fieldValue = formData[field.id];

      if (fieldValue === null || fieldValue === undefined || fieldValue === '') return;

      // Radio fields - single selection with optional price
      if (field.type === 'radio' && fieldValue) {
        const selectedOption = field.options?.find((opt) => String(opt.value) === String(fieldValue));
        if (selectedOption?.price) {
          totalPrice += selectedOption.price;
          if (process.env.NODE_ENV === 'development') console.log(`${field.id} price: £${selectedOption.price}`);
        }
      }

      // Counter fields with options (extras, windows, etc.)
      if (field.type === 'counter' && typeof fieldValue === 'object' && !Array.isArray(fieldValue)) {
        field.options?.forEach((option) => {
          const count = fieldValue[String(option.value)] || 0;
          if (count > 0 && option.price) {
            const cost = count * option.price;
            totalPrice += cost;
            if (process.env.NODE_ENV === 'development') console.log(`${field.id}.${option.value} price: ${count} × £${option.price} = £${cost}`);
          }
        });
      }
    });
  });

  if (process.env.NODE_ENV === 'development') console.log(`Total option prices: £${totalPrice.toFixed(2)}`);
  return totalPrice;
}

/**
 * Convert total minutes to hours and remaining minutes
 */
export function formatTime(totalMinutes: number): { hours: number; minutes: number } {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  return { hours, minutes };
}

/**
 * Calculate full estimate based on time × hourly rate + option prices
 */
export function calculateEstimate(
  formData: Record<string, any>,
  frequency: string = 'one-off'
): EstimateStats {
  try {
    const isRecurring = frequency !== 'one-off';

    // Calculate times
    const firstCleanMinutes = calculateTotalMinutes(formData, 'one-off') || 0;
    let maintenanceMinutes = calculateTotalMinutes(formData, frequency) || 0;

    // Reduce maintenance hours based on frequency
    if (frequency === 'weekly') {
      maintenanceMinutes *= 0.5; // 50% reduction
      if (process.env.NODE_ENV === 'development') console.log(`After 50% maintenance reduction (weekly): ${maintenanceMinutes}m`);
    } else if (frequency === 'fortnightly') {
      maintenanceMinutes *= 0.6; // 40% reduction
      if (process.env.NODE_ENV === 'development') console.log(`After 40% maintenance reduction (fortnightly): ${maintenanceMinutes}m`);
    } else if (frequency === 'monthly') {
      maintenanceMinutes *= 0.7; // 30% reduction
      if (process.env.NODE_ENV === 'development') console.log(`After 30% maintenance reduction (monthly): ${maintenanceMinutes}m`);
    }

    // Calculate base prices from time
    const timeBasedPrice = (firstCleanMinutes / 60) * FIRST_CLEAN_HOURLY_RATE;
    const optionPrice = calculateOptionPrices(formData);
    const firstCleanBasePrice = timeBasedPrice + optionPrice;

    const maintenanceTimeBasedPrice = (maintenanceMinutes / 60) * MAINTENANCE_HOURLY_RATE;
    const maintenanceBasePrice = maintenanceTimeBasedPrice + optionPrice;

    const firstCleanPrice = firstCleanBasePrice;
    const maintenancePrice = maintenanceBasePrice;

    // Format times
    const firstCleanFormatted = formatTime(firstCleanMinutes);
    const maintenanceFormatted = formatTime(maintenanceMinutes);

    // Total price based on frequency
    const totalPrice = isRecurring ? maintenancePrice : firstCleanPrice;

    if (process.env.NODE_ENV === 'development') console.log(`Estimate: First: £${firstCleanPrice.toFixed(2)}, Maintenance: £${maintenancePrice.toFixed(2)}`);

    return {
      totalMinutes: maintenanceMinutes,
      hours: firstCleanFormatted.hours,
      minutes: firstCleanFormatted.minutes,
      firstCleanHours: firstCleanFormatted.hours,
      firstCleanMinutes: firstCleanFormatted.minutes,
      maintenanceHours: maintenanceFormatted.hours,
      maintenanceMinutes: maintenanceFormatted.minutes,
      basePrice: Math.round(firstCleanBasePrice * 100) / 100,
      maintenanceReduction: 0,
      maintenanceDiscount: 0,
      serviceMultiplierPercent: 0,
      servicePremium: 0,
      discountPercent: 0,
      saving: 0,
      totalPrice: Math.round(firstCleanPrice * 100) / 100,
      firstCleanPrice: Math.round(firstCleanPrice * 100) / 100,
      maintenancePrice: Math.round(maintenancePrice * 100) / 100,
      isRecurring,
    };
  } catch (error) {
    console.error('Error in calculateEstimate:', error);
    return {
      totalMinutes: 0,
      hours: 0,
      minutes: 0,
      firstCleanHours: 0,
      firstCleanMinutes: 0,
      maintenanceHours: 0,
      maintenanceMinutes: 0,
      basePrice: 0,
      maintenanceReduction: 0,
      maintenanceDiscount: 0,
      serviceMultiplierPercent: 0,
      servicePremium: 0,
      discountPercent: 0,
      saving: 0,
      totalPrice: 0,
      firstCleanPrice: 0,
      maintenancePrice: 0,
      isRecurring: false,
    };
  }
}
