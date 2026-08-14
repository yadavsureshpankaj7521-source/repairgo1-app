import React from "react";
import { Language } from "../types";
import { CUSTOMER_REVIEWS } from "../data/services";
import { Star, ShieldCheck, CheckCircle2, Quote, ThumbsUp } from "lucide-react";

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === "en" ? "100% Verified Customer Feedback" : "100% सत्यापित ग्राहक समीक्षाएं"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === "en" ? "Loved by 50,000+ AC Owners Across India" : "50,000+ खुश ग्राहकों का विश्वास"}
          </h2>
          <p className="text-slate-600 text-sm">
            {lang === "en"
              ? "See real ratings & feedback from homeowners who booked RepairGo1 AC Service."
              : "जानें रिपेयरगो1 एसी सर्विस का अनुभव करने वाले असली ग्राहकों की राय।"}
          </p>
        </div>

        {/* Rating Overview Summary Box */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-xl border border-blue-800">
          
          <div className="text-center md:text-left space-y-1">
            <div className="text-4xl font-black text-amber-400 font-mono">4.92 / 5.0</div>
            <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xs text-blue-200 pt-1">
              {lang === "en" ? "Based on 8,400+ verified ratings" : "8,400+ सत्यापित समीक्षाओं के आधार पर"}
            </p>
          </div>

          <div className="space-y-1.5 border-y md:border-y-0 md:border-x border-blue-800/80 py-4 md:py-0 md:px-6 text-xs text-blue-100">
            <div className="flex items-center justify-between">
              <span>5 Stars (Cooling Quality)</span>
              <span className="font-bold text-emerald-400">96%</span>
            </div>
            <div className="w-full bg-blue-950 rounded-full h-1.5">
              <div className="bg-emerald-400 h-1.5 rounded-full w-[96%]" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span>On-Time Arrival</span>
              <span className="font-bold text-emerald-400">98%</span>
            </div>
            <div className="w-full bg-blue-950 rounded-full h-1.5">
              <div className="bg-emerald-400 h-1.5 rounded-full w-[98%]" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span>Zero Mess & Cleanliness</span>
              <span className="font-bold text-emerald-400">99%</span>
            </div>
            <div className="w-full bg-blue-950 rounded-full h-1.5">
              <div className="bg-emerald-400 h-1.5 rounded-full w-[99%]" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">
              {lang === "en" ? "30-Day Money Back Warranty" : "30 दिनों की मुफ़्त वारंटी"}
            </h4>
            <p className="text-xs text-blue-200">
              {lang === "en" ? "If cooling drops within 30 days, we re-service for FREE!" : "यदि 30 दिनों में कूलिंग कम हो, तो फिर से मुफ़्त सर्विस!"}
            </p>
          </div>

        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Author & City */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{rev.author}</h4>
                    <p className="text-xs text-slate-500">{rev.city} • {rev.date}</p>
                  </div>
                  {rev.verified && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{lang === "en" ? rev.comment.en : rev.comment.hi}"
                </p>

              </div>

              <div className="border-t border-slate-100 pt-3 text-[11px] font-bold text-blue-700 bg-blue-50/50 -mx-6 -mb-6 p-3 rounded-b-2xl flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Service: {rev.serviceDone}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
