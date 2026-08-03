"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-20">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Cookie Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="lead text-lg mb-6">Last updated: August 2026</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. What Are Cookies</h2>
          <p className="mb-4">Cookies are small text files that are placed on your computer or mobile device when you browse websites. They help websites remember your device and how you interacted with the site.</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Cookies</h2>
          <p className="mb-4">We use cookies primarily for essential site operations, such as remembering your authentication status, maintaining your shopping cart state, and protecting against CSRF attacks.</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Managing Cookies</h2>
          <p className="mb-4">You can control and manage cookies through your browser settings. Please note that removing or blocking essential cookies can impact your user experience and parts of this website may no longer be fully accessible.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
