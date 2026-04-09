'use client';
import Image from 'next/image';

export default function Services() {
  const title = 'Our Cleaning Services in London';
  const description = 'Discover the full range of professional cleaning services we offer across London, tailored to meet your specific needs';
  const servicesList = [
    {
      title: 'After Builders Cleaning',
      description: 'Prices for our after builders cleaning start from £220',
      icon: '/icons/BzpbP.jpg'
    },
    {
      title: 'Moving Home Cleaning',
      description: 'Prices for our moving home cleaning start from £190',
      icon: '/icons/DatSO.jpg'
    },
    {
      title: 'End Of Tenancy Cleaning',
      description: 'Prices for our end of tenancy cleaning start from £170',
      icon: '/icons/EiW7c.jpg'
    },
    {
      title: 'Deep Cleaning',
      description: 'Prices for our deep cleaning start from £190',
      icon: '/icons/GhWMo.jpg'
    },
    {
      title: 'Spring Cleaning',
      description: 'Prices for our spring cleaning start from £190',
      icon: '/icons/HKsqc.jpg'
    }
  ];

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="heading-h2 mb-3 sm:mb-4">
          {title}
        </h2>
        <p className="body-text mb-8 sm:mb-10">
          {description}
        </p>

        <div className="space-y-6">
          {servicesList.map((service: any, index: number) => (
            <div key={index} className={`flex gap-4 sm:gap-6 items-start pb-6 ${index !== servicesList.length - 1 ? 'border-b border-gray-300' : ''}`}>
              <div className="flex-shrink-0">
                {service.icon && (
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                )}
              </div>
              <div>
                <h3 className="heading-h3 mb-1">
                  {service.title}
                </h3>
                <p className="body-text">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
