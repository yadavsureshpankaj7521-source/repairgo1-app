export type Language = "en" | "hi";

export interface ServicePackage {
  id: string;
  name: { en: string; hi: string };
  category: "cleaning" | "gas" | "repair" | "installation" | "amc";
  tagline: { en: string; hi: string };
  originalPrice: number;
  discountedPrice: number;
  durationMinutes: number;
  warrantyDays: number;
  rating: number;
  reviewsCount: number;
  badge?: { en: string; hi: string };
  features: { en: string[]; hi: string[] };
  acTypes: ("Split AC" | "Window AC" | "Cassette AC")[];
  popular: boolean;
}

export interface BookingData {
  id?: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  pincode: string;
  city: string;
  serviceType: string;
  acType: "Split AC" | "Window AC" | "Cassette AC";
  tonnage: "1.0 Ton" | "1.5 Ton" | "2.0 Ton" | "Multi Split";
  acCount: number;
  scheduledDate: string;
  scheduledTimeSlot: string;
  totalPrice: number;
  discountApplied: number;
  finalPrice: number;
  couponCode?: string;
  notes?: string;
  status?: "Pending" | "Technician Assigned" | "En Route" | "In Progress" | "Completed";
  technician?: {
    name: string;
    phone: string;
    rating: number;
    experience: string;
  };
  createdAt?: string;
}

export interface AiDiagnosticResult {
  summaryEn: string;
  summaryHi: string;
  urgency: "Low" | "Medium" | "High";
  possibleCauses: string[];
  recommendedService: string;
  estimatedPriceRange: string;
  safetyAdvice: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: { en: string; hi: string };
  serviceDone: string;
  verified: boolean;
}
