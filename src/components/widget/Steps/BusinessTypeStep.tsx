import React from 'react';
import { BusinessType } from '../../../types/widget';
import { Building2, Users2, User, FileText } from 'lucide-react';

interface BusinessTypeStepProps {
  selectedType: BusinessType | null;
  onSelect: (type: BusinessType) => void;
}

export function BusinessTypeStep({ selectedType, onSelect }: BusinessTypeStepProps) {
  const businessTypes = [
    { 
      value: 'limited-company' as BusinessType,
      label: 'Limited Company / LLP',
      icon: Building2,
      description: 'Registered company with shareholders'
    },
    { 
      value: 'partnership' as BusinessType,
      label: 'Partnership',
      icon: Users2,
      description: 'Business with two or more owners'
    },
    { 
      value: 'sole-trader' as BusinessType,
      label: 'Sole Trader/Landlord',
      icon: User,
      description: 'Self-employed individual or property owner'
    },
    { 
      value: 'self-assessment' as BusinessType,
      label: 'Self Assessment',
      icon: FileText,
      description: 'Personal tax return only'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900">
          What type of business are you?
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Select your business structure to get an accurate quote
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {businessTypes.map(({ value, label, icon: Icon, description }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 group
              ${selectedType === value 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-[#1D6FB9] hover:bg-blue-50'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors
                ${selectedType === value 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-600 group-hover:bg-[#1D6FB9] group-hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{label}</div>
                <div className="text-sm text-gray-600">{description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}