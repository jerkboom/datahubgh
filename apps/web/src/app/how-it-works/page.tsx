"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Activity, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    { step: "1", title: "Choose Network & Bundle", desc: "Select MTN, Telecel, or AirtelTigo, then pick the exact data volume you need.", icon: <Activity className="w-8 h-8" /> },
    { step: "2", title: "Enter Phone Number", desc: "Provide the recipient's phone number. You can buy for yourself or a friend.", icon: <Zap className="w-8 h-8" /> },
    { step: "3", title: "Pay Securely", desc: "Checkout seamlessly using MTN MoMo, Telecel Cash, or AT Money via Paystack.", icon: <ShieldCheck className="w-8 h-8" /> },
    { step: "4", title: "Instant Delivery", desc: "The data bundle is credited instantly to the recipient's phone.", icon: <CheckCircle2 className="w-8 h-8" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-16 tracking-tight">How It Works</h1>
        <div className="space-y-12 relative">
          <div className="absolute left-8 top-8 bottom-8 w-1 bg-blue-100 hidden md:block rounded-full"></div>
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg flex-shrink-0">
                {s.icon}
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-bold text-slate-900 text-2xl mb-3">Step {s.step}: {s.title}</h3>
                <p className="text-lg text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
