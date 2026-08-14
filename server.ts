import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable CORS for PWA Scrapers and PWABuilder
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Explicit PWA Endpoints for PWABuilder & Google Play Store Packaging
app.get(["/manifest.json", "/manifest.webmanifest"], (_req, res) => {
  res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  const manifestPath = path.join(process.cwd(), "public", "manifest.json");
  if (fs.existsSync(manifestPath)) {
    res.sendFile(manifestPath);
  } else {
    res.json({
      id: "com.repairgo1.app",
      name: "RepairGo1 - AC Service App",
      short_name: "RepairGo1",
      description: "Book expert AC service, repair, gas charging & deep jet cleaning with 30-day warranty.",
      start_url: "/",
      scope: "/",
      display: "standalone",
      orientation: "portrait",
      background_color: "#0f172a",
      theme_color: "#1e40af",
      icons: [
        {
          src: "https://cdn-icons-png.flaticon.com/512/2933/2933822.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "https://cdn-icons-png.flaticon.com/512/2933/2933822.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    });
  }
});

const DEFAULT_SW_CONTENT = `const CACHE_NAME = 'repairgo1-cache-v1';
const STATIC_ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request).catch(() => caches.match('/')))
  );
});`;

app.get("/sw.js", (_req, res) => {
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  res.setHeader("Service-Worker-Allowed", "/");
  res.setHeader("Access-Control-Allow-Origin", "*");
  const swPath = path.join(process.cwd(), "public", "sw.js");
  if (fs.existsSync(swPath)) {
    res.sendFile(swPath);
  } else {
    res.send(DEFAULT_SW_CONTENT);
  }
});

app.use(express.json({ limit: "5mb" }));

// In-memory bookings store
interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  pincode: string;
  city: string;
  serviceType: string;
  acType: string;
  tonnage: string;
  acCount: number;
  scheduledDate: string;
  scheduledTimeSlot: string;
  totalPrice: number;
  discountApplied: number;
  finalPrice: number;
  couponCode?: string;
  notes?: string;
  status: "Pending" | "Technician Assigned" | "En Route" | "In Progress" | "Completed";
  technician?: {
    name: string;
    phone: string;
    rating: number;
    experience: string;
  };
  createdAt: string;
}

const mockBookings: Map<string, Booking> = new Map();

// Populate demo booking
const sampleBookingId = "RPG-88291";
mockBookings.set(sampleBookingId, {
  id: sampleBookingId,
  customerName: "Rahul Sharma",
  phone: "9876543210",
  email: "rahul@example.com",
  address: "Flat 402, Green Valley Heights, Sector 62",
  pincode: "201301",
  city: "Noida",
  serviceType: "AC Foam & Power Jet Deep Service",
  acType: "Split AC",
  tonnage: "1.5 Ton",
  acCount: 2,
  scheduledDate: "Tomorrow",
  scheduledTimeSlot: "10:00 AM - 12:00 PM",
  totalPrice: 1198,
  discountApplied: 250,
  finalPrice: 948,
  couponCode: "FIRST50",
  status: "Technician Assigned",
  technician: {
    name: "Vikram Singh (Certified Master Tech)",
    phone: "+91 9811223344",
    rating: 4.9,
    experience: "7+ Years (500+ ACs Serviced)"
  },
  createdAt: new Date().toISOString()
});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "RepairGo1 API" });
});

// Get booking by ID or Phone
app.get("/api/bookings", (req, res) => {
  const query = (req.query.q as string || "").trim().toLowerCase();
  if (!query) {
    return res.json(Array.from(mockBookings.values()));
  }

  const results = Array.from(mockBookings.values()).filter(b => 
    b.id.toLowerCase() === query || 
    b.phone.includes(query)
  );

  res.json(results);
});

