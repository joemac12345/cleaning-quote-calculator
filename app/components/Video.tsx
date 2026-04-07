'use client';

interface VideoProps {
  videoSrc: string;
  title?: string;
  height?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
}

export default function Video({ 
  videoSrc,
  title,
  height = 'h-64 sm:h-96',
  autoplay = false,
  controls = false,
  loop = false,
}: VideoProps) {
  return (
    <div className={`w-full ${height} rounded-lg overflow-hidden`}>
      <video
        className="w-full h-full object-cover"
        autoPlay={autoplay}
        controls={controls}
        loop={loop}
        title={title}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
