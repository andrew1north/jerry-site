import NavBar from "@/components/NavBar";
import Image from "next/image";

export default function About() {
  return (
    <>
      <NavBar />
      <div className="py-32 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About</h1>
        
        <div className="relative">
          {/* Image container with float-left to allow text wrapping */}
          <div className="float-left mr-8 mb-6 relative w-full sm:w-80 max-w-xs">
            <Image 
              src="/images/jerry-about.jpg"
              alt="Jerry Lester"
              width={400}
              height={600}
              className="rounded-md object-cover w-full"
              style={{ maxHeight: "600px" }}
              priority
            />
          </div>
          
          {/* Text content that will wrap around the floated image */}
          <div className="space-y-6 text-lg">
            <p>
              Welcome to my creative space. I&apos;m Jerry Lester, a multidisciplinary artist that specializes in mediums extending from drawing and painting, all the way to sewing and fashion design.
            </p>
            <p>
              I originally hail from the suburbs of Philadelphia, Pennsylvania, where I grew up in a small town raised by blue collared folks. To say I was inspired by my upbringings and the people around me would be an understatement. I have always very much believed that you are a product of your environment, and that you should always lean into it. This is ultimately the basis for starting Jerry Lester Studios in 2024.
            </p>
            <p>
              Although I am a chemical engineer in training, I have always taken a liking to the arts. Ever since I was a kid, art has been the only consistency in my life. But with change, comes inspiration, and with inspiration, comes the basis for my creative work. I have experienced many things in my life as an engineer, and as a person, all of which culminate into the work that I am excited to share with all who will take the time to watch.
            </p>
            <p>
              Feel free to explore my portfolio and the work I have put into each piece. If you are interested in collaborating or have any questions, feel free to contact me.
            </p>
            <p>
              Thanks For Watching.
            </p>
          </div>
          {/* This div ensures proper clearing of the float */}
          <div className="clear-both"></div>
        </div>
      </div>
    </>
  );
} 