"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-20">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="lead text-lg mb-6">Last updated: August 2026</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing and using DataHubGH, you accept and agree to be bound by the terms and provision of this agreement.</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Service Description</h2>
          <p className="mb-4">We provide a digital vending platform for mobile data and airtime across Ghanaian networks. Delivery times may vary based on the respective telecom provider's network status.</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. User Responsibilities</h2>
          <p className="mb-4">You are responsible for ensuring the accuracy of the recipient phone numbers entered during checkout. DataHubGH is not liable for data sent to incorrect numbers provided by the user.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
