import React, { useState } from "react";
import { Language, ServicePackage, BookingData } from "./types";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { TrustBadges } from "./components/TrustBadges";
import { ServicesSection } from "./components/ServicesSection";
import { PriceEstimator } from "./components/PriceEstimator";
import { ReviewsSection } from "./components/ReviewsSection";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";
import { AiDiagnosticModal } from "./components/AiDiagnosticModal";
import { TrackBookingModal } from "./components/TrackBookingModal";
import { Sparkles, Phone, Wrench, Snowflake, CheckCircle2, MessageSquare } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [selectedCity, setSelectedCity] = useState<string>("New Delhi");

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  // Preselected parameters for booking modal
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedEstimate, setPreselectedEstimate] = useState<any | undefined>(undefined);

  // Active bookings created in session
  const [activeBookings, setActiveBookings] = useState<BookingData[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenBookingModal = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedEstimate(undefined);
    setIsBookingModalOpen(true);
  };

  const handleSelectService = (service: ServicePackage) => {
    setPreselectedServiceId(service.id);
    setPreselectedEstimate(undefined);
    setIsBookingModalOpen(true);
  };

  const handleBookWithEstimate = (estimateData: any) => {
    setPreselectedEstimate(estimateData);
    setPreselectedServiceId(estimateData.serviceId);
    setIsBookingModalOpen(true);
  };

  const handleSelectAiRecommendedService = (serviceName: string) => {
    // Map service name to ID if needed or default
    let serviceId = "power-jet-foam-deep";
    if (serviceName.toLowerCase().includes("gas")) {
      serviceId = "ac-gas-refill-full";
    } else if (serviceName.toLowerCase().includes("install")) {
      serviceId = "ac-installation-split";
    } else if (serviceName.toLowerCase().includes("repair")) {
      serviceId = "ac-repair-diagnostic";
    }
    setPreselectedServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (booking: BookingData) => {
    setActiveBookings([booking, ...activeBookings]);
    showToast(
      lang === "en"
        ? `Booking Confirmed! ID: ${booking.id}. Technician assigned.`
        : `बुकिंग कन्फर्म! आईडी: ${booking.id}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white pb-20 lg:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <Header
        lang={lang}
        setLang={setLang}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onOpenTrackModal={() => setIsTrackModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Hero Section */}
      <HeroBanner
        lang={lang}
        onOpenBookingModal={handleOpenBookingModal}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Trust Badges & 50% Promo */}
      <TrustBadges
        lang={lang}
        onOpenBookingModal={() => handleOpenBookingModal("power-jet-foam-deep")}
      />

      {/* Services Catalogue */}
      <ServicesSection
        lang={lang}
        onSelectService={handleSelectService}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Interactive Rate Calculator */}
      <PriceEstimator
        lang={lang}
        onBookWithEstimate={handleBookWithEstimate}
      />

      {/* Customer Reviews & Ratings */}
      <ReviewsSection lang={lang} />

      {/* Footer & FAQ */}
      <Footer
        lang={lang}
        setLang={setLang}
        onOpenBookingModal={() => handleOpenBookingModal()}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Floating Bottom Quick Action Bar for Mobile / Tablet */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 lg:hidden shadow-2xl flex items-center justify-between gap-2">
        <a
          href="https://wa.me/919598398005?text=Hi%20RepairGo1,%20I%20want%20to%20book%20an%20AC%20service"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>

        <a
          href="tel:7521869140"
          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-green-400" />
          <span>Call Now</span>
        </a>

        <button
          onClick={() => handleOpenBookingModal()}
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>{lang === "en" ? "Book (50% OFF)" : "बुक करें"}</span>
        </button>
      </div>

      {/* Floating Desktop WhatsApp Chat Badge */}
      <a
        href="https://wa.me/919598398005?text=Hi%20RepairGo1,%20I%20want%20to%20book%20an%20AC%20service"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-full shadow-2xl items-center gap-2 transition-all hover:scale-105 group border-2 border-emerald-400"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span>Chat on WhatsApp (9598398005)</span>
      </a>

      {/* MODALS */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        lang={lang}
        preselectedServiceId={preselectedServiceId}
        preselectedEstimate={preselectedEstimate}
        onBookingSuccess={handleBookingSuccess}
      />

      <AiDiagnosticModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        lang={lang}
        onSelectRecommendedService={handleSelectAiRecommendedService}
      />

      <TrackBookingModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        lang={lang}
      />

    </div>
  );
}
