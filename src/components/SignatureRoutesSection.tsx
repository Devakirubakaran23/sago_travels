import React from 'react'
import { Clock, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react'
import { sound } from '../utils/audio'

interface RouteItem {
  id: string
  title: string
  subtitle: string
  corridor: string
  distance: string
  duration: string
  highlights: string[]
  badge?: string
  bgImage?: string
  pickup: string
  drop: string
}

interface SignatureRoutesSectionProps {
  onSelectRoute: (pickup: string, drop: string, vehicle: string) => void
}

export const SignatureRoutesSection: React.FC<SignatureRoutesSectionProps> = ({
  onSelectRoute,
}) => {
  const routes: RouteItem[] = [
    {
      id: 'maa-express',
      title: 'Chennai Airport (MAA) ⇄ Pondicherry',
      subtitle: 'Scenic East Coast Road (ECR) Express',
      corridor: 'ECR Coastal Highway · Direct Hotel / Airport Drop',
      distance: '145 KM',
      duration: '2h 45m',
      highlights: [
        'Live flight arrival tracking — driver waits at terminal exit',
        'Zero waiting fees for delayed flights',
        'All ECR toll plaza charges included with zero hidden extras',
      ],
      badge: 'MOST POPULAR AIRPORT ROUTE',
      bgImage: '/images/ecr-coastal-highway.jpg',
      pickup: 'Chennai International Airport (MAA)',
      drop: 'White Town / Hotel in Pondicherry',
    },
    {
      id: 'bangalore-corridor',
      title: 'Pondicherry ⇄ Bangalore Outstation',
      subtitle: 'Direct Intercity Highway Route',
      corridor: 'NH44 / Krishnagiri Expressway',
      distance: '315 KM',
      duration: '6h 15m',
      highlights: [
        'Comfortable long-distance AC cabs with generous boot space',
        'Interstate road permits and toll charges covered',
        'Driver night/day allowance (bata) included upfront',
      ],
      badge: 'INTERSTATE TRIP',
      pickup: 'Pondicherry City / Hotel',
      drop: 'Bangalore (Indiranagar / Whitefield / Airport)',
    },
    {
      id: 'heritage-daypass',
      title: 'White Town & Auroville Sightseeing',
      subtitle: '8 Hours / 80 KM Local Day Package',
      corridor: 'French Quarter · Promenade Beach · Auroville Matrimandir',
      distance: '80 KM Included',
      duration: '8 Hours Discretionary',
      highlights: [
        'Friendly local driver who knows all tourist spots & cafe parking',
        'Full schedule freedom: stop at Matrimandir, boutiques & beach',
        'Car stays parked with AC ready for you at each spot',
      ],
      badge: 'TOURIST DAY PACKAGE',
      pickup: 'Hotel / French Quarter, White Town',
      drop: 'White Town, Promenade & Auroville Circuit',
    },
    {
      id: 'mahabalipuram-circuit',
      title: 'Mahabalipuram & Shore Temple Excursion',
      subtitle: 'ECR Heritage Coastal Day Tour',
      corridor: 'Pondicherry ⇄ Mahabalipuram UNESCO Shore Temple',
      distance: '95 KM',
      duration: '1h 50m',
      highlights: [
        'Visit Shore Temple, Pancha Rathas & sculptors lane',
        'Time for beachside lunch at famous seaside cafes',
        'Option for one-way drop to Chennai or round-trip back',
      ],
      badge: 'POPULAR DAY TOUR',
      pickup: 'Pondicherry',
      drop: 'Mahabalipuram Heritage Site',
    },
  ]

  const handleBookRoute = (route: RouteItem, vehicle: string) => {
    sound.playChime(850, 0.08)
    onSelectRoute(route.pickup, route.drop, vehicle)
  }

  return (
    <section id="routes-section" className="relative py-28 px-6 sm:px-12 bg-[#0D0E11] text-[#F9F9FB] border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>POPULAR CORRIDORS & DAILY SERVICES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F9F9FB] font-light tracking-tight">
              Curated Routes. <br />
              <span className="italic font-normal text-[#C5A880]">Complete Peace of Mind</span>.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#8E8E98] font-light leading-relaxed">
            Direct doorstep transfers, dedicated AC vehicles, and experienced local drivers.
            Tolls, parking, and driver allowances are all included in your ride.
          </p>
        </div>

        {/* Clean Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bento Item 1 (Featured Airport Route - Spans 7 Cols) */}
          <div className="lg:col-span-7 group relative rounded-3xl overflow-hidden glass-panel border border-[#C5A880]/30 p-8 sm:p-10 flex flex-col justify-between min-h-[460px] hover:border-[#C5A880]/60 transition-all duration-300">
            {/* Background Image with Scrim */}
            <div className="absolute inset-0 z-0">
              <img
                src={routes[0].bgImage}
                alt={routes[0].title}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.4] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/75 to-black/50" />
            </div>

            {/* Content Overlays */}
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#C5A880]/20 text-[#E0CEB5] border border-[#C5A880]/40">
                  {routes[0].badge}
                </span>
                <div className="flex items-center space-x-3 text-xs font-mono text-[#E0CEB5]">
                  <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {routes[0].duration}</span>
                  <span>•</span>
                  <span>{routes[0].distance}</span>
                </div>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#F9F9FB] font-light mb-2">
                {routes[0].title}
              </h3>
              <p className="text-xs font-mono text-[#C5A880] tracking-wider mb-6">
                {routes[0].subtitle} · {routes[0].corridor}
              </p>

              <ul className="space-y-2 mb-8 text-xs text-[#D8D8E0]">
                {routes[0].highlights.map((h, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inclusions & Booking Footer */}
            <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E98]">
                  Fleet Options Available
                </div>
                <div className="flex items-center space-x-2 mt-1 text-xs font-mono text-[#E0CEB5]">
                  <span>Maruti Ertiga</span>
                  <span className="text-[#555]">•</span>
                  <span>Travel Tour Van</span>
                  <span className="text-[#555]">•</span>
                  <span>Toyota Innova</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                  All Highway Tolls & Airport Passes Included
                </div>
              </div>

              <button
                onClick={() => handleBookRoute(routes[0], 'Maruti Suzuki Ertiga')}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-[#0D0E11] font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(197,168,128,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Book This Route</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bento Item 2 (Bangalore Corridor - Spans 5 Cols) */}
          <div className="lg:col-span-5 group relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-8 flex flex-col justify-between hover:border-[#C5A880]/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/5 text-[#D8D8E0] border border-white/10">
                  {routes[1].badge}
                </span>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#C5A880]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{routes[1].duration} (~{routes[1].distance})</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F9FB] font-light mb-2">
                {routes[1].title}
              </h3>
              <p className="text-xs font-mono text-[#C5A880] tracking-wider mb-5">
                {routes[1].subtitle}
              </p>

              <ul className="space-y-2 mb-6 text-xs text-[#8E8E98]">
                {routes[1].highlights.map((h, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E98]">
                  Trip Inclusions
                </div>
                <div className="text-xs font-mono text-[#E0CEB5] mt-1">
                  Interstate Permits & Driver Bata Included
                </div>
              </div>

              <button
                onClick={() => handleBookRoute(routes[1], 'Maruti Suzuki Ertiga')}
                className="p-3 rounded-full border border-white/20 bg-black/40 text-[#F9F9FB] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                title="Book Bangalore Cab"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bento Item 3 (Heritage Day Pass - Spans 6 Cols) */}
          <div className="lg:col-span-6 group relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-8 flex flex-col justify-between hover:border-[#C5A880]/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#C5A880]/10 text-[#C5A880] border border-[#C5A880]/30">
                  {routes[2].badge}
                </span>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#C5A880]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{routes[2].duration}</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F9FB] font-light mb-2">
                {routes[2].title}
              </h3>
              <p className="text-xs font-mono text-[#C5A880] tracking-wider mb-5">
                {routes[2].subtitle}
              </p>

              <ul className="space-y-2 mb-6 text-xs text-[#8E8E98]">
                {routes[2].highlights.map((h, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E98]">
                  Package Format
                </div>
                <div className="text-xs font-mono text-[#E0CEB5] mt-1">
                  8 Hours / 80 KM Discretionary Sightseeing
                </div>
              </div>

              <button
                onClick={() => handleBookRoute(routes[2], 'Maruti Suzuki Ertiga')}
                className="px-5 py-2.5 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 text-[#E0CEB5] font-mono text-xs uppercase tracking-wider hover:bg-[#C5A880] hover:text-[#0D0E11] transition-all duration-200"
              >
                Book Package
              </button>
            </div>
          </div>

          {/* Bento Item 4 (Mahabalipuram Tour - Spans 6 Cols) */}
          <div className="lg:col-span-6 group relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-8 flex flex-col justify-between hover:border-[#C5A880]/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/5 text-[#D8D8E0] border border-white/10">
                  {routes[3].badge}
                </span>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#C5A880]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{routes[3].duration} (~{routes[3].distance})</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#F9F9FB] font-light mb-2">
                {routes[3].title}
              </h3>
              <p className="text-xs font-mono text-[#C5A880] tracking-wider mb-5">
                {routes[3].subtitle}
              </p>

              <ul className="space-y-2 mb-6 text-xs text-[#8E8E98]">
                {routes[3].highlights.map((h, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E98]">
                  Tour Inclusions
                </div>
                <div className="text-xs font-mono text-[#E0CEB5] mt-1">
                  Flexible Itinerary & Cafe Pauses
                </div>
              </div>

              <button
                onClick={() => handleBookRoute(routes[3], 'Maruti Suzuki Ertiga')}
                className="px-5 py-2.5 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 text-[#E0CEB5] font-mono text-xs uppercase tracking-wider hover:bg-[#C5A880] hover:text-[#0D0E11] transition-all duration-200"
              >
                Book Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
