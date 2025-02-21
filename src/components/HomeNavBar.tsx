"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomeNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              JERRY
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/about"
              className="text-white hover:text-gray-200 transition-colors"
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className="text-white hover:text-gray-200 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/shop"
              className="text-white hover:text-gray-200 transition-colors"
            >
              Shop
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
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
              ) : (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-black/80 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/about"
              className="block px-3 py-2 text-white hover:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className="block px-3 py-2 text-white hover:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/shop"
              className="block px-3 py-2 text-white hover:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 