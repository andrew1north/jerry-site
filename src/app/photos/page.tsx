import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";

// Enable ISR with a 1-hour revalidation period
export const revalidate = 3600;

// Type definitions
type Photo = {
  _key: string;
  asset: {
    url: string;
  };
  caption?: string;
  alt?: string;
};

type PhotoCollection = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  photos: Photo[];
  tags?: string[];
  displayOrder: number;
};

// Fetch all photo collections from Sanity
async function getPhotoCollections(): Promise<PhotoCollection[]> {
  const query = groq`*[_type == "photoCollection"] | order(displayOrder asc) {
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
    tags,
    displayOrder
  }`;
  
  return client.fetch(query);
}

export default async function Photos() {
  const collections = await getPhotoCollections();

  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">PHOTO COLLECTIONS</h1>
          
          {collections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No photo collections available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collections.map((collection) => (
                <Link href={`/photos/${collection.slug.current}`} key={collection._id}>
                  <div className="border border-gray-200 hover:border-gray-400 transition-colors duration-300 group">
                    {collection.photos.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2 p-4">
                        {collection.photos.slice(0, 3).map((photo) => (
                          <div key={photo._key} className="aspect-[3/4] relative">
                            <Image 
                              src={photo.asset.url}
                              alt={photo.alt || `Photo from ${collection.title}`}
                              fill
                              sizes="(max-width: 768px) 33vw, 200px"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="aspect-[3/1] bg-gray-100 flex items-center justify-center p-4">
                        <p className="text-gray-400">No photos</p>
                      </div>
                    )}
                    <div className="p-4 border-t border-gray-200">
                      <h3 className="text-sm text-gray-500 uppercase">{collection.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 