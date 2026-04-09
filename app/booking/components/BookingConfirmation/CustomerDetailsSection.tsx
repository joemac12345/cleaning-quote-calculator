import FormField from './FormField';
import { BookingFormData, FormErrors } from './types';

export interface CustomerDetailsSectionProps {
  formData: BookingFormData;
  formErrors: FormErrors;
  isSubmitting: boolean;
  onFieldChange: (fieldName: string, value: string) => void;
}

export default function CustomerDetailsSection({
  formData,
  formErrors,
  isSubmitting,
  onFieldChange,
}: CustomerDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Full Name"
        type="text"
        value={formData.customer_name}
        onChange={(value) => onFieldChange('customer_name', value)}
        error={formErrors.customer_name}
        placeholder="Enter your full name"
        disabled={isSubmitting}
        required
      />

      <FormField
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(value) => onFieldChange('email', value)}
        error={formErrors.email}
        placeholder="Enter your email address"
        disabled={isSubmitting}
        required
      />

      <FormField
        label="Phone Number"
        type="tel"
        value={formData.telephone}
        onChange={(value) => onFieldChange('telephone', value)}
        error={formErrors.telephone}
        placeholder="Enter your phone number"
        disabled={isSubmitting}
        required
      />

      <FormField
        label="Address"
        type="textarea"
        value={formData.address}
        onChange={(value) => onFieldChange('address', value)}
        error={formErrors.address}
        placeholder="Enter your full address"
        disabled={isSubmitting}
        rows={3}
        required
      />
    </div>
  );
}
