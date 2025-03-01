'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface VideoThumbnailProps {
  videoUrl: string;
  thumbnailUrl?: string;
  alt: string;
  className?: string;
}

export default function VideoThumbnail({
  videoUrl,
  thumbnailUrl,
  alt,
  className = '',
}: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      if (video.paused) {
        video.play().catch(err => {
          console.error('Error playing video:', err);
        });
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <div className={`relative aspect-square overflow-hidden ${className}`}>
      {thumbnailUrl && !isLoaded && (
        <Image
          src={thumbnailUrl}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      )}
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        loop
        playsInline
        autoPlay
        className="w-full h-full object-cover"
      />
    </div>
  );
} 