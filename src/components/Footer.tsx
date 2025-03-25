import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center space-y-4 md:space-y-0">
          <nav className="flex space-x-6 justify-center">
            <Link 
              href="/terms-shipping"
              className="text-gray-600 hover:text-gray-900 transition-colors uppercase"
            >
              Terms & Shipping
            </Link>
            <Link 
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors uppercase"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500 uppercase">
          © 2025, Jerry Lester Studios All Rights Reserved
        </div>
        <div className="mt-8 pt-12 flex justify-center">
          <Image 
            src="/images/Artboard 1.webp" 
            alt="Jerry Lester Studios" 
            width={200}
            height={100}
            className="object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer; 