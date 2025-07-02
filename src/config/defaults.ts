import type { WidgetConfig } from '../types/widget';

export const defaultConfig: WidgetConfig = {
  primaryColor: '#1D6FB9',
  secondaryColor: '#1D6FB9',
  baseFees: {
    'limited-company': 30.99,
    'partnership': 30.99,
    'sole-trader': 25.00,
    'self-assessment': 12.00
  },
  employeeFee: 6.99,
  vatFee: 15.00,
  makeWebhookUrl: 'https://hook.eu2.make.com/3b43cxplc21hhsl7nfqc7fh7nqr37zr1',
  recaptchaSiteKey: '6Lf2xw4rAAAAALH6WAl57Ym7UTwJEhAgc2MBtltk',
  recaptchaSecretKey: '6Lf2xw4rAAAAACX9Vp2y3NzHSjz-4oo50srLVkqr'
};