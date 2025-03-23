'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

type ImageGalleryProps = {
  images: string[];
  productName: string;
};

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full">
      {/* Mobile/Tablet View */}
      <div className="block lg:hidden h-[500px]">
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {images.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image 
                  src={imgUrl}
                  alt={`${productName} - view ${index + 1}`}
                  fill
                  priority={index === 0}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        {/* Main Image */}
        <div className="relative h-[600px] w-full group">
          <Image 
            src={images[selectedImage]}
            alt={`${productName} - view ${selectedImage + 1}`}
            fill
            priority
            style={{ objectFit: "contain" }}
          />
          
          {/* Left Navigation Area */}
          <button 
            onClick={handlePrevImage}
            className="absolute left-0 top-0 w-1/3 h-full flex items-center justify-start px-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="bg-black/50 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>

          {/* Right Navigation Area */}
          <button 
            onClick={handleNextImage}
            className="absolute right-0 top-0 w-1/3 h-full flex items-center justify-end px-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="bg-black/50 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
        
        {/* Thumbnail navigation */}
        <div className="flex mt-4 gap-2 overflow-x-auto">
          {images.map((imgUrl, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="w-20 h-20 relative flex-shrink-0 cursor-pointer"
            >
              <Image
                src={imgUrl}
                alt={`${productName} - view ${index + 1}`}
                fill
                sizes="80px"
                style={{ objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 