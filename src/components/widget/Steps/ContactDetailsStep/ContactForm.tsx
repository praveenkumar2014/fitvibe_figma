import React from 'react';
import { ContactDetails } from '../../../../types/contact';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { InternationalPhoneInput } from '../../ui/PhoneInput';
import { isValidPhone } from '../../../../utils/validation';
import { BusinessType } from '../../../../types/widget';

interface ContactFormProps {
  formData: ContactDetails;
  onChange: (data: ContactDetails) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: Record<keyof ContactDetails, string>;
  validateField: (field: keyof ContactDetails, value: string) => void;
  businessType: BusinessType;
}

export function ContactForm({ 
  formData, 
  onChange, 
  onSubmit, 
  errors, 
  validateField,
  businessType
}: ContactFormProps) {
  const handleChange = (field: keyof ContactDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange({ ...formData, [field]: value });
    validateField(field, value);
  };

  const handlePhoneChange = (value: string) => {
    onChange({ ...formData, phone: value });
    validateField('phone', value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone before allowing submission
    if (!isValidPhone(formData.phone)) {
      validateField('phone', formData.phone);
      return;
    }
    
    onSubmit(e);
  };

  const showBusinessName = businessType !== 'self-assessment';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange('firstName')}
          error={errors.firstName}
          placeholder="Enter first name"
          required
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          placeholder="Enter last name"
          required
        />
      </div>

      {showBusinessName && (
        <Input
          label="Business Name"
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange('businessName')}
          error={errors.businessName}
          placeholder="Enter business name"
          required
        />
      )}

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        placeholder="Enter email address"
        required
      />

      <InternationalPhoneInput
        label="Phone"
        value={formData.phone}
        onChange={handlePhoneChange}
        error={errors.phone}
      />

      <Button 
        type="submit"
        className="w-full font-bold bg-[#1D6FB9] hover:bg-green-500 transition-colors duration-200"
      >
        Get Quote
      </Button>
    </form>
  );
}