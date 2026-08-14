import { ServicePackage, CustomerReview } from "../types";

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "power-jet-foam-deep",
    name: {
      en: "AC Power Jet & Foam Deep Cleaning",
      hi: "एसी पावर जेट और फोम डीप क्लीनिंग"
    },
    category: "cleaning",
    tagline: {
      en: "2X Cooling boost! High-pressure power jet cleaning with eco-foam spray.",
      hi: "2 गुना कूलिंग! इको-फोम स्प्रे के साथ हाई-प्रेशर पावर जेट सफ़ाई।"
    },
    originalPrice: 899,
    discountedPrice: 499,
    durationMinutes: 45,
    warrantyDays: 30,
    rating: 4.92,
    reviewsCount: 3840,
    badge: { en: "MOST POPULAR", hi: "सबसे लोकप्रिय" },
    popular: true,
    acTypes: ["Split AC", "Window AC"],
    features: {
      en: [
        "Deep coil cleaning with high-pressure water jet & foam bottle spray",
        "Includes protective jacket bag setup to avoid water spill on walls",
        "Blower fan wheel, air filter & drain tray deep flush",
        "Outdoor unit condenser coil jet wash included",
        "Free 30-day post-service warranty against cooling issues"
      ],
      hi: [
        "हाई प्रेशर वाटर जेट और फोम स्प्रे से डीप कॉइल धुलाई",
        "दीवारों को पानी से बचाने के लिए वाटरप्रूफ जैकेट बैग सेटअप",
        "ब्लोअर फैन व्हील, एयर फ़िल्टर और ड्रेन ट्रे की पूरी सफ़ाई",
        "आउटडोर यूनिट कंडेनसर कॉइल जेट वॉश शामिल",
        "कूलिंग समस्या के लिए 30 दिनों की मुफ़्त सर्विस वारंटी"
      ]
    }
  },
  {
    id: "ac-gas-refill-full",
    name: {
      en: "Full Gas Refill & Leakage Detection (R32 / R410a)",
      hi: "फुल एसी गैस रीफिल और लीकेज डिटेक्शन"
    },
    category: "gas",
    tagline: {
      en: "Complete pressure testing, nitrogen leak fix, and 100% pure refrigerant refill.",
      hi: "नाइट्रोजन लीकेज चेकिंग और 100% शुद्ध गैस रीफिल।"
    },
    originalPrice: 2800,
    discountedPrice: 2199,
    durationMinutes: 60,
    warrantyDays: 60,
    rating: 4.88,
    reviewsCount: 1920,
    badge: { en: "60-DAY WARRANTY", hi: "60 दिन वारंटी" },
    popular: true,
    acTypes: ["Split AC", "Window AC", "Cassette AC"],
    features: {
      en: [
        "High-sensitivity electronic leak detection & flare nut tight",
        "Nitrogen pressure test to identify microscopic copper tube leaks",
        "Vacuum evacuating humidity & moisture from refrigeration circuit",
        "100% Pure imported R32 / R410a / R22 gas refill by weight",
        "Ampere & cooling temperature delta verification before lock"
      ],
      hi: [
        "इलेक्ट्रॉनिक लीकेज डिटेक्शन और फ्लेयर नट चेकिंग",
        "माइक्रोस्कोपिक कॉपर ट्यूब लीकेज के लिए नाइट्रोजन टेस्ट",
        "सिस्टम से पूरी नमी निकालने के लिए वैक्यूम प्रक्रिया",
        "वज़न के अनुसार 100% ओरिजिनल R32 / R410a गैस फ़िलिंग",
        "एम्पीयर और कूलिंग टेम्परेचर की सटीक जाँच"
      ]
    }
  },
  {
    id: "ac-anti-rust-foam-combo",
    name: {
      en: "Anti-Rust Shield + Foam Jet Combo",
      hi: "एंटी-रस्ट शील्ड + फोम जेट कॉम्बो"
    },
    category: "cleaning",
    tagline: {
      en: "Prevents gas leakage & corrosion on copper coils in coastal/polluted areas.",
      hi: "कॉपर कॉइल को जंग और गैस लीकेज से बचाने के लिए स्पेशल कोटिंग।"
    },
    originalPrice: 1499,
    discountedPrice: 899,
    durationMinutes: 60,
    warrantyDays: 90,
    rating: 4.95,
    reviewsCount: 1140,
    badge: { en: "PREVENTS GAS LEAKS", hi: "लीकेज से बचाव" },
    popular: false,
    acTypes: ["Split AC", "Window AC"],
    features: {
      en: [
        "Power Jet Foam Service for indoor & outdoor units",
        "Specialized anti-corrosion protective spray on copper U-bends",
        "Extends AC coil lifespan by 3+ years",
        "Disinfectant sanitization against bacteria and mold growth"
      ],
      hi: [
        "इनडोर और आउटडोर यूनिट्स की पावर जेट फोम वॉश",
        "कॉपर यू-बेंड्स पर एंटी-कोरोजन प्रोटेक्टिव स्प्रे",
        "एसी कॉइल की उम्र 3 साल से अधिक बढ़ाता है",
        "कीटाणुओं और फंगस से सुरक्षा के लिए सैनिटाइजेशन"
      ]
    }
  },
  {
    id: "ac-repair-diagnostic",
    name: {
      en: "AC Inspection & Circuit Diagnostics",
      hi: "एसी इंस्पेक्शन और सर्किट डायग्नोस्टिक्स"
    },
    category: "repair",
    tagline: {
      en: "Expert diagnosis for non-cooling, loud noise, water dripping, or PCB issues.",
      hi: "कूलिंग न होना, तेज़ आवाज़, या पीसीबी खराबी की सटीक जाँच।"
    },
    originalPrice: 499,
    discountedPrice: 299,
    durationMinutes: 30,
    warrantyDays: 30,
    rating: 4.85,
    reviewsCount: 2450,
    popular: false,
    acTypes: ["Split AC", "Window AC", "Cassette AC"],
    features: {
      en: [
        "Complete electrical & mechanical health checkup",
        "Compressor capacitor test, fan motor & sensor check",
        "Inspection fee adjusted if you approve any repair/spare replacement",
        "Transparent price quote before starting any work"
      ],
      hi: [
        "इलेक्ट्रिकल और मैकेनिकल पार्ट्स की पूरी जाँच",
        "कंप्रेसर कैपेसिटर, फैन मोटर और सेंसर की चेकिंग",
        "रिपेयर कराने पर इंस्पेक्शन फीस कुल बिल में एडजस्ट हो जाएगी",
        "काम शुरू करने से पहले पारदर्शी रेट कार्ड"
      ]
    }
  },
  {
    id: "ac-installation-split",
    name: {
      en: "Split AC Complete Installation",
      hi: "स्प्लिट एसी कम्प्लीट इंस्टॉलेशन"
    },
    category: "installation",
    tagline: {
      en: "Precision mounting, core drilling, flare vacuuming & cooling check.",
      hi: "सटीक माउन्टिंग, कोर ड्रिलिंग, फ्लेयर वैक्यूमिंग और टेस्ट रन।"
    },
    originalPrice: 1999,
    discountedPrice: 1499,
    durationMinutes: 90,
    warrantyDays: 90,
    rating: 4.91,
    reviewsCount: 1560,
    badge: { en: "EXPERT FITMENT", hi: "एक्सपर्ट फिटमेंट" },
    popular: true,
    acTypes: ["Split AC"],
    features: {
      en: [
        "Precision indoor plate wall mounting using spirit level",
        "Outdoor unit wall stand or balcony fitment",
        "Core hole drilling for copper piping with dust-catcher bag",
        "Nitrogen leak test & vacuum before power turn-on"
      ],
      hi: [
        "स्पिरिट लेवल का उपयोग करके इनडोर प्लेट की सटीक माउन्टिंग",
        "आउटडोर यूनिट स्टैंड या बालकनी की सुरक्षित फिटिंग",
        "कॉपर पाइप के लिए डस्ट-कैचर बैग के साथ कोर होल ड्रिलिंग",
        "चालू करने से पहले लीकेज टेस्ट और वैक्यूमिंग"
      ]
    }
  },
  {
    id: "ac-uninstallation-split",
    name: {
      en: "Split / Window AC Uninstallation",
      hi: "स्प्लिट / विंडो एसी अनइंस्टॉलेशन"
    },
    category: "installation",
    tagline: {
      en: "Safe pump-down gas locking and damage-free removal.",
      hi: "गैस को सुरक्षित रूप से स्टोर करके रिमूवल।"
    },
    originalPrice: 899,
    discountedPrice: 599,
    durationMinutes: 45,
    warrantyDays: 30,
    rating: 4.87,
    reviewsCount: 980,
    popular: false,
    acTypes: ["Split AC", "Window AC"],
    features: {
      en: [
        "Safe refrigerant gas pump-down locking into outdoor compressor",
        "Safe disconnection of electrical wiring & copper tubes",
        "Indoor & outdoor bracket removal without wall damage",
        "Pipe end capping to keep moisture out during transit"
      ],
      hi: [
        "कंप्रेसर में गैस को लॉक करके सुरक्षित पंप-डाउन",
        "वायरिंग और कॉपर ट्यूब्स को बिना नुकसान अलग करना",
        "दीवार को नुकसान पहुंचाए बिना ब्रैकेट निकालना",
        "ट्रांजिट के दौरान धूल/नमी से बचाने के लिए पाइप एंड कैपिंग"
      ]
    }
  },
  {
    id: "ac-annual-maintenance-contract",
    name: {
      en: "RepairGo1 Premium Annual Maintenance (AMC)",
      hi: "रिपेयरगो1 प्रीमियम वार्षिक रखरखाव (AMC)"
    },
    category: "amc",
    tagline: {
      en: "3 Jet Services/yr + Unlimited Free Breakdown Repairs + Free Gas Top-up!",
      hi: "साल में 3 जेट सर्विस + असीमित मुफ़्त ब्रेकडाउन रिपेयर + फ़्री गैस टॉप-अप!"
    },
    originalPrice: 4999,
    discountedPrice: 3499,
    durationMinutes: 365,
    warrantyDays: 365,
    rating: 4.98,
    reviewsCount: 820,
    badge: { en: "1 YEAR PEACE OF MIND", hi: "1 साल बेफिक्र" },
    popular: true,
    acTypes: ["Split AC", "Window AC"],
    features: {
      en: [
        "3 Comprehensive Power Jet Foam Services included annually",
        "Unlimited breakdown visits with ZERO visit charges all year",
        "1 Free Gas Refill top-up during contract period",
        "Priority 2-hour emergency technician dispatch",
        "15% discount on extra spare parts & PCB repair"
      ],
      hi: [
        "साल में 3 पूरी पावर जेट फोम डीप सर्विस शामिल",
        "पूरे साल शून्य विजिट चार्ज के साथ अनलिमिटेड ब्रेकडाउन विजिट",
        "अनुबंध अवधि के दौरान 1 फ़्री गैस टॉप-अप शामिल",
        "इमरजेंसी में 2 घंटे में टेक्नीशियन का आगमन",
        "अतिरिक्त स्पेयर पार्ट्स और पीसीबी रिपेयर पर 15% छूट"
      ]
    }
  }
];

