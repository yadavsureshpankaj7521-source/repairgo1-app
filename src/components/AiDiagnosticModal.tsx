import React, { useState } from "react";
import { Language, AiDiagnosticResult } from "../types";
import { X, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, Wrench, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { AC_BRANDS } from "../data/services";

interface AiDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectRecommendedService: (serviceName: string) => void;
}

export const AiDiagnosticModal: React.FC<AiDiagnosticModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectRecommendedService
}) => {
  const [problemDescription, setProblemDescription] = useState("");
  const [acType, setAcType] = useState("Split AC");
  const [acBrand, setAcBrand] = useState("Voltas");
  const [ageYears, setAgeYears] = useState("3");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiDiagnosticResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const quickSymptoms = [
    { en: "Water dripping inside room", hi: "कमरे में पानी टपकना" },
    { en: "AC blowing warm / normal room air", hi: "गर्म हवा या साधारण हवा फेंकना" },
    { en: "Ice formation on copper pipe / indoor unit", hi: "कॉइल / पाइप पर बर्फ जमना" },
    { en: "Loud humming / buzzing noise from compressor", hi: "कंप्रेसर से तेज़ आवाज़ आना" },
    { en: "Bad smell or burning dust odor from vents", hi: "एसी से बदबू आना" },
    { en: "AC tripping circuit breaker repeatedly", hi: "एसी चालू होते ही एमसीबी ट्रिप होना" }
  ];

  const handleRunDiagnosis = async () => {
    if (!problemDescription.trim()) {
      setErrorMsg(lang === "en" ? "Please enter or select your AC symptom." : "कृपया अपनी एसी की समस्या चुनें या लिखें।");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setResult(null);

    try {
      const resp = await fetch("/api/ai-diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemDescription,
          acType,
          acBrand,
          ageYears,
          language: lang
        })
      });

      if (!resp.ok) {
        throw new Error("Diagnosis failed");
      }

      const data = await resp.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      // Fallback result
      setResult({
        summaryEn: "Analysis suggests potential coil dust blockage, drain pipe clog, or low gas pressure.",
        summaryHi: "जांच से लगता है कि एयर फिल्टर डस्ट, ड्रेन पाइप में ब्लॉक या गैस का दबाव कम हो सकता है।",
        urgency: "Medium",
        possibleCauses: [
          "Clogged air filters restricting airflow",
          "Drain pipe blockage causing indoor water leakage",
          "Low refrigerant gas pressure (R32 / R410a)",
          "Dirty condenser coil on outdoor unit"
        ],
        recommendedService: "AC Power Jet & Foam Deep Cleaning",
        estimatedPriceRange: "₹499 - ₹899",
        safetyAdvice: "Turn off the AC switch if water drops near electrical socket."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">
                {lang === "en" ? "RepairGo1 AI AC Doctor" : "रिपेयरगो1 एआई एसी डॉक्टर"}
              </h2>
              <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                Gemini AI 3.6
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {lang === "en"
                ? "Describe your AC problem & get an instant diagnosis with recommended solution"
                : "अपने एसी की समस्या बताएं और एआई द्वारा तुरंत कारण व सही सर्विस सुझाव पाएं"}
            </p>
          </div>
        </div>

        {/* Diagnostic Input Form */}
        {!result && (
          <div className="space-y-5">
            {/* Quick Symptom Chips */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                {lang === "en" ? "Tap Common AC Symptoms:" : "सामान्य समस्याएं (टैप करें):"}
              </label>
              <div className="flex flex-wrap gap-2">
                {quickSymptoms.map((sym, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setProblemDescription(lang === "en" ? sym.en : sym.hi)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-all text-left cursor-pointer ${
                      problemDescription === (lang === "en" ? sym.en : sym.hi)
                        ? "bg-purple-600 text-white border-purple-600 font-semibold shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {lang === "en" ? sym.en : sym.hi}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {lang === "en" ? "Or describe in detail:" : "या विस्तार से लिखें:"}
              </label>
              <textarea
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "E.g., My 1.5 Ton Split AC stopped cooling suddenly today, compressor makes humming sound every 2 mins..."
                    : "जैसे: मेरा 1.5 टन का स्प्लिट एसी आज अचानक ठंडा करना बंद कर दिया, कंप्रेसर से बार-बार आवाज आ रही है..."
                }
                rows={3}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* AC Specifications */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {lang === "en" ? "AC Type" : "प्रकार"}
                </label>
                <select
                  value={acType}
                  onChange={(e) => setAcType(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:outline-none"
                >
                  <option value="Split AC">Split AC</option>
                  <option value="Window AC">Window AC</option>
                  <option value="Cassette AC">Cassette AC</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {lang === "en" ? "Brand" : "ब्रांड"}
                </label>
                <select
                  value={acBrand}
                  onChange={(e) => setAcBrand(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:outline-none"
                >
                  {AC_BRANDS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {lang === "en" ? "AC Age" : "कितना पुराना"}
                </label>
                <select
                  value={ageYears}
                  onChange={(e) => setAgeYears(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:outline-none"
                >
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3-4 Years</option>
                  <option value="5">5+ Years</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 font-semibold">{errorMsg}</p>
            )}

            {/* Run Button */}
            <button
              onClick={handleRunDiagnosis}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-yellow-300" />
                  <span>{lang === "en" ? "Analyzing AC Symptoms with AI..." : "एआई समस्या का विश्लेषण कर रहा है..."}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>{lang === "en" ? "Get AI Diagnostic Report" : "एआई रिपोर्ट प्राप्त करें"}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Diagnostic Result View */}
        {result && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
            
            {/* Summary Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-purple-400 tracking-wider">
                  {lang === "en" ? "Diagnostic Summary" : "निदान सारांश"}
                </span>
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                  result.urgency === "High"
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                    : result.urgency === "Medium"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                }`}>
                  Urgency: {result.urgency}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-200 leading-relaxed">
                {lang === "en" ? result.summaryEn : result.summaryHi}
              </p>
            </div>

            {/* Possible Causes List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {lang === "en" ? "Identified Technical Causes:" : "संभावित तकनीकी कारण:"}
              </h4>
              <div className="space-y-1.5">
                {result.possibleCauses?.map((cause, i) => (
                  <div key={i} className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{cause}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tip */}
            {result.safetyAdvice && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{lang === "en" ? "Safety Precaution: " : "सुरक्षा चेतावनी: "}</span>
                  <span>{result.safetyAdvice}</span>
                </div>
              </div>
            )}

            {/* Recommendation Box & Booking Action */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">
                  {lang === "en" ? "Recommended Package" : "अनुशंसित पैकेज"}
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {result.recommendedService}
                </h4>
                <p className="text-xs text-slate-600">
                  Estimated Rate: <span className="font-bold text-emerald-700">{result.estimatedPriceRange}</span>
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectRecommendedService(result.recommendedService);
                  onClose();
                }}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>{lang === "en" ? "Book This Package" : "यह पैकेज बुक करें"}</span>
              </button>
            </div>

            {/* Re-run button */}
            <button
              onClick={() => setResult(null)}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mx-auto cursor-pointer font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Test Another Symptom" : "दूसरी समस्या जांचें"}</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
