'use client';
import Image from 'next/image';
import { landingConfig } from '@/app/config/landingConfig';

export default function Services() {
  const servicesConfig = (landingConfig as any).services || {};
  const { title = '', description = '', servicesList = [] } = servicesConfig;

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl text-[#48546A] mb-3 sm:mb-4" style={{ fontWeight: 50 }}>
          {title}
        </h2>
        <p className="text-base sm:text-lg text-[#48546A] mb-8 sm:mb-10 font-normal">
          {description}
        </p>

        <div className="space-y-6">
          {servicesList.map((service: any, index: number) => (
            <div key={index} className={`flex gap-4 sm:gap-6 items-start pb-6 ${index !== servicesList.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <div className="flex-shrink-0">
                {service.icon && (
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                )}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl text-[#48546A] mb-1" style={{ fontWeight: 600 }}>
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-normal">
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
