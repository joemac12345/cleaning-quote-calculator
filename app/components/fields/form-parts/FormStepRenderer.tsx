/**
 * Form Step Renderer
 * Renders all fields for a given form step
 */

'use client';

import React from 'react';
import { FormStep } from '@/app/config/formConfig';
import FieldWrapper from './FieldWrapper';
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

      <div className="space-y-5">
        {step.fields.map((field) => (
          <FieldWrapper
            key={field.id}
            field={field}
            value={formData[field.id] ?? field.initialValue}
            onChange={(value) => onFieldChange(field.id, value)}
          />
        ))}
      </div>

      {step.notificationText && (
        <div className="mt-6 p-4 bg-white border border-gray-300 rounded">
          <p className="text-sm text-[#48546A] font-poppins font-thin">{step.notificationText}</p>
        </div>
      )}
    </div>
  );
}
