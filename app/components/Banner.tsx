'use client';

interface BannerProps {
  imageSrc?: string;
  alt?: string;
  height?: string;
  link?: string;
  logoSrc?: string;
  logoAlt?: string;
}

export default function Banner({ 
  imageSrc = 'https://via.placeholder.com/1920x1080?text=Banner+Image', 
  alt = 'Banner', 
  height = 'h-64 sm:h-80',
  link,
  logoSrc,
  logoAlt = 'Logo'
}: BannerProps) {
  const content = (
    <div 
      className={`w-full ${height} relative`}
      style={{
        backgroundImage: `url('${imageSrc}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {logoSrc && (
        <img
          src={logoSrc}
          alt={logoAlt}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 h-16 sm:h-24 object-contain"
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
