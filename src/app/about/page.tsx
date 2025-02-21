import NavBar from "@/components/NavBar";

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <h1 className="text-4xl font-bold mb-8">About</h1>

          <div className="prose">
            <p className="text-lg mb-6">
              Welcome to my creative space. I&apos;m Jerry, a multidisciplinary artist
              passionate about creating unique and meaningful pieces that tell stories
              and evoke emotions.
            </p>

            <p className="text-lg mb-6">
              My work spans various mediums and techniques, each piece carefully
              crafted to capture moments, ideas, and feelings. Through my portfolio,
              you&apos;ll find a collection of projects that represent my journey and
              artistic vision.
            </p>

            <p className="text-lg">
              Feel free to explore my portfolio or visit the shop to find pieces
              that speak to you. If you&apos;d like to collaborate or have any questions,
              don&apos;t hesitate to reach out.
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 