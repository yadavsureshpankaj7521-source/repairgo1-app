import React, { useState } from "react";
import { Language, BookingData } from "../types";
import { X, Search, Clock, MapPin, Phone, User, CheckCircle2, AlertCircle, Wrench, ShieldCheck, ChevronRight } from "lucide-react";

interface TrackBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const TrackBookingModal: React.FC<TrackBookingModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingData | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleTrack = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setSearched(true);
    setBookingResult(null);

    try {
      const resp = await fetch(`/api/bookings?q=${encodeURIComponent(searchQuery.trim())}`);
      if (!resp.ok) throw new Error("Tracking search failed");
      const list = await resp.json();
      if (Array.isArray(list) && list.length > 0) {
        setBookingResult(list[0]);
      } else {
        setBookingResult(null);
      }
    } catch (err) {
      console.error(err);
      // Fallback sample if user searches for demo
      if (searchQuery.toLowerCase().includes("rpg") || searchQuery.includes("9876")) {
        setBookingResult({
          id: "RPG-88291",
          customerName: "Rahul Sharma",
          phone: "9876543210",
          address: "Flat 402, Green Valley Heights, Sector 62, Noida",
          pincode: "201301",
          city: "Noida",
          serviceType: "AC Foam & Power Jet Deep Service",
          acType: "Split AC",
          tonnage: "1.5 Ton",
          acCount: 2,
          scheduledDate: "Today",
          scheduledTimeSlot: "2:00 PM - 4:00 PM",
          totalPrice: 1198,
          discountApplied: 250,
          finalPrice: 948,
          status: "Technician Assigned",
          technician: {
            name: "Vikram Singh (Certified Master Tech)",
            phone: "+91 9811223344",
            rating: 4.9,
            experience: "7+ Years Exp (500+ ACs Serviced)"
          },
          createdAt: new Date().toISOString()
        });
      } else {
        setBookingResult(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = ["Pending", "Technician Assigned", "En Route", "In Progress", "Completed"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto relative p-6 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              {lang === "en" ? "Track Live AC Technician & Booking" : "लाइव बुकिंग और टेक्नीशियन ट्रैक करें"}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === "en" ? "Enter your Booking ID (e.g. RPG-88291) or Phone Number" : "अपनी बुकिंग आईडी या 10-अंकों का मोबाइल नंबर दर्ज करें"}
            </p>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              placeholder="e.g. RPG-88291 or 9876543210"
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            />
          </div>
          <button
            onClick={handleTrack}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "..." : lang === "en" ? "Track" : "ट्रैक"}
          </button>
        </div>

        {/* Sample Helper Button */}
        {!searched && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 flex items-center justify-between">
            <span>
              {lang === "en" ? "Try demo search with ID:" : "डेमो सर्च के लिए क्लिक करें:"} <strong className="font-mono">RPG-88291</strong>
            </span>
            <button
              onClick={() => {
                setSearchQuery("RPG-88291");
                setTimeout(handleTrack, 100);
              }}
              className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg cursor-pointer"
            >
              Demo Track
            </button>
          </div>
        )}

        {/* Result Card */}
        {bookingResult && (
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4 animate-in fade-in duration-200 border border-slate-800">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Booking Reference
                </span>
                <span className="text-lg font-black text-amber-400 font-mono">{bookingResult.id}</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
                {bookingResult.status}
              </span>
            </div>

            {/* Stepper tracker */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {lang === "en" ? "Live Service Progress:" : "सर्विस स्टेटस प्रगति:"}
              </span>
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                {statusSteps.map((st, i) => {
                  const currentIdx = statusSteps.indexOf(bookingResult.status || "Technician Assigned");
                  const isDone = i <= currentIdx;
                  return (
                    <div key={st} className="flex flex-col items-center gap-1 text-center flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        isDone ? "bg-emerald-500 text-slate-950 font-black" : "bg-slate-800 text-slate-500"
                      }`}>
                        {i + 1}
                      </div>
                      <span className={isDone ? "text-emerald-400 font-bold" : "text-slate-500"}>{st}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assigned Tech Info */}
            {bookingResult.technician && (
              <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{bookingResult.technician.name}</p>
                      <p className="text-[10px] text-slate-300">{bookingResult.technician.experience} • Rating {bookingResult.technician.rating}★</p>
                    </div>
                  </div>
                  <a
                    href={`tel:${bookingResult.technician.phone}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Tech</span>
                  </a>
                </div>
              </div>
            )}

            {/* Address & Service summary */}
            <div className="text-xs space-y-1 text-slate-300 border-t border-slate-800 pt-3">
              <p><strong className="text-slate-400">Customer:</strong> {bookingResult.customerName} ({bookingResult.phone})</p>
              <p><strong className="text-slate-400">Service:</strong> {bookingResult.serviceType}</p>
              <p><strong className="text-slate-400">Scheduled:</strong> {bookingResult.scheduledDate}, {bookingResult.scheduledTimeSlot}</p>
              <p><strong className="text-slate-400">Address:</strong> {bookingResult.address}</p>
              <p className="text-emerald-400 font-bold pt-1">
                Amount Payable: ₹{bookingResult.finalPrice} (Cash/UPI After Service)
              </p>
            </div>

          </div>
        )}

        {searched && !bookingResult && (
          <div className="text-center py-6 text-slate-500 space-y-2">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
            <p className="text-xs font-bold text-slate-800">
              {lang === "en" ? "No active booking found for this query." : "इस नंबर या आईडी पर कोई बुकिंग नहीं मिली।"}
            </p>
            <p className="text-[11px]">
              {lang === "en" ? "Please verify your 10-digit mobile number or Booking ID." : "कृपया अपना मोबाइल नंबर या बुकिंग आईडी दोबारा जांचें।"}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
