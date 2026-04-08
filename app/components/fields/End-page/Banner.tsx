'use client';

import Image from 'next/image';

interface BannerProps {
  imageSrc?: string;
  alt?: string;
  height?: string;
  link?: string;
  logoSrc?: string;
  logoAlt?: string;
  additionalHeight?: string;
  backgroundPosition?: string;
}

export default function Banner({ 
  imageSrc = 'https://via.placeholder.com/1920x1080?text=Banner+Image', 
  alt = 'Banner', 
  height = 'h-64 sm:h-80',
  link,
  logoSrc,
  logoAlt = 'Logo',
  additionalHeight = '0px',
  backgroundPosition = 'center'
}: BannerProps) {
  const content = (
    <div 
      className={`w-full ${height} relative z-10`}
      style={{
        backgroundImage: `url('${imageSrc}')`,
        backgroundPosition: backgroundPosition,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover',
        minHeight: `calc(100% + ${additionalHeight})`,
      }}
    >
      {logoSrc && (
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={96}
          height={96}
          className="absolute top-0 h-12 sm:h-24 w-auto object-contain z-0"
          style={{ left: '20px' }}
          sizes="(max-width: 640px) 48px, 96px"
        />
      )}
    </div>
  );

  if (link) {
    return (
      <a href={link} className="block">
        {content}
      </a>
    );
  }

  return content;
}
