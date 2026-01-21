
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-['Pacifico'] text-xl text-gray-900">PearlFountain</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-rose-500 transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-rose-500 transition-colors flex items-center">
                Services
                <i className="ri-arrow-down-s-line ml-1"></i>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/booking" className="block px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                  Event Hall Booking
                </Link>
                <Link href="/tent-rental" className="block px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                  Canopy Tent Rental
                </Link>
                <Link href="/truck-hire" className="block px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                  Truck Hire Service
                </Link>
                <Link href="/services" className="block px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors border-t border-gray-100">
                  All Services
                </Link>
              </div>
            </div>
            <Link href="/books" className="text-gray-700 hover:text-rose-500 transition-colors">
              Books
            </Link>
            <Link href="/experience-hub" className="text-gray-700 hover:text-rose-500 transition-colors">
              Experience Hub
            </Link>
            <Link href="/quiz" className="text-gray-700 hover:text-rose-500 transition-colors">
              Quiz
            </Link>
            <Link 
              href="/booking" 
              className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-6 h-6 flex items-center justify-center"
          >
            <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl text-gray-700`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-rose-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="space-y-2">
                <div className="text-gray-700 font-medium">Services</div>
                <Link 
                  href="/booking" 
                  className="text-gray-600 hover:text-rose-500 transition-colors ml-4 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Event Hall Booking
                </Link>
                <Link 
                  href="/tent-rental" 
                  className="text-gray-600 hover:text-rose-500 transition-colors ml-4 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Canopy Tent Rental
                </Link>
                <Link 
                  href="/truck-hire" 
                  className="text-gray-600 hover:text-rose-500 transition-colors ml-4 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Truck Hire Service
                </Link>
                <Link 
                  href="/services" 
                  className="text-gray-600 hover:text-rose-500 transition-colors ml-4 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Services
                </Link>
              </div>
              <Link 
                href="/books" 
                className="text-gray-700 hover:text-rose-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Books
              </Link>
              <Link 
                href="/experience-hub" 
                className="text-gray-700 hover:text-rose-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience Hub
              </Link>
              <Link 
                href="/quiz" 
                className="text-gray-700 hover:text-rose-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz
              </Link>
              <Link 
                href="/booking" 
                className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
