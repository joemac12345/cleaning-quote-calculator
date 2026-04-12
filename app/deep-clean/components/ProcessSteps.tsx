'use client';

export default function ProcessSteps() {
  const steps = [
    { number: '1', title: 'Assessment', desc: 'We evaluate your space and develop a customized cleaning plan' },
    { number: '2', title: 'Preparation', desc: 'We move items safely and prepare the area for deep cleaning' },
    { number: '3', title: 'Detailed Cleaning', desc: 'Our team uses professional techniques and equipment for thorough results' },
    { number: '4', title: 'Final Inspection', desc: 'Quality check to ensure every detail meets our high standards' },
  ];

  return (
    <section className="mb-12 sm:mb-16">
      <h2 className="heading-h2 text-primary mb-8">Our Process</h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-poppins font-semibold text-lg">
                {step.number}
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="font-poppins font-semibold text-primary mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
