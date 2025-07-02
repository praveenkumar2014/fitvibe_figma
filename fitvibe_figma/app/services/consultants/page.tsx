'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConsultantsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: 'ri-heart-pulse-line' },
    { id: 'nutrition', name: 'Sports Nutrition', icon: 'ri-apple-line' },
    { id: 'weight-management', name: 'Weight Management', icon: 'ri-scales-line' },
    { id: 'sports-medicine', name: 'Sports Medicine', icon: 'ri-hospital-line' },
    { id: 'mental-health', name: 'Mental Health', icon: 'ri-brain-line' },
    { id: 'physiotherapy', name: 'Physiotherapy', icon: 'ri-hand-heart-line' },
    { id: 'cardiology', name: 'Cardiology', icon: 'ri-heart-line' },
    { id: 'endocrinology', name: 'Endocrinology', icon: 'ri-capsule-line' }
  ];

  const consultants = [
    {
      id: 1,
      name: 'Dr. Arjun Patel',
      specialty: 'Sports Nutrition',
      qualification: 'PhD in Nutrition Science, RD',
      experience: '12 years',
      rating: 4.9,
      reviews: 456,
      price: 1800,
      location: 'Mumbai',
      languages: ['English', 'Hindi', 'Gujarati'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20nutritionist%20doctor%20in%20modern%20clinic%20setting%2C%20confident%20healthcare%20professional%2C%20clean%20medical%20background%20with%20green%20blue%20gradient%20accents%2C%20nutrition%20expert%20portrait&width=300&height=400&seq=consultant001&orientation=portrait',
      certifications: ['Registered Dietitian', 'Sports Nutrition Specialist', 'Clinical Nutrition'],
      availability: 'Available',
      responseTime: '1 hour',
      specialties: ['nutrition', 'weight-management'],
      description: 'Leading sports nutrition expert with 12+ years helping athletes and fitness enthusiasts optimize their performance through evidence-based nutrition strategies.',
      consultationType: ['Video Call', 'Phone Call', 'In-Person'],
      nextAvailable: 'Today 3:00 PM'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'Weight Management & Endocrinology',
      qualification: 'MD Endocrinology, MBBS',
      experience: '15 years',
      rating: 4.8,
      reviews: 678,
      price: 2200,
      location: 'Delhi',
      languages: ['English', 'Hindi'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20doctor%20specializing%20in%20weight%20management%2C%20modern%20medical%20office%20background%2C%20confident%20healthcare%20professional%20with%20green%20blue%20lighting%20theme&width=300&height=400&seq=consultant002&orientation=portrait',
      certifications: ['Board Certified Endocrinologist', 'Obesity Medicine', 'Diabetes Specialist'],
      availability: 'Available',
      responseTime: '30 mins',
      specialties: ['weight-management', 'endocrinology'],
      description: 'Renowned endocrinologist specializing in metabolic disorders, weight management, and diabetes care with comprehensive treatment approaches.',
      consultationType: ['Video Call', 'In-Person'],
      nextAvailable: 'Tomorrow 10:00 AM'
    },
    {
      id: 3,
      name: 'Dr. Rohit Kumar',
      specialty: 'Sports Medicine',
      qualification: 'MBBS, MS Orthopedics, Sports Medicine',
      experience: '10 years',
      rating: 4.7,
      reviews: 334,
      price: 2500,
      location: 'Bangalore',
      languages: ['English', 'Hindi', 'Kannada'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20sports%20medicine%20doctor%20in%20clinical%20setting%2C%20athletic%20healthcare%20specialist%2C%20modern%20medical%20background%20with%20green%20blue%20gradient%20lighting&width=300&height=400&seq=consultant003&orientation=portrait',
      certifications: ['Sports Medicine Fellowship', 'Orthopedic Surgeon', 'Injury Prevention Specialist'],
      availability: 'Busy',
      responseTime: '2 hours',
      specialties: ['sports-medicine', 'physiotherapy'],
      description: 'Expert sports medicine physician with extensive experience in injury prevention, rehabilitation, and performance optimization for athletes.',
      consultationType: ['Video Call', 'In-Person'],
      nextAvailable: 'Next Week'
    },
    {
      id: 4,
      name: 'Dr. Meera Reddy',
      specialty: 'Mental Health & Wellness',
      qualification: 'MD Psychiatry, MPhil Psychology',
      experience: '8 years',
      rating: 4.9,
      reviews: 245,
      price: 2000,
      location: 'Chennai',
      languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20psychiatrist%20in%20calming%20office%20setting%2C%20mental%20health%20specialist%2C%20peaceful%20clinical%20background%20with%20soft%20green%20blue%20lighting&width=300&height=400&seq=consultant004&orientation=portrait',
      certifications: ['Board Certified Psychiatrist', 'Cognitive Behavioral Therapy', 'Mindfulness Coach'],
      availability: 'Available',
      responseTime: '1 hour',
      specialties: ['mental-health'],
      description: 'Compassionate mental health professional focusing on fitness psychology, stress management, and holistic wellness approaches.',
      consultationType: ['Video Call', 'Phone Call'],
      nextAvailable: 'Today 5:00 PM'
    },
    {
      id: 5,
      name: 'Dr. Vikram Singh',
      specialty: 'Physiotherapy & Rehabilitation',
      qualification: 'BPT, MPT, PhD Physiotherapy',
      experience: '14 years',
      rating: 4.8,
      reviews: 523,
      price: 1600,
      location: 'Pune',
      languages: ['English', 'Hindi', 'Marathi'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20physiotherapist%20in%20modern%20rehabilitation%20center%2C%20confident%20healthcare%20professional%2C%20clinical%20background%20with%20green%20blue%20gradient%20accents&width=300&height=400&seq=consultant005&orientation=portrait',
      certifications: ['Licensed Physiotherapist', 'Manual Therapy', 'Sports Rehabilitation'],
      availability: 'Available',
      responseTime: '2 hours',
      specialties: ['physiotherapy', 'sports-medicine'],
      description: 'Experienced physiotherapist specializing in sports injuries, movement disorders, and comprehensive rehabilitation programs.',
      consultationType: ['Video Call', 'In-Person'],
      nextAvailable: 'Today 4:00 PM'
    },
    {
      id: 6,
      name: 'Dr. Anjali Gupta',
      specialty: 'Cardiology & Preventive Medicine',
      qualification: 'MD Cardiology, DM Interventional Cardiology',
      experience: '18 years',
      rating: 4.9,
      reviews: 789,
      price: 3000,
      location: 'Hyderabad',
      languages: ['English', 'Hindi', 'Telugu'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20cardiologist%20in%20modern%20cardiac%20clinic%2C%20expert%20healthcare%20professional%2C%20advanced%20medical%20background%20with%20green%20blue%20lighting%20theme&width=300&height=400&seq=consultant006&orientation=portrait',
      certifications: ['Board Certified Cardiologist', 'Preventive Cardiology', 'Cardiac Rehabilitation'],
      availability: 'Available',
      responseTime: '1 hour',
      specialties: ['cardiology'],
      description: 'Leading cardiologist with expertise in preventive heart care, cardiac rehabilitation, and fitness-related cardiovascular health.',
      consultationType: ['Video Call', 'In-Person'],
      nextAvailable: 'Tomorrow 9:00 AM'
    }
  ];

  const filteredConsultants = consultants.filter(consultant => {
    if (selectedSpecialty !== 'all' && !consultant.specialties.includes(selectedSpecialty)) return false;
    if (selectedLocation !== 'all' && consultant.location !== selectedLocation) return false;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max && (consultant.price < min || consultant.price > max)) return false;
      if (!max && consultant.price < min) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Expert Health <span className="text-yellow-300">Consultants</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Get professional medical guidance from certified healthcare experts specializing in fitness, nutrition, and wellness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join-consultant" className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-all whitespace-nowrap">
              Join as Consultant
            </Link>
            <Link href="#consultants" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all whitespace-nowrap">
              Find Consultant
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
                Find Your Consultant
              </h2>
              
              {/* Specialties Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Medical Specialties</h3>
                <div className="space-y-2">
                  {specialties.map((specialty) => (
                    <button
                      key={specialty.id}
                      onClick={() => setSelectedSpecialty(specialty.id)}
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-all ${
                        selectedSpecialty === specialty.id
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
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
                <h3 className="font-bold text-gray-900 mb-4">Consultation Fee</h3>
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="all">All Prices</option>
                  <option value="0-1500">Under ₹1,500</option>
                  <option value="1500-2500">₹1,500 - ₹2,500</option>
                  <option value="2500-3500">₹2,500 - ₹3,500</option>
                  <option value="3500">Above ₹3,500</option>
                </select>
              </div>

              {/* Consultation Type Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Consultation Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 rounded" />
                    <span className="text-gray-700">Video Call</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 rounded" />
                    <span className="text-gray-700">Phone Call</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 rounded" />
                    <span className="text-gray-700">In-Person</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Consultants Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredConsultants.length} Consultants Available
                </h2>
                <p className="text-gray-600">Expert medical professionals ready to help you</p>
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

            {/* Consultants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="consultants">
              {filteredConsultants.map((consultant) => (
                <div key={consultant.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                  <div className="relative">
                    <img
                      src={consultant.image}
                      alt={consultant.name}
                      className="w-full h-64 object-cover object-top"
                    />
                    <div className="absolute top-4 right-4">
                      {consultant.availability === 'Available' ? (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Available
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Busy
                        </span>
                      )}
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-bold text-blue-600">{consultant.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">{consultant.name}</h3>
                      <div className="flex items-center">
                        <i className="ri-star-fill text-yellow-400 text-lg mr-1"></i>
                        <span className="text-lg font-bold">{consultant.rating}</span>
                        <span className="text-gray-500 ml-1">({consultant.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-blue-600 font-bold text-lg mb-1">{consultant.specialty}</p>
                    <p className="text-gray-600 text-sm mb-3">{consultant.qualification}</p>
                    <p className="text-gray-600 mb-4">{consultant.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {consultant.certifications.slice(0, 2).map((cert, index) => (
                        <span key={index} className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                          {cert}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <i className="ri-time-line mr-2"></i>
                        <span>{consultant.experience}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="ri-map-pin-line mr-2"></i>
                        <span>{consultant.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="ri-calendar-check-line mr-2"></i>
                        <span>{consultant.nextAvailable}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="ri-global-line mr-2"></i>
                        <span>{consultant.languages.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                          ₹{consultant.price}
                        </span>
                        <span className="text-gray-600 text-sm block">per consultation</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/services/consultants/${consultant.id}`}
                          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full font-bold hover:from-blue-600 hover:to-green-600 transition-all whitespace-nowrap"
                        >
                          Book Now
                        </Link>
                        <button className="bg-white border-2 border-gradient-to-r from-blue-500 to-green-500 text-gray-700 px-4 py-3 rounded-full hover:bg-gray-50 transition-all">
                          <i className="ri-chat-1-line text-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredConsultants.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-user-heart-line text-4xl text-gray-400"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No consultants found</h3>
                <p className="text-gray-600 mb-8">Try adjusting your filters to find the right healthcare professional.</p>
                <button 
                  onClick={() => {
                    setSelectedSpecialty('all');
                    setSelectedLocation('all');
                    setPriceRange('all');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-full font-bold hover:from-blue-600 hover:to-green-600 transition-all whitespace-nowrap"
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