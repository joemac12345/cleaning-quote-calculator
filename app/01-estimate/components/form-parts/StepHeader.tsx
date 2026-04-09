'use client';

interface StepHeaderProps {
  title: string;
  description?: string;
}

export default function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10 mt-12" >
      <h2 className="heading-h2 mb-1">{title}</h2>
      {description && (
        <p className="body-text mb-3 leading-relaxed">{description}</p>
      )}
      <hr className="border-gray-200" />
    </div>
  );
}
