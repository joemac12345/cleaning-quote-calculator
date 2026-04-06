/**
 * Form Configuration
 * Define all form steps and fields here.
 * Each field can be reused with different configurations.
 */

export type FieldType = 'counter' | 'checkbox' | 'radio' | 'select' | 'text' | 'email' | 'tel' | 'address';

export interface FormField {
  id: string;
  name: string;
  type: FieldType;
  time: number; // minutes
  icon?: string; // icon name (e.g., 'bed', 'bath')
  helpText?: string; // optional help text for counter/text fields
  showTime?: boolean; // whether to display time on radio/checkbox options
  initialValue: string | number | boolean | string[] | Record<string, number> | Record<string, string>;
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
    title: 'Cleaning Service',
    description: 'What can we help you with?',
    fields: [
      {
        id: 'service_type',
        name: 'Service Type',
        type: 'radio',
        time: 0,
        initialValue: 'deep',
        options: [
         
          { label: 'Deep Cleaning', value: 'deep', price: 0, icon: '/icons/Q3AwX.jpg' },
          { label: 'Spring Cleaning', value: 'spring', price: 0, icon: '/icons/lknSv.jpg' },
          
        ],
        required: true,
      },
    ],
  },

  // Step 2: Property Type
  {
    id: 2,
    title: 'Property Type',
    description: 'Is it a house or a flat that needs cleaning?',
    fields: [
      {
        id: 'property_type',
        name: 'Property Type',
        type: 'radio',
        time: 0,
        showTime: false,
        initialValue: '',
        options: [
          { label: 'House', value: 'house', price: 0, icon: '/icons/u1kBk.jpg' },
          { label: 'Flat', value: 'flat', price: 0, icon: '/icons/aHjSn.jpg' },
          { label: 'Other', value: 'other', price: 0 },
        ],
        required: true,
      },
    ],
  },

  // Step 3: Bedrooms
  {
    id: 3,
    title: 'Bedrooms',
    description: 'How many bedrooms does the property have?',
    fields: [
      {
        id: 'bedrooms',
        name: 'Bedrooms',
        type: 'counter',
        time: 30,
        icon: '/icons/Nqbuh.jpg',
        helpText: 'Add if required',
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
        time: 60,
        icon: '/icons/nJuLg.jpg',
        helpText: 'Add if required',
        initialValue: 0,
      },
      {
        id: 'ensuite',
        name: 'En Suite Bathrooms',
        type: 'counter',
        time: 30,
        icon: '/icons/HKsqc.jpg',
        helpText: 'Add if required',
        initialValue: 0,
      },
      {
        id: 'cloakroom',
        name: 'Cloakroom',
        type: 'counter',
        time: 20,
        icon: '/icons/PEdH2.jpg',
        helpText: 'Add if required',
        initialValue: 0,
      },
    ],
  },

  // Step 5: Floors
  {
    id: 5,
    title: 'Staircases',
    description: 'How many sets of stairs does your property have?',
    notificationText: 'If your property does not have any staircase, please leave the value as zero',
    fields: [
      {
        id: 'floors',
        name: 'Staircases',
        type: 'counter',
        time: 20,
        icon: '/icons/GhWMo.jpg',
        helpText: 'Add if required',
        initialValue: 0,
      },
      
    ],
  },

  // Step 6: Other Rooms
  {
    id: 6,
    title: 'Kitchens & Utility Rooms',
    description: 'Do these rooms require cleaning?',
    notificationText: '',
    fields: [
      {
        id: 'kitchen',
        name: 'Kitchen',
        type: 'counter',
        time: 60,
        icon: '/icons/mqGYd.jpg',
        helpText: 'Add if required',
        initialValue: 0,
      },
      {
        id: 'utility',
        name: 'Utility Rooms',
        type: 'counter',
        time: 30,
        icon: '/icons/l7vLe.jpg',
        helpText: 'Add if required',
        initialValue: 0,
      },
     
     
    ],
  },

  // Step 7: Add-ons
  {
    id: 7,
    title: 'Do you require',
    description: 'A deep clean of your appliances',
    fields: [
      {
        id: 'extras',
        name: 'Extra Services',
        type: 'counter',
        time: 0, // varies by option
        showTime: false,
        initialValue: { oven: 0, fridge: 0 },
        options: [
          { label: 'Oven Cleaning', value: 'oven', time: 70, icon: '/icons/DatSO.jpg',  helpText: 'Add if required', description: 'Professional oven cleaning service includes:\n\n• Deep cleaning of oven interior\n• Removal of grease and burnt-on food\n• Exterior cleaning of oven surfaces\n• Glass door cleaning (if applicable)\n• Thorough removal of stubborn stains\n\nThis is a specialist service that transforms your oven back to like-new condition.' },
          { label: 'Fridge Cleaning', value: 'fridge', time: 70, icon: '/icons/EiW7c.jpg',  helpText: 'Add if required', description: 'This comprehensive service includes:\n\n• Exterior cleaning of the fridge down\n• Removing everything from inside\n• Deep cleaning of all shelves\n• Cleaning the interior thoroughly\n• Placing everything back safely\n\nThe outside is cleaned as part of the kitchen cleaning service. This add-on focuses on the deep interior work.' },
        ],
      },
    ],
  },

  // Step 8: Living Spaces
  {
    id: 8,
    title: 'Other Rooms',
    description: 'Add the quantities of the rooms that require cleaning',
    notificationText: 'Only select what you require cleaning.',
    fields: [
      {
        id: 'living_rooms',
        name: 'Living Rooms',
        type: 'counter',
        time: 25,
        icon: '/icons/VlFWk.jpg',
        helpText: 'Add if required',
        initialValue: 0,
      },
      {
        id: 'dining_rooms',
        name: 'Dining Rooms',
        type: 'counter',
        time: 20,
        icon: '/icons/e3RYb.jpg',
        helpText: 'Add if required',
        initialValue: 0,
      },
      {
        id: 'studies',
        name: 'Studies/Offices',
        type: 'counter',
        time: 15,
        icon: '/icons/wNAqS.jpg',
        helpText: 'Add if required',
        initialValue: 0,
      },
    ],
  },

  // Step 9: Any Other Rooms
  {
    id: 9,
    title: 'Any Other Rooms',
    description: 'Are there any other rooms that may need cleaning?',
    fields: [
      {
        id: 'other_spaces',
        name: 'Other Spaces',
        type: 'counter',
        time: 0,
        showTime: false,
        initialValue: { other_rooms: 0 },
        options: [
          { label: 'Any Other Rooms', value: 'other_rooms', time: 30, icon: '/icons/wNAqS.jpg', helpText: 'Add if required', description: 'For example, if you have two other areas within your property that we have not listed, just add 2 to the quantity field. We will allocate some time to this for you.' },
        ],
      },
    ],
  },

  // Step 10: Pet Friendly Setup
  {
    id: 10,
    title: 'Pet Friendly',
    description: 'Do you have any large pets in your home?',
    fields: [
      {
        id: 'pet_friendly',
        name: 'Pet Friendly',
        type: 'radio',
        time: 0,
        showTime: false,
        initialValue: '',
        options: [
          { label: 'Yes', value: 'yes', price: 5, icon: '/icons/g9aIZ.jpg' },
          { label: 'No', value: 'no', price: 0, icon: '/icons/pUnIt.jpg' },
        ],
      },
    ],
  },

  // Step 11: Cleaning Products
  {
    id: 11,
    title: 'Cleaning Products',
    description: 'How would you like us to proceed with cleaning products?',
    fields: [
      {
        id: 'cleaning_products',
        name: 'Cleaning Products',
        type: 'radio',
        time: 0,
        showTime: false,
        initialValue: '',
        options: [
          { label: 'Supply all cleaning products', price: 5, value: 'supply', time: 0, icon: '/icons/R1KAf.jpg',  },
          { label: 'Use your cleaning products', price: 0, value: 'yours', time: 0, icon: '/icons/Xujtk.jpg' },
        ],
        required: true,
      },


      
    ],
  },

  // Step 12: Windows & Doors
  {
    id: 12,
    title: 'Window Cleaning',
    description: 'Would you like to upgrade your window cleaning? Windows to be cleaned on the inside only.',
    fields: [
      {
        id: 'windows',
        name: 'Window Services',
        type: 'counter',
        time: 0,
        showTime: false,
        initialValue: { windows: 0, doors: 0 },
        options: [
          { label: 'Window Cleaning', value: 'windows', time: 5, icon: '/icons/IN0MN (1).jpg',  helpText: 'Add if required', description: 'Internal window cleaning service includes:\n\n• Cleaning of the inside surface of window glass\n• Framed glass cleaning (interior side)\n• Window sill cleaning (interior)\n• Removal of dust and grime from inside\n• Streak-free finish for crystal-clear transparency from inside\n\nPrice: £3 per window\n\nPlease note: This service covers the INSIDE/INTERIOR of windows only and does not include external/outside window cleaning.' },
          { label: 'External Doors', value: 'doors', time: 7, icon: '/icons/IN0MN (1).jpg',  helpText: 'Add if required', description: 'External door cleaning service includes:\n\n• Cleaning of external door glass/panels\n• External door frame cleaning\n• Frame detailing\n• Removal of dust and weather marks\n• Streak-free finish\n\nPrice: £3 per external door\n\nPlease note: This service is for external doors only. Internal doors are included as part of your room cleaning price.' },
        ],
      },
    ],
  },

  // Step 13: Cleaning Frequency
  {
    id: 13,
    title: 'Frequency',
    description: 'Keep it looking great! Regular maintenance cleaning helps preserve that pristine finish after your deep clean. How often would you like us to visit?',
    fields: [
      {
        id: 'frequency',
        name: 'Cleaning Frequency',
        type: 'radio',
        time: 0,
        initialValue: 'one-off',
        options: [
          { label: 'One-off', value: 'one-off', price: 25 },
          { label: 'Weekly', value: 'weekly', price: 0 },
          { label: 'Fortnightly', value: 'fortnightly', price: 0 },
          { label: 'Monthly', value: 'monthly', price: 0 },
        ],
      },
    ],
  },

  // Step 14: Review & Contact
  {
    id: 14,
    title: 'Can we customise your quote?',
    description: 'Add your name and contact details to finalise your quote',
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

  // Step 15: Address
  {
    id: 15,
    title: 'Where are we cleaning?',
    description: 'Would you like to add your address to customise your estimate? This is optional. If you do not want to share your address, you can just move on to the next step.',
    fields: [
      {
        id: 'address',
        name: 'Property Address',
        type: 'address',
        time: 0,
        initialValue: {
          street: '',
          city: '',
          postcode: '',
          county: '',
        },
        required: false,
      },
    ],
  },

  // Step 16: Contact Permission
  {
    id: 16,
    title: 'Stay in touch',
    description: 'Are you happy for us to send you an email with your estimate so you have a record?',
    fields: [
      {
        id: 'contact_permission',
        name: 'Contact Permission',
        type: 'radio',
        time: 0,
        showTime: false,
        initialValue: '',
        options: [
          { label: 'Yes, Send Estimate ', value: 'yes', price: 0 },
          { label: 'No, thanks', value: 'no', price: 0 },
        ],
        required: true,
      },
    ],
  },
];

// Hourly rates for cleaning
export const FIRST_CLEAN_HOURLY_RATE = 33; // £33/hour
export const MAINTENANCE_HOURLY_RATE = 22; // £22/hour
