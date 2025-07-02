import React from 'react';
import { WidgetPreview } from '../components/widget/WidgetPreview';
import { parseWidgetConfig } from '../utils/widget';

export function Widget() {
  const params = new URLSearchParams(window.location.search);
  const config = parseWidgetConfig(params.get('config'));

  // Override default colors if no config is provided
  if (!params.get('config')) {
    config.primaryColor = '#1D6FB9';
    config.secondaryColor = '#1D6FB9';
  }

  // Add security headers
  React.useEffect(() => {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = 'frame-ancestors *';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="widget-container">
      <div className="p-4 w-full max-w-md">
        <WidgetPreview config={config} />
      </div>
    </div>
  );
}