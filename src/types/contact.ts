export interface ContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
}

export interface ContactValidation {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
  businessName: boolean;
}