import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function PortfolioNotFound() {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-bold mb-4">Portfolio Item Not Found</h1>
          <p className="mb-6">Sorry, the portfolio item you're looking for doesn't exist or has been removed.</p>
          <Link href="/portfolio" className="text-blue-600 hover:underline">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </>
  );
} 