"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function StatusPage() {
  const statuses = [
    { name: "MTN API", status: "operational", desc: "Data delivery processing normally." },
    { name: "Telecel API", status: "operational", desc: "Data delivery processing normally." },
    { name: "AirtelTigo API", status: "degraded", desc: "Experiencing minor delays (3-5 mins)." },
    { name: "Payment Gateway (Paystack)", status: "operational", desc: "Payments processing instantly." },
    { name: "Core System API", status: "operational", desc: "Routing and database systems normal." },
    { name: "Web Application", status: "operational", desc: "Frontend interface running smoothly." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pb-24">
        <div className="bg-slate-900 pt-16 pb-32 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 to-transparent opacity-50" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Service Status</h1>
            <p className="text-lg text-slate-300">
              Real-time information on system performance and network availability.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-20 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
          >
            <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-green-50 border border-green-100">
              <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
              <div>
                <h2 className="font-bold text-green-800 text-lg">All Systems Mostly Operational</h2>
                <p className="text-sm text-green-700">Refreshed just now.</p>
              </div>
            </div>

            <div className="space-y-4">
              {statuses.map((service, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-bold text-slate-900">{service.name}</h3>
                    <p className="text-sm text-slate-500">{service.desc}</p>
                  </div>
                  <div>
                    {service.status === 'operational' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Operational
                      </span>
                    )}
                    {service.status === 'degraded' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Degraded
                      </span>
                    )}
                    {service.status === 'offline' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                        <XCircle className="w-3 h-3 mr-1" /> Offline
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500 mb-4">Experiencing an issue not listed here?</p>
              <Button asChild variant="outline" className="rounded-xl border-slate-200">
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
