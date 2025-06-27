"use client";

import React, { useState, useEffect } from 'react';
import PressStart from './PressStart';
import PlayButton from './PlayButton';
import Menu from './Menu';

interface GameStartProps {
  forceVisible?: boolean;
}

export default function GameStart({ forceVisible = false }: GameStartProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (forceVisible) {
      // Show immediately when autoplay is blocked
      setIsVisible(true);
    } else {
      // Normal behavior with delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 6910);
      return () => clearTimeout(timer);
    }
  }, [forceVisible]);

  const handlePlayClick = () => {
    setIsVisible(false);
    const videoElement = document.querySelector('video');
    const headerElement = document.querySelector('nav');
    
    if (headerElement) {
      headerElement.style.opacity = '0.3';
      headerElement.style.transition = 'opacity 0.5s ease-out';
    }
    
    if (videoElement) {
      // If this was triggered by low power mode detection, start the video
      if (forceVisible) {
        videoElement.play().catch(error => {
          console.error('Video play failed:', error);
        });
        // Don't hide the video in low power mode, let it play normally
        return;
      }
      
      videoElement.style.transform = 'translateY(-100%)';
      videoElement.style.transition = 'all 1s ease-in-out';
      videoElement.style.opacity = '0';
    }
    
    setTimeout(() => {
      setShowMenu(true);
    }, 500);
  };

  if (!mounted) return null;

  return (
    <>
      <div className={`absolute inset-x-0 bottom-16 md:bottom-24 z-10 flex flex-col items-center gap-3 pointer-events-none transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <PressStart className="animate-pulse" />
        <PlayButton 
          className="pointer-events-auto cursor-pointer" 
          onClick={handlePlayClick}
        />
      </div>
      {showMenu && !forceVisible && (
        <div className="fixed inset-0 z-50">
          <Menu />
        </div>
      )}
    </>
  );
} 