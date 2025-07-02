import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { WidgetForm } from './WidgetForm';
import { WidgetConfig } from '../../types/widget';

interface WidgetPreviewProps {
  config: WidgetConfig;
}

export function WidgetPreview({ config }: WidgetPreviewProps) {
  // Ensure the color is always #1D6FB9 for the preview
  const previewConfig = {
    ...config,
    primaryColor: '#1D6FB9',
    secondaryColor: '#1D6FB9'
  };

  return (
    <ErrorBoundary>
      <div className="max-w-md mx-auto">
        <WidgetForm config={previewConfig} />
      </div>
    </ErrorBoundary>
  );
}