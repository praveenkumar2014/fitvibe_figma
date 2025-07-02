import React, { useEffect } from 'react';
import { paymentAPI } from '../../services/api';
import toast from 'react-hot-toast';

interface RazorpayPaymentProps {
  type: 'access' | 'product' | 'consultation';
  amount: number;
  orderData?: any;
  consultationId?: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
  children: React.ReactNode;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function RazorpayPayment({ 
  type, 
  amount, 
  orderData, 
  consultationId, 
  onSuccess, 
  onError, 
  children 
}: RazorpayPaymentProps) {
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      let orderResponse;

      // Create order based on type
      switch (type) {
        case 'access':
          orderResponse = await paymentAPI.createAccessOrder();
          break;
        case 'product':
          orderResponse = await paymentAPI.createProductOrder(orderData);
          break;
        case 'consultation':
          orderResponse = await paymentAPI.createConsultationOrder(consultationId!);
          break;
        default:
          throw new Error('Invalid payment type');
      }

      const { orderId, amount: orderAmount, currency, key } = orderResponse.data;

      const options = {
        key,
        amount: orderAmount,
        currency,
        name: 'FitVibe',
        description: getPaymentDescription(type),
        order_id: orderId,
        theme: {
          color: '#22c55e'
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
          }
        },
        handler: async (response: any) => {
          try {
            let verifyResponse;

            // Verify payment based on type
            switch (type) {
              case 'access':
                verifyResponse = await paymentAPI.verifyAccessPayment(response);
                break;
              case 'product':
                verifyResponse = await paymentAPI.verifyProductPayment({
                  ...response,
                  orderNumber: orderResponse.data.orderNumber
                });
                break;
              case 'consultation':
                verifyResponse = await paymentAPI.verifyConsultationPayment({
                  ...response,
                  consultationId
                });
                break;
            }

            toast.success('Payment successful!');
            onSuccess(verifyResponse.data);
          } catch (error: any) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
            onError(error);
          }
        },
        prefill: {
          name: 'FitVibe User',
          email: 'user@fitvibe.com',
          contact: '9999999999'
        },
        notes: {
          type,
          timestamp: new Date().toISOString()
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error('Payment initiation error:', error);
      toast.error('Failed to initiate payment');
      onError(error);
    }
  };

  const getPaymentDescription = (type: string) => {
    switch (type) {
      case 'access':
        return 'FitVibe Access Pass - Unlock full platform access';
      case 'product':
        return 'FitVibe Product Purchase';
      case 'consultation':
        return 'FitVibe Consultation Booking';
      default:
        return 'FitVibe Payment';
    }
  };

  return (
    <div onClick={handlePayment}>
      {children}
    </div>
  );
}