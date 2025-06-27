import React from 'react';
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import ImageGallery from './ImageGallery';
import CheckoutButton from './CheckoutButton';

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  mainImage?: {
    asset?: {
      url?: string;
    };
    current: string;
  };
  availableForCheckout: boolean;
  quantityAvailable?: number;
  details?: {
    detailedDescription?: string;
    features?: string[];
    images?: string[];
    dimensions?: {
      width?: string;
      depth?: string;
      height?: string;
      weight?: string;
      length?: string;
      inseam?: string;
      waist?: string;
      rise?: string;
      size?: string;
      legOpening?: string;
      armOpening?: string;
      shoulderToSleeve?: string;
    };
  };
  slug: {
    current: string;
  };
};

// Fetch product from Sanity
async function getProduct(id: string): Promise<Product | null> {
  const query = groq`*[_type == "product" && _id == $id][0] {
    _id,
    name,
    description,
    price,
    availableForCheckout,
    quantityAvailable,
    "mainImage": {
      "asset": {
        "url": mainImage.asset->url
      }
    },
    "slug": slug,
    details {
      detailedDescription,
      features,
      "images": images[].asset->url,
      dimensions {
        width,
        depth,
        height,
        weight,
        length,
        inseam,
        waist,
        rise,
        size,
        legOpening,
        armOpening,
        shoulderToSleeve
      }
    }
  }`;
  
  return client.fetch(query, { id });
}

// Update Props type to handle Next.js 15's Promise-based params
type Props = {
  params: Promise<{ id: string }>;
};

// Update metadata generation to properly await params
export async function generateMetadata(props: Props) {
  const { id } = await props.params;
  return {
    title: `Product - ${id}`,
  };
}

// Update page component to properly await params
export default async function ProductPage(props: Props) {
  const { id } = await props.params;
  const product: Product | null = await getProduct(id);

  if (!product) {
    notFound();
  }

  // Get the main image URL or use a placeholder
  const mainImageUrl = product.mainImage?.asset?.url || "/images/placeholder.jpg";
  
  // Combine main image with additional images for the gallery
  const allImages = [
    mainImageUrl,
    ...(product.details?.images || [])
  ].filter(Boolean);

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 pt-16">
        {/* Back to Shop Link */}
        <div className="py-4">
          <Link href="/shop" className="text-blue-600 hover:underline flex items-center">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
              <path d="M20,12H4M10,18L4,12L10,6" stroke="currentColor" fill="none" strokeWidth="2" />
            </svg>
            BACK TO SHOP
          </Link>
        </div>

        {/* Product Section - Side by Side Layout */}
        <div className="flex flex-col md:flex-row gap-8 py-6">
          {/* Product Image - Left Side */}
          <div className="md:w-1/2">
            <ImageGallery 
              images={allImages}
              productName={product.name}
            />
          </div>

          {/* Product Info - Right Side */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2 uppercase">{product.name}</h2>
            <p className="text-xl font-bold mb-4">${product.price?.toFixed(2)}</p>
            <p className="mb-6 uppercase">{product.description}</p>
            
            {/* Add to Cart Button */}
            <CheckoutButton 
              productId={product._id}
              availableForCheckout={product.availableForCheckout}
              quantityAvailable={product.quantityAvailable}
            />
            
            {/* Product Details Section */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-bold mb-4 uppercase">PRODUCT DETAILS</h3>
              
              {product.details?.detailedDescription && (
                <div className="mb-6">
                  <h4 className="font-bold mb-2 uppercase">DESCRIPTION</h4>
                  <p className="uppercase">{product.details.detailedDescription}</p>
                </div>
              )}
              
              {product.details?.features && product.details.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold mb-2 uppercase">FEATURES</h4>
                  <ul className="list-disc pl-5">
                    {product.details.features.map((feature, index) => (
                      <li key={index} className="uppercase">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {product.details?.dimensions && (
                <div>
                  <h4 className="font-bold mb-2 uppercase">DIMENSIONS</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {product.details.dimensions.width && (
                      <div>
                        <p className="font-bold uppercase">WIDTH</p>
                        <p>{product.details.dimensions.width}</p>
                      </div>
                    )}
                    {product.details.dimensions.height && (
                      <div>
                        <p className="font-bold uppercase">HEIGHT</p>
                        <p>{product.details.dimensions.height}</p>
                      </div>
                    )}
                    {product.details.dimensions.depth && (
                      <div>
                        <p className="font-bold uppercase">DEPTH</p>
                        <p>{product.details.dimensions.depth}</p>
                      </div>
                    )}
                    {product.details.dimensions.weight && (
                      <div>
                        <p className="font-bold uppercase">WEIGHT</p>
                        <p>{product.details.dimensions.weight}</p>
                      </div>
                    )}
                    {product.details.dimensions.length && (
                      <div>
                        <p className="font-bold uppercase">LENGTH</p>
                        <p>{product.details.dimensions.length}</p>
                      </div>
                    )}
                    {product.details.dimensions.inseam && (
                      <div>
                        <p className="font-bold uppercase">INSEAM</p>
                        <p>{product.details.dimensions.inseam}</p>
                      </div>
                    )}
                    {product.details.dimensions.waist && (
                      <div>
                        <p className="font-bold uppercase">WAIST</p>
                        <p>{product.details.dimensions.waist}</p>
                      </div>
                    )}
                    {product.details.dimensions.rise && (
                      <div>
                        <p className="font-bold uppercase">RISE</p>
                        <p>{product.details.dimensions.rise}</p>
                      </div>
                    )}
                    {product.details.dimensions.size && (
                      <div>
                        <p className="font-bold uppercase">SIZE</p>
                        <p>{product.details.dimensions.size}</p>
                      </div>
                    )}
                    {product.details.dimensions.legOpening && (
                      <div>
                        <p className="font-bold uppercase">LEG OPENING</p>
                        <p>{product.details.dimensions.legOpening}</p>
                      </div>
                    )}
                    {product.details.dimensions.armOpening && (
                      <div>
                        <p className="font-bold uppercase">ARM OPENING</p>
                        <p>{product.details.dimensions.armOpening}</p>
                      </div>
                    )}
                    {product.details.dimensions.shoulderToSleeve && (
                      <div>
                        <p className="font-bold uppercase">SHOULDER TO SLEEVE</p>
                        <p>{product.details.dimensions.shoulderToSleeve}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}