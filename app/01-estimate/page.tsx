'use client';

import { useState } from 'react';
import EstimateCalculator from './components/form-parts/EstimateCalculator';

export default function EstimatePage() {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleFormDataChange = (updatedData: Record<string, any>) => {
    console.log('EstimatePage received formData:', updatedData);
    setFormData(updatedData);
  };

  return (
    <EstimateCalculator onFormDataChange={handleFormDataChange} />
  );
}
