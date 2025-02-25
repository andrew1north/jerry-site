import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";

// This would typically come from a CMS or database
const PRODUCTS = [
  {
    id: "1",
    name: "Vintage Vinyl Record Player",
    description: "Classic turntable with built-in speakers and Bluetooth connectivity",
    price: 199.99,
    imageUrl: "/images/product-1.jpg",
    details: {
      description: "Experience music the way it was meant to be heard with our Vintage Vinyl Record Player. This beautifully crafted turntable combines classic aesthetics with modern functionality, delivering warm analog sound while offering convenient Bluetooth connectivity for versatile playback options.",
      features: [
        "Built-in high-fidelity speakers",
        "Bluetooth 5.0 connectivity",
        "3-speed turntable (33, 45, 78 RPM)",
        "Authentic wooden cabinet design",
        "RCA line-out for external speakers",
      ],
      images: [
        "/images/product-1.jpg",
        "/images/product-1-detail-1.jpg",
        "/images/product-1-detail-2.jpg",
      ],
      dimensions: {
        width: "17.3 inches",
        depth: "13.4 inches",
        height: "5.9 inches",
        weight: "12.1 lbs"
      }
    }
  },
  {
    id: "2",
    name: "Mechanical Keyboard Kit",
    description: "DIY keyboard kit with hot-swappable switches and RGB backlighting",
    price: 149.99,
    imageUrl: "/images/product-2.jpg",
    details: {
      description: "Build your perfect typing experience with our premium Mechanical Keyboard Kit. This comprehensive DIY kit includes everything you need to create a custom mechanical keyboard that matches your exact preferences. Features a hot-swappable PCB for easy switch customization and vibrant RGB backlighting.",
      features: [
        "Hot-swappable switch sockets",
        "Per-key RGB backlighting",
        "Aluminum case with brass weight",
        "USB Type-C connectivity",
        "QMK/VIA compatible"
      ],
      images: [
        "/images/product-2.jpg",
        "/images/product-2-detail-1.jpg",
        "/images/product-2-detail-2.jpg",
      ],
      dimensions: {
        width: "14.0 inches",
        depth: "5.0 inches",
        height: "1.2 inches",
        weight: "2.5 lbs"
      }
    }
  },
  {
    id: "3",
    name: "Artisan Coffee Maker",
    description: "Pour-over coffee maker with temperature control and timer",
    price: 89.99,
    imageUrl: "/images/product-3.jpg",
    details: {
      description: "Elevate your coffee brewing experience with our precision-engineered Artisan Coffee Maker. This pour-over coffee maker combines traditional brewing methods with modern temperature control and timing features to help you achieve the perfect cup every time.",
      features: [
        "Digital temperature control",
        "Built-in precision timer",
        "Borosilicate glass construction",
        "Stainless steel filter",
        "LCD display"
      ],
      images: [
        "/images/product-3.jpg",
        "/images/product-3-detail-1.jpg",
        "/images/product-3-detail-2.jpg",
      ],
      dimensions: {
        width: "6.5 inches",
        depth: "6.5 inches",
        height: "11.0 inches",
        weight: "1.8 lbs"
      }
    }
  },
  {
    id: "4",
    name: "Smart Plant Monitor",
    description: "Monitors soil moisture, light, and temperature for your indoor plants",
    price: 34.99,
    imageUrl: "/images/product-4.jpg",
    details: {
      description: "Keep your plants thriving with our Smart Plant Monitor. This innovative device continuously monitors crucial environmental factors and sends real-time updates to your smartphone, ensuring your plants get exactly what they need to flourish.",
      features: [
        "Real-time soil moisture sensing",
        "Light level monitoring",
        "Temperature tracking",
        "Smartphone connectivity",
        "Long-lasting battery life"
      ],
      images: [
        "/images/product-4.jpg",
        "/images/product-4-detail-1.jpg",
        "/images/product-4-detail-2.jpg",
      ],
      dimensions: {
        width: "1.5 inches",
        depth: "1.0 inches",
        height: "6.0 inches",
        weight: "0.2 lbs"
      }
    }
  }
];

// Generate static params for all products
export async function generateStaticParams() {
  return PRODUCTS.map(product => ({
    id: product.id
  }));
}

// Define a simple component to render the product page
function ProductPageContent({ product }: { product: typeof PRODUCTS[0] | undefined }) {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-8">
            <Link href="/shop" className="text-gray-500 hover:text-gray-700">
              ← Back to Shop
            </Link>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square relative border border-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={product.details.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.details.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square relative border border-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} detail ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-2xl text-gray-900">${product.price.toFixed(2)}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-gray-600">{product.details.description}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Features</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {product.details.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Dimensions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Width</p>
                    <p className="text-gray-900">{product.details.dimensions.width}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Depth</p>
                    <p className="text-gray-900">{product.details.dimensions.depth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="text-gray-900">{product.details.dimensions.height}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="text-gray-900">{product.details.dimensions.weight}</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-black text-white py-4 px-8 rounded-lg hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// This is a workaround for Next.js 15 type issues
export default function Page(props: any) {
  // Extract the id from props using type assertion
  const id = (props.params as { id: string }).id;
  const product = PRODUCTS.find(p => p.id === id);
  
  return <ProductPageContent product={product} />;
} 