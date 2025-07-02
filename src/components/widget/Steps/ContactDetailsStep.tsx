import React from 'react';
import { ContactDetails } from '../../../types/contact';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { InternationalPhoneInput } from '../ui/PhoneInput';
import { BusinessType } from '../../../types/widget';

interface ContactDetailsStepProps {
  formData: ContactDetails;
  onChange: (data: ContactDetails) => void;
  onSubmit: () => void;
  businessType: BusinessType;
}

export function ContactDetailsStep({ formData, onChange, onSubmit, businessType }: ContactDetailsStepProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (field: keyof ContactDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...formData,
      [field]: e.target.value
    });
  };

  const handlePhoneChange = (value: string) => {
    onChange({
      ...formData,
      phone: value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange('firstName')}
          placeholder="Enter first name"
          required
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange('lastName')}
          placeholder="Enter last name"
          required
        />
      </div>

      {businessType !== 'self-assessment' && (
        <Input
          label="Business Name"
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange('businessName')}
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
        placeholder="Enter email address"
        required
      />

      <InternationalPhoneInput
        label="Phone"
        value={formData.phone}
        onChange={handlePhoneChange}
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