/**
 * Quote Calculation Utilities
 * Calculates total time and price based on form data and configuration
 */

import { formSteps, frequencyDiscounts, HOURLY_RATE, FormField } from '@/app/config/formConfig';

export interface QuoteStats {
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
 * Calculate total time in minutes from form data
 */
function calculateTotalMinutes(formData: Record<string, any>, frequency: string = 'one-off'): number {
  let totalMinutes = 0;

  // Iterate through all steps and fields
  formSteps.forEach((step) => {
    step.fields.forEach((field) => {
      const fieldValue = formData[field.id];

      if (fieldValue === null || fieldValue === undefined) return;

      // Handle different field types
      switch (field.type) {
        case 'counter':
          // Counter type: multiply count by time per unit
          totalMinutes += (fieldValue as number) * field.time;
          break;

        case 'radio':
          // Radio type: if selected, add the option's time value
          if (fieldValue) {
            const selectedOption = field.options?.find((opt) => String(opt.value) === String(fieldValue));
            if (selectedOption?.time) {
              totalMinutes += selectedOption.time;
            }
          }
          break;

        case 'checkbox':
          // Checkbox type: sum up times for all selected options (now stored as object with counts)
          if (typeof fieldValue === 'object' && !Array.isArray(fieldValue)) {
            field.options?.forEach((option) => {
              const count = fieldValue[String(option.value)] || 0;
              if (count > 0 && option.time) {
                totalMinutes += count * option.time;
              }
            });
          }
          // Also handle legacy array format for backwards compatibility
          else if (Array.isArray(fieldValue)) {
            fieldValue.forEach((checkedValue) => {
              const selectedOption = field.options?.find((opt) => String(opt.value) === String(checkedValue));
              if (selectedOption?.time) {
                totalMinutes += selectedOption.time;
              }
            });
          }
          break;

        // text, email, select don't add to time by default
      }
    });
  });

  // Apply maintenance clean reduction: 50% reduction for weekly cleans, 50% for other recurring
  if (frequency === 'weekly') {
    totalMinutes *= 0.5; // 50% reduction for weekly
  } else if (frequency !== 'one-off') {
    totalMinutes *= 0.5; // 50% reduction for fortnightly/monthly
  }

  return totalMinutes;
}

/**
 * Get service type multiplier from form data
 */
function getServiceMultiplier(formData: Record<string, any>): number {
  const serviceType = formData.service_type;
  if (!serviceType) return 0;

  const serviceStep = formSteps.find((s) => s.id === 1);
  const serviceField = serviceStep?.fields.find((f) => f.id === 'service_type');
  const selectedOption = serviceField?.options?.find((opt) => String(opt.value) === String(serviceType));

  return selectedOption?.timeMultiplier || 0;
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
 * Calculate full quote including discounts
 */
export function calculateQuote(
  formData: Record<string, any>,
  frequency: string = 'one-off'
): QuoteStats {
  const isRecurring = frequency !== 'one-off';
  
  // Calculate first clean price (without 15% maintenance reduction)
  const firstCleanMinutes = calculateTotalMinutes(formData, 'one-off');
  const firstCleanBasePrice = (firstCleanMinutes / 60) * HOURLY_RATE;
  const discountPercent = frequencyDiscounts[frequency] || 0;
  const firstCleanSaving = firstCleanBasePrice * discountPercent;
  const firstCleanPriceAfterFrequency = firstCleanBasePrice + firstCleanSaving;
  const serviceMultiplierPercent = getServiceMultiplier(formData) * 100;
  const firstCleanServicePremium = firstCleanPriceAfterFrequency * (getServiceMultiplier(formData));
  const firstCleanPrice = firstCleanPriceAfterFrequency + firstCleanServicePremium;
  
  // Calculate maintenance price (with 15% maintenance reduction if recurring)
  const maintenanceMinutes = calculateTotalMinutes(formData, frequency);
  const { hours, minutes } = formatTime(maintenanceMinutes);
  const maintenanceBasePrice = (maintenanceMinutes / 60) * HOURLY_RATE;
  const maintenanceDiscount = isRecurring ? firstCleanBasePrice * 0.15 : 0;
  const maintenanceSaving = maintenanceBasePrice * discountPercent;
  const maintenancePriceAfterFrequency = maintenanceBasePrice + maintenanceSaving;
  const maintenanceServicePremium = maintenancePriceAfterFrequency * (getServiceMultiplier(formData));
  const maintenancePrice = maintenancePriceAfterFrequency + maintenanceServicePremium;

  // Use appropriate total price based on frequency
  const totalPrice = isRecurring ? maintenancePrice : firstCleanPrice;
  const basePrice = isRecurring ? maintenanceBasePrice : firstCleanBasePrice;
  const maintenanceReduction = isRecurring ? -15 : 0;
  const saving = isRecurring ? maintenanceSaving : firstCleanSaving;

  // Format times
  const firstCleanFormatted = formatTime(firstCleanMinutes);
  const maintenanceFormatted = formatTime(maintenanceMinutes);

  return {
    totalMinutes: maintenanceMinutes,
    hours: firstCleanFormatted.hours,
    minutes: firstCleanFormatted.minutes,
    firstCleanHours: firstCleanFormatted.hours,
    firstCleanMinutes: firstCleanFormatted.minutes,
    maintenanceHours: maintenanceFormatted.hours,
    maintenanceMinutes: maintenanceFormatted.minutes,
    basePrice: Math.round(basePrice * 100) / 100,
    maintenanceReduction,
    maintenanceDiscount: Math.round(maintenanceDiscount * 100) / 100,
    serviceMultiplierPercent,
    servicePremium: Math.round((isRecurring ? maintenanceServicePremium : firstCleanServicePremium) * 100) / 100,
    discountPercent: discountPercent * 100,
    saving: Math.round(Math.abs(saving) * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
    firstCleanPrice: Math.round(firstCleanPrice * 100) / 100,
    maintenancePrice: Math.round(maintenancePrice * 100) / 100,
    isRecurring,
  };
}
