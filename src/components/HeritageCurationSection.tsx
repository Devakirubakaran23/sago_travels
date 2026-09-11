import React from 'react'
import { Sparkles, Quote, Star, MapPin, Compass } from 'lucide-react'

export const HeritageCurationSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'Booked an Ertiga cab for our 4:30 AM drop from Pondicherry to Chennai Airport. The driver arrived 15 minutes early, was polite, and drove smoothly along the ECR highway. AC was great and rate was exactly as quoted with no extras.',
      author: 'Meenakshi Sundaram',
      title: 'IT Professional, OMR Chennai',
      route: 'Pondicherry ⇄ Chennai Airport (MAA) in Ertiga',
      rating: 5,
    },
    {
      quote:
        'We booked a 15-seater Travel Tour Van for a 3-day family trip covering Auroville, Pichavaram Mangroves, and Mahabalipuram. The van was very clean, pushback seats were comfortable, and the top carrier held all 14 suitcases easily.',
      author: 'Raghavan & Family',
      title: 'Family Group Tour, Bangalore',
      route: '3-Day Coastal & Heritage Tour in Travel Van',
      rating: 5,
    },
    {
      quote:
        'Hired an Innova for our parents and kids for White Town and Auroville. The cab was spotless, AC was chilled, and the driver knew every cafe shortcut and parking spot near Promenade Beach. Highly dependable service.',
      author: 'Arun & Priya Varma',
      title: 'Vacation Travelers, Hyderabad',
      route: 'White Town & Auroville Day Sightseeing in Innova',
      rating: 5,
    },
  ]

  return (
    <section className="relative py-28 px-6 sm:px-12 bg-[#0D0E11] text-[#F9F9FB] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL TRAVELER REVIEWS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F9F9FB] font-light tracking-tight">
            Trusted by Families, <br />
            <span className="italic font-normal text-[#C5A880]">Tourists & Airport Commuters</span>.
          </h2>
          <p className="text-sm sm:text-base text-[#8E8E98] font-light mt-3 leading-relaxed">
            Read authentic feedback from passengers who book our cabs daily for Chennai airport transfers,
            Auroville day trips, and outstation family vacations.
          </p>
        </div>

        {/* 3 Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-[#C5A880]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 text-[#C5A880] mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#C5A880]/30 mb-3" />

                <p className="text-sm text-[#D8D8E0] font-light leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-white/10">
                <div className="font-serif text-lg text-[#F9F9FB]">{item.author}</div>
                <div className="text-[11px] font-mono text-[#8E8E98]">{item.title}</div>
                <div className="text-[10px] font-mono text-[#C5A880] mt-1.5 flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.route}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* French Quarter Heritage & Travel Strip */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#C5A880]/30 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#C5A880] uppercase mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>PONDICHERRY LOCAL & OUTSTATION TAXI SERVICE</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#F9F9FB] font-light mb-4">
                Explore White Town, Auroville & <br />
                <span className="italic font-normal text-[#C5A880]">The East Coast Road</span>.
              </h3>
              <p className="text-sm text-[#8E8E98] leading-relaxed font-light mb-6">
                Stationed directly in Pondicherry, our cabs are ready 24 hours a day for immediate dispatch.
                Whether you need a quick drop to Chennai Airport, an all-day sightseeing cab around the French Quarter,
                or a 15-seater tour van for a group getaway, our fleet is just a phone call or WhatsApp message away.
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-mono text-[#E0CEB5]">
                <span className="px-3 py-1.5 rounded-full bg-black/50 border border-white/10">
                  🚕 French Quarter & Promenade
                </span>
                <span className="px-3 py-1.5 rounded-full bg-black/50 border border-white/10">
                  🚕 Auroville Matrimandir
                </span>
                <span className="px-3 py-1.5 rounded-full bg-black/50 border border-white/10">
                  🚕 Chennai Airport Express
                </span>
                <span className="px-3 py-1.5 rounded-full bg-black/50 border border-white/10">
                  🚕 Mahabalipuram & Chidambaram
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-64 border border-white/10">
              <img
                src="/images/ertiga-cab.jpg"
                alt="Clean Maruti Suzuki Ertiga tourist cab in Pondicherry"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-white/90">
                Clean, Air-Conditioned Cabs Stationed in Pondicherry
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
