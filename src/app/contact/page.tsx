import NavBar from "@/components/NavBar";
import InstagramFeed from "@/components/InstagramFeed";

export default function Contact() {
  return (
    <>
      <NavBar />
      <div className="pt-24">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Contact</h1>
          <div className="space-y-8">
            <p className="text-gray-700">
              For inquiries about artwork, commissions, or any other questions, please reach out:
            </p>
            <div className="space-y-4">
              <p className="text-gray-700">
                Email:{" "}
                <a 
                  href="mailto:Jerrylesterstudios@gmail.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Jerrylesterstudios@gmail.com
                </a>
              </p>
              <div>
                <p className="text-gray-700 mb-4">Follow on Instagram:</p>
                <InstagramFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 