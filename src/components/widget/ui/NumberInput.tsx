import React from 'react';

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  className?: string;
}

export function NumberInput({ label, error, className = '', ...props }: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^\d]/g, '');
    
    // Update with the processed value
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value
      }
    };
    props.onChange?.(syntheticEvent);
  };

  return (
    <label className="block">
      <span className="text-gray-700 font-bold">{label}</span>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        {...props}
        onChange={handleChange}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
          error ? 'border-red-500' : ''
        } ${className}`}
        style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </label>
  );
}