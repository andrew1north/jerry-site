import NavBar from "@/components/NavBar";
import ProductGrid from "@/components/ProductGrid";

// This would typically come from a CMS or database
const PRODUCTS = [
  {
    id: "1",
    name: "Vintage Vinyl Record Player",
    description: "Classic turntable with built-in speakers and Bluetooth connectivity",
    price: 199.99,
    imageUrl: "/images/product-1.jpg",
    stripeProductId: "price_XXXXXXXXXXXXXX",
  },
  {
    id: "2",
    name: "Mechanical Keyboard Kit",
    description: "DIY keyboard kit with hot-swappable switches and RGB backlighting",
    price: 149.99,
    imageUrl: "/images/product-2.jpg",
    stripeProductId: "price_XXXXXXXXXXXXXX",
  },
  {
    id: "3",
    name: "Artisan Coffee Maker",
    description: "Pour-over coffee maker with temperature control and timer",
    price: 89.99,
    imageUrl: "/images/product-3.jpg",
    stripeProductId: "price_XXXXXXXXXXXXXX",
  },
  {
    id: "4",
    name: "Smart Plant Monitor",
    description: "Monitors soil moisture, light, and temperature for your indoor plants",
    price: 34.99,
    imageUrl: "/images/product-4.jpg",
    stripeProductId: "price_XXXXXXXXXXXXXX",
  },
];

export default function ShopPage() {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Shop</h1>
          <ProductGrid products={PRODUCTS} />
        </div>
      </div>
    </>
  );
} 