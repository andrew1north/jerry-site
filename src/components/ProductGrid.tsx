"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  availableForCheckout?: boolean;
};

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  // Calculate number of placeholder items needed for complete row
  const itemsPerRow = 4; // Based on lg:grid-cols-4
  const totalItems = products.length;
  const placeholdersNeeded = totalItems % itemsPerRow === 0 ? 0 : itemsPerRow - (totalItems % itemsPerRow);
  const placeholders = Array(placeholdersNeeded).fill(null);

  return (
    <div className="border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-gray-200">
        {products.map((product, index) => (
          <Link href={`/shop/product/${product.id}`} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className={`group relative hover:bg-gray-50 bg-white h-full ${
                !product.availableForCheckout ? 'opacity-75' : ''
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className={`object-contain p-4 ${
                      !product.availableForCheckout ? 'grayscale opacity-50' : ''
                    }`}
                  />
                  {!product.availableForCheckout && (
                    <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center">
                      <div className="bg-black/80 text-white px-4 py-2 text-sm font-bold uppercase tracking-wide rounded">
                        Out of Stock
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1">
                  <h3 className="text-sm text-gray-500">{product.name}</h3>
                  <p className="text-sm font-light">{product.description}</p>
                  <p className="text-sm">${product.price.toFixed(2)}</p>
                  {!product.availableForCheckout && (
                    <p className="text-xs text-gray-400 mt-1">Not available for purchase</p>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
        {placeholders.map((_, index) => (
          <div key={`placeholder-${index}`} className="bg-white h-full" />
        ))}
      </div>
    </div>
  );
} 