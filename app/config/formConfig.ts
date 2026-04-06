/**
 * Form Configuration
 * Define all form steps and fields here.
 * Each field can be reused with different configurations.
 */

export type FieldType = 'counter' | 'checkbox' | 'radio' | 'select' | 'text' | 'email' | 'tel';

export interface FormField {
  id: string;
  name: string;
  type: FieldType;
  time: number; // minutes
  icon?: string; // icon name (e.g., 'bed', 'bath')
  helpText?: string; // optional help text for counter/text fields
  showTime?: boolean; // whether to display time on radio/checkbox options
  initialValue: string | number | boolean | string[] | Record<string, number>;
  options?: Array<{ label: string; value: string | number; time?: number; icon?: string; price?: number; timeMultiplier?: number; description?: string; helpText?: string }>;
  required?: boolean;
}

export interface FormStep {
  id: number;
  title: string;
  description?: string;
  notificationText?: string;
  fields: FormField[];
}

export const formSteps: FormStep[] = [
  // Step 1: Service Selection
  {
    id: 1,
    title: 'Service',
    description: 'What cleaning service do you need?',
    fields: [
      {
        id: 'service_type',
        name: 'Service Type',
        type: 'radio',
        time: 0, // time is per-option
        initialValue: '',
        options: [
          { label: 'Tenancy Cleaning', value: 'tenancy',  timeMultiplier: 0.1, icon: '/icons/lknSv.jpg' },
          { label: 'Moving Cleaning', value: 'moving',  timeMultiplier: 0.15, icon: '/icons/UuLt0.jpg' },
          { label: 'Deep Cleaning', value: 'deep',  timeMultiplier: 0.2, icon: '/icons/Q3AwX.jpg' },
          { label: 'Spring Cleaning', value: 'spring',  timeMultiplier: 0.05, icon: '/icons/lknSv.jpg' },
          { label: 'Builders Cleaning', value: 'builders',  timeMultiplier: 0.25, icon: '/icons/VL0l4.jpg' },
        ],
        required: true,
      },
    ],
  },

  // Step 2: Floors
  {
    id: 2,
    title: 'Floors',
    description: 'Add quantity required',
    notificationText: 'Only select what you require cleaning.',
    fields: [
      {
        id: 'floors',
        name: 'Staircases',
        type: 'counter',
        time: 20,
        icon: '/icons/GhWMo.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
      {
        id: 'landings',
        name: 'Landings',
        type: 'counter',
        time: 10,
        icon: '/icons/QQC1v.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
       {
        id: 'hall',
        name: 'Hall',
        type: 'counter',
        time: 10,
        icon: '/icons/Fcl68.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
    ],
  },

  // Step 3: Bedrooms
  {
    id: 3,
    title: 'Bedrooms',
    description: 'Add quantity required',
    notificationText: 'Only select what you require cleaning.',
    fields: [
      {
        id: 'bedrooms',
        name: 'Bedrooms',
        type: 'counter',
        time: 15, // minutes per room
        icon: '/icons/Nqbuh.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
    ],
  },

  // Step 4: Bathrooms & Cloakroom
  {
    id: 4,
    title: 'Bathrooms & Cloakroom',
    description: 'Add quantity required',
    notificationText: 'Add if required Cleaning.',
    fields: [
      {
        id: 'bathrooms',
        name: 'Bathrooms',
        type: 'counter',
        time: 45,
        icon: '/icons/nJuLg.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
      {
        id: 'ensuite',
        name: 'En Suite Bathrooms',
        type: 'counter',
        time: 30,
        icon: '/icons/HKsqc.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
      {
        id: 'cloakroom',
        name: 'Cloakroom',
        type: 'counter',
        time: 20,
        icon: '/icons/PEdH2.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
    ],
  },

  // Step 5: Living Spaces
  {
    id: 5,
    title: 'Living Spaces',
    description: 'Add quantity required',
    notificationText: 'Only select what you require cleaning.',
    fields: [
      {
        id: 'living_rooms',
        name: 'Living Rooms',
        type: 'counter',
        time: 25,
        icon: '/icons/VlFWk.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
      {
        id: 'dining_rooms',
        name: 'Dining Rooms',
        type: 'counter',
        time: 20,
        icon: '/icons/e3RYb.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
      {
        id: 'studies',
        name: 'Studies/Offices',
        type: 'counter',
        time: 15,
        icon: '/icons/wNAqS.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
    ],
  },

  // Step 6: Other Rooms (previously Step 5)
  {
    id: 6,
    title: 'Other Rooms',
    description: 'Add quantity required',
    notificationText: 'Add if required Cleaning.',
    fields: [
      {
        id: 'kitchen',
        name: 'Kitchen',
        type: 'counter',
        time: 1,
        icon: '/icons/mqGYd.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
      {
        id: 'utility',
        name: 'Utility Rooms',
        type: 'counter',
        time: 30,
        icon: '/icons/l7vLe.jpg',
        helpText: 'Add what you need cleaned',
        initialValue: 0,
      },
     
     
    ],
  },

  // Step 7: Pet Friendly Setup (previously Step 6)
  {
    id: 7,
    title: 'Pet Friendly',
    description: 'Do you have any cats or dogs in your home?',
    fields: [
      {
        id: 'pet_friendly',
        name: 'Pet Friendly',
        type: 'radio',
        time: 0,
        showTime: false,
        initialValue: '',
        options: [
          { label: 'Yes', value: 'yes', time: 15, icon: '/icons/g9aIZ.jpg' },
          { label: 'No', value: 'no', time: 0, icon: '/icons/pUnIt.jpg' },
        ],
      },
    ],
  },

  // Step 8: Add-ons (previously Step 7)
  {
    id: 8,
    title: 'Add-ons',
    description: 'Select your options',
    fields: [
      {
        id: 'extras',
        name: 'Extra Services',
        type: 'counter',
        time: 0, // varies by option
        showTime: false,
        initialValue: { oven: 0, fridge: 0 },
        options: [
          { label: 'Oven Cleaning', value: 'oven', time: 45, icon: '/icons/DatSO.jpg', price: 20, helpText: 'Add what you need cleaned', description: 'Professional oven cleaning service includes:\n\n• Deep cleaning of oven interior\n• Removal of grease and burnt-on food\n• Exterior cleaning of oven surfaces\n• Glass door cleaning (if applicable)\n• Thorough removal of stubborn stains\n\nThis is a specialist service that transforms your oven back to like-new condition.' },
          { label: 'Fridge Cleaning', value: 'fridge', time: 30, icon: '/icons/EiW7c.jpg', price: 15, helpText: 'Add what you need cleaned', description: 'This comprehensive service includes:\n\n• Exterior cleaning of the fridge down\n• Removing everything from inside\n• Deep cleaning of all shelves\n• Cleaning the interior thoroughly\n• Placing everything back safely\n\nThe outside is cleaned as part of the kitchen cleaning service. This add-on focuses on the deep interior work.' },
        ],
      },
    ],
  },

  // Step 9: Window & Door Cleaning
  {
    id: 9,
    title: 'Windows & Doors',
    description: 'Add quantity required',
    fields: [
      {
        id: 'windows',
        name: 'Window Services',
        type: 'counter',
        time: 0,
        showTime: false,
        initialValue: { windows: 0, doors: 0 },
        options: [
          { label: 'Window Cleaning', value: 'windows', time: 20, icon: '/icons/IN0MN (1).jpg', price: 4, helpText: 'Add what you need cleaned', description: 'Internal window cleaning service includes:\n\n• Cleaning of the inside surface of window glass\n• Framed glass cleaning (interior side)\n• Window sill cleaning (interior)\n• Removal of dust and grime from inside\n• Streak-free finish for crystal-clear transparency from inside\n\nPrice: £4 per window\n\nPlease note: This service covers the INSIDE/INTERIOR of windows only and does not include external/outside window cleaning.' },
          { label: 'External Doors', value: 'doors', time: 15, icon: '/icons/IN0MN (1).jpg', price: 3, helpText: 'Add what you need cleaned', description: 'External door cleaning service includes:\n\n• Cleaning of external door glass/panels\n• External door frame cleaning\n• Frame detailing\n• Removal of dust and weather marks\n• Streak-free finish\n\nPrice: £3 per external door\n\nPlease note: This service is for external doors only. Internal doors are included as part of your room cleaning price.' },
        ],
      },
    ],
  },

  // Step 10: Cleaning Frequency (previously Step 9)
  {
    id: 10,
    title: 'Frequency',
    description: 'How often do you need cleaning?',
    fields: [
      {
        id: 'frequency',
        name: 'Cleaning Frequency',
        type: 'radio',
        time: 0, // affects pricing, not duration
        initialValue: 'one-off',
        options: [
          { label: 'One-off', value: 'one-off' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Fortnightly', value: 'fortnightly' },
          { label: 'Monthly', value: 'monthly' },
        ],
      },
    ],
  },

  // Step 11: Review & Contact (previously Step 10)
  {
    id: 11,
    title: 'Review',
    description: 'Confirm your quote and enter contact details',
    fields: [
      {
        id: 'name',
        name: 'Full Name',
        type: 'text',
        time: 0,
        initialValue: '',
        required: true,
      },
      {
        id: 'telephone',
        name: 'Telephone Number',
        type: 'tel',
        time: 0,
        initialValue: '',
        required: true,
      },
      {
        id: 'email',
        name: 'Email Address',
        type: 'email',
        time: 0,
        initialValue: '',
        required: true,
      },
    ],
  },
];

// Frequency discount multipliers (applied to base price)
export const frequencyDiscounts: Record<string, number> = {
  'one-off': 0, // 0% discount
  weekly: -0.12, // -12%
  fortnightly: -0.08, // -8%
  monthly: 0.08, // +8% premium
};

// Base hourly rate for cleaning
export const HOURLY_RATE = 22; // £22/hour
