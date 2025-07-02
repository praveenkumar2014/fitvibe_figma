export const formatCurrency = (amount: number): string => {
  return `£${amount.toFixed(2)}`;
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters except the plus sign
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  if (!cleaned.startsWith('+44')) {
    return phone;
  }

  // Get the number without prefix
  const national = cleaned.slice(3);
  
  // Format based on number type
  if (national.startsWith('7')) {
    // Mobile: +44 7XXX XXXXXX
    return `+44 ${national.slice(0, 4)} ${national.slice(4)}`;
  } else if (national.startsWith('2')) {
    // London: +44 2X XXXX XXXX
    return `+44 ${national.slice(0, 2)} ${national.slice(2, 6)} ${national.slice(6)}`;
  } else if (national.startsWith('3') || national.startsWith('8')) {
    // Non-geographic and special rate: +44 3XX XXX XXXX
    return `+44 ${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6)}`;
  } else {
    // Geographic: +44 1XXX XXXXXX
    return `+44 ${national.slice(0, 4)} ${national.slice(4)}`;
  }
};