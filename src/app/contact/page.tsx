import NavBar from "@/components/NavBar";

export default function Contact() {
  return (
    <>
      <NavBar />
      <div className="pt-24 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        <div className="text-xl space-y-4">
          <p>For inquiries about artwork, commissions, or any other questions, please reach out:</p>
          <p>Email: <a href="mailto:Jerrylesterstudios@gmail.com" className="text-blue-600 hover:underline">Jerrylesterstudios@gmail.com</a></p>
          <p>Follow on Instagram:</p>
        </div>
        <div className="flex justify-center pt-4 pb-12">
          <div 
            className="rsme-embed rsme-instagram-embed 866ed22d-4e79-4d50-8829-7bcad4e6975c" 
            style={{overflow: "hidden", width: "600px", borderRadius: "3px", position: "relative"}}
          >
            <style>{`
              .rsme-embed .rsme-d-none {
                display: none;
              }
              .rsme-embed .twitter-tweet {
                margin: 0 !important;
              }
              .rsme-embed blockquote {
                margin: 0 !important;
                padding: 0 !important;
              }
              .rsme-embed.rsme-facebook-embed .fb-post iframe {
                width: 100% !important;
              }
              .rsme-embed.rsme-facebook-embed .fb-post span {
                width: 100% !important;
              }
            `}</style>
            <iframe 
              className="instagram-media instagram-media-rendered"
              id="instagram-embed-0"
              src="https://www.instagram.com/p/C5zEe6VSL2O/embed/?cr=1&v=14&wp=598&rd=https%3A%2F%2Fjerry-lester.com&rp=%2Fcontact"
              allowFullScreen={true}
              frameBorder="0"
              height="474"
              data-instgrm-payload-id="instagram-media-payload-0"
              scrolling="no"
              style={{
                width: "calc(100% - 2px)",
                backgroundColor: "white",
                borderRadius: "3px",
                border: "1px solid rgb(219, 219, 219)",
                boxShadow: "none",
                display: "block",
                margin: "0px 0px 12px",
                minWidth: "326px",
                padding: "0px"
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
} 