"use client";

import React from 'react';

interface PlayButtonProps {
  onClick?: () => void;
  className?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      className={`relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center 
      transform transition-transform hover:scale-110 ${className}`}
      aria-label="Play button"
    >
      <div className="relative">
        {/* Actual pixelated triangle button based on the reference image */}
        <svg 
          width="124" 
          height="72" 
          viewBox="0 0 40 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main shape */}
          <rect x="8" y="4" width="4" height="24" fill="#9A32FF" />
          <rect x="12" y="6" width="4" height="20" fill="#9A32FF" />
          <rect x="16" y="8" width="4" height="16" fill="#9A32FF" />
          <rect x="20" y="10" width="4" height="12" fill="#9A32FF" />
          <rect x="24" y="12" width="4" height="8" fill="#9A32FF" />
          <rect x="28" y="14" width="4" height="4" fill="#9A32FF" />
          
          {/* White diagonal reflection line */}
          <rect x="12" y="8" width="2" height="2" fill="#FFFFFF" fillOpacity="0.6" />
          <rect x="14" y="10" width="2" height="2" fill="#FFFFFF" fillOpacity="0.6" />
          <rect x="16" y="12" width="2" height="2" fill="#FFFFFF" fillOpacity="0.6" />
          <rect x="18" y="14" width="2" height="2" fill="#FFFFFF" fillOpacity="0.6" />
        </svg>
        
        {/* Glow effect */}
        <div 
          className="absolute top-0 left-0 w-124 h-72 opacity-60 blur-3xl"
          style={{ 
            backgroundColor: 'rgba(154, 50, 255, 0.5)',
            width: '124px', 
            height: '72px',
            transform: 'scale(1.6)'
          }}
        ></div>
      </div>
    </button>
  );
};

export default PlayButton;