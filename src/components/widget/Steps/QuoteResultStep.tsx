import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from '../ui/Button';
import { QuoteDetails, BusinessType } from '../../../types/widget';
import { formatCurrency } from '../../../utils/formatting';
import { sendToGHL } from '../../../services/api';

interface QuoteResultStepProps {
  quoteDetails: QuoteDetails;
  onReset: () => void;
  contactName: { firstName: string; lastName: string };
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    businessName: string;
  };
  recaptchaSiteKey: string;
}

const formatBusinessType = (type: string): string => {
  const labels: Record<string, string> = {
    'limited-company': 'Limited Company / LLP',
    'partnership': 'Partnership',
    'sole-trader': 'Sole Trader/Landlord',
    'self-assessment': 'Self Assessment'
  };
  return labels[type] || type;
};

export function QuoteResultStep({ 
  quoteDetails, 
  onReset, 
  contactName, 
  formData,
  recaptchaSiteKey 
}: QuoteResultStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const { 
    baseFee, 
    employeeFee, 
    vatFee, 
    totalFee, 
    employeeCount, 
    isVatRegistered, 
    businessType 
  } = quoteDetails;
  
  const { firstName, lastName } = contactName;

  const handleBookCall = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const token = await recaptchaRef.current?.executeAsync();
      if (!token) {
        throw new Error('Please complete the reCAPTCHA verification');
      }

      await sendToGHL({
        ...formData,
        employeeCount,
        isVatRegistered,
        totalFee,
        businessType,
      });
      
      setSuccess(true);
    } catch (err) {
      setError('Unable to schedule your call. Please try again or contact us directly.');
      console.error('Error booking call:', err);
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const showEmployeeFees = businessType !== 'self-assessment';
  const showVatFees = businessType !== 'self-assessment' && isVatRegistered;
  const employeesTotal = employeeCount * employeeFee;

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          {firstName} {lastName}'s Monthly Estimate
        </h3>
        <p className="text-gray-600 mt-1">
          Business Type: {formatBusinessType(businessType)}
        </p>
      </div>

      <div className="space-y-2">
        <div className="w-full grid grid-cols-[1fr,auto] gap-2">
          <div className="font-bold">Base Fee:</div>
          <div className="font-mono text-right tabular-nums">{formatCurrency(baseFee)}</div>

          {showEmployeeFees && employeeCount > 0 && (
            <>
              <div className="font-bold">
                Employee Payroll Fee ({employeeCount} {employeeCount === 1 ? 'employee' : 'employees'}):
              </div>
              <div className="font-mono text-right tabular-nums">{formatCurrency(employeesTotal)}</div>
            </>
          )}

          {showVatFees && (
            <>
              <div className="font-bold">VAT Registration Fee:</div>
              <div className="font-mono text-right tabular-nums">{formatCurrency(vatFee)}</div>
            </>
          )}

          <div className="col-span-2 border-b border-gray-300 my-2"></div>

          <div className="font-bold text-lg">Total Monthly Fee:</div>
          <div className="font-bold font-mono text-right text-lg tabular-nums">
            {formatCurrency(totalFee)}
          </div>
        </div>

        <p className="text-sm text-[#1D6FB9] text-center mt-4">
          All Figures Exclude VAT
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={recaptchaSiteKey}
          size="invisible"
        />

        {!success && (
          <Button
            onClick={handleBookCall}
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting 
                ? 'bg-gray-400'
                : 'bg-green-500 hover:bg-[#1D6FB9]'
            } transition-colors duration-200`}
          >
            {isSubmitting ? 'Processing...' : 'Book A Discovery Call'}
          </Button>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm mb-4">
            Thank you! We'll be in touch shortly to schedule your discovery call.
          </div>
        )}
        
        <button
          onClick={onReset}
          className="text-sm text-[#1D6FB9] hover:text-green-500 transition-colors duration-200 text-center w-full"
        >
          Start a new quote
        </button>
      </div>
    </div>
  );
}