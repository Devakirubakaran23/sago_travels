import React from 'react'
import { MessageSquare, ShieldCheck } from 'lucide-react'
import { sound } from '../utils/audio'

export const FloatingConcierge: React.FC = () => {
  const handleWhatsAppClick = () => {
    sound.playChime(880, 0.08)
    const text = encodeURIComponent(
      'Hello Sago Travels Pondicherry, I would like to check availability and book a cab.'
    )
    window.open(`https://wa.me/919360169652?text=${text}`, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      <button
        onClick={handleWhatsAppClick}
        aria-label="Book Cab on WhatsApp"
        className="group relative flex items-center space-x-3 px-4 sm:px-5 py-3 rounded-full bg-[#0D0E11]/90 backdrop-blur-xl border border-[#C5A880]/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)] hover:border-[#C5A880] hover:shadow-[0_10px_40px_rgba(197,168,128,0.35)] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
      >
        {/* Pulsing Beacon Indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>

        {/* Text */}
        <div className="text-left">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-mono tracking-wider font-bold text-[#F9F9FB]">
              Book on WhatsApp
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
          </div>
          <div className="text-[10px] font-mono text-[#C5A880]">
            24/7 Cabs on Standby · Instant Reply
          </div>
        </div>

        {/* WhatsApp Icon Circle */}
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-black shadow-md group-hover:scale-110 transition-transform">
          <MessageSquare className="w-4 h-4 fill-black text-black" />
        </div>
      </button>
    </div>
  )
}
