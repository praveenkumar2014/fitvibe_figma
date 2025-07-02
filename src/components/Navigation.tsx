import React from 'react';
import { Calculator } from 'lucide-react';

interface NavigationProps {
  onOpenWidget: () => void;
}

export function Navigation({ onOpenWidget }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Calculator className="h-8 w-8 text-[#1D6FB9]" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-[#1D6FB9]">Home</a>
            <a href="#" className="text-gray-700 hover:text-[#1D6FB9]">Services</a>
            <a href="#" className="text-gray-700 hover:text-[#1D6FB9]">About</a>
            <a href="#" className="text-gray-700 hover:text-[#1D6FB9]">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}