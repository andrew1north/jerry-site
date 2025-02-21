"use client";

import React, { useState, useEffect } from 'react';
import PressStart from './PressStart';
import PlayButton from './PlayButton';

export default function GameStart() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 6910);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-16 md:bottom-24 flex flex-col items-center gap-3 pointer-events-none">
      <PressStart className="animate-pulse" />
      <PlayButton 
        className="pointer-events-auto cursor-pointer" 
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}
      />
    </div>
  );
} 