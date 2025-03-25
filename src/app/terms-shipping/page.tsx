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
              <div className="space-y-4 text-gray-700">
                <section>
                  <h3 className="text-lg font-medium mb-2">1. Agreement to Terms</h3>
                  <p>
                    By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the website.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-medium mb-2">2. Intellectual Property</h3>
                  <p>
                    All content on this website, including but not limited to text, images, graphics, logos, audio, video, and software, is the property of the website owner and is protected by copyright and other intellectual property laws.
                  </p>
                  <p className="mt-2">
                    The music, photos, and portfolio content displayed on this website may not be reproduced, distributed, modified, or used for any commercial purpose without explicit written permission from the owner.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-medium mb-2">3. User Conduct</h3>
                  <p>
                    When using this website, you agree not to:
                  </p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others</li>
                    <li>Attempt to gain unauthorized access to any part of the website</li>
                    <li>Use the website to transmit harmful code or interfere with its functionality</li>
                    <li>Harass, abuse, or harm another person through your use of the website</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-medium mb-2">4. E-Commerce and Purchases</h3>
                  <p>
                    Products and services offered for sale on this website are subject to availability. We reserve the right to modify, discontinue, or limit the availability of any product or service.
                  </p>
                  <p className="mt-2">
                    All purchases are final unless otherwise specified in our return policy. Payment information is processed securely through our payment processors.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-medium mb-2">5. Privacy Policy</h3>
                  <p>
                    Your use of this website is also governed by our Privacy Policy, which describes how we collect, use, and protect your information.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-medium mb-2">6. Limitation of Liability</h3>
                  <p>
                    The website owner shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the website.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-medium mb-2">7. Changes to Terms</h3>
                  <p>
                    We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes your acceptance of the updated terms.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-medium mb-2">8. Contact Information</h3>
                  <p>
                    If you have any questions about these Terms of Service, please contact us through the information provided on our Contact page.
                  </p>
                </section>

                <p className="text-sm italic mt-4">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
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