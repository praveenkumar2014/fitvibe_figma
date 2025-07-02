import { ContactDetails } from './contact';

export type BusinessType = 'limited-company' | 'partnership' | 'sole-trader' | 'self-assessment';

export interface BusinessFees {
  'limited-company': number;
  'partnership': number;
  'sole-trader': number;
  'self-assessment': number;
}

export interface WidgetConfig {
  primaryColor: string;
  secondaryColor: string;
  baseFees: BusinessFees;
  employeeFee: number;
  vatFee: number;
  makeWebhookUrl: string;
  recaptchaSiteKey: string;
  recaptchaSecretKey: string;
}

export interface QuoteDetails {
  baseFee: number;
  employeeFee: number;
  vatFee: number;
  totalFee: number;
  employeeCount: number;
  isVatRegistered: boolean;
  businessType: BusinessType;
}

export interface QuoteData extends ContactDetails {
  employeeCount: number;
  isVatRegistered: boolean;
  totalFee: number;
  businessType: BusinessType;
}