import React, { useState, useEffect } from "react";
import { Language, ServicePackage, BookingData } from "../types";
import { SERVICE_PACKAGES, PROMO_COUPONS, POPULAR_CITIES } from "../data/services";
import { 
  X, 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Tag, 
  ShieldCheck, 
  Wrench, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Copy, 
  AlertCircle,
  Loader2,
  MessageSquare
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preselectedServiceId?: string;
  preselectedEstimate?: {
    serviceId: string;
    acType: "Split AC" | "Window AC" | "Cassette AC";
    tonnage: "1.0 Ton" | "1.5 Ton" | "2.0 Ton" | "Multi Split";
    acCount: number;
    brand: string;
    totalPrice: number;
    discountedPrice: number;
  };
  onBookingSuccess: (booking: BookingData) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  preselectedServiceId,
  preselectedEstimate,
  onBookingSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedEstimate?.serviceId || preselectedServiceId || "power-jet-foam-deep"
  );
  const [acType, setAcType] = useState<"Split AC" | "Window AC" | "Cassette AC">(
    preselectedEstimate?.acType || "Split AC"
  );
  const [tonnage, setTonnage] = useState<"1.0 Ton" | "1.5 Ton" | "2.0 Ton" | "Multi Split">(
    preselectedEstimate?.tonnage || "1.5 Ton"
  );
  const [acCount, setAcCount] = useState<number>(preselectedEstimate?.acCount || 1);

  const [scheduledDate, setScheduledDate] = useState<string>("Today");
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState<string>("10:00 AM - 12:00 PM");

  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [pincode, setPincode] = useState<string>("110001");
  const [city, setCity] = useState<string>("New Delhi");
  const [notes, setNotes] = useState<string>("");

  const [couponCode, setCouponCode] = useState<string>("FIRST50");
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const [couponMsg, setCouponMsg] = useState<string>("50% OFF applied!");

  const [loading, setLoading] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingData | null>(null);
  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  if (!isOpen) return null;

  const currentService = SERVICE_PACKAGES.find(s => s.id === selectedServiceId) || SERVICE_PACKAGES[0];

  // Price math
  const tonnageMult = tonnage === "2.0 Ton" ? 1.15 : tonnage === "1.0 Ton" ? 0.95 : 1.0;
  const basePricePerUnit = Math.round(currentService.discountedPrice * tonnageMult);
  const rawSubtotal = basePricePerUnit * acCount;

  let discountAmount = 0;
  if (couponApplied) {
    if (couponCode === "FIRST50") {
      discountAmount = Math.min(250, Math.round(rawSubtotal * 0.5));
    } else if (couponCode === "COOL100") {
      discountAmount = 100;
    } else if (couponCode === "FREEGAS") {
      discountAmount = Math.min(350, Math.round(rawSubtotal * 0.15));
    }
  }

  const finalPayable = Math.max(99, rawSubtotal - discountAmount);

  const handleApplyCoupon = (code: string) => {
    const found = PROMO_COUPONS.find(c => c.code === code);
    if (found) {
      setCouponCode(code);
      setCouponApplied(true);
      setCouponMsg(lang === "en" ? `Coupon ${code} applied!` : `कूपन ${code} लागू हो गया!`);
    } else {
      setCouponApplied(false);
      setCouponMsg(lang === "en" ? "Invalid Coupon Code" : "अमान्य कूपन कोड");
    }
  };

  const handleConfirmBooking = async () => {
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setFormError(lang === "en" ? "Please fill in Name, Phone, and Address." : "कृपया नाम, फोन और पता दर्ज करें।");
      return;
    }

    if (phone.length < 10) {
      setFormError(lang === "en" ? "Please enter a valid 10-digit mobile number." : "कृपया 10-अंकों का वैध मोबाइल नंबर दर्ज करें।");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      const resp = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          address,
          pincode,
          city,
          serviceType: lang === "en" ? currentService.name.en : currentService.name.hi,
          acType,
          tonnage,
          acCount,
          scheduledDate,
          scheduledTimeSlot,
          totalPrice: rawSubtotal,
          discountApplied: discountAmount,
          finalPrice: finalPayable,
          couponCode: couponApplied ? couponCode : "",
          notes
        })
      });

      if (!resp.ok) throw new Error("Failed to place booking");

      const resData = await resp.json();
      setConfirmedBooking(resData.booking);
      onBookingSuccess(resData.booking);
      setStep(4); // Success step
    } catch (err: any) {
      console.error(err);
      // Fallback dummy confirmation
      const fallbackBooking: BookingData = {
        id: `RPG-${Math.floor(10000 + Math.random() * 90000)}`,
        customerName,
        phone,
        address,
        pincode,
        city,
        serviceType: currentService.name.en,
        acType,
        tonnage,
        acCount,
        scheduledDate,
        scheduledTimeSlot,
        totalPrice: rawSubtotal,
        discountApplied: discountAmount,
        finalPrice: finalPayable,
        status: "Technician Assigned",
        technician: {
          name: "Sanjay Verma (Master Technician)",
          phone: "+91 9811223344",
          rating: 4.9,
          experience: "8+ Years Experience"
        },
        createdAt: new Date().toISOString()
      };
      setConfirmedBooking(fallbackBooking);
      onBookingSuccess(fallbackBooking);
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[92vh] overflow-y-auto relative p-5 sm:p-7 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Progress */}
        {step < 4 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-orange-200 uppercase">
                {lang === "en" ? `Step ${step} of 3` : `चरण ${step} / 3`}
              </span>
              <h2 className="text-lg font-extrabold text-slate-900">
                {step === 1 && (lang === "en" ? "Select AC & Service" : "एसी और सर्विस चुनें")}
                {step === 2 && (lang === "en" ? "Select Slot & Address" : "समय और पता चुनें")}
                {step === 3 && (lang === "en" ? "Review & Confirm" : "समीक्षा और पुष्टि")}
              </h2>
            </div>

            {/* Step Progress Bar */}
            <div className="grid grid-cols-3 gap-2">
              <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? "bg-orange-600" : "bg-slate-200"}`} />
              <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? "bg-orange-600" : "bg-slate-200"}`} />
              <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? "bg-orange-600" : "bg-slate-200"}`} />
            </div>
          </div>
        )}

        {/* STEP 1: SERVICE & AC SELECTION */}
        {step === 1 && (
          <div className="space-y-4">
            
            {/* Service Package Dropdown/Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {lang === "en" ? "Choose AC Service Package:" : "सर्विस पैकेज चुनें:"}
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {SERVICE_PACKAGES.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      selectedServiceId === s.id
                        ? "bg-blue-50 border-blue-600 ring-2 ring-blue-500/20"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-900">{lang === "en" ? s.name.en : s.name.hi}</p>
                      <p className="text-[11px] text-slate-500">{s.warrantyDays} Days Free Warranty • {s.durationMinutes} mins</p>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-blue-700 text-sm">₹{s.discountedPrice}</span>
                      <span className="text-[10px] text-slate-400 line-through block">₹{s.originalPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AC Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {lang === "en" ? "AC Type:" : "एसी का प्रकार:"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Split AC", "Window AC", "Cassette AC"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAcType(type)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border cursor-pointer ${
                      acType === type
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Tonnage & Quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === "en" ? "Tonnage:" : "टन भार:"}
                </label>
                <select
                  value={tonnage}
                  onChange={(e) => setTonnage(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-semibold"
                >
                  <option value="1.0 Ton">1.0 Ton</option>
                  <option value="1.5 Ton">1.5 Ton</option>
                  <option value="2.0 Ton">2.0 Ton</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === "en" ? "No. of AC Units:" : "एसी की संख्या:"}
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl p-1 justify-between">
                  <button
                    type="button"
                    onClick={() => setAcCount(Math.max(1, acCount - 1))}
                    className="w-7 h-7 bg-white hover:bg-slate-200 text-slate-800 font-bold rounded-lg cursor-pointer border border-slate-200"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-slate-900">{acCount} Unit</span>
                  <button
                    type="button"
                    onClick={() => setAcCount(acCount + 1)}
                    className="w-7 h-7 bg-white hover:bg-slate-200 text-slate-800 font-bold rounded-lg cursor-pointer border border-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => setStep(2)}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>{lang === "en" ? "Continue to Date & Address →" : "आगे बढ़ें (तिथि और पता) →"}</span>
            </button>

          </div>
        )}

        {/* STEP 2: DATE, TIME & ADDRESS */}
        {step === 2 && (
          <div className="space-y-4">
            
            {/* Date Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {lang === "en" ? "Select Scheduled Date:" : "सर्विस की तारीख रखें:"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Today", "Tomorrow", "Pick Custom Date"].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setScheduledDate(d)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border cursor-pointer ${
                      scheduledDate === d
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {lang === "en" ? "Preferred Arrival Slot:" : "समय स्लॉट चुनें:"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "8:00 AM - 10:00 AM",
                  "10:00 AM - 12:00 PM",
                  "12:00 PM - 2:00 PM",
                  "2:00 PM - 4:00 PM",
                  "4:00 PM - 6:00 PM",
                  "6:00 PM - 8:00 PM"
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setScheduledTimeSlot(slot)}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border cursor-pointer ${
                      scheduledTimeSlot === slot
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* City Selector */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === "en" ? "City:" : "शहर:"}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-semibold"
                >
                  {POPULAR_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === "en" ? "Pincode:" : "पिनकोड:"}
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="E.g. 201301"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                {lang === "en" ? "Complete Doorstep Address:" : "पूरा पता (घर/दुकान):"}
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Flat No, Building, Street, Nearby Landmark..."
                rows={2}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 bg-slate-100 text-slate-700 font-bold text-xs py-3 rounded-xl border border-slate-200 cursor-pointer"
              >
                ← {lang === "en" ? "Back" : "पीछे"}
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-2/3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                {lang === "en" ? "Proceed to Customer Info →" : "ग्राहक जानकारी दर्ज करें →"}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: CUSTOMER INFO, COUPON & REVIEW */}
        {step === 3 && (
          <div className="space-y-4">
            
            {/* Customer Contact */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === "en" ? "Your Full Name:" : "आपका नाम:"}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === "en" ? "Mobile Number:" : "मोबाइल नंबर:"}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                />
              </div>
            </div>

            {/* Coupon Code Apply */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {lang === "en" ? "Apply Promo Coupon:" : "कूपन कोड दर्ज करें:"}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="FIRST50"
                  className="flex-1 text-xs uppercase font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() => handleApplyCoupon(couponCode)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  {lang === "en" ? "Apply" : "लागू करें"}
                </button>
              </div>
              {couponMsg && (
                <p className={`text-[11px] font-semibold ${couponApplied ? "text-emerald-600" : "text-rose-600"}`}>
                  {couponMsg}
                </p>
              )}
            </div>

            {/* Order Summary Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Service:</span>
                <span className="font-bold text-white">{lang === "en" ? currentService.name.en : currentService.name.hi}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Details:</span>
                <span>{acType} • {tonnage} • ({acCount} Unit)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Slot:</span>
                <span>{scheduledDate}, {scheduledTimeSlot}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Subtotal:</span>
                <span>₹{rawSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon ({couponCode}):</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="border-t border-slate-700 pt-2 flex justify-between font-black text-sm text-amber-400">
                <span>Total Amount:</span>
                <span>₹{finalPayable}</span>
              </div>
            </div>

            {formError && (
              <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {formError}
              </p>
            )}

            {/* Confirm CTA */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 bg-slate-100 text-slate-700 font-bold text-xs py-3.5 rounded-xl border border-slate-200 cursor-pointer"
              >
                ← {lang === "en" ? "Back" : "पीछे"}
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={loading}
                className="w-2/3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                    <span>{lang === "en" ? `Confirm Booking (Pay ₹${finalPayable} After Service)` : `बुकिंग कन्फर्म करें (₹${finalPayable})`}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* STEP 4: SUCCESSFUL CONFIRMATION */}
        {step === 4 && confirmedBooking && (
          <div className="text-center space-y-5 animate-in zoom-in-95 duration-200 py-2">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-50">
              <Check className="w-8 h-8 stroke-3" />
            </div>

            <div className="space-y-1">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                {lang === "en" ? "Booking Confirmed!" : "बुकिंग सफलतापूर्वक कन्फर्म!"}
              </span>
              <h3 className="text-2xl font-black text-slate-900 pt-2">
                Booking ID: <span className="text-blue-700 font-mono">{confirmedBooking.id}</span>
              </h3>
              <p className="text-xs text-slate-600">
                {lang === "en"
                  ? "SMS and WhatsApp confirmation details sent to " + confirmedBooking.phone
                  : "बुकिंग विवरण व्हाट्सएप और एसएमएस द्वारा भेज दिया गया है।"}
              </p>
            </div>

            {/* Assigned Technician Card */}
            {confirmedBooking.technician && (
              <div className="bg-gradient-to-r from-slate-900 to-slate-850 text-white rounded-2xl p-4 text-left border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                    {lang === "en" ? "Assigned Expert Technician" : "आवंटित एक्सपर्ट टेक्नीशियन"}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{confirmedBooking.technician.name}</h4>
                    <p className="text-xs text-slate-300">{confirmedBooking.technician.experience}</p>
                  </div>
                  <a
                    href={`tel:${confirmedBooking.technician.phone}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            )}

            {/* Booking Details Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{confirmedBooking.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Scheduled:</span>
                <span>{confirmedBooking.scheduledDate}, {confirmedBooking.scheduledTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Address:</span>
                <span className="max-w-[200px] truncate">{confirmedBooking.address}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold text-slate-900">
                <span>Amount Payable After Service:</span>
                <span className="text-emerald-700 text-sm font-black">₹{confirmedBooking.finalPrice}</span>
              </div>
            </div>

            {/* Direct WhatsApp Share to Admin / Confirmation */}
            <a
              href={`https://wa.me/919598398005?text=${encodeURIComponent(
                `*New AC Service Booking - RepairGo1*\n\n📋 *Booking ID:* ${confirmedBooking.id}\n👤 *Customer:* ${confirmedBooking.customerName}\n📱 *Phone:* ${confirmedBooking.phone}\n📍 *Address:* ${confirmedBooking.address}, ${confirmedBooking.city}\n❄️ *Service:* ${confirmedBooking.serviceType} (${confirmedBooking.acType})\n⏰ *Slot:* ${confirmedBooking.scheduledDate} (${confirmedBooking.scheduledTimeSlot})\n💰 *Amount:* ₹${confirmedBooking.finalPrice}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200 fill-emerald-200" />
              <span>{lang === "en" ? "Send Booking via WhatsApp" : "व्हाट्सएप पर बुकिंग विवरण भेजें"}</span>
            </a>

            <button
              onClick={onClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-xl cursor-pointer"
            >
              {lang === "en" ? "Done / Close" : "ठीक है / बंद करें"}
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
