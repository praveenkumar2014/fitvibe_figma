import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  Video, 
  MessageCircle,
  Phone,
  MapPin,
  Award,
  CheckCircle
} from 'lucide-react';
import { ConsultantCard } from '../components/consultation/ConsultantCard';
import { BookingModal } from '../components/consultation/BookingModal';

const consultants = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Certified Nutritionist',
    specialties: ['Weight Loss', 'Sports Nutrition', 'Meal Planning'],
    rating: 4.9,
    reviews: 245,
    experience: '8 years',
    price: 75,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    verified: true,
    nextAvailable: '2024-01-15T10:00:00Z',
    consultationTypes: ['video', 'phone', 'chat']
  },
  {
    id: '2',
    name: 'Mike Chen',
    title: 'Personal Trainer',
    specialties: ['Strength Training', 'HIIT', 'Bodybuilding'],
    rating: 4.8,
    reviews: 189,
    experience: '6 years',
    price: 60,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    verified: true,
    nextAvailable: '2024-01-15T14:00:00Z',
    consultationTypes: ['video', 'in-person']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    title: 'Sports Medicine Doctor',
    specialties: ['Injury Prevention', 'Recovery', 'Performance'],
    rating: 4.9,
    reviews: 156,
    experience: '12 years',
    price: 120,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
    verified: true,
    nextAvailable: '2024-01-16T09:00:00Z',
    consultationTypes: ['video', 'phone', 'in-person']
  }
];

const consultationTypes = [
  { id: 'all', label: 'All Types', icon: User },
  { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
  { id: 'fitness', label: 'Fitness', icon: '💪' },
  { id: 'medical', label: 'Medical', icon: '🏥' }
];

export function ConsultationPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedConsultant, setSelectedConsultant] = useState<any>(null);
  const [showBooking, setShowBooking] = useState(false);

  const handleBookConsultation = (consultant: any) => {
    setSelectedConsultant(consultant);
    setShowBooking(true);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold text-gray-900">Expert Consultations</h1>
        <p className="text-gray-600 mt-1">Get personalized guidance from certified professionals</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="card text-center">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <User className="w-5 h-5 text-primary-500" />
          </div>
          <p className="text-lg font-bold text-gray-900">50+</p>
          <p className="text-xs text-gray-600">Experts</p>
        </div>
        <div className="card text-center">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-lg font-bold text-gray-900">4.9</p>
          <p className="text-xs text-gray-600">Avg Rating</p>
        </div>
        <div className="card text-center">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-lg font-bold text-gray-900">1000+</p>
          <p className="text-xs text-gray-600">Sessions</p>
        </div>
      </motion.div>

      {/* Consultation Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex space-x-2 overflow-x-auto scrollbar-hide"
      >
        {consultationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
              selectedType === type.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {typeof type.icon === 'string' ? (
              <span>{type.icon}</span>
            ) : (
              <type.icon className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{type.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Featured Consultation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card gradient-bg text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Free Initial Consultation</h3>
            <p className="text-primary-100 mt-1">15-minute intro session with any expert</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Video className="w-8 h-8" />
          </div>
        </div>
        <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg mt-4 transition-colors">
          Book Free Session
        </button>
      </motion.div>

      {/* Consultants List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Available Experts</h3>
          <span className="text-sm text-gray-600">{consultants.length} experts</span>
        </div>

        <div className="space-y-4">
          {consultants.map((consultant, index) => (
            <ConsultantCard
              key={consultant.id}
              consultant={consultant}
              onBook={handleBookConsultation}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>

      {/* Consultation Types Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Options</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Video Call</p>
              <p className="text-sm text-gray-600">Face-to-face consultation from anywhere</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Phone Call</p>
              <p className="text-sm text-gray-600">Voice consultation for quick advice</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Chat Session</p>
              <p className="text-sm text-gray-600">Text-based consultation and Q&A</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900">In-Person</p>
              <p className="text-sm text-gray-600">Meet at our partner locations</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      {showBooking && selectedConsultant && (
        <BookingModal
          consultant={selectedConsultant}
          onClose={() => {
            setShowBooking(false);
            setSelectedConsultant(null);
          }}
        />
      )}
    </div>
  );
}