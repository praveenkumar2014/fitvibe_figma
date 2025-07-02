export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Must start with +44
  if (!phone.startsWith('+44')) {
    return false;
  }

  // Remove all spaces and the +44 prefix
  const nationalNumber = phone.replace(/\s+/g, '').slice(3);

  // Must be exactly 10 digits
  if (!/^\d{10}$/.test(nationalNumber)) {
    return false;
  }

  // Validate based on first digit
  const firstDigit = nationalNumber[0];
  
  // Mobile numbers (7)
  if (firstDigit === '7') {
    // Must start with 71-79
    if (nationalNumber[1] === '0' || nationalNumber[1] === '9') {
      return false;
    }
    return /^7[1-8]\d{8}$/.test(nationalNumber);
  }
  
  // London numbers (2)
  if (firstDigit === '2') {
    return /^2[0-8]\d{8}$/.test(nationalNumber);
  }
  
  // Geographic numbers (1)
  if (firstDigit === '1') {
    // Second digit cannot be 0
    if (nationalNumber[1] === '0') {
      return false;
    }
    return /^1[1-9]\d{8}$/.test(nationalNumber);
  }

  return false;
};

export const isValidName = (name: string): boolean => {
  return /^[a-zA-Z\s'-]{2,50}$/.test(name.trim());
};

export const isValidWebhookUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

export const isValidRecaptchaKey = (key: string): boolean => {
  return /^[A-Za-z0-9_-]{40}$/.test(key);
};