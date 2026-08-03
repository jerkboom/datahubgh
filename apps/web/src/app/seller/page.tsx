"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SellerPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full pb-20">
        <section className="bg-slate-900 pt-20 pb-24 text-center text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Become a Seller</h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">Start earning instantly by reselling our high-speed data bundles. Zero setup fees. Instant commissions.</p>
            <Button asChild size="lg" className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-2xl">
              <Link href="/signup">Apply Now</Link>
            </Button>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-extrabold text-center mb-12">Why Sell with DataHubGH?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><TrendingUp className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold mb-3">High Margins</h3>
              <p className="text-slate-500">Get up to 15% discount on bulk bundle purchases. Sell at standard market rates and keep the difference.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold mb-3">Instant Delivery</h3>
              <p className="text-slate-500">Your customers get their data instantly. No manual processing required on your end.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Wallet className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold mb-3">Easy Payouts</h3>
              <p className="text-slate-500">Withdraw your earnings directly to your Mobile Money wallet instantly, 24/7.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
