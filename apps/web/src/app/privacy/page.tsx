"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-20">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="lead text-lg mb-6">Last updated: August 2026</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, including your phone number and email address during the checkout process to fulfill your data bundle orders.</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Payment Processing</h2>
          <p className="mb-4">All payments are processed securely via our trusted payment partners (e.g., Paystack). We do not store your Mobile Money PIN or banking details on our servers.</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Use of Information</h2>
          <p className="mb-4">Your information is used strictly to process orders, send receipts, and provide customer support. We do not sell your data to third parties.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
