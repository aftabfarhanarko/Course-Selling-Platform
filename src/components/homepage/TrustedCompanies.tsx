"use client";

export default function TrustedCompanies() {
  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_with_text.svg" },
    { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" },
    { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
    { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" },
  ];

  return (
    <section className="py-6 bg-gradient-to-b from-white to-[#F8FAFC]  overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .marquee-inner:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div 
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)"
        }}
      >
        <div className="marquee-inner flex items-center gap-12 sm:gap-16 py-1">
          {/* First set */}
          {companies.map((c, i) => (
            <img 
              key={`${c.name}-1-${i}`} 
              src={c.logo} 
              alt={c.name} 
              className="h-5 sm:h-6 object-contain opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-300 shrink-0" 
            />
          ))}
          {/* Second set (duplicate for seamless loop) */}
          {companies.map((c, i) => (
            <img 
              key={`${c.name}-2-${i}`} 
              src={c.logo} 
              alt={c.name} 
              className="h-5 sm:h-6 object-contain opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-300 shrink-0" 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
