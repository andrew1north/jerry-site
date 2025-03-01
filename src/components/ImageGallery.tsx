"use client";

import { useState } from "react";
import Image from "next/image";

type ImageGalleryProps = {
  images: string[];
  altText: string;
};

export default function ImageGallery({ images, altText }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle empty images array
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image
          src="/images/placeholder.jpg"
          alt="Product image placeholder"
          fill
          className="object-contain"
        />
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main image with navigation arrows */}
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image
          src={images[currentIndex]}
          alt={`${altText} - Image ${currentIndex + 1}`}
          fill
          className="object-contain"
        />
        
        {/* Only show navigation arrows if there's more than one image */}
        {images.length > 1 && (
          <>
            {/* Left arrow */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            {/* Right arrow */}
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail grid - only show if there's more than one image */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative aspect-square rounded-sm overflow-hidden border-2 ${
                index === currentIndex ? "border-black" : "border-transparent"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${altText} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 