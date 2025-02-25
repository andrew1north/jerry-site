import NavBar from "@/components/NavBar";

export default function About() {
  return (
    <>
      <NavBar />
      <div className="py-32 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About</h1>
        <div className="space-y-6 text-lg">
          <p>
            Welcome to my creative space. I&apos;m Jerry, a multidisciplinary artist passionate about creating unique and meaningful pieces that tell stories and evoke emotions.
          </p>
          <p>
            My work spans various mediums and techniques, each piece carefully crafted to capture moments, ideas, and feelings. Through my portfolio, you&apos;ll find a collection of projects that represent my journey and artistic vision.
          </p>
          <p>
            Feel free to explore my portfolio or visit the shop to find pieces that speak to you. If you&apos;d like to collaborate or have any questions, don&apos;t hesitate to reach out.
          </p>
        </div>
      </div>
    </>
  );
} 