import React from 'react';
import { ContactDetails } from '../../../../types/contact';
import { ContactForm } from './ContactForm';
import { useContactValidation } from '../../../../hooks/useContactValidation';
import { submitContactDetails } from '../../../../services/contact';
import { isValidPhone } from '../../../../utils/validation';
import { BusinessType } from '../../../../types/widget';

interface ContactDetailsStepProps {
  formData: ContactDetails;
  onChange: (data: ContactDetails) => void;
  onSubmit: () => void;
  businessType: BusinessType;
}

export function ContactDetailsStep({ formData, onChange, onSubmit, businessType }: ContactDetailsStepProps) {
  const { errors, validateField, validateRequiredFields } = useContactValidation(formData, businessType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number strictly first
    if (!isValidPhone(formData.phone)) {
      validateField('phone', formData.phone);
      return;
    }

    // Then validate other required fields
    if (!validateRequiredFields()) {
      return;
    }

    try {
      await submitContactDetails({
        ...formData,
        businessName: businessType === 'self-assessment' ? '' : (formData.businessName || '')
      });
      onSubmit(); // Only proceed if submission is successful
    } catch (error) {
      console.error('Form submission error:', error);
      // Don't proceed if submission fails
    }
  };

  return (
    <ContactForm
      formData={formData}
      onChange={onChange}
      onSubmit={handleSubmit}
      errors={errors}
      validateField={validateField}
      businessType={businessType}
    />
  );
}