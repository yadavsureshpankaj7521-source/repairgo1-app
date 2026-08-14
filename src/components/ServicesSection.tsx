import React, { useState } from "react";
import { 
  SERVICE_PACKAGES 
} from "../data/services";
import { 
  Language, 
  ServicePackage 
} from "../types";
import { 
  Snowflake, 
  Wrench, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Star, 
  Check, 
  BadgePercent,
  Sparkles,
  ChevronRight
} from "lucide-react";

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (service: ServicePackage) => void;
  onOpenAiModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectService,
  onOpenAiModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", labelEn: "All Services", labelHi: "सभी सेवाएं" },
    { id: "cleaning", labelEn: "Deep Foam Jet Service", labelHi: "डीप फोम जेट वाश" },
    { id: "gas", labelEn: "Gas Leak & Refill", labelHi: "गैस रीफिल एवं लीकेज" },
    { id: "repair", labelEn: "Repair & Diagnosis", labelHi: "रिपेयर एवं जांच" },
    { id: "installation", labelEn: "Fitment & Mounting", labelHi: "इन्स्टॉलेशन" },
    { id: "amc", labelEn: "Annual AMC Plan", labelHi: "वार्षिक एएमसी प्लान" }
  ];

  const filteredServices = activeCategory === "all"
    ? SERVICE_PACKAGES
    : SERVICE_PACKAGES.filter(s => s.category === activeCategory);

  return (
    <section id="services-section" className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
            <Snowflake className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === "en" ? "RepairGo1 Premium Offerings" : "रिपेयरगो1 प्रीमियम सेवाएं"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === "en" ? "Transparent AC Services with Free Warranty" : "वारंटी के साथ पारदर्शी एसी सर्विसेज"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === "en"
              ? "Every service comes with zero mess guarantee, high-pressure foam jet equipment, and background-checked master technicians."
              : "हर सेवा में नो-मेस गारंटी, हाई-प्रेशर फोम जेट वाशिंग और बैकग्राउंड-वेरिफाइड एक्सपर्ट टेक्नीशियन मिलते हैं।"}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {lang === "en" ? cat.labelEn : cat.labelHi}
            </button>
          ))}
        </div>

        {/* AI Banner Callout */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 rounded-2xl p-5 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-purple-700/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === "en" ? "Not sure what's wrong with your AC?" : "समझ नहीं आ रहा एसी में क्या खराबी है?"}
              </h3>
              <p className="text-xs text-purple-200">
                {lang === "en" 
                  ? "Use our Gemini AI Doctor to describe symptoms like water leakage, low cooling, or strange noises for instant diagnostic report!"
                  : "हमारे जेमिनी एआई डॉक्टर से पानी लीक, कम कूलिंग, या आवाज़ जैसी समस्या बताएं और तुरंत रिपोर्ट पाएं!"}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAiModal}
            className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>{lang === "en" ? "Run AI Diagnostic Test" : "एआई टेस्ट चलाएं"}</span>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between hover:shadow-xl relative overflow-hidden ${
                service.popular
                  ? "border-orange-300 ring-2 ring-orange-500/20 shadow-md"
                  : "border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
            >
              {/* Badge */}
              {service.badge && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
                  {lang === "en" ? service.badge.en : service.badge.hi}
                </div>
              )}

              <div className="p-6 space-y-4">
                {/* Title & Tagline */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 pr-16 leading-snug">
                    {lang === "en" ? service.name.en : service.name.hi}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {lang === "en" ? service.tagline.en : service.tagline.hi}
                  </p>
                </div>

                {/* Rating & Duration */}
                <div className="flex items-center gap-4 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900">{service.rating}</span>
                    <span className="text-slate-400">({service.reviewsCount})</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{service.durationMinutes} {lang === "en" ? "mins" : "मिनट"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{service.warrantyDays}d {lang === "en" ? "warranty" : "वारंटी"}</span>
                  </div>
                </div>

                {/* Bullet Inclusions */}
                <ul className="space-y-2 pt-1">
                  {(lang === "en" ? service.features.en : service.features.hi).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-3" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing & Booking Footer */}
              <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-slate-900">
                      ₹{service.discountedPrice}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{service.originalPrice}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">
                    Save ₹{service.originalPrice - service.discountedPrice} ({Math.round(((service.originalPrice - service.discountedPrice)/service.originalPrice)*100)}% OFF)
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>{lang === "en" ? "Book Now" : "अभी बुक करें"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
