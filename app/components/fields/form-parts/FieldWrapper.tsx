/**
 * Generic Field Component
 * Renders different field types based on FieldType configuration
 * Supports: counter, checkbox, radio, select, text, email, tel
 */

'use client';

import React from 'react';
import { FormField } from '@/app/config/formConfig';
import CounterField from './CounterField';
import OptionsCounterField from './OptionsCounterField';
import CheckboxField from './CheckboxField';
import RadioField from './RadioField';
import SelectField from './SelectField';
import TextField from './TextField';
import EmailField from './EmailField';
import PhoneField from './PhoneField';
import AddressField from './AddressField';

interface FieldWrapperProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
}

export default function FieldWrapper({ field, value, onChange }: FieldWrapperProps) {
  switch (field.type) {
    case 'counter':
      // Multi-item counter fields (like add-ons with options) use OptionsCounterField
      if (field.options && field.options.length > 0) {
        return (
          <OptionsCounterField
            label={field.name}
            options={field.options}
            value={value as Record<string, number>}
            onChange={onChange}
            showTime={field.showTime}
          />
        );
      }
      // Single-item counter fields use CounterField
      return (
        <CounterField
          label={field.name}
          icon={field.icon}
          value={value as number}
          onChange={onChange}
          helpText={field.helpText}
        />
      );

    case 'checkbox':
      return (
        <CheckboxField
          label={field.name}
          options={field.options || []}
          value={value as (string | number)[]}
          onChange={onChange}
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
      return (
        <EmailField
          label={field.name}
          value={value as string}
          onChange={onChange}
          required={field.required}
        />
      );

    case 'tel':
      return (
        <PhoneField
          label={field.name}
          value={value as string}
          onChange={onChange}
          required={field.required}
        />
      );

    case 'text':
      return (
        <TextField
          label={field.name}
          value={value as string}
          onChange={onChange}
          required={field.required}
        />
      );

    case 'address':
      return (
        <AddressField
          field={field}
          value={value as Record<string, string>}
          onChange={onChange}
        />
      );

    default:
      return <div>Unknown field type: {field.type}</div>;
  }
}
