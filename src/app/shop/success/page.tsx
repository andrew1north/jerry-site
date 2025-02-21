import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
            <p className="text-gray-600 mb-8">
              Your order has been successfully processed. You will receive a confirmation
              email shortly.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 