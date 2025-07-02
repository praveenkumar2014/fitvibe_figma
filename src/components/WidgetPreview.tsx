import React, { useState } from 'react';
import { WidgetConfig, ContactDetails, QuoteDetails } from '../types/widget';
import { isValidEmail, isValidPhone } from '../utils/validation';
import { calculateMonthlyFee } from '../utils/calculations';
import { submitQuoteData, ApiError } from '../services/api';
import { EmployeeCountStep } from './widget/Steps/EmployeeCountStep';
import { VatRegistrationStep } from './widget/Steps/VatRegistrationStep';
import { ContactDetailsStep } from './widget/Steps/ContactDetailsStep';
import { QuoteResultStep } from './widget/Steps/QuoteResultStep';

interface WidgetPreviewProps {
  config: WidgetConfig;
}

export function WidgetPreview({ config }: WidgetPreviewProps) {
  const [step, setStep] = useState(1);
  const [employeeCount, setEmployeeCount] = useState<string>('');
  const [isVatRegistered, setIsVatRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactDetails>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
  });

  const handleSubmit = async () => {
    setError(null);

    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    if (!formData.companyName.trim()) {
      setError('Please enter your company name');
      return;
    }

    const totalFee = calculateMonthlyFee(
      config.baseFee,
      parseInt(employeeCount) || 0,
      config.employeeFee,
      isVatRegistered,
      config.vatFee
    );

    const quoteData = {
      ...formData,
      employeeCount: parseInt(employeeCount) || 0,
      isVatRegistered,
      totalFee,
    };

    try {
      await submitQuoteData(quoteData, config);
      setStep(4);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('Error submitting form:', error);
        setError('There was an error submitting your information. Your quote is still available below.');
      }
      // Still show the quote even if the submission fails
      setStep(4);
    }
  };

  const resetForm = () => {
    setStep(1);
    setEmployeeCount('');
    setIsVatRegistered(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
    });
    setError(null);
  };

  const quoteDetails: QuoteDetails = {
    baseFee: config.baseFee,
    employeeFee: config.employeeFee,
    vatFee: config.vatFee,
    totalFee: calculateMonthlyFee(
      config.baseFee,
      parseInt(employeeCount) || 0,
      config.employeeFee,
      isVatRegistered,
      config.vatFee
    ),
    employeeCount: parseInt(employeeCount) || 0,
    isVatRegistered,
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg" style={{ borderColor: config.primaryColor }}>
      <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: config.primaryColor }}>
        Calculate Your Monthly Fee
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {step === 1 && (
        <EmployeeCountStep
          employeeCount={employeeCount}
          onChange={setEmployeeCount}
          onNext={() => setStep(2)}
          primaryColor={config.primaryColor}
        />
      )}

      {step === 2 && (
        <VatRegistrationStep
          onSelect={(value) => {
            setIsVatRegistered(value);
            setStep(3);
          }}
          primaryColor={config.primaryColor}
          secondaryColor={config.secondaryColor}
        />
      )}

      {step === 3 && (
        <ContactDetailsStep
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          primaryColor={config.primaryColor}
        />
      )}

      {step === 4 && (
        <QuoteResultStep
          quoteDetails={quoteDetails}
          onReset={resetForm}
          primaryColor={config.primaryColor}
        />
      )}
    </div>
  );
}