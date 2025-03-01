'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface VideoAsset {
  asset: {
    _ref: string;
    url: string;
  };
}

interface ThumbnailAsset {
  asset: {
    url: string;
  };
}

interface VideoPlayerProps {
  video: VideoAsset;
  thumbnail?: ThumbnailAsset;
  caption?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

export default function VideoPlayer({
  video,
  thumbnail,
  caption,
  autoPlay = false,
  loop = true,
  muted = true,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Handle autoplay when in view
  useEffect(() => {
    if (!videoRef.current) return;

    if (inView && autoPlay) {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
      });
      setIsPlaying(true);
    } else if (!inView && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [inView, autoPlay, isPlaying]);

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
      });
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle video loaded
  const handleVideoLoaded = () => {
    setIsLoaded(true);
  };

  const videoSrc = video?.asset?.url || '';

  if (!videoSrc) {
    return <div className="bg-gray-200 aspect-video flex items-center justify-center">No video source</div>;
  }

  return (
    <div ref={ref} className={`video-container ${className}`}>
      <div className="relative aspect-video bg-black">
        {thumbnail && !isLoaded && (
          <div className="absolute inset-0 z-10">
            <Image 
              src={thumbnail.asset.url} 
              alt={caption || "Video thumbnail"} 
              fill 
              className="object-contain"
            />
          </div>
        )}
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain"
          loop={loop}
          muted={muted}
          playsInline
          onClick={togglePlay}
          controls
          onLoadedData={handleVideoLoaded}
        />
        {!isPlaying && (
          <button
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-20"
            onClick={togglePlay}
            aria-label="Play video"
          >
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>
      {caption && (
        <p className="mt-2 text-sm text-gray-600">{caption}</p>
      )}
    </div>
  );
} 