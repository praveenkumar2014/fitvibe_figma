import { useState } from 'react';
import { WidgetConfig } from '../types/widget';
import { defaultConfig } from '../config/defaults';

export function useWidgetConfig() {
  const [config, setConfig] = useState<WidgetConfig>(defaultConfig);
  const [showGenerator, setShowGenerator] = useState(false);

  const handleConfigChange = (newConfig: WidgetConfig) => {
    setConfig(newConfig);
  };

  const toggleGenerator = () => {
    setShowGenerator(!showGenerator);
  };

  return {
    config,
    showGenerator,
    handleConfigChange,
    toggleGenerator,
  };
}