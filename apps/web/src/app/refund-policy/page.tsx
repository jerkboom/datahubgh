"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-20">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Refund Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="lead text-lg mb-6">Last updated: August 2026</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Automated Refunds</h2>
          <p className="mb-4">If a payment is successfully debited from your Mobile Money wallet but the telecommunication network fails to deliver the bundle within our processing window, our system will automatically initiate a refund.</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Processing Time</h2>
          <p className="mb-4">Automated refunds are typically processed within 24 hours. Depending on your network provider, it may take an additional 1-3 business days to reflect in your balance.</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Non-Refundable Scenarios</h2>
          <p className="mb-4">We do not offer refunds if a bundle is successfully delivered to a wrong number due to user error during checkout. Please verify recipient numbers carefully before paying.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
