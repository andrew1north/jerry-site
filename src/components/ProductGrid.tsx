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
};

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y border border-gray-200">
      {products.map((product, index) => (
        <Link href={`/shop/${product.id}`} key={product.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            className="group relative hover:bg-gray-50"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-sm text-gray-500">{product.name}</h3>
              <p className="text-sm font-light">{product.description}</p>
              <p className="text-sm">${product.price.toFixed(2)}</p>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
} 