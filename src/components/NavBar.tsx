"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);

  // Handle blur animation
  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    const duration = 300; // match the duration of other animations

    const animateBlur = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (isMenuOpen) {
        setBlurAmount(progress * 8); // 0px to 8px blur
      } else {
        setBlurAmount(8 - progress * 8); // 8px to 0px blur
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateBlur);
      }
    };

    // Start animation
    animationFrame = requestAnimationFrame(animateBlur);

    // Cleanup
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isMenuOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2 sm:gap-6">
                <span className="text-lg sm:text-2xl font-bold tracking-wider">JERRY LESTER |</span>
                <Image
                  src="/jerrylesterstudioslogo.svg"
                  alt="Jerry Lester Studios"
                  width={150}
                  height={48}
                  className="w-auto h-6 sm:h-8"
                />
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <Link
                href="/portfolio"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="/shop"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Shop
              </Link>
              
              {/* Hamburger menu button (visible on all screen sizes) */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile menu links and button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out panel with smooth animations */}
      <div 
        className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Darkening overlay */}
        <div 
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Blur overlay - using inline style for dynamic blur value */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            transition: 'backdrop-filter 300ms ease-out'
          }}
        ></div>
        
        {/* Panel with slide effect */}
        <div 
          className={`absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close button */}
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu content with appear animation */}
          <div className="h-full overflow-y-auto py-16 px-6">
            <nav className="flex flex-col space-y-8">
              {/* All menu items for mobile */}
              {[
                { name: 'Portfolio', href: '/portfolio', mobileOnly: true },
                { name: 'Shop', href: '/shop', mobileOnly: true },
                { name: 'About', href: '/about', mobileOnly: false },
                { name: 'Photos', href: '/photos', mobileOnly: false },
                { name: 'Listen', href: '/listen', mobileOnly: false },
                { name: 'Contact', href: '/contact', mobileOnly: false }
              ].map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-700 hover:text-gray-900 text-xl font-medium transform transition-all duration-300 ${
                    isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  } ${item.mobileOnly ? 'sm:hidden' : ''}`}
                  style={{ transitionDelay: `${150 + index * 75}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
} 