import React from 'react';
import { NumberInput } from '../ui/NumberInput';
import { Button } from '../ui/Button';

interface EmployeeCountStepProps {
  employeeCount: string;
  onChange: (value: string) => void;
  onNext: () => void;
  primaryColor: string;
}

export function EmployeeCountStep({ employeeCount, onChange, onNext, primaryColor }: EmployeeCountStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow whole numbers for employee count
    const value = e.target.value.replace(/[^\d]/g, '');
    onChange(value);
  };

  return (
    <div className="space-y-4">
      <NumberInput
        label="Number of employees on payroll:"
        value={employeeCount}
        onChange={handleChange}
        placeholder="Enter number of employees"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <Button 
        onClick={onNext} 
        style={{ backgroundColor: '#1D6FB9' }}
        disabled={employeeCount === ''}
        className="w-full"
      >
        Next
      </Button>
    </div>
  );
}