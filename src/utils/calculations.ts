import { BusinessType } from '../types/widget';

export const calculateMonthlyFee = (
  baseFees: Record<BusinessType, number>,
  businessType: BusinessType,
  employeeCount: number,
  employeeFee: number,
  isVatRegistered: boolean,
  vatFee: number
): number => {
  const baseFee = baseFees[businessType];
  const employeeCost = employeeCount * employeeFee;
  const vatCost = isVatRegistered ? vatFee : 0;
  return Number((baseFee + employeeCost + vatCost).toFixed(2));
};