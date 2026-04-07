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
          className="absolute top-0 left-0 h-12 sm:h-24 object-contain z-0"
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
