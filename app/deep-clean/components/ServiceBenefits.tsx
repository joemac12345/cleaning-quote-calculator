'use client';

export default function ServiceBenefits() {
  const benefits = [
    { icon: '✓', title: 'Baseboards & Trim', desc: 'Every baseboard and trim thoroughly cleaned' },
    { icon: '✓', title: 'Windows & Glass', desc: 'Interior and exterior windows sparkling clean' },
    { icon: '✓', title: 'Appliances', desc: 'Inside and outside of all major appliances' },
    { icon: '✓', title: 'Cabinets & Shelves', desc: 'Complete interior and exterior cleaning' },
    { icon: '✓', title: 'Floors & Carpets', desc: 'Deep cleaned and sanitized' },
    { icon: '✓', title: 'Light Fixtures', desc: 'All light fixtures and ceiling fans cleaned' },
  ];

  return (
    <section className="mb-12 sm:mb-16">
      <h2 className="heading-h2 text-primary mb-8">What\'s Included</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <span className="text-success text-2xl font-bold flex-shrink-0">{benefit.icon}</span>
              <div>
                <h3 className="font-poppins font-semibold text-primary mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
