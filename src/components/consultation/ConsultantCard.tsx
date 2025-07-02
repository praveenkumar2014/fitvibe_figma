import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Clock, Video, Phone, MessageCircle, MapPin } from 'lucide-react';

interface ConsultantCardProps {
  consultant: {
    id: string;
    name: string;
    title: string;
    specialties: string[];
    rating: number;
    reviews: number;
    experience: string;
    price: number;
    avatar: string;
    verified: boolean;
    nextAvailable: string;
    consultationTypes: string[];
  };
  onBook: (consultant: any) => void;
  delay?: number;
}

export function ConsultantCard({ consultant, onBook, delay = 0 }: ConsultantCardProps) {
  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'chat':
        return <MessageCircle className="w-4 h-4" />;
      case 'in-person':
        return <MapPin className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatNextAvailable = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card"
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img 
            src={consultant.avatar} 
            alt={consultant.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {consultant.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Award className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">{consultant.name}</h4>
              <p className="text-sm text-gray-600">{consultant.title}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">${consultant.price}</p>
              <p className="text-xs text-gray-600">per session</p>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-900 ml-1">
                {consultant.rating}
              </span>
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({consultant.reviews} reviews)
            </span>
            <span className="text-sm text-gray-600 ml-2">
              • {consultant.experience} exp
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {consultant.specialties.slice(0, 3).map((specialty, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-md"
              >
                {specialty}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              Next: {formatNextAvailable(consultant.nextAvailable)}
            </div>
            <div className="flex items-center space-x-1">
              {consultant.consultationTypes.map((type, index) => (
                <div 
                  key={index}
                  className="p-1 bg-gray-100 rounded text-gray-600"
                  title={type}
                >
                  {getConsultationIcon(type)}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onBook(consultant)}
            className="btn-primary w-full mt-3 text-sm"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </motion.div>
  );
}