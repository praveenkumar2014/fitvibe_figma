import React from 'react';
import { Settings } from 'lucide-react';
import { WidgetConfig } from '../types/widget';
import { FeeConfiguration } from './ConfiguratorForm/FeeConfiguration';
import { AppearanceConfig } from './ConfiguratorForm/AppearanceConfig';

interface ConfiguratorFormProps {
  config: WidgetConfig;
  onConfigChange: (config: WidgetConfig) => void;
  onGenerateWidget: () => void;
}

export function ConfiguratorForm({ config, onConfigChange, onGenerateWidget }: ConfiguratorFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseFloat(value) : value;
    
    onConfigChange({
      ...config,
      [name]: newValue,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Settings className="w-6 h-6" />
        Widget Configuration
      </h2>

      <div className="space-y-8">
        <FeeConfiguration config={config} onChange={handleChange} />
        <AppearanceConfig config={config} onChange={handleChange} />

        <button
          onClick={onGenerateWidget}
          className="w-full py-2 px-4 rounded-md text-white transition-colors bg-blue-600 hover:bg-blue-700"
        >
          Generate Widget Code
        </button>
      </div>
    </div>
  );
}