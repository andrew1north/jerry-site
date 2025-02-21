import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";

type TextContent = {
  type: "text";
  content: string;
};

type ImageContent = {
  type: "image";
  url: string;
  caption: string;
};

type PortfolioContent = TextContent | ImageContent;

type PortfolioItem = {
  title: string;
  description: string;
  imageUrl: string;
  content: PortfolioContent[];
};

// This would typically come from a CMS or database
const PORTFOLIO_ITEMS: Record<string, PortfolioItem> = {
  "project-one": {
    title: "Project One",
    description: "A detailed description of project one. This would include multiple paragraphs of text describing the project, its goals, and the process of creating it.",
    imageUrl: "/images/portfolio-1.jpg",
    content: [
      {
        type: "text",
        content: "Detailed paragraph about the project...",
      },
      {
        type: "image",
        url: "/images/portfolio-1-detail.jpg",
        caption: "Project detail image",
      },
    ],
  },
  // Add more items as needed
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PortfolioItem({ params }: Props) {
  const resolvedParams = await params;
  const item = PORTFOLIO_ITEMS[resolvedParams.slug];

  if (!item) {
    return (
      <>
        <NavBar />
        <div className="pt-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-2xl font-bold mb-4">Project not found</h1>
            <Link href="/portfolio" className="text-blue-600 hover:underline">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/portfolio" className="text-blue-600 hover:underline mb-8 inline-block">
            ← Back to Portfolio
          </Link>
          
          <h1 className="text-4xl font-bold mb-6">{item.title}</h1>
          
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="prose max-w-none">
            <p className="text-lg mb-8">{item.description}</p>

            {item.content.map((section, index) => (
              <div key={index} className="mb-8">
                {section.type === "text" && (
                  <p>{section.content}</p>
                )}
                {section.type === "image" && (
                  <figure>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={section.url}
                        alt={section.caption}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="text-center text-sm text-gray-600 mt-2">
                      {section.caption}
                    </figcaption>
                  </figure>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 