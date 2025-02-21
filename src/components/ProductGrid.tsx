"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stripeProductId: string;
};

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  const handleBuyNow = async (stripeProductId: string) => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [{ price: stripeProductId, quantity: 1 }],
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y border border-gray-200">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          className="group relative"
        >
          <div className="relative aspect-[3/4]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="p-4 space-y-1">
            <h3 className="text-sm text-gray-500">{product.name}</h3>
            <p className="text-sm font-light">{product.description}</p>
            <p className="text-sm">${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleBuyNow(product.stripeProductId)}
              className="mt-2 px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
            >
              Buy Now
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 