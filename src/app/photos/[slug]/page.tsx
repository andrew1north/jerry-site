import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import PhotoCollectionClient from "@/app/photos/[slug]/PhotoCollectionClient";

// Enable ISR with a 1-hour revalidation period
export const revalidate = 3600;

// Type definitions
export type Photo = {
  _key: string;
  asset: {
    url: string;
  };
  caption?: string;
  alt?: string;
};

export type PhotoCollection = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  photos: Photo[];
  tags?: string[];
};

// Fetch a specific photo collection from Sanity
async function getPhotoCollection(slug: string): Promise<PhotoCollection | null> {
  const query = groq`*[_type == "photoCollection" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    "photos": photos[] {
      _key,
      "asset": {
        "url": asset->url
      },
      caption,
      alt
    },
    tags
  }`;
  
  return client.fetch(query, { slug });
}

// Generate static paths
export async function generateStaticParams() {
  const query = groq`*[_type == "photoCollection"]{ "slug": slug.current }`;
  const slugs = await client.fetch(query);
  return slugs.map((slug: { slug: string }) => ({
    slug: slug.slug,
  }));
}

// Metadata for the page
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const collection = await getPhotoCollection(params.slug);
  
  if (!collection) {
    return {
      title: "Photo Collection Not Found",
    };
  }
  
  return {
    title: `${collection.title} - Photography`,
    description: collection.description,
  };
}

// Dynamic page component
export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const collection = await getPhotoCollection(params.slug);
  
  if (!collection) {
    notFound();
  }
  
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 pt-16">
        {/* Back to Photos Link */}
        <div className="py-4">
          <Link href="/photos" className="text-blue-600 hover:underline flex items-center">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
              <path d="M20,12H4M10,18L4,12L10,6" stroke="currentColor" fill="none" strokeWidth="2" />
            </svg>
            BACK TO PHOTOS
          </Link>
        </div>
        
        <div className="py-6">
          <h1 className="text-2xl font-bold mb-4 uppercase">{collection.title}</h1>
          
          {collection.description && (
            <p className="mb-6 uppercase">{collection.description}</p>
          )}
          
          <PhotoCollectionClient collection={collection} />
        </div>
      </div>
    </>
  );
} 