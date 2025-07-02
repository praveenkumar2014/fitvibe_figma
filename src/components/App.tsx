import React from 'react';
import { ConfiguratorForm } from './ConfiguratorForm';
import { WidgetPreview } from './widget/WidgetPreview';
import { CodeGenerator } from './CodeGenerator';
import { Navigation } from './Navigation';
import { useWidgetConfig } from '../hooks/useWidgetConfig';

export function App() {
  const { config, showGenerator, handleConfigChange, toggleGenerator } = useWidgetConfig();
  const [showWidget, setShowWidget] = React.useState(false);

  return (
    <>
      <Navigation onOpenWidget={() => setShowWidget(true)} />
      <div className="min-h-screen bg-gray-100 pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Accountancy Widget Configurator
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ConfiguratorForm
              config={config}
              onConfigChange={handleConfigChange}
              onGenerateWidget={() => toggleGenerator()}
            />
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Widget Preview</h2>
              <WidgetPreview config={config} />
            </div>
          </div>

          <CodeGenerator
            config={config}
            isVisible={showGenerator}
            onClose={() => toggleGenerator()}
          />
        </div>
      </div>

      {showWidget && (
        <div className="fixed top-[75px] right-5 z-50 w-[400px] max-w-[90vw] bg-white rounded-lg shadow-lg">
          <button
            onClick={() => setShowWidget(false)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
          <WidgetPreview config={config} />
        </div>
      )}
    </>
  );
}