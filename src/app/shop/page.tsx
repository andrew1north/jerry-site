import NavBar from "@/components/NavBar";
import ProductGrid from "@/components/ProductGrid";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

// Enable Incremental Static Regeneration with a 1-hour cache
export const revalidate = 3600;

// Define the type for products from Sanity
interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  availableForCheckout?: boolean;
  imageUrl?: string;
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
}

// Fetch products from Sanity
async function getProducts(): Promise<Product[]> {
  const query = groq`*[_type == "product"] {
    _id,
    name,
    description,
    price,
    availableForCheckout,
    "imageUrl": mainImage.asset->url,
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
  
  return client.fetch(query);
}

export default async function ShopPage() {
  const products: Product[] = await getProducts();

  // Transform and sort the data - available products first, then unavailable, both sorted alphabetically
  const productGridData = products
    .map(product => ({
      id: product._id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      imageUrl: product.imageUrl || '/images/placeholder.jpg',
      availableForCheckout: product.availableForCheckout
    }))
    .sort((a, b) => {
      // Available products (true) come first, unavailable (false/undefined) come last
      if (a.availableForCheckout && !b.availableForCheckout) return -1;
      if (!a.availableForCheckout && b.availableForCheckout) return 1;
      // If both have same availability status, sort alphabetically by name
      return a.name.localeCompare(b.name);
    });

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-16">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8 uppercase">Shop</h1>
          <ProductGrid products={productGridData} />
        </div>
      </div>
    </>
  );
} 