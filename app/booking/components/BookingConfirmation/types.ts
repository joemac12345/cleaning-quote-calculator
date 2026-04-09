export interface BookingFormData {
  customer_name: string;
  email: string;
  telephone: string;
  address: string;
}

export interface BookingConfirmationProps {
  estimateData: Record<string, any>;
  estimateId?: string;
  onSuccess?: (bookingId: string) => void;
  onError?: (error: string) => void;
}

export interface FormFieldProps {
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  required?: boolean;
}

export interface FormErrors {
  [key: string]: string;
}
