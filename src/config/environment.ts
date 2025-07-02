// Environment configuration
const getBaseUrl = () => {
  if (typeof window === 'undefined') return '';
  
  // For production deployments
  if (import.meta.env.PROD) {
    // First try DEPLOY_URL from Netlify
    const deployUrl = import.meta.env.VITE_DEPLOY_URL;
    if (deployUrl) {
      // Remove any trailing slash
      return deployUrl.replace(/\/$/, '');
    }

    // If no DEPLOY_URL, try URL from Netlify
    const netlifyUrl = import.meta.env.VITE_URL;
    if (netlifyUrl) {
      return netlifyUrl.replace(/\/$/, '');
    }
  }
  
  // Fallback to window.location.origin
  return window.location.origin;
};

export const environment = {
  baseUrl: getBaseUrl(),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  ghl: {
    formId: 'EmlYpEtaPj5iAbWV2xc3',
    apiUrl: 'https://api.gohighlevel.com/v1/forms/submit'
  }
};