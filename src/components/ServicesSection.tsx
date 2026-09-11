import React from 'react'
import { Plane, MapPin, Sparkles, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { sound } from '../utils/audio'

interface ServicesSectionProps {
  onSelectService: (serviceKey: string) => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const handleSelect = (serviceKey: string) => {
    sound.playChime(820, 0.08)
    onSelectService(serviceKey)
  }

  return (
    <section className="relative w-full z-20 pointer-events-none">
      {/* ---------------------------------------------------------------- */}
      {/* Service 1 (Position A: Front-Quarter - Airport Transfers)        */}
      {/* ---------------------------------------------------------------- */}
      <div className="min-h-screen flex items-center justify-start px-6 sm:px-16 py-24">
        <div className="max-w-xl glass-panel p-8 sm:p-10 rounded-2xl border border-[#D4AF37]/25 shadow-2xl pointer-events-auto">
          {/* Eyebrow */}
          <div className="flex items-center space-x-2 text-[11px] font-mono tracking-[0.22em] text-[#D4AF37] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>01 / AIRPORT & EXECUTIVE CORRIDORS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F5F7] font-light tracking-tight mb-4">
            Seamless City & <br />
            <span className="italic font-normal text-[#E5C378]">Airport Transfers</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A0A0AB] leading-relaxed mb-6 font-light">
            Direct executive connectivity between Pondicherry and Chennai International Airport (MAA),
            Bangalore (KIAL), and Karaikal. Our chauffeurs track your flight in real time with complimentary
            buffer for customs and baggage.
          </p>

          {/* Quick Route Badges */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <div className="flex items-center space-x-1.5 text-xs text-[#E5C378] font-mono mb-1">
                <Plane className="w-3.5 h-3.5" />
                <span>Pondicherry ⇄ Chennai (MAA)</span>
              </div>
              <p className="text-[11px] text-[#76767E]">~145 km · Approx 2h 45m via ECR</p>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <div className="flex items-center space-x-1.5 text-xs text-[#E5C378] font-mono mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Flight Tracking Guarantee</span>
              </div>
              <p className="text-[11px] text-[#76767E]">Zero delay charge on delayed arrivals</p>
            </div>
          </div>

          <button
            onClick={() => handleSelect('airport')}
            className="group inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.18em] text-[#D4AF37] hover:text-white transition-colors"
          >
            <span>Configure Airport Transfer</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Service 2 (Position B: Side Profile / Window - Outstation)      */}
      {/* ---------------------------------------------------------------- */}
      <div className="min-h-screen flex items-center justify-end px-6 sm:px-16 py-24">
        <div className="max-w-xl glass-panel p-8 sm:p-10 rounded-2xl border border-[#D4AF37]/25 shadow-2xl pointer-events-auto">
          {/* Eyebrow */}
          <div className="flex items-center space-x-2 text-[11px] font-mono tracking-[0.22em] text-[#D4AF37] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>02 / INTERSTATE GRAND TOURING</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F5F7] font-light tracking-tight mb-4">
            Round Trips & <br />
            <span className="italic font-normal text-[#E5C378]">Outstation Freedom</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A0A0AB] leading-relaxed mb-6 font-light">
            Private point-to-point and multi-day long distance voyages across Tamil Nadu, Karnataka,
            and Andhra Pradesh. Dedicated private chauffeur with absolute schedule flexibility,
            no surge algorithms, and all-inclusive transparent toll management.
          </p>

          {/* Highlights */}
          <div className="space-y-2.5 mb-6 text-xs text-[#C5C5CE]">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Dedicated chauffeur remains on standby throughout your stay</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Bangalore, Mahabalipuram, Thanjavur & Chidambaram corridors</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Fixed upfront tariff inclusive of driver allowance and toll passes</span>
            </div>
          </div>

          <button
            onClick={() => handleSelect('roundtrip')}
            className="group inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.18em] text-[#D4AF37] hover:text-white transition-colors"
          >
            <span>Plan Outstation Journey</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Service 3 (Position C: Wheel & Low Stance - White Town)         */}
      {/* ---------------------------------------------------------------- */}
      <div className="min-h-screen flex items-center justify-start px-6 sm:px-16 py-24">
        <div className="max-w-xl glass-panel p-8 sm:p-10 rounded-2xl border border-[#D4AF37]/25 shadow-2xl pointer-events-auto">
          {/* Eyebrow */}
          <div className="flex items-center space-x-2 text-[11px] font-mono tracking-[0.22em] text-[#D4AF37] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>03 / HERITAGE CURATION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F5F7] font-light tracking-tight mb-4">
            White Town & <br />
            <span className="italic font-normal text-[#E5C378]">Hourly Chauffeur</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A0A0AB] leading-relaxed mb-6 font-light">
            Bespoke hourly rentals for exploring Pondicherry's French Quarter, coastal promenade,
            Auroville Matrimandir, and Serenity Beach. Enjoy air-conditioned respite between heritage
            villas, artisanal boutiques, and seaside bistros.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <div className="flex items-center space-x-1.5 text-xs text-[#E5C378] font-mono mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>8 Hours / 80 KM Day Pass</span>
              </div>
              <p className="text-[11px] text-[#76767E]">Flexible itinerary with VIP parking concierge</p>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <div className="flex items-center space-x-1.5 text-xs text-[#E5C378] font-mono mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>French Quarter Mastery</span>
              </div>
              <p className="text-[11px] text-[#76767E]">Chauffeurs fluent in English, Tamil & French</p>
            </div>
          </div>

          <button
            onClick={() => handleSelect('hourly')}
            className="group inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.18em] text-[#D4AF37] hover:text-white transition-colors"
          >
            <span>Book White Town Day Chauffeur</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
