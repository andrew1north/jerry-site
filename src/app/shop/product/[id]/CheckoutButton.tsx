'use client';

import { useState } from 'react';

type CheckoutButtonProps = {
  productId: string;
  availableForCheckout?: boolean;
  quantityAvailable?: number;
  selectedSize?: string | null;
  requiresSize?: boolean;
};

export default function CheckoutButton({ productId, availableForCheckout, quantityAvailable, selectedSize, requiresSize }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!availableForCheckout) {
      alert('This product is not available for checkout at the moment.');
      return;
    }

    if (quantityAvailable && quantityAvailable <= 0) {
      alert('This product is currently out of stock.');
      return;
    }

    if (requiresSize && !selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          productId,
          selectedSize: selectedSize || undefined
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        alert('Error: ' + error);
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = (await import('@stripe/stripe-js')).loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      
      const stripeInstance = await stripe;
      await stripeInstance?.redirectToCheckout({ sessionId });

    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Determine button state and text
  const isOutOfStock = quantityAvailable !== undefined && quantityAvailable <= 0;
  const isUnavailable = !availableForCheckout;
  const isLowStock = quantityAvailable !== undefined && quantityAvailable > 0 && quantityAvailable <= 5;
  const needsSizeSelection = requiresSize && !selectedSize;

  if (isUnavailable) {
    return (
      <div className="w-full">
        <button 
          disabled
          className="w-full bg-gray-400 text-white py-3 mb-2 uppercase cursor-not-allowed"
        >
          UNAVAILABLE
        </button>
        <p className="text-xs text-gray-500 text-center">Not available for purchase</p>
      </div>
    );
  }

  if (isOutOfStock) {
    return (
      <div className="w-full">
        <button 
          disabled
          className="w-full bg-red-500 text-white py-3 mb-2 uppercase cursor-not-allowed"
        >
          OUT OF STOCK
        </button>
        <p className="text-xs text-gray-500 text-center">This item is currently unavailable</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button 
        onClick={handleCheckout}
        disabled={isLoading || needsSizeSelection}
        className={`w-full py-3 mb-2 uppercase transition-colors ${
          needsSizeSelection 
            ? 'bg-gray-400 text-white cursor-not-allowed' 
            : 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed'
        }`}
      >
        {isLoading ? 'LOADING...' : needsSizeSelection ? 'SELECT SIZE FIRST' : 'BUY NOW'}
      </button>
      {isLowStock && (
        <p className="text-xs text-orange-600 text-center font-medium">
          Only {quantityAvailable} left in stock
        </p>
      )}
      {quantityAvailable !== undefined && quantityAvailable > 5 && (
        <p className="text-xs text-green-600 text-center">
          In stock ({quantityAvailable} available)
        </p>
      )}
    </div>
  );
} 