"use client";

import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
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
      });

      // Force reload the video
      videoRef.current.load();
    }
  }, []);

  return (
    <div ref={inViewRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
      >
        <source src="/videos/video-intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
} 