import NavBar from "@/components/NavBar";
import Link from "next/link";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import { Metadata } from "next";

// Define types for internal use only
type TextBlock = {
  _type: "textBlock";
  content: string;
};

type ImageBlock = {
  _type: "imageBlock";
  image: {
    asset: {
      url: string;
    };
  };
  caption: string;
};

type PortfolioItem = {
  title: string;
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  content: (TextBlock | ImageBlock)[];
};

// Fetch portfolio item from Sanity
async function getPortfolioItem(slug: string) {
  const query = groq`*[_type == "portfolio" && slug.current == $slug][0] {
    title,
    description,
    "mainImage": {
      "asset": {
        "url": mainImage.asset->url
      }
    },
    content[] {
      _type,
      content,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      },
      caption
    }
  }`;
  
  return client.fetch(query, { slug });
}

// Define the correct type for Next.js 15 params
type PageProps = {
  params: Promise<{ slug: string }>;
};

// Generate static paths
export async function generateStaticParams() {
  const query = groq`*[_type == "portfolio"]{ "slug": slug.current }`;
  const slugs = await client.fetch(query);
  return slugs.map((slug: any) => ({
    slug: slug.slug,
  }));
}

// Metadata generation
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  return {
    title: `Portfolio - ${slug}`,
  };
}

// Page component
export default async function Page(props: PageProps) {
  const { slug } = await props.params;
  const item = await getPortfolioItem(slug);

  if (!item) {
    notFound();
  }

  // Extract all images from the portfolio item
  const allImages = [
    item.mainImage?.asset?.url || "/images/placeholder.jpg",
    ...(item.content?.filter((section: any) => section._type === "imageBlock")
      .map((section: any) => section.image?.asset?.url)
      .filter(Boolean) || [])
  ];

  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/portfolio" className="text-blue-600 hover:underline mb-8 inline-block">
            ← BACK TO PORTFOLIO
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Portfolio Image Gallery */}
            <div className="md:col-span-1">
              <ImageGallery images={allImages} altText={item.title} />
            </div>
            
            {/* Portfolio Info */}
            <div className="md:col-span-1">
              <h1 className="text-4xl font-bold uppercase mb-6">{item.title}</h1>
              <div className="prose max-w-none">
                <p className="text-lg mb-8 uppercase">{item.description}</p>

                {item.content?.filter((section: any) => section._type === "textBlock").map((section: any, index: number) => (
                  <div key={index} className="mb-8">
                    <p className="uppercase">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 