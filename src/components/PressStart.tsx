import React from 'react';
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface PressStartProps {
  className?: string;
}

const PressStart: React.FC<PressStartProps> = ({ className = "" }) => {
  return (
    <div 
      className={`${pressStart2P.className} text-white text-2xl md:text-4xl 
      tracking-wider uppercase pixelated ${className}`}
      style={{
        textShadow: "2px 2px 4px rgba(255,255,255,0.2)",
        WebkitFontSmoothing: "none",
      }}
    >
      Press Start
    </div>
  );
};

export default PressStart; 