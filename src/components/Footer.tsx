import React, { useState } from "react";
import { Language } from "../types";
import { Snowflake, Wrench, PhoneCall, Mail, MapPin, ShieldCheck, ChevronDown, ChevronUp, Globe, MessageSquare } from "lucide-react";
import { POPULAR_CITIES } from "../data/services";

interface FooterProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenBookingModal: () => void;
  onOpenAiModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  setLang,
  onOpenBookingModal,
  onOpenAiModal
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      qEn: "What is AC Power Jet & Foam Deep Cleaning?",
      qHi: "एसी पावर जेट और फोम डीप क्लीनिंग क्या है?",
      aEn: "It is high-pressure water jet cleaning with eco-friendly foam spray that cleans deep inside the cooling coils, blower fan wheel, and outdoor unit. Includes a waterproof jacket setup so no water spills on your home walls.",
      aHi: "यह इको-फ्रेंडली फोम स्प्रे और हाई-प्रेशर वाटर जेट से कॉइल और ब्लोअर की गहरी सफाई है। इसमें वाटरप्रूफ जैकेट बैग लगाया जाता है ताकि दीवार गंदी न हो।"
    },
    {
      qEn: "How does the 30-Day Free Service Warranty work?",
      qHi: "30 दिनों की मुफ़्त वारंटी कैसे काम करती है?",
      aEn: "If your AC faces cooling issues, gas leakage, or water dripping within 30 days of service, our senior technician will visit and fix it completely FREE of cost.",
      aHi: "यदि सर्विस के 30 दिनों के भीतर कूलिंग कम हो या पानी टपके, तो सीनियर टेक्नीशियन आकर मुफ़्त में ठीक करेगा।"
    },
    {
      qEn: "How are gas leaks tested before gas refilling?",
      qHi: "गैस भरने से पहले लीकेज की जांच कैसे की जाती है?",
      aEn: "We perform electronic leak detection and high-pressure nitrogen testing on copper pipes to find microscopic leaks before refilling 100% pure R32/R410A gas by weight.",
      aHi: "हम 100% शुद्ध R32/R410A गैस भरने से पहले कॉपर पाइप्स पर इलेक्ट्रॉनिक और नाइट्रोजन प्रेशर टेस्ट करके लीकेज ठीक करते हैं।"
    },
    {
      qEn: "When do I pay for the service?",
      qHi: "भुगतान कब करना होगा?",
      aEn: "You only pay AFTER the technician finishes the job and you inspect the ice-cold cooling performance! Pay via Cash, UPI, GPay, or Credit Card.",
      aHi: "भुगतान काम पूरा होने और कूलिंग चेक करने के बाद ही करना है! कैश, यूपीआई, गूगल पे या कार्ड से भुगतान कर सकते हैं।"
    }
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              {lang === "en" ? "Got Questions?" : "अक्सर पूछे जाने वाले प्रश्न"}
            </span>
            <h3 className="text-2xl font-black text-white">
              {lang === "en" ? "Frequently Asked Questions" : "सवाल और जवाब"}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-4 font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-850 transition-colors"
                >
                  <span>{lang === "en" ? faq.qEn : faq.qHi}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-orange-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                    {lang === "en" ? faq.aEn : faq.aHi}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-sky-200" />
              </div>
              <span className="text-2xl font-black text-orange-500">
                Repair<span className="text-blue-500">Go1</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === "en"
                ? "India's #1 Premium AC Service, Power Jet Deep Cleaning, Gas Leakage Repair & Annual Maintenance App."
                : "भारत का #1 प्रीमियम एसी सर्विस, पावर जेट डीप वाशिंग, गैस रीफिल और वार्षिक एएमसी एप।"}
            </p>
            <div className="space-y-2 pt-1">
              <a
                href="tel:7521869140"
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span>Call: +91 7521869140</span>
              </a>

              <a
                href="https://wa.me/919598398005?text=Hi%20RepairGo1,%20I%20want%20to%20book%20an%20AC%20service"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-200 fill-emerald-200 shrink-0" />
                <span>WhatsApp: +91 9598398005</span>
              </a>

              <a
                href="mailto:yadavpankaj7521@gmail.com"
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-colors truncate"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">yadavpankaj7521@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Popular Services Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === "en" ? "Popular AC Services" : "लोकप्रिय एसी सेवाएं"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onOpenBookingModal()} className="hover:text-white cursor-pointer">AC Foam & Power Jet Cleaning</button></li>
              <li><button onClick={() => onOpenBookingModal()} className="hover:text-white cursor-pointer">Full Gas Refill (R32 / R410A)</button></li>
              <li><button onClick={() => onOpenBookingModal()} className="hover:text-white cursor-pointer">Copper Coil Nitrogen Leak Check</button></li>
              <li><button onClick={() => onOpenBookingModal()} className="hover:text-white cursor-pointer">Split AC Precision Installation</button></li>
              <li><button onClick={() => onOpenBookingModal()} className="hover:text-white cursor-pointer">AC Annual Maintenance (AMC)</button></li>
            </ul>
          </div>

          {/* Quick Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === "en" ? "App Tools & AI" : "एप फीचर्स"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={onOpenAiModal} className="hover:text-yellow-300 text-purple-300 cursor-pointer font-bold flex items-center gap-1">✨ Gemini AI AC Doctor</button></li>
              <li><button onClick={() => onOpenBookingModal()} className="hover:text-white cursor-pointer">Instant Price Calculator</button></li>
              <li><button onClick={() => onOpenBookingModal()} className="hover:text-white cursor-pointer">Track Technician Location</button></li>
              <li><button onClick={() => setLang(lang === "en" ? "hi" : "en")} className="hover:text-white cursor-pointer">Language: {lang === "en" ? "हिंदी" : "English"}</button></li>
            </ul>
          </div>

          {/* Operational Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === "en" ? "Cities Served" : "उपलब्ध शहर"}
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {POPULAR_CITIES.map((c) => (
                <span key={c} className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-1 rounded-md">
                  {c}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 RepairGo1 Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> 100% Safe Doorstep Service
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
