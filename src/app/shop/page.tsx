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