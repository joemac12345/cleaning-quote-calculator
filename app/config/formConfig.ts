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
  // Step 1: Cleaning Frequency
  {
    id: 1,
    title: 'Frequency',
    description: 'how How would you like us to Visit ',
    fields: [
      {
        id: 'frequency',
        name: 'Cleaning Frequency',
        type: 'radio',
        time: 0,
        initialValue: '',
        options: [
          { label: 'One-off', value: 'one-off', price: 25 },
          { label: 'Weekly', value: 'weekly', price: 0 },
          { label: 'Fortnightly', value: 'fortnightly', price: 0 },
          { label: 'Monthly', value: 'monthly', price: 0 },
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
    notificationText: '',
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
    notificationText: '',
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

  // Step 6: Kitchens & Utility Rooms
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

  // Step 7: Living Spaces
  {
    id: 7,
    title: 'Other Rooms',
    description: 'Add the quantities of the rooms that require cleaning',
    notificationText: '',
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

  // Step 8: Pet Friendly Setup
  {
    id: 8,
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

  // Step 9: Cleaning Products
  {
    id: 9,
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

  // Step 10: Address
  {
    id: 10,
    title: 'Where are we cleaning?',
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

  // Step 11: Contact Permission
  {
    id: 11,
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
        required: true,
      },
    ],
  },

  // Step 12: Contact Permission
  {
    id: 12,
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
