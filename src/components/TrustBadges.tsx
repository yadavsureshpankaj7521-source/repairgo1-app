import React from "react";
import { Language } from "../types";
import { Snowflake, ShieldCheck, Zap, Users, Sparkles, CheckCircle2, Award, Clock } from "lucide-react";

interface TrustBadgesProps {
  lang: Language;
  onOpenBookingModal: () => void;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ lang, onOpenBookingModal }) => {
  const pillars = [
    {
      icon: <Snowflake className="w-6 h-6 text-sky-500" />,
      titleEn: "2X Power Jet Foam Wash",
      titleHi: "2X पावर जेट फोम वाश",
      descEn: "Deep foam spray penetrates cooling coils to remove 100% dust & bacteria, giving ice-cold airflow.",
      descHi: "इको-फोम स्प्रे से कॉइल के अंदर जमी धूल और कीटाणुओं का 100% सफाया।"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      titleEn: "30-Day Free Warranty",
      titleHi: "30 दिनों की मुफ़्त वारंटी",
      descEn: "If cooling drops or issues reappear within 30 days, we revisit & fix for FREE. No questions asked.",
      descHi: "यदि 30 दिनों में कूलिंग कम हो या कोई खराबी आए, तो निःशुल्क रि-सर्विस।"
    },
    {
      icon: <Users className="w-6 h-6 text-amber-500" />,
      titleEn: "100% Background Verified",
      titleHi: "100% पुलिस वेरिफाइड एक्सपर्ट",
      descEn: "Master technicians with 5+ years experience, uniform, ID card, mask and protective shoe covers.",
      descHi: "वर्दी, आईडी कार्ड और शू-कवर के साथ अनुभवी व भरोसेमंद टेक्नीशियन।"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-500" />,
      titleEn: "Zero-Mess Waterproof Jacket",
      titleHi: "नो-मेस वॉटरप्रूफ जैकेट",
      descEn: "Special funnel bag captures all dirt & water so your room walls & flooring remain completely dry.",
      descHi: "वाटरप्रूफ जैकेट कवर से गंदा पानी सीधे बाल्टी में जाता है, दीवारें साफ़ रहती हैं।"
    }
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {lang === "en" ? "Why RepairGo1?" : "रिपेयरगो1 ही क्यों?"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {lang === "en" ? "The Gold Standard in AC Maintenance" : "उच्च गुणवत्ता और पूर्ण सुरक्षा की गारंटी"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === "en" ? item.titleEn : item.titleHi}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === "en" ? item.descEn : item.descHi}
              </p>
            </div>
          ))}
        </div>

        {/* Promo CTA Banner */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
              Limited Period Code: FIRST50
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {lang === "en" ? "Save 50% OFF Your First AC Power Jet Wash!" : "पहली एसी पावर जेट धुलाई पर 50% बचाएं!"}
            </h3>
            <p className="text-xs text-orange-100">
              {lang === "en" ? "Book your technician in under 60 seconds with instant confirmation." : "मात्र 60 सेकंड में अपनी सुविधानुसार टेक्नीशियन बुक करें।"}
            </p>
          </div>

          <button
            onClick={onOpenBookingModal}
            className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-lg cursor-pointer shrink-0"
          >
            {lang === "en" ? "Claim 50% OFF Now →" : "अभी 50% छूट पाएं →"}
          </button>
        </div>

      </div>
    </section>
  );
};