export const POPULAR_CITIES = [
  "New Delhi",
  "Noida & Greater Noida",
  "Gurugram (Gurgaon)",
  "Ghaziabad",
  "Faridabad",
  "Mumbai & Navi Mumbai",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Chandigarh & Tricity",
  "Jaipur",
  "Ahmedabad"
];

export const PROMO_COUPONS = [
  { code: "FIRST50", discountPercent: 50, maxDiscount: 250, description: "50% OFF up to ₹250 on first service booking" },
  { code: "COOL100", discountPercent: 0, flatDiscount: 100, maxDiscount: 100, description: "Flat ₹100 OFF on any service" },
  { code: "FREEGAS", discountPercent: 15, maxDiscount: 350, description: "15% OFF on Full Gas Refill package" }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Anil Kapoor",
    city: "Sector 50, Noida",
    rating: 5,
    date: "2 days ago",
    comment: {
      en: "The technician arrived on exact time with a waterproof jacket setup and power jet machine. No water leaked on my bedroom wall! AC is cooling like brand new now.",
      hi: "टेक्नीशियन वॉटरप्रूफ जैकेट और पावर जेट मशीन के साथ बिल्कुल सही समय पर आए। दीवार पर पानी की एक बूंद भी नहीं गिरी! एसी अब बिल्कुल नए जैसा ठंडा कर रहा है।"
    },
    serviceDone: "AC Power Jet & Foam Deep Cleaning",
    verified: true
  },
  {
    id: "rev-2",
    author: "Pooja Verma",
    city: "DLF Phase 4, Gurugram",
    rating: 5,
    date: "1 week ago",
    comment: {
      en: "My 1.5 Ton Split AC wasn't cooling. Used their AI diagnostic tool which suggested gas leak + low pressure. Technicians did nitrogen testing and refilled R32. Cold air started in 10 mins!",
      hi: "मेरा 1.5 टन का स्प्लिट एसी ठंडा नहीं कर रहा था। एआई टूल ने गैस लीकेज बताया। टेक्नीशियन ने नाइट्रोजन टेस्ट करके R32 गैस भरी। 10 मिनट में बर्फ जैसी ठंडी हवा शुरू हो गई!"
    },
    serviceDone: "Full Gas Refill & Leakage Detection",
    verified: true
  },
  {
    id: "rev-3",
    author: "Siddharth Rao",
    city: "Indiranagar, Bengaluru",
    rating: 5,
    date: "3 days ago",
    comment: {
      en: "Super transparent pricing! Applied coupon FIRST50 and got instant discount. Very polite technicians wearing shoe covers & mask. 10/10 recommended RepairGo1.",
      hi: "बहुत ही पारदर्शी रेट्स! FIRST50 कूपन लगाया और तुरंत डिस्काउंट मिला। जूते के कवर पहनकर बहुत विनम्रता से काम किया। रिपेयरगो1 बेहद शानदार सर्विस है।"
    },
    serviceDone: "Split AC Complete Installation",
    verified: true
  }
];

export const AC_BRANDS = [
  "Daikin",
  "Voltas",
  "LG",
  "Samsung",
  "Blue Star",
  "Hitachi",
  "Lloyd",
  "Panasonic",
  "Godrej",
  "Carrier",
  "Haier",
  "O General",
  "Whirlpool"
];
