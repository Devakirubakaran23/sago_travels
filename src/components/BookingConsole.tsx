import React, { useState, useMemo } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  Send,
} from 'lucide-react'
import { sound } from '../utils/audio'

type ServiceType = 'oneway' | 'roundtrip' | 'hourly'
type VehicleTier = 'ertiga' | 'innova' | 'van'

interface RoutePreset {
  id: string
  label: string
  pickup: string
  drop: string
  distanceKm: number
  estTime: string
}

const ROUTE_PRESETS: RoutePreset[] = [
  {
    id: 'maa-airport',
    label: 'Chennai Airport (MAA) ⇄ Pondicherry',
    pickup: 'Chennai International Airport (MAA)',
    drop: 'White Town / Hotel in Pondicherry',
    distanceKm: 145,
    estTime: '2h 45m',
  },
  {
    id: 'bangalore-transit',
    label: 'Pondicherry ⇄ Bangalore (City / KIAL)',
    pickup: 'Pondicherry City / Hotel',
    drop: 'Bangalore (Indiranagar / Whitefield / Airport)',
    distanceKm: 315,
    estTime: '6h 15m',
  },
  {
    id: 'heritage-daypass',
    label: 'White Town & Auroville 8H Day Package',
    pickup: 'Hotel / French Quarter, White Town',
    drop: 'White Town, Promenade & Auroville Circuit',
    distanceKm: 80,
    estTime: '8 Hours Discretionary',
  },
  {
    id: 'mahabalipuram',
    label: 'Pondicherry ⇄ Mahabalipuram Excursion',
    pickup: 'Pondicherry',
    drop: 'Mahabalipuram Shore Temple & Beach',
    distanceKm: 95,
    estTime: '1h 50m',
  },
  {
    id: 'chennai-city',
    label: 'Pondicherry ⇄ Chennai OMR / Guindy / Central',
    pickup: 'Pondicherry City',
    drop: 'Chennai City (OMR / Guindy / Railway Station)',
    distanceKm: 155,
    estTime: '3h 10m',
  },
]

interface BookingConsoleProps {
  initialPickup?: string
  initialDrop?: string
  initialVehicle?: string
}

