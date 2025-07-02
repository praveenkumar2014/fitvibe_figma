import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'success';
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const baseClasses = 'py-2 px-4 rounded-md text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  return (
    <button
      {...props}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
}