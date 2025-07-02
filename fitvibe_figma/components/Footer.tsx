
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              Fitvibe
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Transform your health journey with expert trainers, consultants, and premium fitness products. Your wellness ecosystem in one platform.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center hover:from-green-500 hover:to-blue-600 transition-all cursor-pointer">
                <i className="ri-facebook-fill text-lg sm:text-xl text-white"></i>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center hover:from-green-500 hover:to-blue-600 transition-all cursor-pointer">
                <i className="ri-twitter-fill text-lg sm:text-xl text-white"></i>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center hover:from-green-500 hover:to-blue-600 transition-all cursor-pointer">
                <i className="ri-instagram-fill text-lg sm:text-xl text-white"></i>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center hover:from-green-500 hover:to-blue-600 transition-all cursor-pointer">
                <i className="ri-linkedin-fill text-lg sm:text-xl text-white"></i>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 sm:mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Services</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li><Link href="/services/trainers" className="text-gray-400 hover:text-white transition-colors">Personal Trainers</Link></li>
              <li><Link href="/services/consultants" className="text-gray-400 hover:text-white transition-colors">Health Consultants</Link></li>
              <li><Link href="/services/products" className="text-gray-400 hover:text-white transition-colors">Fitness Products</Link></li>
              <li><Link href="/services/nutrition" className="text-gray-400 hover:text-white transition-colors">Nutrition Plans</Link></li>
              <li><Link href="/services/wellness" className="text-gray-400 hover:text-white transition-colors">Wellness Programs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 sm:mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">For Professionals</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li><Link href="/become-trainer" className="text-gray-400 hover:text-white transition-colors">Become a Trainer</Link></li>
              <li><Link href="/join-consultant" className="text-gray-400 hover:text-white transition-colors">Join as Consultant</Link></li>
              <li><Link href="/vendor-registration" className="text-gray-400 hover:text-white transition-colors">Vendor Registration</Link></li>
              <li><Link href="/partner-with-us" className="text-gray-400 hover:text-white transition-colors">Partner with Us</Link></li>
              <li><Link href="/professional-support" className="text-gray-400 hover:text-white transition-colors">Professional Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 sm:mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Support</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Enhanced App Download Section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0 text-center lg:text-left">
              <h4 className="text-lg font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">📱 Download Fitvibe App</h4>
              <p className="text-gray-400 text-sm sm:text-base">Get the full experience on your mobile device - Available on all platforms</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
              <Link href="#" className="flex items-center bg-black text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-google-play-fill text-xl sm:text-2xl text-green-400"></i>
                </div>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </Link>
              <Link href="#" className="flex items-center bg-black text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-apple-fill text-xl sm:text-2xl text-blue-400"></i>
                </div>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">© 2024 Fitvibe. All rights reserved. Transforming lives through fitness and wellness.</p>
        </div>
      </div>
    </footer>
  );
}
