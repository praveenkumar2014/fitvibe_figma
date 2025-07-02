
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [showConsultantPopup, setShowConsultantPopup] = useState(false);
  const [consultantForm, setConsultantForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before allowing state updates
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConsultantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mounted) return;

    console.log('Consultant inquiry:', consultantForm);
    setShowConsultantPopup(false);
    // Handle form submission
  };

  const handlePopupToggle = () => {
    if (!mounted) return;
    setShowConsultantPopup(true);
  };

  const handlePopupClose = () => {
    if (!mounted) return;
    setShowConsultantPopup(false);
  };

  const handleFormChange = (field: string, value: string) => {
    if (!mounted) return;
    setConsultantForm(prev => ({...prev, [field]: value}));
  };

  const featuredTrainers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Personal Training & Nutrition',
      experience: '8 years',
      rating: 4.9,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20fitness%20trainer%20with%20energetic%20smile%2C%20athletic%20build%2C%20modern%20gym%20background%2C%20confident%20pose%2C%20fitness%20professional%20portrait%20with%20green%20and%20blue%20lighting%20accents&width=300&height=300&seq=trainer001&orientation=squarish',
      price: '₹1,500/session'
    },
    {
      id: 2,
      name: 'Mike Chen',
      specialty: 'Strength & Conditioning',
      experience: '12 years',
      rating: 4.8,
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20strength%20trainer%20with%20muscular%20build%2C%20confident%20expression%2C%20modern%20fitness%20studio%20background%2C%20athletic%20pose%20with%20green%20blue%20gradient%20lighting&width=300&height=300&seq=trainer002&orientation=squarish',
      price: '₹2,000/session'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      specialty: 'Yoga & Wellness',
      experience: '6 years',
      rating: 4.9,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20yoga%20instructor%20in%20peaceful%20meditation%20pose%2C%20serene%20expression%2C%20modern%20wellness%20studio%20with%20green%20blue%20ambient%20lighting%2C%20holistic%20health%20expert&width=300&height=300&seq=trainer003&orientation=squarish',
      price: '₹1,200/session'
    }
  ];

  const featuredConsultants = [
    {
      id: 1,
      name: 'Dr. Arjun Patel',
      specialty: 'Sports Nutrition',
      qualification: 'PhD in Nutrition Science',
      rating: 4.9,
      image: 'https://readdy.ai/api/search-image?query=Professional%20nutritionist%20doctor%20in%20modern%20clinic%20setting%2C%20confident%20healthcare%20professional%2C%20clean%20medical%20background%20with%20green%20blue%20gradient%20accents%2C%20nutrition%20expert%20portrait&width=300&height=300&seq=consultant001&orientation=squarish',
      price: '₹1,800/consultation'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'Weight Management',
      qualification: 'MD in Endocrinology',
      rating: 4.8,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20doctor%20specializing%20in%20weight%20management%2C%20modern%20medical%20office%20background%2C%20confident%20healthcare%20professional%20with%20green%20blue%20lighting%20theme&width=300&height=300&seq=consultant002&orientation=squarish',
      price: '₹2,200/consultation'
    },
    {
      id: 3,
      name: 'Dr. Rohit Kumar',
      specialty: 'Sports Medicine',
      qualification: 'MBBS, Sports Medicine',
      rating: 4.7,
      image: 'https://readdy.ai/api/search-image?query=Professional%20sports%20medicine%20doctor%20in%20clinical%20setting%2C%20athletic%20healthcare%20specialist%2C%20modern%20medical%20background%20with%20green%20blue%20gradient%20lighting&width=300&height=300&seq=consultant003&orientation=squarish',
      price: '₹2,500/consultation'
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Whey Protein',
      category: 'Protein Supplements',
      price: '₹2,499',
      originalPrice: '₹2,999',
      rating: 4.8,
      image: 'https://readdy.ai/api/search-image?query=Premium%20whey%20protein%20container%20with%20modern%20packaging%20design%2C%20fitness%20supplement%20product%20photography%20on%20clean%20white%20background%20with%20green%20blue%20gradient%20accents&width=300&height=300&seq=product001&orientation=squarish'
    },
    {
      id: 2,
      name: 'Smart Fitness Tracker',
      category: 'Wearable Tech',
      price: '₹4,999',
      originalPrice: '₹6,999',
      rating: 4.9,
      image: 'https://readdy.ai/api/search-image?query=Modern%20smart%20fitness%20tracker%20wearable%20device%20with%20sleek%20design%2C%20high-tech%20fitness%20gadget%20on%20clean%20background%20with%20green%20blue%20gradient%20lighting%20effects&width=300&height=300&seq=product002&orientation=squarish'
    },
    {
      id: 3,
      name: 'Resistance Bands Set',
      category: 'Fitness Equipment',
      price: '₹899',
      originalPrice: '₹1,299',
      rating: 4.7,
      image: 'https://readdy.ai/api/search-image?query=Professional%20resistance%20bands%20set%20for%20home%20workout%2C%20colorful%20fitness%20equipment%20arranged%20aesthetically%20on%20clean%20background%20with%20green%20blue%20gradient%20theme&width=300&height=300&seq=product003&orientation=squarish'
    }
  ];

  // Don't render until component is mounted to prevent hydration mismatches
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section 
        className="relative bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white py-16 sm:py-20 lg:py-24"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20fitness%20lifestyle%20with%20people%20exercising%20in%20bright%20energetic%20environment%2C%20diverse%20athletes%20training%20together%2C%20vibrant%20gym%20atmosphere%20with%20green%20and%20blue%20lighting%2C%20motivational%20fitness%20scene%20with%20professional%20equipment&width=1200&height=600&seq=hero001&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-blue-600/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
              Transform Your Life with <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Fitvibe</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
              Connect with certified trainers, expert consultants, and premium fitness products. Your complete wellness ecosystem in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4">
              <Link href="/services/trainers" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-105 whitespace-nowrap text-sm sm:text-base">
                Find Your Trainer
              </Link>
              <button 
                onClick={handlePopupToggle}
                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 whitespace-nowrap text-sm sm:text-base"
              >
                Quick Consultation
              </button>
            </div>

            {/* Enhanced App Download Buttons - More Prominent */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mx-4 sm:mx-8 lg:mx-auto lg:max-w-2xl">
              <p className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-yellow-300">📱 Download Fitvibe App - Get Started Today!</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
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
        </div>
      </section>

      {/* Floating Quick Consultant CTA - Always Visible */}
      <div className="fixed bottom-4 right-4 z-50 lg:bottom-8 lg:right-8">
        <button
          onClick={handlePopupToggle}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-3 lg:px-6 lg:py-4 rounded-full shadow-2xl hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-110 flex items-center space-x-2 animate-pulse"
        >
          <div className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center">
            <i className="ri-customer-service-2-fill text-lg lg:text-xl"></i>
          </div>
          <span className="font-bold text-sm lg:text-base hidden sm:block">Quick Consult</span>
        </button>
      </div>

      {/* About Fitvibe Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              About Fitvibe
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4">
              Fitvibe is your comprehensive fitness and wellness platform, connecting you with certified trainers, 
              expert consultants, and premium products. We're revolutionizing how people approach their health journey 
              through technology, expertise, and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 px-4">
            <div className="text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <i className="ri-user-star-line text-2xl lg:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">Expert Trainers</h3>
              <p className="text-gray-600">Certified professionals with years of experience to guide your fitness journey</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <i className="ri-heart-pulse-line text-2xl lg:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">Health Consultants</h3>
              <p className="text-gray-600">Medical professionals specializing in nutrition, weight management, and wellness</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <i className="ri-shopping-cart-line text-2xl lg:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">Premium Products</h3>
              <p className="text-gray-600">Curated selection of supplements, equipment, and wellness products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trainers Carousel */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Featured Trainers
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Work with the best certified fitness professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredTrainers.map((trainer) => (
              <div key={trainer.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover object-top"
                />
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{trainer.name}</h3>
                    <div className="flex items-center">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      <span className="text-sm font-medium">{trainer.rating}</span>
                    </div>
                  </div>
                  <p className="text-blue-600 font-medium mb-2 text-sm sm:text-base">{trainer.specialty}</p>
                  <p className="text-gray-600 text-sm mb-4">{trainer.experience} experience</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {trainer.price}
                    </span>
                    <Link 
                      href={`/services/trainers/${trainer.id}`}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 sm:px-6 py-2 rounded-full font-medium hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap text-sm sm:text-base"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <Link 
              href="/services/trainers"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 whitespace-nowrap"
            >
              View All Trainers
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Consultants Carousel */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Featured Consultants
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Get expert medical and nutritional guidance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredConsultants.map((consultant) => (
              <div key={consultant.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <img
                  src={consultant.image}
                  alt={consultant.name}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover object-top"
                />
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{consultant.name}</h3>
                    <div className="flex items-center">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      <span className="text-sm font-medium">{consultant.rating}</span>
                    </div>
                  </div>
                  <p className="text-blue-600 font-medium mb-2 text-sm sm:text-base">{consultant.specialty}</p>
                  <p className="text-gray-600 text-sm mb-4">{consultant.qualification}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {consultant.price}
                    </span>
                    <Link 
                      href={`/services/consultants/${consultant.id}`}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 sm:px-6 py-2 rounded-full font-medium hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap text-sm sm:text-base"
                    >
                      Consult Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <Link 
              href="/services/consultants"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 whitespace-nowrap"
            >
              View All Consultants
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Featured Products
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Premium supplements and fitness equipment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover object-top"
                />
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{product.name}</h3>
                    <div className="flex items-center">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-blue-600 font-medium mb-4 text-sm sm:text-base">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    <Link 
                      href={`/services/products/${product.id}`}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 sm:px-6 py-2 rounded-full font-medium hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap text-sm sm:text-base"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <Link 
              href="/services/products"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 whitespace-nowrap"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Become a Professional CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Join the Fitvibe Community
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto">
            Share your expertise and grow your practice. Join thousands of professionals who are already transforming lives through Fitvibe.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 hover:bg-white/20 transition-all">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <i className="ri-user-star-line text-2xl lg:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Become a Trainer</h3>
              <p className="text-white/90 mb-4 lg:mb-6">Share your fitness expertise and help others achieve their goals</p>
              <Link 
                href="/become-trainer"
                className="bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold hover:bg-gray-100 transition-all whitespace-nowrap text-sm sm:text-base"
              >
                Apply Now
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 hover:bg-white/20 transition-all">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <i className="ri-heart-pulse-line text-2xl lg:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Join as Consultant</h3>
              <p className="text-white/90 mb-4 lg:mb-6">Provide medical and nutritional guidance to our community</p>
              <Link 
                href="/join-consultant"
                className="bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold hover:bg-gray-100 transition-all whitespace-nowrap text-sm sm:text-base"
              >
                Join Now
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 hover:bg-white/20 transition-all">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <i className="ri-store-line text-2xl lg:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Vendor Registration</h3>
              <p className="text-white/90 mb-4 lg:mb-6">Sell your fitness products to our growing community</p>
              <Link 
                href="/vendor-registration"
                className="bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold hover:bg-gray-100 transition-all whitespace-nowrap text-sm sm:text-base"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Quick Form */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Have questions? We're here to help you start your fitness journey.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interest</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                  <option>Personal Training</option>
                  <option>Nutrition Consultation</option>
                  <option>Products</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 whitespace-nowrap"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Consultant Popup - Enhanced */}
      {showConsultantPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Quick Consultation
              </h3>
              <button 
                onClick={handlePopupClose}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleConsultantSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={consultantForm.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={consultantForm.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={consultantForm.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={consultantForm.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Briefly describe your needs..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap"
              >
                Request Consultation
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
