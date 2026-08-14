import React, { useState } from "react";
import { 
  Snowflake, 
  Wrench, 
  MapPin, 
  PhoneCall, 
  Search, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Menu, 
  X,
  ChevronDown,
  MessageSquare
} from "lucide-react";
import { Language } from "../types";
import { POPULAR_CITIES } from "../data/services";

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onOpenTrackModal: () => void;
  onOpenAiModal: () => void;
  onOpenBookingModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  selectedCity,
  setSelectedCity,
  onOpenTrackModal,
  onOpenAiModal,
  onOpenBookingModal
}) => {
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredCities = POPULAR_CITIES.filter(c => 
    c.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2 flex-wrap">
        <span className="bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {lang === "en" ? "Offer Active" : "ऑफ़र लाइव"}
        </span>
        <span>
          {lang === "en" 
            ? "🎁 Get 50% OFF on First AC Power Jet Cleaning! Use Code:"
            : "🎁 पहली एसी पावर जेट सफाई पर 50% की छूट! कूपन कोड:"}
        </span>
        <code className="bg-white/20 font-mono font-bold text-yellow-300 px-1.5 py-0.5 rounded border border-white/20">
          FIRST50
        </code>
        <button 
          onClick={onOpenBookingModal}
          className="underline hover:text-yellow-200 ml-1 font-semibold text-xs cursor-pointer"
        >
          {lang === "en" ? "Book Now →" : "अभी बुक करें →"}
        </button>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Snowflake className="w-6 h-6 animate-spin-slow text-sky-200" />
              <Wrench className="w-4 h-4 absolute -bottom-1 -right-1 text-orange-400 fill-orange-400 stroke-slate-900 stroke-2" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-orange-600 font-sans">
                  Repair<span className="text-blue-700">Go1</span>
                </span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-blue-200">
                  PRO
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase -mt-1">
                {lang === "en" ? "AC Service & Repair App" : "एसी सर्विस एवं रिपेयर एप"}
              </p>
            </div>
          </a>

          {/* City / Location Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="flex items-center gap-1.5 bg-slate-100/80 hover:bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="max-w-[140px] truncate">{selectedCity}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showCityDropdown && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="relative mb-2">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder={lang === "en" ? "Search city or area..." : "शहर खोजें..."}
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto space-y-0.5">
                  {filteredCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowCityDropdown(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors ${
                        selectedCity === city
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="hidden lg:flex items-center gap-3">
          {/* AI AC Diagnostics Button */}
          <button
            onClick={onOpenAiModal}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform" />
            <span>{lang === "en" ? "AI AC Doctor" : "एआई एसी डॉक्टर"}</span>
            <span className="bg-white/20 text-[10px] px-1.5 py-0.2 rounded font-mono">
              NEW
            </span>
          </button>

          {/* Track Booking Button */}
          <button
            onClick={onOpenTrackModal}
            className="flex items-center gap-1.5 text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === "en" ? "Track Booking" : "ट्रैक बुकिंग"}</span>
          </button>

          {/* Language Toggle EN / HI */}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-2 rounded-xl border border-slate-200/80 transition-colors cursor-pointer"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-orange-500" />
            <span>{lang === "en" ? "हिंदी" : "English"}</span>
          </button>

          {/* Hotline Call Button */}
          <a
            href="tel:7521869140"
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-green-400" />
            <span>+91 7521869140</span>
          </a>

          {/* WhatsApp Direct Chat Button */}
          <a
            href="https://wa.me/919598398005?text=Hi%20RepairGo1,%20I%20want%20to%20book%20an%20AC%20service"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-200 fill-emerald-200" />
            <span>WhatsApp</span>
          </a>

          {/* Book Service CTA */}
          <button
            onClick={onOpenBookingModal}
            className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-all cursor-pointer"
          >
            {lang === "en" ? "Book AC Service" : "एसी बुक करें"}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-200"
          >
            {lang === "en" ? "हिंदी" : "EN"}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="font-medium">{lang === "en" ? "Location:" : "स्थान:"}</span>
            <span className="font-bold text-blue-700">{selectedCity}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenAiModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold py-2.5 rounded-xl"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{lang === "en" ? "AI Diagnostic" : "एआई जांच"}</span>
            </button>

            <button
              onClick={() => {
                onOpenTrackModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-semibold py-2.5 rounded-xl border border-slate-200"
            >
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === "en" ? "Track Booking" : "ट्रैक करें"}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:7521869140"
              className="flex items-center justify-center gap-1.5 bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-xl"
            >
              <PhoneCall className="w-3.5 h-3.5 text-green-400" />
              <span>Call: 7521869140</span>
            </a>

            <a
              href="https://wa.me/919598398005?text=Hi%20RepairGo1,%20I%20want%20to%20book%20an%20AC%20service"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-xl"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-200 fill-emerald-200" />
              <span>WA: 9598398005</span>
            </a>
          </div>

          <button
            onClick={() => {
              onOpenBookingModal();
              setMobileMenuOpen(false);
            }}
            className="w-full bg-orange-600 text-white text-xs font-bold py-3 rounded-xl shadow-md text-center"
          >
            {lang === "en" ? "Book Technician Now" : "टेक्नीशियन अभी बुक करें"}
          </button>
        </div>
      )}
    </header>
  );
};
