
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TrainersPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [rating, setRating] = useState('all');

  const specialties = [
    { id: 'all', name: 'All Specialties' },
    { id: 'personal', name: 'Personal Training' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'strength', name: 'Strength Training' },
    { id: 'cardio', name: 'Cardio' }
  ];

  const trainers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Personal Training',
      experience: '8 years',
      rating: 4.9,
      reviews: 324,
      price: 1500,
      location: 'Mumbai',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20fitness%20trainer%20smiling%2C%20athletic%20woman%20in%20gym%20wear%2C%20certified%20personal%20trainer%2C%20clean%20studio%20background%2C%20fitness%20professional%20portrait&width=300&height=300&seq=trainer001&orientation=squarish',
      certifications: ['ACSM Certified', 'Nutrition Specialist'],
      languages: ['English', 'Hindi'],
      available: true,
      responseTime: '2 hours'
    },
    {
      id: 2,
      name: 'Mike Chen',
      specialty: 'Strength Training',
      experience: '12 years',
      rating: 4.8,
      reviews: 456,
      price: 2000,
      location: 'Delhi',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20fitness%20trainer%20with%20muscular%20build%2C%20strength%20training%20coach%2C%20gym%20instructor%20portrait%2C%20clean%20studio%20background%2C%20fitness%20expert&width=300&height=300&seq=trainer002&orientation=squarish',
      certifications: ['NSCA Certified', 'Powerlifting Coach'],
      languages: ['English', 'Hindi', 'Mandarin'],
      available: true,
      responseTime: '1 hour'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      specialty: 'Yoga',
      experience: '6 years',
      rating: 4.9,
      reviews: 289,
      price: 1200,
      location: 'Bangalore',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20yoga%20instructor%20in%20peaceful%20pose%2C%20yoga%20teacher%20portrait%2C%20serene%20expression%2C%20clean%20minimalist%20background%2C%20wellness%20professional&width=300&height=300&seq=trainer003&orientation=squarish',
      certifications: ['RYT-500', 'Meditation Teacher'],
      languages: ['English', 'Spanish', 'Hindi'],
      available: false,
      responseTime: '4 hours'
    },
    {
      id: 4,
      name: 'Dr. Arjun Patel',
      specialty: 'Nutrition',
      experience: '10 years',
      rating: 4.8,
      reviews: 567,
      price: 1800,
      location: 'Chennai',
      image: 'https://readdy.ai/api/search-image?query=Professional%20nutritionist%20doctor%20in%20white%20coat%2C%20medical%20nutrition%20expert%2C%20health%20consultant%20portrait%2C%20clean%20medical%20office%20background&width=300&height=300&seq=trainer004&orientation=squarish',
      certifications: ['Registered Dietitian', 'Sports Nutrition'],
      languages: ['English', 'Hindi', 'Tamil'],
      available: true,
      responseTime: '3 hours'
    },
    {
      id: 5,
      name: 'Emma Thompson',
      specialty: 'Cardio',
      experience: '5 years',
      rating: 4.7,
      reviews: 198,
      price: 1300,
      location: 'Pune',
      image: 'https://readdy.ai/api/search-image?query=Energetic%20female%20cardio%20trainer%2C%20fitness%20instructor%20in%20active%20wear%2C%20dynamic%20pose%2C%20clean%20gym%20background%2C%20cardiovascular%20training%20expert&width=300&height=300&seq=trainer005&orientation=squarish',
      certifications: ['HIIT Certified', 'Group Fitness'],
      languages: ['English', 'Hindi'],
      available: true,
      responseTime: '1 hour'
    },
    {
      id: 6,
      name: 'Rajesh Kumar',
      specialty: 'Personal Training',
      experience: '15 years',
      rating: 4.9,
      reviews: 678,
      price: 2500,
      location: 'Hyderabad',
      image: 'https://readdy.ai/api/search-image?query=Experienced%20male%20personal%20trainer%20with%20professional%20demeanor%2C%20senior%20fitness%20coach%2C%20confident%20pose%2C%20clean%20studio%20background%2C%20veteran%20trainer&width=300&height=300&seq=trainer006&orientation=squarish',
      certifications: ['Master Trainer', 'Rehabilitation Specialist'],
      languages: ['English', 'Hindi', 'Telugu'],
      available: true,
      responseTime: '30 mins'
    }
  ];

  const filteredTrainers = trainers.filter(trainer => {
    if (selectedSpecialty !== 'all' && !trainer.specialty.toLowerCase().includes(selectedSpecialty)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certified Trainers</h1>
          <p className="text-gray-600">Connect with experienced fitness professionals for personalized guidance</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Find Your Trainer</h2>
              
              {/* Specialties */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Specialties</h3>
                <div className="space-y-2">
                  {specialties.map((specialty) => (
                    <label key={specialty.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="specialty"
                        value={specialty.id}
                        checked={selectedSpecialty === specialty.id}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{specialty.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Price per Session</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="price" className="mr-2" />
                    <span className="text-sm text-gray-700">Under ₹1,000</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="price" className="mr-2" />
                    <span className="text-sm text-gray-700">₹1,000 - ₹2,000</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="price" className="mr-2" />
                    <span className="text-sm text-gray-700">Above ₹2,000</span>
                  </label>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">Available Now</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">Quick Response</span>
                  </label>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Location</h3>
                <div className="space-y-2">
                  {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'].map((city) => (
                    <label key={city} className="flex items-center cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-700">{city}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trainers Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{filteredTrainers.length} trainers available</p>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Highest Rated</option>
                    <option>Most Experience</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Response Time</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Trainers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTrainers.map((trainer) => (
                <div key={trainer.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-20 h-20 rounded-full object-cover object-top"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{trainer.name}</h3>
                          {trainer.available ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Available</span>
                          ) : (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Busy</span>
                          )}
                        </div>
                        <p className="text-blue-600 font-medium mb-1">{trainer.specialty}</p>
                        <p className="text-gray-600 text-sm mb-2">{trainer.experience} experience • {trainer.location}</p>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center mr-3">
                            <i className="ri-star-fill text-yellow-400 text-sm mr-1"></i>
                            <span className="text-sm font-medium">{trainer.rating}</span>
                            <span className="text-sm text-gray-500 ml-1">({trainer.reviews} reviews)</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <i className="ri-time-line mr-1"></i>
                            Responds in {trainer.responseTime}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trainer.certifications.map((cert, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {cert}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">
                          <i className="ri-global-line mr-1"></i>
                          Speaks: {trainer.languages.join(', ')}
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-gray-900">₹{trainer.price}</span>
                          <span className="text-sm text-gray-600 ml-1">per session</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Link
                          href={`/trainers/${trainer.id}`}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium whitespace-nowrap"
                        >
                          View Profile
                        </Link>
                        <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap">
                          Book Session
                        </button>
                        <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <i className="ri-chat-1-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
