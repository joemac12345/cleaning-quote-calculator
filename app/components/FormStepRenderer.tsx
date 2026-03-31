/**
 * Form Step Renderer
 * Renders all fields for a given form step
 */

'use client';

import React from 'react';
import { FormStep } from '@/app/config/formConfig';
import FieldWrapper from './fields/FieldWrapper';

interface FormStepProps {
  step: FormStep;
  formData: Record<string, any>;
  onFieldChange: (fieldId: string, value: any) => void;
}

export default function FormStepRenderer({
  step,
  formData,
  onFieldChange,
}: FormStepProps) {
  return (
    <div className="space-y-6">
      {step.description && (
        <p className="text-gray-600 text-lg">{step.description}</p>
      )}

      {step.fields.map((field) => (
        <FieldWrapper
          key={field.id}
          field={field}
          value={formData[field.id] ?? field.initialValue}
          onChange={(value) => onFieldChange(field.id, value)}
        />
      ))}
    </div>
  );
}
