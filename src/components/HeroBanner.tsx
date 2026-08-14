import React from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Clock, 
  BadgePercent, 
  Flame, 
  Wrench, 
  Snowflake,
  Users,
  Zap
} from "lucide-react";
import { Language } from "../types";

interface HeroBannerProps {
  lang: Language;
  onOpenBookingModal: (preselectedServiceId?: string) => void;
  onOpenAiModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  onOpenBookingModal,
  onOpenAiModal
}) => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden py-12 lg:py-16">
      {/* Decorative Gradient Blurs & Glowing Snowflakes */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines, Trust Signals & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-400/30 rounded-full px-3.5 py-1.5 backdrop-blur-md">
              <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
              <span className="text-xs font-semibold text-orange-200">
                {lang === "en" 
                  ? "#1 Rated AC Repair & Deep Cleaning App" 
                  : "#1 सर्वाधिक भरोसेमंद एसी सर्विस एप"}
              </span>
              <div className="flex items-center gap-0.5 text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <span className="text-xs font-bold text-white">4.92</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {lang === "en" ? (
                <>
                  Expert AC Service at Your Doorstep –{" "}
                  <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                    Book Today!
                  </span>
                </>
              ) : (
                <>
                  AC की सर्विस,{" "}
                  <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                    आज ही बुक करें!
                  </span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0">
              {lang === "en"
                ? "Trusted & Verified Technicians • 2X Power Jet Foam Wash • 30-Day Free Service Warranty • 100% Genuine Spare Parts."
                : "सत्यापित एक्सपर्ट टेक्नीशियन • 2X पावर जेट फोम वॉश • 30 दिनों की फ्री वारंटी • 100% ओरिजिनल पार्ट्स।"}
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {lang === "en" ? "50% OFF First Service" : "50% पहली छूट"}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {lang === "en" ? "30-Day Warranty" : "30 दिन वारंटी"}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-xs flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {lang === "en" ? "Arrives in 60 Mins" : "60 मिनट में आगम"}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-xs flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {lang === "en" ? "Verified Techs" : "वेरिफाइड एक्सपर्ट्स"}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
              <button
                onClick={() => onOpenBookingModal()}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Wrench className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>{lang === "en" ? "Book AC Service Now (50% OFF)" : "एसी सर्विस बुक करें (50% छूट)"}</span>
              </button>

              <button
                onClick={onOpenAiModal}
                className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm px-5 py-3.5 rounded-xl border border-slate-700 backdrop-blur-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>{lang === "en" ? "Diagnose AC Problem with AI" : "एआई से एसी जांचें"}</span>
              </button>
            </div>

            {/* Verified Technician Counter */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">RK</div>
                <div className="w-7 h-7 rounded-full bg-emerald-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">VS</div>
                <div className="w-7 h-7 rounded-full bg-orange-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">AP</div>
              </div>
              <div>
                <p className="font-semibold text-slate-200">
                  {lang === "en" ? "500+ Verified AC Technicians On-Duty" : "500+ सत्यापित एसी एक्सपर्ट ऑन-ड्यूटी"}
                </p>
                <p className="text-[11px] text-slate-400">
                  {lang === "en" ? "Serving Delhi NCR, Mumbai, Bengaluru & major cities" : "दिल्ली एनसीआर, मुंबई, बेंगलुरु और प्रमुख शहरों में"}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Visual Card with Quick Selection */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-5">
              
              {/* Card Header Offer Tag */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <BadgePercent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {lang === "en" ? "RepairGo1 Express Booking" : "रिपेयरगो1 एक्सप्रेस बुकिंग"}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {lang === "en" ? "Fixed Transparent Rates" : "फिक्स्ड ट्रांसपेरेंट रेट्स"}
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-emerald-400" />
                  Instant Slot
                </span>
              </div>

              {/* Quick Service Picks */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  {lang === "en" ? "Select Required Service Package:" : "आवश्यक सर्विस पैकेज चुनें:"}
                </label>

                <button
                  onClick={() => onOpenBookingModal("power-jet-foam-deep")}
                  className="w-full bg-slate-800/90 hover:bg-slate-700/80 border border-slate-600/80 hover:border-orange-500/50 p-3 rounded-xl text-left flex items-center justify-between group transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Snowflake className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                        {lang === "en" ? "Power Jet Foam Wash" : "पावर जेट फोम वॉश"}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {lang === "en" ? "2X Cooling • Foam Spray • Jacket Setup" : "2 गुना कूलिंग • फोम स्प्रे • नो मेस"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through mr-1">₹899</span>
                    <span className="text-sm font-black text-emerald-400">₹499</span>
                  </div>
                </button>

                <button
                  onClick={() => onOpenBookingModal("ac-gas-refill-full")}
                  className="w-full bg-slate-800/90 hover:bg-slate-700/80 border border-slate-600/80 hover:border-orange-500/50 p-3 rounded-xl text-left flex items-center justify-between group transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                        {lang === "en" ? "Gas Refill & Leak Fix" : "गैस रीफिल एवं लीकेज फिक्स"}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {lang === "en" ? "Nitrogen Leak Check • 100% Pure Gas" : "नाइट्रोजन लीकेज चेक • शुद्ध गैस"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through mr-1">₹2800</span>
                    <span className="text-sm font-black text-emerald-400">₹2199</span>
                  </div>
                </button>

                <button
                  onClick={() => onOpenBookingModal("ac-installation-split")}
                  className="w-full bg-slate-800/90 hover:bg-slate-700/80 border border-slate-600/80 hover:border-orange-500/50 p-3 rounded-xl text-left flex items-center justify-between group transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                        {lang === "en" ? "Split AC Installation" : "स्प्लिट एसी इंस्टॉलेशन"}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {lang === "en" ? "Core Drilling • Level Alignment • Vacuum" : "सटीक माउन्टिंग • कॉपर वैक्यूमिंग"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through mr-1">₹1999</span>
                    <span className="text-sm font-black text-emerald-400">₹1499</span>
                  </div>
                </button>
              </div>

              {/* Bottom Quick Button */}
              <button
                onClick={() => onOpenBookingModal()}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-colors text-center cursor-pointer uppercase tracking-wider"
              >
                {lang === "en" ? "View All Services & Customize →" : "सभी सर्विसेज देखें और बुक करें →"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
