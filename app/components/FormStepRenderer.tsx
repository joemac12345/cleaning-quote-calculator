/**
 * Form Step Renderer
 * Renders all fields for a given form step
 */

'use client';

import React from 'react';
import { FormStep } from '@/app/config/formConfig';
import FieldWrapper from './fields/FieldWrapper';
import StepHeader from './StepHeader';

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
    <div className="space-y-5 sm:space-y-6">
      <StepHeader title={step.title} description={step.description} />

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
