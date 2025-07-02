
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Whey Protein',
      price: 2499,
      originalPrice: 2999,
      quantity: 2,
      image: 'https://readdy.ai/api/search-image?query=Premium%20whey%20protein%20powder%20container%20on%20clean%20white%20background%2C%20fitness%20supplement%2C%20high%20quality%20product%20photography%2C%20modern%20packaging%20design&width=150&height=150&seq=cart001&orientation=squarish',
      vendor: 'NutriMax',
      inStock: true
    },
    {
      id: 2,
      name: 'Resistance Bands Set',
      price: 899,
      originalPrice: 1199,
      quantity: 1,
      image: 'https://readdy.ai/api/search-image?query=Colorful%20resistance%20bands%20set%20on%20clean%20white%20background%2C%20fitness%20bands%20for%20exercise%2C%20multiple%20resistance%20levels&width=150&height=150&seq=cart002&orientation=squarish',
      vendor: 'FlexFit',
      inStock: true
    },
    {
      id: 3,
      name: 'Yoga Mat Premium',
      price: 1299,
      originalPrice: 1599,
      quantity: 1,
      image: 'https://readdy.ai/api/search-image?query=Premium%20yoga%20mat%20rolled%20up%20on%20clean%20white%20background%2C%20exercise%20mat%20for%20fitness%20and%20yoga%2C%20non-slip%20surface&width=150&height=150&seq=cart003&orientation=squarish',
      vendor: 'ZenFit',
      inStock: false
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      setAppliedPromo({ code: 'SAVE10', discount: 10 });
    } else if (promoCode === 'WELCOME20') {
      setAppliedPromo({ code: 'WELCOME20', discount: 20 });
    } else {
      // Show error message
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const discount = appliedPromo ? (subtotal * appliedPromo.discount / 100) : 0;
  const deliveryFee = subtotal > 2000 ? 0 : 99;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} items in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-shopping-cart-line text-4xl text-gray-400"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started</p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Items ({cartItems.length})</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Clear all
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className={`flex items-start space-x-4 p-4 border border-gray-200 rounded-lg ${!item.inStock ? 'bg-gray-50' : ''}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover object-top rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{item.name}</h3>
                              <p className="text-sm text-blue-600">{item.vendor}</p>
                              {!item.inStock && (
                                <p className="text-sm text-red-600 mt-1">Out of stock</p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <i className="ri-close-line text-xl"></i>
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                              <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                  <i className="ri-subtract-line"></i>
                                </button>
                                <span className="px-4 py-2 border-x border-gray-300">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                  <i className="ri-add-line"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Products */}
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">You might also like</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <img
                        src={`https://readdy.ai/api/search-image?query=Fitness%20product%20on%20clean%20white%20background%2C%20exercise%20equipment%20or%20supplement%2C%20professional%20product%20photography&width=200&height=200&seq=rec00${i}&orientation=squarish`}
                        alt="Recommended product"
                        className="w-full h-32 object-cover object-top rounded-lg mb-3"
                      />
                      <h4 className="font-medium text-gray-900 text-sm mb-2">Recommended Product {i}</h4>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">₹1,299</span>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 whitespace-nowrap">
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-2 flex items-center justify-between text-sm text-green-600">
                      <span>Promo "{appliedPromo.code}" applied</span>
                      <button onClick={() => setAppliedPromo(null)} className="text-red-500 hover:text-red-700">
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="text-gray-900">₹{subtotal}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Savings</span>
                      <span className="text-green-600">-₹{savings}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Promo Discount</span>
                      <span className="text-green-600">-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span className="text-gray-900">₹{deliveryFee}</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">₹{total}</span>
                  </div>
                </div>

                {subtotal < 2000 && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm text-blue-800">
                      <i className="ri-truck-line mr-1"></i>
                      Add ₹{2000 - subtotal} more for free delivery
                    </div>
                  </div>
                )}

                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold mb-4 whitespace-nowrap">
                  Proceed to Checkout
                </button>

                <Link
                  href="/products"
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center block whitespace-nowrap"
                >
                  Continue Shopping
                </Link>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">We accept:</p>
                  <div className="flex items-center space-x-2">
                    <i className="ri-visa-line text-2xl text-blue-600"></i>
                    <i className="ri-mastercard-line text-2xl text-red-500"></i>
                    <i className="ri-paypal-line text-2xl text-blue-500"></i>
                    <i className="ri-google-pay-line text-2xl text-green-600"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
