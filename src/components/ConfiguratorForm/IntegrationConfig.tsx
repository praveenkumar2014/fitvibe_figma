import React from 'react';
import { WidgetConfig } from '../../types/widget';
import { Input } from '../widget/ui/Input';
import { isValidWebhookUrl, isValidRecaptchaKey } from '../../utils/validation';

interface IntegrationConfigProps {
  config: WidgetConfig;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function IntegrationConfig({ config, onChange }: IntegrationConfigProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Basic validation
    if (name === 'makeWebhookUrl' && !isValidWebhookUrl(value)) {
      e.target.setCustomValidity('Please enter a valid HTTPS webhook URL');
    } else if ((name === 'recaptchaSiteKey' || name === 'recaptchaSecretKey') && !isValidRecaptchaKey(value)) {
      e.target.setCustomValidity('Please enter a valid reCAPTCHA key');
    } else {
      e.target.setCustomValidity('');
    }
    
    onChange(e);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Integration Settings</h3>
      
      <div className="space-y-4">
        <div className="pb-4 border-b border-gray-200">
          <h4 className="text-md font-medium mb-4">Make.com Integration</h4>
          <Input
            label="Webhook URL"
            type="url"
            name="makeWebhookUrl"
            value={config.makeWebhookUrl}
            onChange={handleChange}
            placeholder="https://hook.make.com/..."
            className="font-mono text-sm"
          />
        </div>

        <div className="pt-2">
          <div className="mb-4">
            <h4 className="text-md font-medium">Google reCAPTCHA v2</h4>
            <p className="text-sm text-gray-600 mt-1">
              Configuration for keepthetaxmanhappy.com domain
            </p>
          </div>

          <div className="space-y-4">
            <Input
              label="Site Key"
              type="text"
              name="recaptchaSiteKey"
              value={config.recaptchaSiteKey}
              onChange={handleChange}
              placeholder="Your reCAPTCHA site key"
              className="font-mono text-sm"
            />

            <Input
              label="Secret Key"
              type="text"
              name="recaptchaSecretKey"
              value={config.recaptchaSecretKey}
              onChange={handleChange}
              placeholder="Your reCAPTCHA secret key"
              className="font-mono text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}