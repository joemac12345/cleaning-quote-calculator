'use client';

interface StepHeaderProps {
  title: string;
  description?: string;
}

export default function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10 lg:mb-12" style={{ marginTop: '50px' }}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1" style={{ color: '#48546A' }}>{title}</h2>
      {description && (
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-3 leading-relaxed">{description}</p>
      )}
      <hr className="border-gray-200" />
    </div>
  );
}
