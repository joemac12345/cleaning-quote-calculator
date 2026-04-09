import { BookingFormData, FormErrors } from './types';

export const validateForm = (
  formData: BookingFormData,
  confirmationChecked: boolean
): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.customer_name.trim()) {
    errors.customer_name = 'Name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!formData.telephone.trim()) {
    errors.telephone = 'Phone number is required';
  }

  if (!formData.address.trim()) {
    errors.address = 'Address is required';
  }

  if (!confirmationChecked) {
    errors.confirmation = 'Please confirm your details before proceeding';
  }

  return errors;
};

export const isFormValid = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0;
};
