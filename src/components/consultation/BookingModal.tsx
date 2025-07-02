import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Video, Phone, MessageCircle, MapPin, CreditCard } from 'lucide-react';

interface BookingModalProps {
  consultant: any;
  onClose: () => void;
}

export function BookingModal({ consultant, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('video');
  const [notes, setNotes] = useState('');

  const availableDates = [
    '2024-01-15',
    '2024-01-16',
    '2024-01-17',
    '2024-01-18',
    '2024-01-19'
  ];

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  const consultationTypes = [
    { id: 'video', label: 'Video Call', icon: Video, price: consultant.price },
    { id: 'phone', label: 'Phone Call', icon: Phone, price: consultant.price - 10 },
    { id: 'chat', label: 'Chat Session', icon: MessageCircle, price: consultant.price - 20 },
    { id: 'in-person', label: 'In-Person', icon: MapPin, price: consultant.price + 20 }
  ].filter(type => consultant.consultationTypes.includes(type.id));

  const selectedTypeData = consultationTypes.find(type => type.id === selectedType);

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking:', {
      consultant: consultant.id,
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      notes
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Book Consultation</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Consultant Info */}
          <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
            <img 
              src={consultant.avatar} 
              alt={consultant.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-medium text-gray-900">{consultant.name}</h4>
              <p className="text-sm text-gray-600">{consultant.title}</p>
            </div>
          </div>

          {/* Consultation Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Consultation Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {consultationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    selectedType === type.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <p className="text-sm font-medium text-gray-900">{type.label}</p>
                  <p className="text-xs text-gray-600">${type.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Date
            </label>
            <div className="grid grid-cols-5 gap-2">
              {availableDates.map((date) => {
                const dateObj = new Date(date);
                const dayName = dateObj.toLocaleDateString([], { weekday: 'short' });
                const dayNumber = dateObj.getDate();
                
                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-2 rounded-lg border transition-all duration-200 ${
                      selectedDate === date
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-xs text-gray-600">{dayName}</p>
                    <p className="text-sm font-medium text-gray-900">{dayNumber}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-lg border transition-all duration-200 ${
                    selectedTime === time
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900">{time}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific topics you'd like to discuss..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Consultant:</span>
                <span className="font-medium">{consultant.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{selectedTypeData?.label}</span>
              </div>
              {selectedDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(selectedDate).toLocaleDateString([], { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}
              {selectedTime && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${selectedTypeData?.price}</span>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              selectedDate && selectedTime
                ? 'bg-primary-500 hover:bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CreditCard className="w-5 h-5 mr-2 inline" />
            Book & Pay ${selectedTypeData?.price}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}