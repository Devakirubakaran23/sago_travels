import React from 'react'
import { Radar, ShieldCheck, CreditCard, Sparkles, Check, Users } from 'lucide-react'

export const StandardsSection: React.FC = () => {
  const standards = [
    {
      icon: Radar,
      title: 'On-Time Flight Pickup',
      subtitle: 'Zero Waiting Fee on Delays',
      description:
        'We track all Chennai Airport (MAA) commercial flights live. If your flight is delayed by traffic or weather, your cab driver adjusts pickup time automatically with zero extra charge.',
      perks: [
        'Live flight landing tracking at Chennai Airport',
        'Complimentary 45-minute arrival waiting buffer',
        'Driver waits at terminal exit gate with name board',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Clean, 100% Chilled AC Cabs',
      subtitle: 'Neat & Well-Maintained Fleet',
      description:
        'Every car in our fleet is cleaned, vacuumed, and checked before each journey. Working powerful dual-blower AC, clean seat covers, working phone chargers, and non-smoking drivers.',
      perks: [
        'Clean, neat, non-smoking car interiors',
        'Powerful air conditioning running throughout trip',
        'Regularly serviced vehicles for breakdown-free travel',
      ],
    },
    {
      icon: CreditCard,
      title: 'Honest Fixed Fares',
      subtitle: 'Zero Surge Pricing Guaranteed',
      description:
        'No sudden surge pricing during rain, festival weekends, or peak hours. All toll plaza charges, interstate road taxes, and driver beta are clearly included upfront in your quote.',
      perks: [
        'Guaranteed fixed rates with zero hidden surge',
        'All toll plaza and highway passes covered',
        'Clear WhatsApp invoice receipts for every ride',
      ],
    },
  ]

  return (
    <section id="standards-section" className="relative py-28 px-6 sm:px-12 bg-[#0D0E11] text-[#F9F9FB] border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Eyebrow & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PONDICHERRY'S TRUSTED CAB SERVICE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F9F9FB] font-light tracking-tight">
              Why Travelers <br />
              <span className="italic font-normal text-[#C5A880]">Trust Our Cabs</span>.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#8E8E98] font-light leading-relaxed">
            No fancy gimmicks, no broken promises. Just clean, reliable air-conditioned cars,
            honest pricing, and polite drivers who get you to your destination safely on time.
          </p>
        </div>

        {/* Minimalist 3-Column Micro-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {standards.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="group relative glass-panel rounded-3xl p-8 sm:p-9 border border-white/10 hover:border-[#C5A880]/50 hover:shadow-[0_20px_50px_rgba(197,168,128,0.15)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-black/70 border border-white/10 flex items-center justify-center text-[#C5A880] mb-6 group-hover:border-[#C5A880]/50 group-hover:bg-[#C5A880]/10 transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-2xl text-[#F9F9FB] mb-1 font-normal group-hover:text-[#E0CEB5] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-mono text-[#C5A880] tracking-wider uppercase mb-4">
                    {item.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-[#8E8E98] font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Micro Perks List */}
                <ul className="space-y-2.5 border-t border-white/10 pt-6 text-xs text-[#D8D8E0]">
                  {item.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start space-x-2.5">
                      <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Local Driver Guarantee Vignette */}
        <div className="mt-14 rounded-3xl p-6 sm:p-8 glass-panel border border-[#C5A880]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880] shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#F9F9FB]">Experienced Local Drivers</h4>
              <p className="text-xs text-[#8E8E98] mt-0.5">
                Our drivers have minimum 5+ years of highway driving experience, valid commercial badge licenses, and know every street in White Town, Auroville, and all ECR shortcuts.
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-[#C5A880] whitespace-nowrap">
            Polite · Non-Smoking · Tamil, English & Hindi
          </div>
        </div>
      </div>
    </section>
  )
}
