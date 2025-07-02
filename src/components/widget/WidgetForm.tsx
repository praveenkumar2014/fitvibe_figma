import React, { useState } from 'react';
import { WidgetConfig, BusinessType } from '../../types/widget';
import { ContactDetails } from '../../types/contact';
import { BusinessTypeStep } from './Steps/BusinessTypeStep';
import { EmployeeCountStep } from './Steps/EmployeeCountStep';
import { VatRegistrationStep } from './Steps/VatRegistrationStep';
import { ContactDetailsStep } from './Steps/ContactDetailsStep';
import { QuoteResultStep } from './Steps/QuoteResultStep';
import { calculateMonthlyFee } from '../../utils/calculations';
import { submitQuoteData } from '../../services/api';

interface WidgetFormProps {
  config: WidgetConfig;
}

const initialContactState: ContactDetails = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  businessName: '',
};

const BUSINESS_TYPES_WITH_EMPLOYEES: BusinessType[] = [
  'limited-company',
  'partnership',
  'sole-trader'
];

export function WidgetForm({ config }: WidgetFormProps) {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [employeeCount, setEmployeeCount] = useState('');
  const [isVatRegistered, setIsVatRegistered] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<ContactDetails>(initialContactState);

  const handleBusinessTypeSelect = (type: BusinessType) => {
    setBusinessType(type);
    
    if (type === 'self-assessment') {
      setEmployeeCount('0');
      setIsVatRegistered(false);
      setFormData(prev => ({ ...prev, businessName: '' }));
      setStep(4);
    } else if (BUSINESS_TYPES_WITH_EMPLOYEES.includes(type)) {
      setStep(2);
    }
  };

  const handleQuoteSubmission = async () => {
    if (!businessType) return;

    const totalFee = calculateMonthlyFee(
      config.baseFees,
      businessType,
      parseInt(employeeCount) || 0,
      config.employeeFee,
      isVatRegistered || false,
      config.vatFee
    );

    try {
      await submitQuoteData({
        ...formData,
        employeeCount: parseInt(employeeCount) || 0,
        isVatRegistered: isVatRegistered || false,
        totalFee,
        businessType,
      }, config);
    } catch (error) {
      console.error('Quote submission error:', error);
    }
    
    setStep(5);
  };

  const resetForm = () => {
    setStep(1);
    setBusinessType(null);
    setEmployeeCount('');
    setIsVatRegistered(null);
    setFormData(initialContactState);
  };

  const quoteDetails = {
    baseFee: businessType ? config.baseFees[businessType] : 0,
    employeeFee: config.employeeFee,
    vatFee: config.vatFee,
    totalFee: businessType ? calculateMonthlyFee(
      config.baseFees,
      businessType,
      parseInt(employeeCount) || 0,
      config.employeeFee,
      isVatRegistered || false,
      config.vatFee
    ) : 0,
    employeeCount: parseInt(employeeCount) || 0,
    isVatRegistered: isVatRegistered || false,
    businessType: businessType as BusinessType,
  };

  return (
    <div className="accountancy-widget">
      <h2 className="accountancy-widget-title" style={{ color: '#1D6FB9' }}>
        Estimate Your Monthly Fee
      </h2>

      <div className="accountancy-widget-form">
        {step === 1 && (
          <BusinessTypeStep
            selectedType={businessType}
            onSelect={handleBusinessTypeSelect}
          />
        )}

        {step === 2 && businessType && BUSINESS_TYPES_WITH_EMPLOYEES.includes(businessType) && (
          <EmployeeCountStep
            employeeCount={employeeCount}
            onChange={setEmployeeCount}
            onNext={() => setStep(3)}
            primaryColor="#1D6FB9"
          />
        )}

        {step === 3 && businessType !== 'self-assessment' && (
          <VatRegistrationStep
            isVatRegistered={isVatRegistered}
            onSelect={(value) => {
              setIsVatRegistered(value);
              setStep(4);
            }}
          />
        )}

        {step === 4 && businessType && (
          <ContactDetailsStep
            formData={formData}
            onChange={setFormData}
            onSubmit={handleQuoteSubmission}
            businessType={businessType}
          />
        )}

        {step === 5 && (
          <QuoteResultStep
            quoteDetails={quoteDetails}
            onReset={resetForm}
            contactName={{ firstName: formData.firstName, lastName: formData.lastName }}
            formData={formData}
            recaptchaSiteKey={config.recaptchaSiteKey}
          />
        )}
      </div>
    </div>
  );
}