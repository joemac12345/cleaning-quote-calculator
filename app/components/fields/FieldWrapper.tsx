/**
 * Generic Field Component
 * Renders different field types based on FieldType configuration
 * Supports: counter, checkbox, radio, select, text, email
 */

'use client';

import React from 'react';
import { FormField } from '@/app/config/formConfig';
import CounterField from './CounterField';
import CheckboxField from './CheckboxField';
import RadioField from './RadioField';
import SelectField from './SelectField';
import TextField from './TextField';

interface FieldWrapperProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
}

export default function FieldWrapper({ field, value, onChange }: FieldWrapperProps) {
  switch (field.type) {
    case 'counter':
      return (
        <CounterField
          label={field.name}
          icon={field.icon}
          value={value as number}
          onChange={onChange}
          time={field.time}
        />
      );

    case 'checkbox':
      return (
        <CheckboxField
          label={field.name}
          options={field.options || []}
          value={value as Record<string, number>}
          onChange={onChange}
          showTime={field.showTime}
        />
      );

    case 'radio':
      return (
        <RadioField
          label={field.name}
          options={field.options || []}
          value={value as string}
          onChange={onChange}
          showTime={field.showTime}
        />
      );

    case 'select':
      return (
        <SelectField
          label={field.name}
          options={field.options || []}
          value={value as string}
          onChange={onChange}
        />
      );

    case 'email':
    case 'text':
      return (
        <TextField
          label={field.name}
          type={field.type}
          value={value as string}
          onChange={onChange}
          required={field.required}
        />
      );

    default:
      return <div>Unknown field type: {field.type}</div>;
  }
}
