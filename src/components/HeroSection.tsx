"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: inViewRef } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('error', (e) => {
        console.error('Video error:', e);
      });
      
      videoRef.current.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
        setIsLoaded(true);
      });

      videoRef.current.addEventListener('timeupdate', () => {
        if (videoRef.current && videoRef.current.currentTime >= 7.6) {
          videoRef.current.currentTime = 7.2;
        }
      });

      // Force reload the video
      videoRef.current.load();
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', () => {});
      }
    };
  }, []);

  return (
    <div ref={inViewRef} className="relative min-h-[200px] h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`absolute w-full h-full object-cover transition-opacity duration-300 
          min-h-[600px] scale-[1.02]
          ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        muted
        playsInline
        autoPlay
        preload="auto"
      >
        <source src="/videos/intro_crop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
} 