'use client';

import { useState } from 'react';
import SizeSelector from './SizeSelector';
import CheckoutButton from './CheckoutButton';

type Product = {
  _id: string;
  name: string;
  availableForCheckout: boolean;
  quantityAvailable?: number;
  sizing?: {
    hasSizing?: boolean;
    options?: string[];
  };
};

type ProductClientProps = {
  product: Product;
};

export default function ProductClient({ product }: ProductClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeChange = (size: string | null) => {
    setSelectedSize(size);
  };

  return (
    <>
      <SizeSelector 
        sizing={product.sizing}
        onSizeChange={handleSizeChange}
        selectedSize={selectedSize}
      />
      
      <CheckoutButton 
        productId={product._id}
        availableForCheckout={product.availableForCheckout}
        quantityAvailable={product.quantityAvailable}
        selectedSize={selectedSize}
        requiresSize={product.sizing?.hasSizing && product.sizing?.options && product.sizing.options.length > 0}
      />
    </>
  );
} 