import React, { useState, useEffect } from 'react';
import { isValidPhone } from '../../../utils/validation';

interface PhoneInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function InternationalPhoneInput({ label, value, onChange, error }: PhoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [localError, setLocalError] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // Initialize with UK format if empty
    if (!value || value === '+44 ') {
      onChange('+44 ');
      setPhoneNumber('');
      return;
    }

    // Extract number part after +44
    const match = value.match(/^\+44\s*(.*)$/);
    if (match) {
      setPhoneNumber(match[1].trim());
    }
  }, []);

  const validateAndFormatNumber = (input: string) => {
    // Remove all non-digits
    const digits = input.replace(/[^\d]/g, '');
    
    if (digits.length === 0) {
      setLocalError('Phone number is required');
      return { isValid: false, formatted: '' };
    }

    // Validate first digit and apply specific format rules
    const firstDigit = digits[0];
    let formatted = '';
    let error = '';

    if (firstDigit === '7') { // Mobile
      if (digits.length === 10) {
        formatted = digits.replace(/(\d{4})(\d{6})/, '$1 $2');
        if (!/^7[1-9]\d{8}$/.test(digits)) {
          error = 'Invalid mobile number format';
        }
      }
    } else if (firstDigit === '2') { // London
      if (digits.length === 10) {
        formatted = digits.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3');
        if (!/^2[0-9]\d{8}$/.test(digits)) {
          error = 'Invalid London number format';
        }
      }
    } else if (firstDigit === '1') { // Geographic
      if (digits.length === 10) {
        formatted = digits.replace(/(\d{4})(\d{6})/, '$1 $2');
        if (!/^1[1-9]\d{8}$/.test(digits)) {
          error = 'Invalid geographic number format';
        }
      }
    } else {
      error = 'Must start with 7 (mobile), 2 (London), or 1 (geographic)';
      formatted = digits;
    }

    // Handle incomplete numbers
    if (digits.length < 10) {
      if (isDirty) {
        error = 'Please enter a complete 10-digit number';
      }
      formatted = digits;
    } else if (digits.length > 10) {
      error = 'Phone number is too long';
      formatted = digits.slice(0, 10).replace(/(\d{4})(\d{6})/, '$1 $2');
    }

    setLocalError(error);
    return {
      isValid: digits.length === 10 && !error,
      formatted: formatted
    };
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    const input = e.target.value;
    
    // Only allow digits and spaces
    if (!/^[\d\s]*$/.test(input)) {
      return;
    }
    
    const { formatted } = validateAndFormatNumber(input);
    setPhoneNumber(formatted);
    onChange(`+44 ${formatted}`);
  };

  return (
    <label className="block">
      <span className="text-gray-700 font-bold">{label}</span>
      <div className="phone-input-container">
        <div className="phone-input-prefix">
          +44
        </div>
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="7XXX XXXXXX"
          className={`phone-input-number ${(error || localError) ? 'border-red-500' : 'border-gray-300'}`}
          required
          inputMode="numeric"
          pattern="[0-9\s]*"
          maxLength={11}
          aria-invalid={!!error || !!localError}
          aria-describedby={error || localError ? "phone-error" : undefined}
        />
      </div>
      {(error || localError) && (
        <p id="phone-error" className="mt-1 text-sm text-red-600">
          {error || localError}
        </p>
      )}
      <p className="mt-1 text-xs text-gray-500">
        Valid UK formats:
        <br />
        • Mobile: 7XXX XXXXXX (must start with 71-79)
        <br />
        • Geographic: 1XXX XXXXXX (must start with 11-19)
        <br />
        • London: 2X XXXX XXXX
      </p>
    </label>
  );
}