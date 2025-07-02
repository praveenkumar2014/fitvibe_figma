
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMenuToggle = () => {
    if (!mounted) return;
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    if (!mounted) return;
    setIsMenuOpen(false);
  };

  const handleServicesShow = () => {
    if (!mounted) return;
    setShowServicesDropdown(true);
  };

  const handleServicesHide = () => {
    if (!mounted) return;
    setShowServicesDropdown(false);
  };

  // Prevent hydration issues by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <header className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Fitvibe
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              <Link href="/" className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium">
                Home
              </Link>
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium">
                  Services
                  <i className="ri-arrow-down-s-line ml-1"></i>
                </button>
              </div>
              <Link href="/about" className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium text-sm sm:text-base">
                Login
              </Link>
              <Link href="/signup" className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full hover:from-green-600 hover:to-blue-600 transition-all font-medium whitespace-nowrap text-sm sm:text-base">
                Sign Up
              </Link>
              <button className="lg:hidden p-1">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-menu-line text-xl"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Fitvibe
            </Link>
          </div>
          
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium">
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleServicesShow}
              onMouseLeave={handleServicesHide}
            >
              <button className="flex items-center text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium">
                Services
                <i className="ri-arrow-down-s-line ml-1"></i>
              </button>
              
              {showServicesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border py-2 z-50">
                  <Link href="/services/trainers" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-user-star-line text-white"></i>
                    </div>
                    <div>
                      <div className="font-medium">Trainers</div>
                      <div className="text-sm text-gray-500">Personal fitness experts</div>
                    </div>
                  </Link>
                  
                  <Link href="/services/consultants" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-heart-pulse-line text-white"></i>
                    </div>
                    <div>
                      <div className="font-medium">Consultants</div>
                      <div className="text-sm text-gray-500">Medical & nutrition experts</div>
                    </div>
                  </Link>
                  
                  <Link href="/services/products" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-shopping-cart-line text-white"></i>
                    </div>
                    <div>
                      <div className="font-medium">Products</div>
                      <div className="text-sm text-gray-500">Supplements & equipment</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
            
            <Link href="/about" className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium text-sm sm:text-base">
              Login
            </Link>
            <Link href="/signup" className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full hover:from-green-600 hover:to-blue-600 transition-all font-medium whitespace-nowrap text-sm sm:text-base">
              Sign Up
            </Link>
            <button 
              className="lg:hidden p-1" 
              onClick={handleMenuToggle}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium"
                onClick={handleMenuClose}
              >
                Home
              </Link>
              <Link 
                href="/services/trainers" 
                className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium pl-4"
                onClick={handleMenuClose}
              >
                Trainers
              </Link>
              <Link 
                href="/services/consultants" 
                className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium pl-4"
                onClick={handleMenuClose}
              >
                Consultants
              </Link>
              <Link 
                href="/services/products" 
                className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium pl-4"
                onClick={handleMenuClose}
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium"
                onClick={handleMenuClose}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text transition-all font-medium"
                onClick={handleMenuClose}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
