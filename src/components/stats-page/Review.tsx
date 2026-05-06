import React from "react";

const Review = () => {
  const testimonials = [
    {
      quote: "I went from struggling to land $500 logo projects to closing a $7,500 SaaS redesign within 3 weeks of finishing the sales module.",
      author: "Sarah Chen",
      earned: "Earned: $7.5k Project",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      quote: "The UI Framework module alone is worth the price. It's the most systematic approach to dashboard design I've ever seen.",
      author: "Marcus Thorne",
      earned: "Earned: $12k/mo Retainer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  ];

  return (
    <section className="bg-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Left Side: Header */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center pr-4">
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight mb-6 tracking-tight">
            Real Results from Real Architects.
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed font-medium">
            Join the ranks of designers who have transformed 
            their careers from pixel-pushers to strategic partners.
          </p>
        </div>

        {/* Right Side: Testimonial Cards */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <div 
              key={index} 
              className="bg-[#F8FAFF] p-8 md:p-10 rounded-[40px] border border-slate-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-[#1E293B] text-[17px] md:text-lg leading-relaxed font-medium mb-10 italic">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={t.avatar} 
                  alt={t.author} 
                  className="w-12 h-12 rounded-full object-cover grayscale"
                />
                <div>
                  <h4 className="font-bold text-[#0F172A] text-base">{t.author}</h4>
                  <p className="text-emerald-600 text-[13px] font-black tracking-wide uppercase">
                    {t.earned}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
