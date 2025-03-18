"use client";

import { useState } from "react";
import Image from "next/image";
import PhotoModal from "@/components/PhotoModal";
import type { PhotoCollection } from "./page";

interface PhotoCollectionClientProps {
  collection: PhotoCollection;
}

export default function PhotoCollectionClient({ collection }: PhotoCollectionClientProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  
  if (collection.photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 uppercase">No photos in this collection yet.</p>
      </div>
    );
  }

  const totalPhotos = collection.photos.length;
  
  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-gray-500 uppercase">{totalPhotos} photos in this collection</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {collection.photos.map((photo, index) => (
          <div 
            key={photo._key} 
            className="border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors duration-300"
            onClick={() => setSelectedPhotoIndex(index)}
          >
            <div className="aspect-square relative">
              <Image 
                src={photo.asset.url}
                alt={photo.alt || `Photo in ${collection.title}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
            </div>
            {photo.caption && (
              <div className="p-2 bg-white">
                <p className="text-xs text-gray-500 uppercase">{photo.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Photo Modal */}
      {selectedPhotoIndex !== null && (
        <PhotoModal
          photos={collection.photos}
          selectedIndex={selectedPhotoIndex}
          onClose={() => setSelectedPhotoIndex(null)}
        />
      )}
    </>
  );
} 