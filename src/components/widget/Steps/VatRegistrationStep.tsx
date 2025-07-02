import React from 'react';
import { Button } from '../ui/Button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface VatRegistrationStepProps {
  isVatRegistered: boolean | null;
  onSelect: (isVatRegistered: boolean) => void;
}

export function VatRegistrationStep({ isVatRegistered, onSelect }: VatRegistrationStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900">
          VAT Registration Status
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Let us know if your business is registered for VAT
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelect(true)}
          className={`p-4 rounded-lg border-2 transition-all duration-200
            ${isVatRegistered === true 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-[#1D6FB9] hover:bg-blue-50'
            }`}
        >
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className={`w-8 h-8 ${
              isVatRegistered === true ? 'text-green-500' : 'text-gray-400'
            }`} />
            <div className="font-semibold">Yes</div>
            <div className="text-sm text-gray-600">VAT Registered</div>
          </div>
        </button>

        <button
          onClick={() => onSelect(false)}
          className={`p-4 rounded-lg border-2 transition-all duration-200
            ${isVatRegistered === false 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-[#1D6FB9] hover:bg-blue-50'
            }`}
        >
          <div className="flex flex-col items-center gap-2">
            <XCircle className={`w-8 h-8 ${
              isVatRegistered === false ? 'text-green-500' : 'text-gray-400'
            }`} />
            <div className="font-semibold">No</div>
            <div className="text-sm text-gray-600">Not VAT Registered</div>
          </div>
        </button>
      </div>
    </div>
  );
}