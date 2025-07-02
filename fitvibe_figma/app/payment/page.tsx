
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 3000);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-check-line text-3xl text-green-600"></i>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                Welcome to FitPro! Your account has been activated and you now have access to all features.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-800">Registration Fee</span>
                  <span className="font-semibold text-green-900">₹500</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-green-800">Transaction ID</span>
                  <span className="font-mono text-green-900">#TXN123456789</span>
                </div>
              </div>
              
              <Link
                href="/dashboard"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block whitespace-nowrap"
              >
                Go to Dashboard
              </Link>
              
              <p className="text-sm text-gray-500 mt-4">
                You will receive a confirmation email shortly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Registration</h2>
            <p className="text-gray-600">One-time payment to unlock all FitPro features</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-vip-crown-line text-2xl text-blue-600"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">FitPro Premium Access</h4>
                    <p className="text-sm text-gray-600">Lifetime access to all features</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹500</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="text-gray-900">₹90</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">₹590</span>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">What's Included:</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-center">
                    <i className="ri-check-line mr-2"></i>
                    Access to 500+ certified trainers
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line mr-2"></i>
                    Premium fitness products catalog
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line mr-2"></i>
                    Book training & consultation sessions
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line mr-2"></i>
                    Video chat & messaging with trainers
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line mr-2"></i>
                    Personalized workout & nutrition plans
                  </li>
                </ul>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h3>
              
              {/* Payment Methods */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-4">Choose Payment Method</h4>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                        <i className="ri-bank-card-line text-blue-600"></i>
                      </div>
                      <div>
                        <div className="font-medium">UPI / Cards / Net Banking</div>
                        <div className="text-sm text-gray-600">Pay securely via Razorpay</div>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wallet"
                      checked={paymentMethod === 'wallet'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-3">
                        <i className="ri-wallet-line text-green-600"></i>
                      </div>
                      <div>
                        <div className="font-medium">Digital Wallets</div>
                        <div className="text-sm text-gray-600">PayTM, PhonePe, Google Pay</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* UPI Quick Pay */}
              {paymentMethod === 'razorpay' && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-3">Quick UPI Payment</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center p-3 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                      <i className="ri-google-play-line text-2xl text-blue-600 mb-1"></i>
                      <span className="text-xs text-blue-800">Google Pay</span>
                    </button>
                    <button className="flex flex-col items-center p-3 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                      <i className="ri-smartphone-line text-2xl text-blue-600 mb-1"></i>
                      <span className="text-xs text-blue-800">PhonePe</span>
                    </button>
                    <button className="flex flex-col items-center p-3 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                      <i className="ri-wallet-3-line text-2xl text-blue-600 mb-1"></i>
                      <span className="text-xs text-blue-800">PayTM</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <i className="ri-shield-check-line text-green-600 mr-2"></i>
                  <div className="text-sm text-green-800">
                    <strong>Secure Payment</strong><br/>
                    Your payment information is encrypted and secure
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors whitespace-nowrap ${
                  isProcessing 
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Pay ₹590 Now`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
