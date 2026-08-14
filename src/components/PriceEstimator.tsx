import React, { useState } from "react";
import { Language } from "../types";
import { AC_BRANDS, SERVICE_PACKAGES } from "../data/services";
import { Calculator, Check, Snowflake, Wrench, Shield, ArrowRight, Tag } from "lucide-react";

interface PriceEstimatorProps {
  lang: Language;
  onBookWithEstimate: (estimate: {
    serviceId: string;
    acType: "Split AC" | "Window AC" | "Cassette AC";
    tonnage: "1.0 Ton" | "1.5 Ton" | "2.0 Ton" | "Multi Split";
    acCount: number;
    brand: string;
    totalPrice: number;
    discountedPrice: number;
  }) => void;
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({
  lang,
  onBookWithEstimate
}) => {
  const [acType, setAcType] = useState<"Split AC" | "Window AC" | "Cassette AC">("Split AC");
  const [tonnage, setTonnage] = useState<"1.0 Ton" | "1.5 Ton" | "2.0 Ton" | "Multi Split">("1.5 Ton");
  const [brand, setBrand] = useState<string>("Voltas");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("power-jet-foam-deep");
  const [acCount, setAcCount] = useState<number>(1);

  const selectedService = SERVICE_PACKAGES.find(s => s.id === selectedServiceId) || SERVICE_PACKAGES[0];

  // Base multiplier calculation based on tonnage & count
  const tonnageMultiplier = tonnage === "2.0 Ton" ? 1.15 : tonnage === "1.0 Ton" ? 0.95 : 1.0;
  
  const unitOriginal = Math.round(selectedService.originalPrice * tonnageMultiplier);
  const unitDiscounted = Math.round(selectedService.discountedPrice * tonnageMultiplier);

  const subtotalOriginal = unitOriginal * acCount;
  const subtotalDiscounted = unitDiscounted * acCount;

  // Additional 50% discount up to ₹250 for FIRST50 promo
  const promoDiscount = Math.min(250, Math.round(subtotalDiscounted * 0.25));
  const finalEstimate = subtotalDiscounted - promoDiscount;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
            <Calculator className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === "en" ? "Instant AC Rate Calculator" : "तुरंत एसी रेट कैलकुलेटर"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === "en" ? "Calculate Your Service Cost in 30 Seconds" : "30 सेकंड में सर्विस लागत की गणना करें"}
          </h2>
          <p className="text-slate-600 text-sm">
            {lang === "en"
              ? "Select your AC details and get an accurate rate with zero hidden surprise charges."
              : "अपने एसी का विवरण चुनें और बिना किसी गुप्त शुल्क के सटीक रेट पाएं।"}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. AC Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. {lang === "en" ? "Select AC Type:" : "एसी का प्रकार चुनें:"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Split AC", "Window AC", "Cassette AC"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setAcType(type)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      acType === type
                        ? "bg-blue-600 border-blue-500 text-white shadow-md"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Service Package */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                2. {lang === "en" ? "Select Service Required:" : "आवश्यक सर्विस का चयन करें:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICE_PACKAGES.slice(0, 4).map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedServiceId(pkg.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      selectedServiceId === pkg.id
                        ? "bg-blue-600/30 border-blue-500 text-white"
                        : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-white">
                        {lang === "en" ? pkg.name.en : pkg.name.hi}
                      </p>
                      <p className="text-[10px] text-slate-400">{pkg.warrantyDays}d Warranty</p>
                    </div>
                    <span className="text-xs font-black text-emerald-400">₹{pkg.discountedPrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Tonnage & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  3. {lang === "en" ? "Tonnage Cap:" : "कैपेसिटी (टन):"}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["1.0 Ton", "1.5 Ton", "2.0 Ton"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTonnage(t)}
                      className={`py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                        tonnage === t
                          ? "bg-orange-600 border-orange-500 text-white"
                          : "bg-slate-800 border-slate-700 text-slate-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  4. {lang === "en" ? "Number of ACs:" : "एसी की संख्या:"}
                </label>
                <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-1 justify-between">
                  <button
                    onClick={() => setAcCount(Math.max(1, acCount - 1))}
                    className="w-9 h-8 bg-slate-700 hover:bg-slate-600 text-white font-black rounded-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-white px-3">
                    {acCount} {acCount === 1 ? "Unit" : "Units"}
                  </span>
                  <button
                    onClick={() => setAcCount(acCount + 1)}
                    className="w-9 h-8 bg-slate-700 hover:bg-slate-600 text-white font-black rounded-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* 5. Brand Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                5. {lang === "en" ? "AC Brand:" : "एसी ब्रांड:"}
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {AC_BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Result Card Column */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-800 to-slate-850 rounded-2xl p-6 border border-slate-700 space-y-6 shadow-xl">
              
              <div className="border-b border-slate-700 pb-4">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                  {lang === "en" ? "Calculated Estimate" : "अनुमानित दर"}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {lang === "en" ? selectedService.name.en : selectedService.name.hi}
                </h3>
                <p className="text-xs text-slate-400">
                  {acType} • {tonnage} • {brand} • ({acCount} {acCount === 1 ? "AC" : "ACs"})
                </p>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{lang === "en" ? "Standard Price:" : "मानक मूल्य:"}</span>
                  <span className="line-through">₹{subtotalOriginal}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{lang === "en" ? "Package Price:" : "पैकेज दर:"}</span>
                  <span className="font-semibold text-white">₹{subtotalDiscounted}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-semibold bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {lang === "en" ? "Promo Code FIRST50:" : "प्रोमो कोड FIRST50:"}
                  </span>
                  <span>-₹{promoDiscount}</span>
                </div>
              </div>

              {/* Net Payable */}
              <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                    {lang === "en" ? "Final Doorstep Price:" : "अंतिम देय राशि:"}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">
                    {lang === "en" ? "Zero Visit/Inspection Charge" : "शून्य विजिट चार्ज"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-400">₹{finalEstimate}</span>
                </div>
              </div>

              {/* Warranty Badge */}
              <div className="bg-blue-950/50 border border-blue-800/40 p-3 rounded-xl flex items-center gap-3 text-xs text-blue-200">
                <Shield className="w-5 h-5 text-sky-400 shrink-0" />
                <span>
                  {lang === "en" 
                    ? `Includes Free ${selectedService.warrantyDays}-Day Warranty against cooling drops!`
                    : `${selectedService.warrantyDays} दिनों की मुफ़्त पोस्ट-सर्विस वारंटी शामिल!`}
                </span>
              </div>

              {/* Direct Booking CTA */}
              <button
                onClick={() =>
                  onBookWithEstimate({
                    serviceId: selectedService.id,
                    acType,
                    tonnage,
                    acCount,
                    brand,
                    totalPrice: subtotalOriginal,
                    discountedPrice: finalEstimate
                  })
                }
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === "en" ? "Book at Calculated Rate (₹" + finalEstimate + ")" : "इस रेट पर बुक करें (₹" + finalEstimate + ")"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