// Create new booking
app.post("/api/bookings", (req, res) => {
  try {
    const data = req.body;
    if (!data.customerName || !data.phone || !data.address || !data.serviceType) {
      return res.status(400).json({ error: "Missing required booking details." });
    }

    const bookingId = `RPG-${Math.floor(10000 + Math.random() * 90000)}`;
    const techniciansList = [
      { name: "Pankaj Yadav (Lead Master Tech)", phone: "+91 7521869140", rating: 4.95, experience: "8 Years Exp" },
      { name: "Ramesh Kumar (AC Specialist)", phone: "+91 9598398005", rating: 4.9, experience: "6 Years Exp" },
      { name: "Sanjay Verma (Gas Leakage Expert)", phone: "+91 7521869140", rating: 4.8, experience: "8 Years Exp" }
    ];
    const assignedTech = techniciansList[Math.floor(Math.random() * techniciansList.length)];

    const newBooking: Booking = {
      id: bookingId,
      customerName: data.customerName,
      phone: data.phone,
      email: data.email || "",
      address: data.address,
      pincode: data.pincode || "110001",
      city: data.city || "New Delhi",
      serviceType: data.serviceType,
      acType: data.acType || "Split AC",
      tonnage: data.tonnage || "1.5 Ton",
      acCount: Number(data.acCount) || 1,
      scheduledDate: data.scheduledDate || "Today",
      scheduledTimeSlot: data.scheduledTimeSlot || "2:00 PM - 4:00 PM",
      totalPrice: Number(data.totalPrice) || 599,
      discountApplied: Number(data.discountApplied) || 0,
      finalPrice: Number(data.finalPrice) || 599,
      couponCode: data.couponCode || "",
      notes: data.notes || "",
      status: "Technician Assigned",
      technician: assignedTech,
      createdAt: new Date().toISOString()
    };

    mockBookings.set(bookingId, newBooking);
    res.status(201).json({ success: true, booking: newBooking });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to create booking" });
  }
});

// AI AC Diagnostic Assistant Route (Gemini 3.6 Flash)
app.post("/api/ai-diagnose", async (req, res) => {
  try {
    const { problemDescription, acType, acBrand, ageYears, language = "en" } = req.body;

    if (!problemDescription) {
      return res.status(400).json({ error: "Please describe the AC problem." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback default AI diagnostic response if key is missing
      return res.json({
        summaryEn: `Based on your description ("${problemDescription}"), there may be a filter blockage, ice formation, or gas pressure imbalance.`,
        summaryHi: `आपकी समस्या ("${problemDescription}") के आधार पर, एयर फ़िल्टर ब्लॉक, आइस जमना या गैस प्रेशर कम होना मुख्य कारण हो सकता है।`,
        urgency: "Medium",
        possibleCauses: [
          "Dirty air filters clogging airflow",
          "Drain pipe blockage causing indoor water leakage",
          "Low refrigerant gas (R32 / R410a) level",
          "Dust build-up on cooling coil condenser"
        ],
        recommendedService: "AC Foam Jet Deep Cleaning + Gas Inspection",
        estimatedPriceRange: "₹499 - ₹899",
        safetyAdvice: "Turn off the AC main power button if you notice water dripping near electrical sockets."
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });

    const prompt = `You are RepairGo1's Expert Master Technician AI. Analyze the customer's AC issue:
AC Type: ${acType || "Split AC"}
Brand: ${acBrand || "General"}
AC Age: ${ageYears ? ageYears + " years" : "Unknown"}
Customer Description: "${problemDescription}"

Provide a professional, clear diagnostic report with actionable advice in JSON format. Provide summary in both English and Hindi. Recommend one of our services: "AC Foam Jet Deep Cleaning", "Gas Refill (R32/R410A)", "AC Water Leakage Repair", "PCB Repair & Inspection", or "Full AC Installation".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summaryEn: { type: Type.STRING, description: "Short clear 2-sentence diagnosis in English" },
            summaryHi: { type: Type.STRING, description: "Short clear 2-sentence diagnosis in Hindi" },
            urgency: { type: Type.STRING, description: "Low, Medium, or High" },
            possibleCauses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 to 4 possible technical causes"
            },
            recommendedService: { type: Type.STRING, description: "Exact recommended service package name" },
            estimatedPriceRange: { type: Type.STRING, description: "Estimated repair cost e.g. ₹499 - ₹899" },
            safetyAdvice: { type: Type.STRING, description: "Crucial electrical / safety advice for the customer" }
          },
          required: ["summaryEn", "summaryHi", "urgency", "possibleCauses", "recommendedService", "estimatedPriceRange", "safetyAdvice"]
        }
      }
    });

    const resultText = response.text || "{}";
    const resultObj = JSON.parse(resultText);

    res.json(resultObj);
  } catch (error: any) {
    console.error("AI Diagnostic error:", error);
    res.status(500).json({
      error: "AI Diagnosis temporary failure. Standard recommended package is AC Power Jet Deep Service.",
      fallback: true
    });
  }
});

// Vite & Static Server setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RepairGo1 Server running on http://localhost:${PORT}`);
  });
}

startServer();
