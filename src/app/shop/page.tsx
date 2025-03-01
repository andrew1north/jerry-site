import NavBar from "@/components/NavBar";
import ProductGrid from "@/components/ProductGrid";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

// Define the type for products from Sanity
interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
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
    "imageUrl": mainImage.asset->url,
    details {
      detailedDescription,
      features,
      "images": images[].asset->url,
      dimensions {
        width,
        depth,
        height,
        weight
      }
    }
  }`;
  
  return client.fetch(query);
}

export default async function ShopPage() {
  const products = await getProducts();
  
  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Shop</h1>
          {products && products.length > 0 ? (
            <ProductGrid products={products.map((product: Product) => ({
              id: product._id,
              name: product.name,
              description: product.description || "",
              price: product.price,
              imageUrl: product.imageUrl || "/images/placeholder.jpg"
            }))} />
          ) : (
            <p className="text-center text-gray-500">No products found. Add some in Sanity Studio!</p>
          )}
        </div>
      </div>
    </>
  );
} 