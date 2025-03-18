"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Photo = {
  _key: string;
  asset: {
    url: string;
  };
  caption?: string;
  alt?: string;
};

type PhotoModalProps = {
  photos: Photo[];
  selectedIndex: number;
  onClose: () => void;
};

export default function PhotoModal({ photos, selectedIndex, onClose }: PhotoModalProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [photos.length, onClose]);
  
  const currentPhoto = photos[currentIndex];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white z-10 p-2"
        aria-label="Close modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      {/* Navigation buttons */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      
      {/* Image */}
      <div className="relative max-h-[90vh] max-w-[90vw]">
        <Image
          src={currentPhoto.asset.url}
          alt={currentPhoto.alt || "Photo"}
          width={1200}
          height={800}
          className="max-h-[90vh] w-auto h-auto object-contain"
        />
        
        {/* Caption */}
        {currentPhoto.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
            <p>{currentPhoto.caption}</p>
          </div>
        )}
      </div>
      
      {/* Photo counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  );
} 