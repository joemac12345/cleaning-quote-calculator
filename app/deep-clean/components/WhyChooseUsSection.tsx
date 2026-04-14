'use client';

interface WhyChooseUsSectionProps {
  title: string;
  description: string;
  benefits: string[];
}

export default function WhyChooseUsSection({
  title,
  description,
  benefits
}: WhyChooseUsSectionProps) {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <ul className="space-y-2">
        {benefits.map((benefit, idx) => (
          <li key={idx} className="text-gray-700 flex gap-2">
            <span className="text-success font-bold flex-shrink-0">✓</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
