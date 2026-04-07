'use client';

interface YouTubeProps {
  videoId: string;
  title?: string;
  height?: string;
}

export default function YouTube({ 
  videoId,
  title = 'YouTube Video',
  height = 'h-64 sm:h-96',
}: YouTubeProps) {
  // Extract video ID if full URL is provided
  const extractVideoId = (input: string) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = input.match(regExp);
    return match && match[2].length === 11 ? match[2] : input;
  };

  const id = extractVideoId(videoId);

  return (
    <div className={`w-full ${height} rounded-lg overflow-hidden`}>
      <iframe
        className="w-full h-full pointer-events-none"
        style={{ pointerEvents: 'none' }}
        src={`https://www.youtube.com/embed/${id}?controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1`}
        title={title}
        allow="autoplay; encrypted-media"
      ></iframe>
    </div>
  );
}
