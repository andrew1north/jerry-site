"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import VideoThumbnail from "./VideoThumbnail";

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  slug: string;
};

type PortfolioGridProps = {
  items: PortfolioItem[];
};

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.1
          }}
        >
          <Link href={`/portfolio/${item.slug}`} className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {item.videoUrl ? (
                <VideoThumbnail 
                  videoUrl={item.videoUrl}
                  thumbnailUrl={item.videoThumbnailUrl}
                  alt={item.title}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={item.imageUrl || "/images/placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
} 