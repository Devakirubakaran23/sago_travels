import React, { useState } from 'react'
import {
  Compass,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Car,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react'
import { sound } from '../utils/audio'

interface HeroSectionProps {
  onExploreClick: () => void
  onReserveClick: () => void
}

type TabMode = 'roundtrip' | 'airport' | 'local'

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onReserveClick,
}) => {
  const [activeTab, setActiveTab] = useState<TabMode>('airport')
  const [pickup, setPickup] = useState<string>('White Town, Pondicherry')
  const [destination, setDestination] = useState<string>('Chennai International Airport (MAA)')
  const [date, setDate] = useState<string>(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  })
  const [time, setTime] = useState<string>('08:30')
  const [vehicle, setVehicle] = useState<string>('Toyota Innova (6-7 Seater)')

  const handleTabSwitch = (mode: TabMode) => {
    sound.playChime(750, 0.05)
    setActiveTab(mode)
    if (mode === 'airport') {
      setPickup('White Town, Pondicherry')
      setDestination('Chennai International Airport (MAA)')
    } else if (mode === 'roundtrip') {
      setPickup('Pondicherry (Any Location)')
      setDestination('Bangalore / Chennai / Outstation')
    } else if (mode === 'local') {
      setPickup('Promenade Beach / French Quarter')
      setDestination('Auroville & Heritage White Town (8 Hrs)')
    }
  }

  const handleCheckRouteAndReserve = () => {
    sound.playChime(950, 0.08)
    const modeLabel =
      activeTab === 'airport'
        ? 'Airport Drop / Pickup'
        : activeTab === 'roundtrip'
        ? 'Outstation Round-Trip'
        : 'Local Heritage Chauffeur (8h)'

    const message = [
      `*SAGO TRAVELS PONDICHERRY — CAB RESERVATION*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `*Mode:* ${modeLabel}`,
      `*From:* ${pickup}`,
      `*To:* ${destination}`,
      `*Schedule:* ${date} at ${time}`,
      `*Fleet Selected:* ${vehicle}`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `Hello Sago Travels, I would like to check cab availability and reserve this vehicle.`,
    ].join('\n')

    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/919360169652?text=${encoded}`, '_blank')
  }

  return (
    <section className="relative min-h-[105vh] w-full flex flex-col justify-between overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* Full-Bleed Cinematic Photography Banner                       */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-innova-whitetown.jpg"
          alt="Pristine black Toyota Innova parked on an elegant French colonial street in Pondicherry White Town"
          className="w-full h-full object-cover object-center transform scale-[1.02] filter brightness-[0.88] contrast-[1.08] transition-transform duration-1000 ease-out"
        />
        {/* Editorial Gradients for Deep Contrast & Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/45 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11]/85 via-[#0D0E11]/30 to-transparent pointer-events-none" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Upper Content: Editorial Headline & Brand Identity             */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-32 sm:pt-36 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#C5A880]/30 bg-[#0D0E11]/70 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#E0CEB5] uppercase">
              SAGO TRAVELS · 24/7 PONDICHERRY CAB SERVICE & AIRPORT TRANSFERS
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-light text-[#F9F9FB] tracking-tight leading-[1.04] mb-6">
            Pondicherry, <br />
            <span className="italic font-normal text-[#C5A880]">Traversed in Comfort</span>.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#D8D8E0] font-light max-w-2xl leading-relaxed mb-8">
            Prompt airport drops to Chennai (MAA), French Quarter sightseeing, and outstation family trips in clean, comfortable, air-conditioned cabs.
          </p>

          {/* Upper Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <button
              onClick={() => {
                sound.playChime(880, 0.08)
                onReserveClick()
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-[#0D0E11] font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(197,168,128,0.35)] hover:scale-[1.02] transition-all"
            >
              Book Your Cab
            </button>
            <button
              onClick={() => {
                sound.playChime(660, 0.08)
                onExploreClick()
              }}
              className="px-6 py-3 rounded-full border border-white/20 bg-black/40 text-[#F9F9FB] font-mono text-xs uppercase tracking-wider hover:border-[#C5A880] hover:text-[#E0CEB5] transition-all"
            >
              View Fleet & Routes
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#E0CEB5] font-mono pt-1 pb-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Innova · Ertiga · Tour Van</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Honest Fixed Fares · No Surge</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>24/7 On-Time Flight Pickup</span>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Pinned Quick-Reserve Console at Bottom of Hero (Frosted Glass) */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 w-full px-4 sm:px-8 pb-10 sm:pb-14 pt-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass-console rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-[#C5A880]/30 relative">
            {/* Console Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
              <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10">
                <button
                  onClick={() => handleTabSwitch('roundtrip')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    activeTab === 'roundtrip'
                      ? 'bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-[#0D0E11] font-semibold shadow-md'
                      : 'text-[#8E8E98] hover:text-white'
                  }`}
                >
                  Outstation Round-Trip
                </button>
                <button
                  onClick={() => handleTabSwitch('airport')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    activeTab === 'airport'
                      ? 'bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-[#0D0E11] font-semibold shadow-md'
                      : 'text-[#8E8E98] hover:text-white'
                  }`}
                >
                  Airport Drop / Pickup
                </button>
                <button
                  onClick={() => handleTabSwitch('local')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    activeTab === 'local'
                      ? 'bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-[#0D0E11] font-semibold shadow-md'
                      : 'text-[#8E8E98] hover:text-white'
                  }`}
                >
                  Local Rental
                </button>
              </div>

              <div className="hidden md:flex items-center space-x-2 text-[11px] font-mono text-[#C5A880]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Immediate Chauffeur Standby · White Town Hub</span>
              </div>
            </div>

            {/* Console Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
              {/* Input: From */}
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-1.5">
                  From (Pickup Point)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#C5A880] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Pickup address / Hotel"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-[#F9F9FB] placeholder-[#666] focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>
              </div>

              {/* Input: To */}
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-1.5">
                  To (Destination)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#C5A880] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Destination corridor"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-[#F9F9FB] placeholder-[#666] focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>
              </div>

              {/* Input: Date & Time */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-1.5">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880] absolute left-2.5 top-3" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-8 pr-1 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-[#F9F9FB] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-1.5">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880] absolute left-2.5 top-3" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-8 pr-1 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-[#F9F9FB] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Input: Fleet Selection */}
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-1.5">
                  Fleet Selection
                </label>
                <div className="relative">
                  <Car className="w-4 h-4 text-[#C5A880] absolute left-3 top-3" />
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-[#F9F9FB] focus:outline-none focus:border-[#C5A880] transition-colors"
                  >
                    <option value="Toyota Innova (6-7 Seater)">Toyota Innova (6-7 Seater AC MPV)</option>
                    <option value="Maruti Suzuki Ertiga (6 Seater)">Maruti Suzuki Ertiga (6 Seater AC Cab)</option>
                    <option value="Travel Tour Van (12-16 Seater)">Travel Tour Van / Tempo (12-16 Seater)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center space-x-4 text-[11px] font-mono text-[#8E8E98]">
                <span className="text-[#C5A880] font-medium">All-Inclusive:</span>
                <span>Tollways & Taxes Included</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Complimentary Bottled Water</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onExploreClick}
                  className="hidden md:inline-flex items-center space-x-2 px-5 py-3 rounded-full border border-white/15 bg-black/40 text-[#F9F9FB] text-xs font-mono uppercase tracking-wider hover:border-[#C5A880] hover:text-[#E0CEB5] transition-all duration-200"
                >
                  <span>View Fixed Corridors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Strict User Action Button: "Check Route & Reserve" linking to WhatsApp Concierge */}
                <button
                  onClick={handleCheckRouteAndReserve}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9E7B4F] text-[#0D0E11] font-mono text-xs uppercase tracking-[0.16em] font-bold shadow-[0_0_25px_rgba(197,168,128,0.4)] hover:shadow-[0_0_35px_rgba(197,168,128,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Check Route & Reserve</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom GPS Coordinates HUD */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8E8E98] px-2 pt-4">
            <div className="flex items-center space-x-2">
              <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>11.9416° N / 79.8083° E</span>
              <span className="text-[#444]">•</span>
              <span className="hidden sm:inline">WHITE TOWN FRENCH QUARTER</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-[#C5A880]/80">
              Chauffeur Privé · Pondicherry
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
