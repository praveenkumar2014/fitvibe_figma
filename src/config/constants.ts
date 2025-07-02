// Get the base URL for widget endpoints
export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // Use DEPLOY_URL from Netlify if available, otherwise fallback to window.location.origin
    return process.env.DEPLOY_URL || window.location.origin;
  }
  return window.location.origin;
};