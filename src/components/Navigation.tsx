import React, { useState } from 'react'
import { Volume2, VolumeX, MessageSquare, PhoneCall, ShieldCheck } from 'lucide-react'
import { sound } from '../utils/audio'

interface NavigationProps {
  onBookNowClick?: () => void
}

export const Navigation: React.FC<NavigationProps> = ({ onBookNowClick }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted())

  const handleToggleSound = () => {
    const muted = sound.toggleMute()
    setIsMuted(muted)
  }

  const handleHotlineClick = () => {
    sound.playChime(750, 0.08)
    window.location.href = 'tel:+919360169652'
  }

  const handleWhatsAppClick = () => {
    sound.playChime(880, 0.08)
    const text = encodeURIComponent('Hello Sago Travels, I would like to inquire about booking a cab / travel tour van in Pondicherry.')
    window.open(`https://wa.me/919360169652?text=${text}`, '_blank')
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-5 sm:px-10 py-5 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Monogram & Crest */}
        <div className="flex items-center space-x-3.5 pointer-events-auto">
          <div className="w-9 h-9 rounded-full border border-[#D4AF37]/40 bg-[#121316]/80 backdrop-blur-md flex items-center justify-center text-[#D4AF37] font-display font-semibold text-base shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            S
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display tracking-[0.2em] text-sm sm:text-base font-bold text-[#F5F5F7]">
                SAGO TRAVELS
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880] border border-[#C5A880]/30 px-1.5 py-0.5 rounded-sm bg-[#C5A880]/5 hidden sm:inline-block">
                PONDICHERRY
              </span>
            </div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#8E8E98] hidden sm:block">
              Clean AC Cabs & Tourist Tour Travel
            </p>
          </div>
        </div>

        {/* Center Live Fleet Pill (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#121316]/70 backdrop-blur-lg pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono tracking-wider text-[#A0A0AB] uppercase">
            24/7 TAXI STANDBY · ON-TIME GUARANTEED
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] ml-1" />
        </div>

        {/* Right Actions: Sound, Hotline, WhatsApp CTA */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5 pointer-events-auto">
          {/* Sound Ambience Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label="Toggle Sound"
            className="w-9 h-9 rounded-full border border-white/10 bg-[#121316]/80 backdrop-blur-md flex items-center justify-center text-[#A0A0AB] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors duration-200"
            title={isMuted ? 'Turn on luxury studio ambience' : 'Mute sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
          </button>

          {/* Quick Phone Call */}
          <button
            onClick={handleHotlineClick}
            aria-label="Direct Hotline"
            className="w-9 h-9 rounded-full border border-white/10 bg-[#121316]/80 backdrop-blur-md flex items-center justify-center text-[#A0A0AB] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors duration-200"
            title="Call 24/7 VIP Concierge"
          >
            <PhoneCall className="w-4 h-4" />
          </button>

          {/* WhatsApp / Book CTA */}
          <button
            onClick={onBookNowClick || handleWhatsAppClick}
            className="group relative inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-gradient-to-r from-[#1A1A1E] to-[#121215] text-[#F5F5F7] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-200" />
            <span className="text-xs font-mono uppercase tracking-[0.16em] font-medium">
              Reserve
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
