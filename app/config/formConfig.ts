/**
 * Form Configuration
 * Define all form steps and fields here.
 * Each field can be reused with different configurations.
 */

export type FieldType = 'counter' | 'checkbox' | 'radio' | 'select' | 'text' | 'email';

export interface FormField {
  id: string;
  name: string;
  type: FieldType;
  time: number; // minutes
  icon?: string; // icon name (e.g., 'bed', 'bath')
  showTime?: boolean; // whether to display time on radio/checkbox options
  initialValue: string | number | boolean | string[] | Record<string, number>;
  options?: Array<{ label: string; value: string | number; time?: number; icon?: string; price?: number; timeMultiplier?: number }>;
  required?: boolean;
}

export interface FormStep {
  id: number;
  title: string;
  description?: string;
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
          { label: 'Tenancy Cleaning', value: 'tenancy', time: 0, timeMultiplier: 0.1, icon: '/icons/lknSv.jpg' },
          { label: 'Moving Cleaning', value: 'moving', time: 0, timeMultiplier: 0.15, icon: '/icons/UuLt0.jpg' },
          { label: 'Deep Cleaning', value: 'deep', time: 0, timeMultiplier: 0.2, icon: '/icons/Q3AwX.jpg' },
          { label: 'Spring Cleaning', value: 'spring', time: 0, timeMultiplier: 0.05, icon: '/icons/lknSv.jpg' },
          { label: 'Builders Cleaning', value: 'builders', time: 0, timeMultiplier: 0.25, icon: '/icons/VL0l4.jpg' },
        ],
        required: true,
      },
    ],
  },

  // Step 2: Rooms
  {
    id: 2,
    title: 'Rooms',
    description: 'How many rooms need cleaning?',
    fields: [
      {
        id: 'bedrooms',
        name: 'Bedrooms',
        type: 'counter',
        time: 15, // minutes per room
        icon: '/icons/Nqbuh.jpg',
        initialValue: 0,
      },
      {
        id: 'bathrooms',
        name: 'Bathrooms',
        type: 'counter',
        time: 45,
        icon: '/icons/HKsqc.jpg',
        initialValue: 0,
      },
      {
        id: 'receptions',
        name: 'Receptions',
        type: 'counter',
        time: 20,
        icon: '/icons/mqGYd.jpg',
        initialValue: 0,
      },
      {
        id: 'floors',
        name: 'Floors',
        type: 'counter',
        time: 20,
        icon: '/icons/GhWMo.jpg',
        initialValue: 0,
      },
      {
        id: 'utility',
        name: 'Utility Rooms',
        type: 'counter',
        time: 30,
        icon: '/icons/l7vLe.jpg',
        initialValue: 0,
      },
      {
        id: 'cloakroom',
        name: 'Cloakroom',
        type: 'counter',
        time: 20,
        icon: '/icons/PEdH2.jpg',
        initialValue: 0,
      },
      {
        id: 'box_room',
        name: 'Box Room',
        type: 'counter',
        time: 10,
        icon: '/icons/qH6ca.jpg',
        initialValue: 0,
      },
      {
        id: 'hall',
        name: 'Hall',
        type: 'counter',
        time: 10,
        icon: '/icons/yYWnE.jpg',
        initialValue: 0,
      },
    ],
  },

  // Step 3: Pet Friendly Setup
  {
    id: 3,
    title: 'Pet Friendly Setup',
    description: 'Do you have pets?',
    fields: [
      {
        id: 'pet_friendly',
        name: 'Pet Friendly Setup',
        type: 'radio',
        time: 0,
        showTime: false,
        initialValue: '',
        options: [
          { label: 'Yes', value: 'yes', time: 15 },
          { label: 'No', value: 'no', time: 0 },
        ],
      },
    ],
  },

  // Step 4: Add-ons
  {
    id: 4,
    title: 'Add-ons',
    description: 'Any extra services?',
    fields: [
      {
        id: 'extras',
        name: 'Extra Services',
        type: 'checkbox',
        time: 0, // varies by option
        showTime: false,
        initialValue: { oven: 0, fridge: 0, windows: 0 },
        options: [
          { label: 'Oven Cleaning', value: 'oven', time: 45, icon: '/icons/DatSO.jpg', price: 20 },
          { label: 'Fridge Cleaning', value: 'fridge', time: 30, icon: '/icons/EiW7c.jpg', price: 15 },
          { label: 'Window Cleaning', value: 'windows', time: 20, icon: '/icons/IN0MN (1).jpg', price: 12 },
        ],
      },
    ],
  },

  // Step 5: Cleaning Frequency
  {
    id: 5,
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

  // Step 6: Review & Contact
  {
    id: 6,
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
        type: 'text',
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
