import NavBar from "@/components/NavBar";

export default function TermsAndShipping() {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Terms & Shipping</h1>
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">Terms of Service</h2>
              <p className="text-gray-700">
                Coming soon...
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <p className="text-gray-700">
                Coming soon...
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
} 