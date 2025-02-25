import Link from 'next/link';
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const menuItems = [
  { title: 'About', href: '/about' },
  { title: 'Photos', href: '/photos' },
  { title: 'Listen', href: '/listen' },
  { title: 'Portfolio', href: '/portfolio' },
  { title: 'Shop', href: '/shop' },
  { title: 'Contact', href: '/contact' }
];

export default function Menu() {
  return (
    <div id="menu" className="h-screen flex flex-col items-center justify-center bg-black/95 animate-fadeIn">
      <nav className={`${pressStart2P.className} flex flex-col items-center gap-8 -mt-16`}>
        {menuItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-white text-xl md:text-2xl hover:text-purple-400 transition-colors duration-300 opacity-0 animate-menuItemFadeIn ${index === 0 ? 'pt-4' : ''}`}
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
} 