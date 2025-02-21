"use client";

import { InstagramEmbed } from "react-social-media-embed";

export default function InstagramFeed() {
  return (
    <div className="flex justify-center pt-4">
      <InstagramEmbed 
        url="https://www.instagram.com/p/C5zEe6VSL2O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        width={600}
      />
    </div>
  );
} 