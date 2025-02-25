import NavBar from "@/components/NavBar";

export default function Listen() {
  return (
    <>
      <NavBar />
      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Listen</h1>
        <iframe 
          style={{ borderRadius: "12px" }} 
          src="https://open.spotify.com/embed/playlist/1x68vD44SXhftNQWgrmA0O?utm_source=generator&theme=0" 
          width="100%" 
          height="3200" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        />
      </div>
    </>
  );
} 