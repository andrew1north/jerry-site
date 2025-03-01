import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, the product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/shop" className="text-blue-600 hover:underline">
            ← Back to Shop
          </Link>
        </div>
      </div>
    </>
  );
} 