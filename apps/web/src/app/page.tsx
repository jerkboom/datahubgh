"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Zap, ShieldCheck, Clock, Star, PhoneCall, 
  CheckCircle2, Activity, MessageCircle, ChevronDown
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { mockNetworks, mockBundles } from "@/lib/mock-data";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { LivePurchasesTicker } from "@/components/ui/LivePurchasesTicker";
import { LiveDeliveryFeed } from "@/components/ui/LiveDeliveryFeed";
import { FAQ } from "@/components/shared/FAQ";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 relative">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-white">
          {/* Animated Background Shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-green-50 rounded-full blur-3xl opacity-50 -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-6 border border-green-200">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  All Systems Operational
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                  Buy Data Bundles <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
                    Instantly.
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
                  Fast, Secure and Affordable Mobile Data for MTN, Telecel, and AirtelTigo. 
                  Skip the USSD menus and get connected in seconds.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-2xl bg-blue-700 hover:bg-blue-800 text-white shadow-lg hover:shadow-xl transition-all">
                    <Link href="/networks">
                      Buy Data Now <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold rounded-2xl bg-white border-slate-200 text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                    <Link href="/track">
                      Track Order
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-500">
                  <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-green-500" /> Instant Delivery</span>
                  <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-blue-500" /> Secure Payments</span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-orange-400" /> 24/7 Service</span>
                </div>
              </motion.div>

              {/* Floating Product Preview & Live Activity */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative lg:ml-auto w-full max-w-md"
              >
                <LiveDeliveryFeed />
              </motion.div>
            </div>
          </div>
        </section>

        {/* LIVE ACTIVITY TICKER (Moved from below) */}
        <LivePurchasesTicker />

        {/* SERVICE STATUS & PAYMENT METHODS */}
        <section className="border-y border-slate-200 bg-slate-50 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600">
              <span className="text-slate-400 uppercase tracking-widest text-xs font-bold mr-2">Network Status</span>
              {mockNetworks.map(n => (
                <span key={n.id} className="flex items-center">
                  {n.name} <span className="w-2 h-2 rounded-full bg-green-500 ml-2" />
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <span className="text-slate-400 uppercase tracking-widest text-xs font-bold mr-2">Payments via</span>
              <span className="font-bold text-slate-900">Paystack</span>
              <span className="font-bold text-slate-900">Mobile Money</span>
            </div>
          </div>
        </section>

        {/* FEATURED NETWORKS */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Select Your Network</h2>
              <p className="text-lg text-slate-600">Premium bundles available for all major providers in Ghana.</p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {mockNetworks.map((network) => {
                const bundleCount = mockBundles.filter(b => b.network === network.name).length;
                return (
                  <motion.div key={network.id} variants={itemVariants}>
                    <Link href={`/networks/${network.slug}`}>
                      <div className="group bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 ease-in-out hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="text-blue-600 w-6 h-6" />
                        </div>
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-sm mb-6 ${network.color}`}>
                          {network.logo}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{network.name}</h3>
                        <p className="text-slate-500 mb-6 flex-grow">
                          Enjoy ultra-fast 4G LTE data. Starting from just <span className="font-semibold text-slate-900">GH₵5</span>.
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                            {bundleCount} Bundles
                          </span>
                          <span className="text-sm text-slate-500 flex items-center">
                            <Zap className="w-4 h-4 mr-1 text-orange-400" /> Instant
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Purchase in Seconds</h2>
              <p className="text-lg text-slate-600">A frictionless experience designed for speed.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-200 via-green-200 to-blue-200" />
              
              {[
                { step: "1", title: "Choose Network", desc: "Select MTN, Telecel, or AirtelTigo.", icon: <Activity /> },
                { step: "2", title: "Select Bundle", desc: "Pick the data package you need.", icon: <Zap /> },
                { step: "3", title: "Pay Securely", desc: "Use Mobile Money for payment.", icon: <ShieldCheck /> },
                { step: "4", title: "Instant Delivery", desc: "Data is delivered instantly.", icon: <CheckCircle2 /> }
              ].map((s, i) => (
                <div key={i} className="relative z-10 text-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold mb-6 shadow-lg shadow-blue-600/20">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="py-20 bg-blue-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
              {[
                { label: "Orders Delivered", value: "50,000+" },
                { label: "Success Rate", value: "99.9%" },
                { label: "Supported Networks", value: "3" },
                { label: "Availability", value: "24/7" },
              ].map((stat, i) => (
                <div key={i} className="p-4">
                  <div className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-200">
                    {stat.value}
                  </div>
                  <div className="text-blue-200 font-medium tracking-wide text-sm uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-white relative">
          <TestimonialCarousel />
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-slate-50 border-t border-slate-200">
          <FAQ />
        </section>

        {/* CALL TO ACTION */}
        <section className="py-24 bg-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Ready to buy data?</h2>
            <p className="text-xl text-slate-600 mb-10">
              Join thousands of Ghanaians enjoying seamless digital vending today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto h-16 px-10 text-xl font-bold rounded-2xl bg-blue-700 hover:bg-blue-800 text-white shadow-xl hover:-translate-y-1 transition-all">
                <Link href="/networks">
                  Buy Data Now
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Floating WhatsApp Support */}
      <a 
        href="https://wa.me/233245726892" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 text-white hover:bg-green-600"
        aria-label="Contact Support on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
