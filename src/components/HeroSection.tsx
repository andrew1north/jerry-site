"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import GameStart from "./GameStart";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { ref: inViewRef } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleError = (e: Event) => {
        console.error('Video error:', e);
        setIsAutoplayBlocked(true);
      };
      
      const handleLoadedData = () => {
        console.log('Video loaded successfully');
        setIsLoaded(true);
        
        // Try to play after the video is loaded
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Autoplay failed after load:', error);
            setIsAutoplayBlocked(true);
          });
        }
      };

      const handleTimeUpdate = () => {
        if (videoElement && videoElement.currentTime >= 7.6) {
          videoElement.currentTime = 7.2;
        }
      };

      const handlePlay = () => {
        console.log('Video started playing');
        setIsPlaying(true);
      };

      const handlePause = () => {
        console.log('Video paused');
        setIsPlaying(false);
      };

      // Only set autoplay blocked on actual play promise rejection or load errors
      const handleCanPlay = () => {
        // Last attempt to play when video can play
        if (!isPlaying) {
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log('Final autoplay attempt failed:', error);
              setIsAutoplayBlocked(true);
            });
          }
        }
      };

      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('canplay', handleCanPlay);
      
      // Load the video
      videoElement.load();

      return () => {
        videoElement.removeEventListener('error', handleError);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [isPlaying]);

  return (
    <div ref={inViewRef} className="relative min-h-[200px] h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`absolute w-full h-full object-cover transition-all duration-1000 ease-in-out
          min-h-[600px] scale-[1.02]
          ${isLoaded && !isAutoplayBlocked ? 'opacity-100' : 'opacity-0'}`}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      >
        <source src="/videos/intro_crop_noaudio.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Static Poster Image (shown when autoplay is blocked) */}
      {isAutoplayBlocked && (
        <div 
          className="absolute w-full h-full object-cover min-h-[600px] scale-[1.02] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-poster.jpg')" }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* GameStart component - pass isAutoplayBlocked to show immediately */}
      <GameStart forceVisible={isAutoplayBlocked} />
    </div>
  );
} 