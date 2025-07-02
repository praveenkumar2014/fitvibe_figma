'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TrainersPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: 'ri-star-line' },
    { id: 'personal', name: 'Personal Training', icon: 'ri-user-star-line' },
    { id: 'strength', name: 'Strength Training', icon: 'ri-hammer-line' },
    { id: 'cardio', name: 'Cardio & HIIT', icon: 'ri-heart-pulse-line' },
    { id: 'yoga', name: 'Yoga & Flexibility', icon: 'ri-leaf-line' },
    { id: 'nutrition', name: 'Nutrition Coaching', icon: 'ri-apple-line' },
    { id: 'weight-loss', name: 'Weight Loss', icon: 'ri-scales-line' },
    { id: 'bodybuilding', name: 'Bodybuilding', icon: 'ri-trophy-line' }
  ];

  const trainers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Personal Training & Nutrition',
      experience: '8 years',
      rating: 4.9,
      reviews: 324,
      price: 1500,
      location: 'Mumbai',
      languages: ['English', 'Hindi'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20fitness%20trainer%20with%20energetic%20smile%2C%20athletic%20build%2C%20modern%20gym%20background%2C%20confident%20pose%2C%20fitness%20professional%20portrait%20with%20green%20and%20blue%20lighting%20accents&width=300&height=400&seq=trainer001&orientation=portrait',
      certifications: ['ACSM Certified', 'Nutrition Specialist', 'HIIT Certified'],
      availability: 'Available',
      responseTime: '2 hours',
      specialties: ['personal', 'nutrition', 'weight-loss'],
      description: 'Dedicated personal trainer with 8+ years of experience helping clients achieve their fitness goals through personalized training and nutrition guidance.'
    },
    {
      id: 2,
      name: 'Mike Chen',
      specialty: 'Strength & Conditioning',
      experience: '12 years',
      rating: 4.8,
      reviews: 456,
      price: 2000,
      location: 'Delhi',
      languages: ['English', 'Hindi', 'Mandarin'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20strength%20trainer%20with%20muscular%20build%2C%20confident%20expression%2C%20modern%20fitness%20studio%20background%2C%20athletic%20pose%20with%20green%20blue%20gradient%20lighting&width=300&height=400&seq=trainer002&orientation=portrait',
      certifications: ['NSCA Certified', 'Powerlifting Coach', 'Olympic Lifting'],
      availability: 'Available',
      responseTime: '1 hour',
      specialties: ['strength', 'bodybuilding', 'personal'],
      description: 'Elite strength and conditioning coach specializing in powerlifting, bodybuilding, and athletic performance enhancement.'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      specialty: 'Yoga & Wellness',
      experience: '6 years',
      rating: 4.9,
      reviews: 289,
      price: 1200,
      location: 'Bangalore',
      languages: ['English', 'Spanish', 'Hindi'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20yoga%20instructor%20in%20peaceful%20meditation%20pose%2C%20serene%20expression%2C%20modern%20wellness%20studio%20with%20green%20blue%20ambient%20lighting%2C%20holistic%20health%20expert&width=300&height=400&seq=trainer003&orientation=portrait',
      certifications: ['RYT-500', 'Meditation Teacher', 'Prenatal Yoga'],
      availability: 'Busy',
      responseTime: '4 hours',
      specialties: ['yoga', 'nutrition', 'weight-loss'],
      description: 'Certified yoga instructor and wellness coach focusing on holistic health, mindfulness, and sustainable lifestyle changes.'
    },
    {
      id: 4,
      name: 'David Kim',
      specialty: 'HIIT & Cardio',
      experience: '5 years',
      rating: 4.7,
      reviews: 198,
      price: 1300,
      location: 'Chennai',
      languages: ['English', 'Hindi', 'Korean'],
      image: 'https://readdy.ai/api/search-image?query=Energetic%20male%20HIIT%20trainer%20in%20dynamic%20action%20pose%2C%20athletic%20build%2C%20modern%20cardio%20studio%20background%2C%20high%20energy%20fitness%20expert%20with%20green%20blue%20lighting&width=300&height=400&seq=trainer004&orientation=portrait',
      certifications: ['HIIT Certified', 'Group Fitness', 'Cardio Specialist'],
      availability: 'Available',
      responseTime: '1 hour',
      specialties: ['cardio', 'weight-loss', 'personal'],
      description: 'High-energy HIIT and cardio specialist helping clients burn fat, build endurance, and achieve peak cardiovascular fitness.'
    },
    {
      id: 5,
      name: 'Emma Thompson',
      specialty: 'Weight Loss & Nutrition',
      experience: '7 years',
      rating: 4.8,
      reviews: 367,
      price: 1600,
      location: 'Pune',
      languages: ['English', 'Hindi'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20fitness%20trainer%20specializing%20in%20weight%20loss%2C%20confident%20smile%2C%20modern%20gym%20setting%2C%20nutrition%20expert%20with%20green%20blue%20gradient%20background&width=300&height=400&seq=trainer005&orientation=portrait',
      certifications: ['Weight Loss Specialist', 'Nutrition Coach', 'Lifestyle Coach'],
      availability: 'Available',
      responseTime: '2 hours',
      specialties: ['weight-loss', 'nutrition', 'personal'],
      description: 'Certified weight loss and nutrition specialist with proven track record of helping clients achieve sustainable weight loss goals.'
    },
    {
      id: 6,
      name: 'Rajesh Kumar',
      specialty: 'Bodybuilding & Strength',
      experience: '15 years',
      rating: 4.9,
      reviews: 678,
      price: 2500,
      location: 'Hyderabad',
      languages: ['English', 'Hindi', 'Telugu'],
      image: 'https://readdy.ai/api/search-image?query=Experienced%20male%20bodybuilding%20trainer%20with%20impressive%20physique%2C%20professional%20demeanor%2C%20modern%20gym%20background%2C%20veteran%20fitness%20coach%20with%20green%20blue%20lighting&width=300&height=400&seq=trainer006&orientation=portrait',
      certifications: ['Master Trainer', 'Bodybuilding Coach', 'Advanced Nutrition'],
      availability: 'Available',
      responseTime: '30 mins',
      specialties: ['bodybuilding', 'strength', 'nutrition'],
      description: '15+ years of experience in bodybuilding and strength training, helping clients build muscle and achieve competition-ready physiques.'
    }
  ];

  const filteredTrainers = trainers.filter(trainer => {
    if (selectedSpecialty !== 'all' && !trainer.specialties.includes(selectedSpecialty)) return false;
    if (selectedLocation !== 'all' && trainer.location !== selectedLocation) return false;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max && (trainer.price < min || trainer.price > max)) return false;
      if (!max && trainer.price < min) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect <span className="text-yellow-300">Trainer</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connect with certified fitness professionals who will guide you to achieve your health and fitness goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/become-trainer" className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-all whitespace-nowrap">
              Become a Trainer
            </Link>
            <Link href="#trainers" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all whitespace-nowrap">
              Browse Trainers
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Find Your Trainer
              </h2>
              
              {/* Specialties Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Specialties</h3>
                <div className="space-y-2">
                  {specialties.map((specialty) => (
                    <button
                      key={specialty.id}
                      onClick={() => setSelectedSpecialty(specialty.id)}
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-all ${
                        selectedSpecialty === specialty.id
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center mr-3">
                        <i className={`${specialty.icon} text-lg`}></i>
                      </div>
                      <span className="font-medium">{specialty.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="all">All Locations</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="all">All Prices</option>
                  <option value="0-1000">Under ₹1,000</option>
                  <option value="1000-2000">₹1,000 - ₹2,000</option>
                  <option value="2000-3000">₹2,000 - ₹3,000</option>
                  <option value="3000">Above ₹3,000</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 rounded" />
                    <span className="text-gray-700">Available Now</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 rounded" />
                    <span className="text-gray-700">Quick Response (< 2 hours)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Trainers Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredTrainers.length} Trainers Found
                </h2>
                <p className="text-gray-600">Choose from our certified fitness professionals</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="experience">Most Experience</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="response">Response Time</option>
                </select>
              </div>
            </div>

            {/* Trainers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="trainers">
              {filteredTrainers.map((trainer) => (
                <div key={trainer.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                  <div className="relative">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-64 object-cover object-top"
                    />
                    <div className="absolute top-4 right-4">
                      {trainer.availability === 'Available' ? (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Available
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Busy
                        </span>
                      )}
                    </div>
                    <button className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <i className="ri-heart-line text-lg"></i>
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">{trainer.name}</h3>
                      <div className="flex items-center">
                        <i className="ri-star-fill text-yellow-400 text-lg mr-1"></i>
                        <span className="text-lg font-bold">{trainer.rating}</span>
                        <span className="text-gray-500 ml-1">({trainer.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-blue-600 font-bold text-lg mb-2">{trainer.specialty}</p>
                    <p className="text-gray-600 mb-4">{trainer.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trainer.certifications.slice(0, 2).map((cert, index) => (
                        <span key={index} className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                          {cert}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <i className="ri-time-line mr-2"></i>
                        <span>{trainer.experience}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="ri-map-pin-line mr-2"></i>
                        <span>{trainer.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="ri-chat-3-line mr-2"></i>
                        <span>{trainer.responseTime}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="ri-global-line mr-2"></i>
                        <span>{trainer.languages.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          ₹{trainer.price}
                        </span>
                        <span className="text-gray-600 text-sm block">per session</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/services/trainers/${trainer.id}`}
                          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap"
                        >
                          View Profile
                        </Link>
                        <button className="bg-white border-2 border-gradient-to-r from-green-500 to-blue-500 text-gray-700 px-4 py-3 rounded-full hover:bg-gray-50 transition-all">
                          <i className="ri-chat-1-line text-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTrainers.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-user-search-line text-4xl text-gray-400"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No trainers found</h3>
                <p className="text-gray-600 mb-8">Try adjusting your filters to find the perfect trainer for you.</p>
                <button 
                  onClick={() => {
                    setSelectedSpecialty('all');
                    setSelectedLocation('all');
                    setPriceRange('all');
                  }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}