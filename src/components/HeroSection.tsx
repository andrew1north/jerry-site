"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import GameStart from "./GameStart";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: inViewRef } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleError = (e: Event) => {
        console.error('Video error:', e);
      };
      
      const handleLoadedData = () => {
        console.log('Video loaded successfully');
        setIsLoaded(true);
        
        // Try to play after the video is loaded
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Autoplay failed after load:', error);
          });
        }
      };

      const handleTimeUpdate = () => {
        if (videoElement && videoElement.currentTime >= 7.6) {
          videoElement.currentTime = 7.2;
        }
      };

      const handleSuspend = () => {
        console.log('Video suspended (likely Low Power Mode or autoplay blocked)');
      };

      const handlePlay = () => {
        console.log('Video started playing');
      };

      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('suspend', handleSuspend);
      videoElement.addEventListener('play', handlePlay);
      
      // Load the video (this was in your original code)
      videoElement.load();

      return () => {
        videoElement.removeEventListener('error', handleError);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('suspend', handleSuspend);
        videoElement.removeEventListener('play', handlePlay);
      };
    }
  }, []);

  return (
    <div ref={inViewRef} className="relative min-h-[200px] h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`absolute w-full h-full object-cover transition-all duration-1000 ease-in-out
          min-h-[600px] scale-[1.02]
          ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      >
        <source src="/videos/intro_crop_noaudio.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* GameStart component */}
      <GameStart />
    </div>
  );
} 