import React from 'react';
import { WidgetPreview } from '../components/widget/WidgetPreview';
import { WidgetConfig } from '../types/widget';

export function Widget() {
  // Get config from URL parameters
  const params = new URLSearchParams(window.location.search);
  const configParam = params.get('config');
  
  let config: WidgetConfig;
  try {
    config = configParam ? JSON.parse(decodeURIComponent(configParam)) : {
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      baseFee: 25.00,
      employeeFee: 7.50,
      vatFee: 10.00,
    };
  } catch (e) {
    console.error('Invalid config parameter:', e);
    config = {
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      baseFee: 25.00,
      employeeFee: 7.50,
      vatFee: 10.00,
    };
  }

  return (
    <div className="p-4">
      <WidgetPreview config={config} />
    </div>
  );
}