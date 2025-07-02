import React from 'react';
import { WidgetConfig } from '../types/widget';
import { generateWidgetCode } from '../utils/widget';

interface CodeGeneratorProps {
  config: WidgetConfig;
  isVisible: boolean;
  onClose: () => void;
}

export function CodeGenerator({ config, isVisible, onClose }: CodeGeneratorProps) {
  if (!isVisible) return null;

  const { iframeCode, floatingCode } = generateWidgetCode(config);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h3 className="text-xl font-bold mb-4">Widget Code</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Embedded Widget</h4>
            <div className="relative">
              <pre className="code-block">
                {iframeCode}
              </pre>
              <button
                onClick={() => copyToClipboard(iframeCode)}
                className="absolute top-2 right-2 px-3 py-1 text-white text-sm rounded hover:opacity-90"
                style={{ backgroundColor: '#1D6FB9' }}
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Floating Widget</h4>
            <div className="relative">
              <pre className="code-block">
                {floatingCode}
              </pre>
              <button
                onClick={() => copyToClipboard(floatingCode)}
                className="absolute top-2 right-2 px-3 py-1 text-white text-sm rounded hover:opacity-90"
                style={{ backgroundColor: '#1D6FB9' }}
              >
                Copy
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 px-4 rounded-md text-white hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#1D6FB9' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}