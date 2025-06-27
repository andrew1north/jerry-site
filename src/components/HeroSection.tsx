"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import GameStart from "./GameStart";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [userTriggeredPlay, setUserTriggeredPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { ref: inViewRef } = useInView({
    threshold: 0.5,
  });

  // Handle manual play button click
  const handlePlayClick = async () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      setUserTriggeredPlay(true);
      setShowPlayButton(false);
      try {
        await videoElement.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Manual play failed:', error);
        setShowPlayButton(true);
      }
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      let autoplayTimeout: NodeJS.Timeout;
      
      const handleError = (e: Event) => {
        console.error('Video error:', e);
        setIsAutoplayBlocked(true);
        setShowPlayButton(true);
      };
      
      const handleLoadedData = () => {
        console.log('Video loaded successfully');
        setIsLoaded(true);
        
        // Set timeout to detect if autoplay doesn't start
        autoplayTimeout = setTimeout(() => {
          if (!isPlaying && !userTriggeredPlay) {
            console.log('Autoplay timeout - likely blocked');
            setIsAutoplayBlocked(true);
            setShowPlayButton(true);
          }
        }, 1000);
        
        // Try to play after the video is loaded
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Autoplay failed after load:', error);
            setIsAutoplayBlocked(true);
            setShowPlayButton(true);
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
        if (!userTriggeredPlay) {
          setIsAutoplayBlocked(true);
          setShowPlayButton(true);
        }
      };

      const handlePlay = () => {
        console.log('Video started playing');
        setIsPlaying(true);
        setShowPlayButton(false);
        if (autoplayTimeout) {
          clearTimeout(autoplayTimeout);
        }
      };

      const handlePause = () => {
        console.log('Video paused');
        setIsPlaying(false);
      };

      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('suspend', handleSuspend);
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      
      // Load the video
      videoElement.load();

      return () => {
        if (autoplayTimeout) {
          clearTimeout(autoplayTimeout);
        }
        videoElement.removeEventListener('error', handleError);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('suspend', handleSuspend);
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
      };
    }
  }, [isPlaying, userTriggeredPlay]);

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
      
      {/* Play Button for Low Power Mode */}
      {showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            onClick={handlePlayClick}
            className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-6 
                     hover:bg-white/30 transition-all duration-300 group"
            aria-label="Play video"
          >
            <svg 
              className="w-12 h-12 text-white ml-1 group-hover:scale-110 transition-transform duration-300" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      )}
      
      {/* GameStart component */}
      <GameStart />
    </div>
  );
} 