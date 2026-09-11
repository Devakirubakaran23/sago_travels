import React, { useState } from 'react'
import {
  Users,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
} from 'lucide-react'
import { sound } from '../utils/audio'

interface FleetVehicle {
  id: string
  name: string
  category: string
  tagline: string
  description: string
  image: string
  passengers: number
  luggage: number
  specs: {
    seating: string
    cooling: string
    storage: string
    driver: string
  }
  features: string[]
  recommendedFor: string
}

interface FleetShowcaseSectionProps {
  onSelectVehicle: (vehicleName: string) => void
}

export const FleetShowcaseSection: React.FC<FleetShowcaseSectionProps> = ({
  onSelectVehicle,
}) => {
  // Put Ertiga first by default, then Travel Tour Van, as requested!
  const [selectedFleetId, setSelectedFleetId] = useState<string>('ertiga')

  const fleetList: FleetVehicle[] = [
    {
      id: 'ertiga',
      name: 'Maruti Suzuki Ertiga',
      category: 'Economy 6-Seater AC Cab',
      tagline: 'The Popular Family & Airport Choice',
      description:
        'Clean, reliable, and fuel-efficient. The Maruti Ertiga is Pondicherry’s most requested cab for Chennai airport transfers, family outings, and outstation trips. Offers cold dual air-conditioning, comfortable seating, and honest value for money.',
      image: '/images/ertiga-cab.jpg',
      passengers: 6,
      luggage: 4,
      specs: {
        seating: '6 Comfortable Passenger Seats (Foldable 3rd Row)',
        cooling: 'Powerful Dual-Blower AC (Chilled in Coastal Heat)',
        storage: 'Boot Space for 3-4 Suitcases + Soft Bags',
        driver: 'Courteous, Verified Local Driver with Safe Driving Record',
      },
      features: [
        'Clean, non-smoking, well-maintained car interior',
        'Working phone chargers & clean water bottle storage',
        'Zero surge pricing — honest meter & route rates',
        'Smooth highway driving along ECR & NH roads',
      ],
      recommendedFor: 'Chennai airport pickup/drop, small families & daily local travel',
    },
    {
      id: 'tour-van',
      name: 'Travel Tour Van (Tempo Traveller)',
      category: '12 to 16 Seater AC Tourist Van',
      tagline: 'Spacious Group Touring & Family Outings',
      description:
        'Designed for group travel, family gatherings, college reunions, and coastal temple circuits. Features full interior standing height, individual pushback seats, a dedicated roof luggage carrier, and a seasoned driver who knows every tourist spot across Tamil Nadu.',
      image: '/images/tourist-van.jpg',
      passengers: 15,
      luggage: 15,
      specs: {
        seating: '12 to 16 High-Back Pushback Bucket Seats with Aisle',
        cooling: 'Multi-Vent Roof AC Unit with High-Capacity Chilling',
        storage: 'Heavy-Duty Top Luggage Carrier + Rear Trunk Hold',
        driver: 'Seasoned Highway Tourist Driver for Multi-Day Tours',
      },
      features: [
        'Comfortable pushback seats with ample knee space',
        'Overhead carrier handles heavy family luggage easily',
        'Sound system for group entertainment on long journeys',
        'Ideal for Mahabalipuram, Chidambaram & Pichavaram day trips',
      ],
      recommendedFor: 'Family functions, corporate teams, college trips & temple tours',
    },
    {
      id: 'innova',
      name: 'Toyota Innova Crysta',
      category: 'Comfort 6-7 Seater AC MPV',
      tagline: 'Extra Legroom & Long-Distance Comfort',
      description:
        'Pondicherry’s preferred highway cruiser. With individual captain seats in the middle row, generous legroom, and a large boot that holds 5-6 full suitcases, the Innova ensures everyone travels relaxed even on 6-hour journeys to Bangalore.',
      image: '/images/hero-innova-whitetown.jpg',
      passengers: 7,
      luggage: 6,
      specs: {
        seating: 'Middle-Row Individual Captain Seats + Wide 3rd Row',
        cooling: 'Rear Independent AC with Roof Controls',
        storage: 'Expansive Cargo Space for International Flight Luggage',
        driver: 'Experienced Chauffeur with Complete Route Knowledge',
      },
      features: [
        'Superior road suspension for maximum journey comfort',
        'Spacious enough for tall passengers and lots of luggage',
        'Quiet, rattle-free cabin with tinted sun protection',
        'All-inclusive toll and state permit transparent billing',
      ],
      recommendedFor: 'Executive travel, senior citizens & long-distance outstation routes',
    },
  ]

  const activeVehicle =
    fleetList.find((v) => v.id === selectedFleetId) || fleetList[0]

  const handleFleetSwitch = (id: string) => {
    sound.playChime(780, 0.06)
    setSelectedFleetId(id)
  }

  const handleReserveActiveVehicle = () => {
    sound.playChime(900, 0.08)
    onSelectVehicle(activeVehicle.name)
  }

  return (
    <section id="fleet-section" className="relative py-28 px-6 sm:px-12 bg-[#0D0E11] text-[#F9F9FB] border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR VEHICLE FLEET · ALL AC & CLEAN</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F9F9FB] font-light tracking-tight">
              Honest Cabs. <br />
              <span className="italic font-normal text-[#C5A880]">Clean & Comfortable</span>.
            </h2>
          </div>

          {/* Vehicle Switcher Tabs: Ertiga first, then Tour Van, then Innova */}
          <div className="inline-flex p-1.5 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-md">
            {fleetList.map((veh) => (
              <button
                key={veh.id}
                onClick={() => handleFleetSwitch(veh.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  selectedFleetId === veh.id
                    ? 'bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-[#0D0E11] font-bold shadow-md'
                    : 'text-[#8E8E98] hover:text-white'
                }`}
              >
                {veh.name.includes('Ertiga')
                  ? 'Maruti Ertiga'
                  : veh.name.includes('Tour Van')
                  ? 'Travel Tour Van'
                  : 'Toyota Innova'}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Vehicle Image & Badges (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#C5A880]/30 shadow-2xl group min-h-[400px] sm:min-h-[480px]">
              <img
                src={activeVehicle.image}
                alt={activeVehicle.name}
                className="w-full h-full object-cover object-center absolute inset-0 hover-zoom-img filter brightness-[0.95] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-transparent to-black/40 pointer-events-none" />

              {/* Passenger & Luggage Counter Badges */}
              <div className="absolute top-5 right-5 z-20 flex items-center space-x-2">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-[11px] font-mono text-[#E0CEB5]">
                  <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Up to {activeVehicle.passengers} Guests</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-[11px] font-mono text-[#E0CEB5]">
                  <Briefcase className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{activeVehicle.luggage} Bags</span>
                </div>
              </div>

              {/* Feature Pill Overlay */}
              <div className="absolute top-5 left-5 z-20">
                <span className="px-3.5 py-1.5 rounded-full bg-black/70 border border-white/15 text-[#E0CEB5] font-mono text-[11px] tracking-wide backdrop-blur-md">
                  100% Chilled AC · Doorstep Pickup
                </span>
              </div>

              {/* Vehicle Title Overlay at Bottom */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="text-[11px] font-mono tracking-widest uppercase text-[#C5A880] mb-1">
                  {activeVehicle.category}
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#F9F9FB] font-light">
                  {activeVehicle.name}
                </h3>
                <p className="text-xs font-mono text-[#8E8E98] mt-1">
                  {activeVehicle.tagline}
                </p>
              </div>
            </div>

            {/* Quick Fleet Switcher Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {fleetList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleFleetSwitch(item.id)}
                  className={`cursor-pointer rounded-2xl overflow-hidden relative border transition-all h-24 ${
                    selectedFleetId === item.id
                      ? 'border-[#C5A880] shadow-[0_0_15px_rgba(197,168,128,0.25)]'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-[11px] font-mono text-center px-1 text-[#E0CEB5]">
                    <span>
                      {item.name.includes('Ertiga')
                        ? 'Maruti Ertiga'
                        : item.name.includes('Tour Van')
                        ? 'Travel Tour Van'
                        : 'Toyota Innova'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Realistic Cab Details & Direct Booking (5 Cols) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-8 sm:p-10 border border-[#C5A880]/25 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.2em] text-[#C5A880] uppercase mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>CAB SPECIFICATIONS</span>
              </div>

              <h4 className="font-serif text-2xl sm:text-3xl text-[#F9F9FB] font-light mb-3">
                {activeVehicle.tagline}
              </h4>

              <p className="text-sm text-[#8E8E98] leading-relaxed mb-6 font-light">
                {activeVehicle.description}
              </p>

              {/* Core Specs Grid */}
              <div className="space-y-3.5 mb-8 pb-6 border-b border-white/10 text-xs">
                <div className="flex items-start justify-between">
                  <span className="text-[#8E8E98] font-mono">Seating:</span>
                  <span className="text-[#F9F9FB] font-medium text-right max-w-[65%]">
                    {activeVehicle.specs.seating}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#8E8E98] font-mono">Air Conditioning:</span>
                  <span className="text-[#F9F9FB] font-medium text-right max-w-[65%]">
                    {activeVehicle.specs.cooling}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#8E8E98] font-mono">Luggage:</span>
                  <span className="text-[#F9F9FB] font-medium text-right max-w-[65%]">
                    {activeVehicle.specs.storage}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#8E8E98] font-mono">Driver:</span>
                  <span className="text-[#E0CEB5] font-medium text-right max-w-[65%]">
                    {activeVehicle.specs.driver}
                  </span>
                </div>
              </div>

              {/* Practical Inclusions */}
              <div className="mb-8">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880] mb-3">
                  Trip Features Included
                </div>
                <ul className="space-y-2.5 text-xs text-[#D8D8E0]">
                  {activeVehicle.features.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Reserve Button */}
            <div className="pt-2">
              <div className="text-[10px] font-mono text-[#8E8E98] uppercase tracking-wider mb-2">
                Recommended: {activeVehicle.recommendedFor}
              </div>
              <button
                onClick={handleReserveActiveVehicle}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9E7B4F] text-[#0D0E11] font-mono text-xs uppercase tracking-[0.16em] font-bold shadow-[0_0_25px_rgba(197,168,128,0.35)] hover:shadow-[0_0_35px_rgba(197,168,128,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Book {activeVehicle.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
