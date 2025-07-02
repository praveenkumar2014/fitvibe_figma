import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <label className="block">
      <span className="text-gray-700 font-bold">{label}</span>
      <input
        {...props}
        className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 
          placeholder:text-gray-500
          ${error ? 'border-red-500' : ''} 
          ${className}
          px-3 py-2 text-gray-900`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </label>
  );
}