import { WidgetConfig } from '../types/widget';
import { defaultConfig } from '../config/defaults';
import { environment } from '../config/environment';

export const parseWidgetConfig = (configParam: string | null): WidgetConfig => {
  if (!configParam) return defaultConfig;

  try {
    const parsedConfig = JSON.parse(decodeURIComponent(configParam));
    return {
      ...defaultConfig,
      ...parsedConfig,
    };
  } catch (e) {
    console.error('Invalid widget configuration:', e);
    return defaultConfig;
  }
};

export const generateWidgetCode = (config: WidgetConfig) => {
  // Get the base URL for the widget
  const baseUrl = environment.baseUrl;
  
  // Remove any development-specific keys from the config
  const { recaptchaSecretKey, ...publicConfig } = config;

  // Ensure colors are always set correctly
  const widgetConfig = {
    ...publicConfig,
    primaryColor: '#1D6FB9',
    secondaryColor: '#1D6FB9'
  };

  const configParam = encodeURIComponent(JSON.stringify(widgetConfig));

  const iframeCode = `<!-- Accountancy Widget -->
<div class="accountancy-widget-container" style="max-width: 480px; margin: 0 auto;">
  <iframe
    src="${baseUrl}/widget?config=${configParam}"
    style="width: 100%; height: 700px; border: none; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: transparent;"
    title="Accountancy Fee Calculator"
    loading="lazy"
    allow="payment"
  ></iframe>
</div>`;

  const floatingCode = `<!-- Accountancy Widget (Floating) -->
<div id="accounting-widget-floating" data-config="${configParam}"></div>
<script src="${baseUrl}/floating.js" async defer></script>`;

  return { iframeCode, floatingCode };
};