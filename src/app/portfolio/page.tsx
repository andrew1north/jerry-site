import NavBar from "@/components/NavBar";
import PortfolioGrid from "@/components/PortfolioGrid";

// This would typically come from a CMS or database
const PORTFOLIO_ITEMS = [
  {
    id: "1",
    title: "Project One",
    description: "Description of project one",
    imageUrl: "/images/portfolio-1.jpg",
    slug: "project-one",
  },
  {
    id: "2",
    title: "Project Two",
    description: "Description of project two",
    imageUrl: "/images/portfolio-2.jpg",
    slug: "project-two",
  },
  // Add more items as needed
];

export default function PortfolioPage() {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
          <PortfolioGrid items={PORTFOLIO_ITEMS} />
        </div>
      </div>
    </>
  );
} 