import React from 'react';

interface ColorInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ColorInput({ label, name, value, onChange }: ColorInputProps) {
  return (
    <label className="block">
      <span className="text-gray-700">{label}</span>
      <div className="mt-1 flex gap-2">
        <input
          type="color"
          name={name}
          value={value}
          onChange={onChange}
          className="h-10 w-20"
        />
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </label>
  );
}