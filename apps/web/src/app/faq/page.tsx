"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { FAQ } from "@/components/shared/FAQ";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full py-20 text-left">
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
