import { useState } from 'react';
import { ContactDetails } from '../types/contact';
import { isValidEmail, isValidPhone, isValidName } from '../utils/validation';
import { BusinessType } from '../types/widget';

export function useContactValidation(initialData: ContactDetails, businessType: BusinessType) {
  const [errors, setErrors] = useState<Record<keyof ContactDetails, string>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
  });

  const validateField = (field: keyof ContactDetails, value: string) => {
    let error = '';

    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = `Please enter your ${field === 'firstName' ? 'first' : 'last'} name`;
        } else if (!isValidName(value)) {
          error = `Please enter a valid ${field === 'firstName' ? 'first' : 'last'} name`;
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Please enter your email address';
        } else if (!isValidEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Please enter your phone number';
        } else if (!isValidPhone(value)) {
          error = 'Please enter a valid UK phone number starting with +44';
        }
        break;
      case 'businessName':
        if (businessType !== 'self-assessment' && !value.trim()) {
          error = 'Please enter your business name';
        }
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateRequiredFields = () => {
    const requiredFields: (keyof ContactDetails)[] = ['firstName', 'lastName', 'email', 'phone'];
    
    // Add businessName to required fields only if not self-assessment
    if (businessType !== 'self-assessment') {
      requiredFields.push('businessName');
    }
    
    let isValid = true;
    requiredFields.forEach(field => {
      if (!validateField(field, initialData[field])) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  return {
    errors,
    validateField,
    validateRequiredFields,
  };
}