export const BookingConsole: React.FC<BookingConsoleProps> = ({
  initialPickup,
  initialDrop,
  initialVehicle,
}) => {
  const [serviceType, setServiceType] = useState<ServiceType>('oneway')
  const [selectedPresetId, setSelectedPresetId] = useState<string>('maa-airport')
  const [customPickup, setCustomPickup] = useState<string>(
    initialPickup || 'Chennai International Airport (MAA)'
  )
  const [customDrop, setCustomDrop] = useState<string>(
    initialDrop || 'White Town / Hotel in Pondicherry'
  )
  const [vehicleTier, setVehicleTier] = useState<VehicleTier>('ertiga')
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  })
  const [bookingTime, setBookingTime] = useState<string>('09:00')
  const [passengerCount, setPassengerCount] = useState<number>(4)

  // Sync external props if changed
  const [prevProps, setPrevProps] = useState({ initialPickup, initialDrop, initialVehicle })
  if (
    prevProps.initialPickup !== initialPickup ||
    prevProps.initialDrop !== initialDrop ||
    prevProps.initialVehicle !== initialVehicle
  ) {
    setPrevProps({ initialPickup, initialDrop, initialVehicle })
    if (initialPickup) setCustomPickup(initialPickup)
    if (initialDrop) setCustomDrop(initialDrop)
    if (initialVehicle) {
      const lower = initialVehicle.toLowerCase()
      if (lower.includes('ertiga')) setVehicleTier('ertiga')
      else if (lower.includes('van') || lower.includes('tempo')) setVehicleTier('van')
      else if (lower.includes('innova')) setVehicleTier('innova')
    }
  }

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [guestName, setGuestName] = useState<string>('')
  const [guestPhone, setGuestPhone] = useState<string>('')
  const [flightOrNotes, setFlightOrNotes] = useState<string>('')
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [confirmationCode, setConfirmationCode] = useState<string>('')

  // Compute Active Route Data
  const activePreset = useMemo(() => {
    return ROUTE_PRESETS.find((r) => r.id === selectedPresetId) || ROUTE_PRESETS[0]
  }, [selectedPresetId])

  const calculatedEstimate = useMemo(() => {
    return {
      distanceKm:
        serviceType === 'roundtrip'
          ? activePreset.distanceKm * 2
          : activePreset.distanceKm,
      estDuration: serviceType === 'hourly' ? '8 Hours Included' : activePreset.estTime,
    }
  }, [activePreset, serviceType])

  const handleServiceChange = (type: ServiceType) => {
    sound.playChime(750, 0.05)
    setServiceType(type)
    if (type === 'hourly') {
      setSelectedPresetId('heritage-daypass')
      setCustomPickup('White Town, Pondicherry')
      setCustomDrop('White Town, Promenade & Auroville Circuit')
    }
  }

  const handlePresetSelect = (preset: RoutePreset) => {
    sound.playChime(800, 0.05)
    setSelectedPresetId(preset.id)
    setCustomPickup(preset.pickup)
    setCustomDrop(preset.drop)
  }

  const handleTierSelect = (tier: VehicleTier) => {
    sound.playChime(850, 0.05)
    setVehicleTier(tier)
  }

  const getVehicleLabel = () => {
    if (vehicleTier === 'ertiga') return 'Maruti Suzuki Ertiga (6-Seater AC Cab)'
    if (vehicleTier === 'innova') return 'Toyota Innova Crysta (6-7 Seater AC MPV)'
    return 'Travel Tour Van / Tempo Traveller (12-16 Seater AC)'
  }

  // Direct WhatsApp Booking Dispatch
  const handleWhatsAppDispatch = () => {
    sound.playChime(950, 0.08)
    const serviceLabel =
      serviceType === 'oneway'
        ? 'One-Way Drop'
        : serviceType === 'roundtrip'
        ? 'Round-Trip Outstation'
        : '8H Local Sightseeing Package'

    const message = [
      `*SAGO TRAVELS — PONDICHERRY CAB BOOKING REQUEST*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `*Service:* ${serviceLabel}`,
      `*Pickup:* ${customPickup}`,
      `*Drop:* ${customDrop}`,
      `*Vehicle Selected:* ${getVehicleLabel()}`,
      `*Date & Time:* ${bookingDate} at ${bookingTime}`,
      `*Passengers:* ${passengerCount} Guests`,
      `*Approx Distance:* ~${calculatedEstimate.distanceKm} KM (${calculatedEstimate.estDuration})`,
      flightOrNotes ? `*Flight/Notes:* ${flightOrNotes}` : '',
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `Please confirm cab availability and driver dispatch details.`,
    ]
      .filter(Boolean)
      .join('\n')

    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/919360169652?text=${encoded}`, '_blank')
  }

  const handleOpenReserveModal = () => {
    sound.playChime(900, 0.08)
    setIsModalOpen(true)
    setIsConfirmed(false)
  }

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName || !guestPhone) return

    sound.playChime(1100, 0.1)
    const code = 'SAGO-' + Math.floor(100000 + Math.random() * 900000)
    setConfirmationCode(code)
    setIsConfirmed(true)
  }

  return (
    <section id="booking-section" className="relative py-28 px-4 sm:px-8 bg-[#0D0E11] text-[#F9F9FB] border-t border-white/5">
      <div className="max-w-5xl mx-auto w-full glass-console rounded-3xl p-6 sm:p-10 border border-[#C5A880]/35 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden">
        {/* Subtle Background Glow Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Console Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ONLINE ROUTE CALCULATOR & BOOKING DESK</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F9F9FB] font-light tracking-tight">
              Book Your <span className="italic text-[#C5A880]">Pondicherry Cab</span>
            </h3>
          </div>

          {/* Service Selector Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => handleServiceChange('oneway')}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                serviceType === 'oneway'
                  ? 'bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-[#0D0E11] font-bold shadow-md'
                  : 'text-[#8E8E98] hover:text-white'
              }`}
            >
              One-Way Drop
            </button>
            <button
              onClick={() => handleServiceChange('roundtrip')}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                serviceType === 'roundtrip'
                  ? 'bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-[#0D0E11] font-bold shadow-md'
                  : 'text-[#8E8E98] hover:text-white'
              }`}
            >
              Round Trip
            </button>
            <button
              onClick={() => handleServiceChange('hourly')}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                serviceType === 'hourly'
                  ? 'bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-[#0D0E11] font-bold shadow-md'
                  : 'text-[#8E8E98] hover:text-white'
              }`}
            >
              8H Day Package
            </button>
          </div>
        </div>

        {/* Curated Corridor Presets */}
        <div className="mb-8">
          <label className="block text-[11px] font-mono tracking-widest text-[#8E8E98] uppercase mb-3">
            Quick Route Selection
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {ROUTE_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id
              return (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset)}
                  className={`text-left p-3.5 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'border-[#C5A880] bg-[#C5A880]/15 shadow-[0_0_15px_rgba(197,168,128,0.2)]'
                      : 'border-white/10 bg-black/40 hover:border-white/20 hover:bg-black/60'
                  }`}
                >
                  <div className="text-xs font-medium text-[#F9F9FB] truncate">
                    {preset.label}
                  </div>
                  <div className="text-[10px] font-mono text-[#C5A880] mt-1">
                    {preset.distanceKm} km · {preset.estTime}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Location & Schedule Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Pickup */}
          <div>
            <label className="block text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-2">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#C5A880] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={customPickup}
                onChange={(e) => setCustomPickup(e.target.value)}
                placeholder="e.g. Chennai Airport (MAA) / Hotel address"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-xs text-[#F9F9FB] placeholder-[#555] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          {/* Drop-off */}
          <div>
            <label className="block text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-2">
              Drop Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#C5A880] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={customDrop}
                onChange={(e) => setCustomDrop(e.target.value)}
                placeholder="e.g. White Town / Promenade Beach"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-xs text-[#F9F9FB] placeholder-[#555] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-2">
              Date of Journey
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-[#C5A880] absolute left-3.5 top-3.5" />
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-xs text-[#F9F9FB] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          {/* Time & Guests */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-2">
                Pickup Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#C5A880] absolute left-3.5 top-3.5" />
                <input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full pl-10 pr-2 py-3 rounded-2xl bg-black/60 border border-white/10 text-xs text-[#F9F9FB] focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase mb-2">
                Passengers
              </label>
              <select
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="w-full px-3 py-3 rounded-2xl bg-black/60 border border-white/10 text-xs text-[#F9F9FB] focus:outline-none focus:border-[#C5A880] transition-colors"
              >
                <option value={1}>1-2 Passengers</option>
                <option value={4}>3-4 Passengers</option>
                <option value={6}>5-6 Passengers (Ertiga / Innova)</option>
                <option value={7}>7 Passengers (Innova)</option>
                <option value={12}>8-12 Passengers (Travel Van)</option>
                <option value={16}>13-16 Passengers (Travel Van)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle Selection: Ertiga first, Travel Van second, Innova third */}
        <div className="mb-8">
          <label className="block text-[11px] font-mono tracking-widest text-[#8E8E98] uppercase mb-3">
            Choose Vehicle Class
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Maruti Ertiga */}
            <div
              onClick={() => handleTierSelect('ertiga')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                vehicleTier === 'ertiga'
                  ? 'border-[#C5A880] bg-[#C5A880]/15 shadow-[0_0_20px_rgba(197,168,128,0.2)]'
                  : 'border-white/10 bg-black/40 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-lg text-[#F9F9FB]">Maruti Ertiga</span>
                {vehicleTier === 'ertiga' && (
                  <CheckCircle2 className="w-5 h-5 text-[#C5A880]" />
                )}
              </div>
              <div className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider mb-2">
                Budget 6-Seater AC Cab
              </div>
              <p className="text-xs text-[#8E8E98] mb-3 leading-relaxed">
                Most popular choice for family airport drops and sightseeing. Chilled dual AC, clean seats, honest billing.
              </p>
              <div className="text-[10px] font-mono text-[#D8D8E0]">
                Up to 6 Passengers · 4 Bags
              </div>
            </div>

            {/* Travel Tour Van */}
            <div
              onClick={() => handleTierSelect('van')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                vehicleTier === 'van'
                  ? 'border-[#C5A880] bg-[#C5A880]/15 shadow-[0_0_20px_rgba(197,168,128,0.2)]'
                  : 'border-white/10 bg-black/40 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-lg text-[#F9F9FB]">Travel Tour Van</span>
                {vehicleTier === 'van' && (
                  <CheckCircle2 className="w-5 h-5 text-[#C5A880]" />
                )}
              </div>
              <div className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider mb-2">
                12-16 Seater AC Minibus
              </div>
              <p className="text-xs text-[#8E8E98] mb-3 leading-relaxed">
                Spacious van for family groups, college outings, and temple circuits with high roof AC and luggage carrier.
              </p>
              <div className="text-[10px] font-mono text-[#D8D8E0]">
                Up to 16 Passengers · 15 Bags
              </div>
            </div>

            {/* Toyota Innova */}
            <div
              onClick={() => handleTierSelect('innova')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                vehicleTier === 'innova'
                  ? 'border-[#C5A880] bg-[#C5A880]/15 shadow-[0_0_20px_rgba(197,168,128,0.2)]'
                  : 'border-white/10 bg-black/40 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-lg text-[#F9F9FB]">Toyota Innova</span>
                {vehicleTier === 'innova' && (
                  <CheckCircle2 className="w-5 h-5 text-[#C5A880]" />
                )}
              </div>
              <div className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider mb-2">
                Comfort 6-7 Seater MPV
              </div>
              <p className="text-xs text-[#8E8E98] mb-3 leading-relaxed">
                Extra legroom, captain seats, and deep luggage hold for international flight bags and long highway trips.
              </p>
              <div className="text-[10px] font-mono text-[#D8D8E0]">
                Up to 7 Passengers · 6 Bags
              </div>
            </div>
          </div>
        </div>

        {/* Route Summary Readout Bar (NO PRICE TAGS) */}
        <div className="p-6 sm:p-7 rounded-2xl bg-black/70 border border-[#C5A880]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-baseline space-x-5">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#8E8E98] uppercase">
                Selected Cab Category
              </div>
              <div className="flex items-baseline space-x-2.5 mt-1">
                <span className="font-serif text-2xl sm:text-3xl text-[#C5A880] font-semibold">
                  {getVehicleLabel().split('(')[0]}
                </span>
                <span className="text-xs text-[#8E8E98] font-mono">100% Chilled AC</span>
              </div>
            </div>

            <div className="hidden sm:block border-l border-white/10 pl-5">
              <div className="text-[10px] font-mono tracking-wider text-[#8E8E98] uppercase">
                Trip Details
              </div>
              <div className="text-xs font-mono text-[#F9F9FB]">
                ~{calculatedEstimate.distanceKm} KM · {calculatedEstimate.estDuration}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                All Highway Tolls & Parking Passes Included
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleOpenReserveModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9E7B4F] text-[#0D0E11] font-mono text-xs uppercase tracking-[0.16em] font-bold shadow-[0_0_25px_rgba(197,168,128,0.35)] hover:shadow-[0_0_35px_rgba(197,168,128,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Confirm Cab Booking
            </button>
            <button
              onClick={handleWhatsAppDispatch}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs uppercase tracking-[0.16em] font-medium hover:bg-emerald-500/20 hover:border-emerald-400 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Book via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reservation Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-lg w-full glass-console rounded-3xl p-8 border border-[#C5A880]/50 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#8E8E98] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!isConfirmed ? (
              <form onSubmit={handleConfirmReservation} className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 flex items-center justify-center mx-auto mb-3 text-[#C5A880]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#F9F9FB]">Confirm Your Cab</h4>
                  <p className="text-xs text-[#8E8E98] mt-1 font-mono">
                    {customPickup} ➔ {customDrop}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#D8D8E0] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/10 text-xs text-[#F9F9FB] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#D8D8E0] mb-1">
                    Phone Number (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="e.g. 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/10 text-xs text-[#F9F9FB] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#D8D8E0] mb-1">
                    Flight Number / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={flightOrNotes}
                    onChange={(e) => setFlightOrNotes(e.target.value)}
                    placeholder="e.g. Indigo 6E 214 / Near Promenade Hotel"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/10 text-xs text-[#F9F9FB] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs text-[#D8D8E0]">
                  <div className="flex justify-between">
                    <span className="text-[#8E8E98]">Vehicle:</span>
                    <span>{getVehicleLabel()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E8E98]">Pickup Time:</span>
                    <span>{bookingDate} at {bookingTime}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#C5A880] pt-1">
                    <span>Pricing Mode:</span>
                    <span>All-Inclusive Fixed WhatsApp Quote</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-[#0D0E11] font-mono text-xs uppercase tracking-[0.16em] font-bold shadow-[0_0_25px_rgba(197,168,128,0.4)] transition-all duration-200"
                >
                  Confirm Cab Reservation
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl text-[#F9F9FB]">Cab Booking Confirmed</h4>
                <p className="text-xs text-[#8E8E98] max-w-sm mx-auto leading-relaxed">
                  Booking Reference:{' '}
                  <span className="text-[#C5A880] font-mono font-bold">{confirmationCode}</span>.
                  We have assigned your driver. You will receive vehicle number and driver contact details via WhatsApp shortly before pickup.
                </p>

                <div className="pt-3">
                  <button
                    onClick={handleWhatsAppDispatch}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#25D366] text-black font-mono text-xs font-bold hover:bg-[#20bd5a] transition-colors"
                  >
                    <span>Send Booking to WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
