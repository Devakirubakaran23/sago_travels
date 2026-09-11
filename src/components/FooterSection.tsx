import React from 'react'
import { PhoneCall, MessageSquare, Compass, Shield, ArrowUp } from 'lucide-react'
import { sound } from '../utils/audio'

interface FooterSectionProps {
  onScrollToTop: () => void
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onScrollToTop }) => {
  const handleScrollTop = () => {
    sound.playChime(660, 0.08)
    onScrollToTop()
  }

  const handleHotline = () => {
    sound.playChime(750, 0.08)
    window.location.href = 'tel:+919360169652'
  }

  const handleWhatsApp = () => {
    sound.playChime(880, 0.08)
    const text = encodeURIComponent(
      'Hello Sago Travels Desk, I would like to book a cab in Pondicherry.'
    )
    window.open(`https://wa.me/919360169652?text=${text}`, '_blank')
  }

  return (
    <footer className="relative py-28 px-6 sm:px-12 bg-[#0D0E11] text-[#F9F9FB] border-t border-white/10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Upper Headline */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>SAGO TRAVELS · PONDICHERRY 24/7 CAB DESK</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F9F9FB] font-light tracking-tight leading-[1.08] mb-6">
            Reliable Cabs, <br />
            <span className="italic font-normal text-[#C5A880]">Every Single Time</span>.
          </h2>

          <p className="text-sm sm:text-base text-[#8E8E98] font-light max-w-xl leading-relaxed mb-8">
            Available 24 hours a day, 365 days a year for Chennai airport drops,
            White Town sightseeing, and outstation trips across Tamil Nadu and South India.
          </p>

          {/* Quick Direct Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleHotline}
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-black/60 border border-[#C5A880]/40 text-[#F9F9FB] hover:border-[#C5A880] hover:bg-[#C5A880]/10 transition-all duration-300 group"
            >
              <PhoneCall className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                Call +91 93601 69652
              </span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-emerald-400 hover:bg-[#25D366]/25 transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                WhatsApp Cab Booking
              </span>
            </button>
          </div>
        </div>

        {/* Bureau Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-b border-white/10">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-3">
              Pondicherry Office Desk
            </div>
            <p className="text-xs text-[#E0CEB5] leading-relaxed font-light">
              Sago Travels Pondicherry
              <br />
              14 Rue Suffren, White Town
              <br />
              Puducherry 605001, India
            </p>
            <div className="mt-3 text-[11px] font-mono text-[#8E8E98]">
              24/7 Helpline: +91 93601 69652
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-3">
              Cab Fleet
            </div>
            <ul className="text-xs text-[#8E8E98] space-y-1.5 font-mono">
              <li>Maruti Suzuki Ertiga (6-Seater AC)</li>
              <li>Travel Tour Van (12-16 Seater)</li>
              <li>Toyota Innova Crysta (6-7 Seater)</li>
              <li>Sedan AC Cabs (Etios / Dzire)</li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-3">
              Popular Routes
            </div>
            <ul className="text-xs text-[#8E8E98] space-y-1.5 font-mono">
              <li>Chennai Airport (MAA) Express via ECR</li>
              <li>Pondicherry ⇄ Bangalore / Coimbatore</li>
              <li>White Town & Auroville Day Package</li>
              <li>Mahabalipuram Coastal Tour</li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-3">
              Local Dispatch Hub
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C5A880]">
              <Compass className="w-4 h-4" />
              <span>11.9416° N · 79.8083° E</span>
            </div>
            <p className="text-[11px] text-[#8E8E98] mt-2 leading-relaxed font-light">
              Cabs stationed across White Town, Bus Stand, and ECR for immediate dispatch.
            </p>
          </div>
        </div>

        {/* Sub-Footer Copyright & Apex Scroll */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-[11px] text-[#8E8E98] font-mono">
            <span>© {new Date().getFullYear()} SAGO TRAVELS PONDICHERRY.</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>

          <button
            onClick={handleScrollTop}
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
