"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, CheckCircle2, Zap, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockBundles } from "@/lib/mock-data";

// Types
type NetworkData = { name: string; prefixes: string[]; color: string; badge: string; icon: string };
type Delivery = { id: string; phone: string; bundle: string; time: string; network: string; color: string; badge: string; icon: string; status: "Delivered" | "Processing" };

// Configuration Data
const NETWORKS: Record<string, NetworkData> = {
  MTN: { name: "MTN", prefixes: ["024", "025", "053", "054", "055", "059"], color: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-100 text-yellow-800", icon: "🟡" },
  TELECEL: { name: "Telecel", prefixes: ["020", "050"], color: "bg-red-50 border-red-200", badge: "bg-red-100 text-red-800", icon: "🔴" },
  AIRTELTIGO: { name: "AirtelTigo", prefixes: ["026", "027", "056", "057"], color: "bg-blue-50 border-blue-200", badge: "bg-blue-100 text-blue-800", icon: "🔵" },
};

const BUNDLES = Array.from(new Set(mockBundles.map(b => b.size)));
const TIMES = ["Just now", "8 seconds ago", "12 seconds ago", "15 seconds ago", "27 seconds ago", "45 seconds ago", "1 minute ago", "2 minutes ago", "3 minutes ago", "4 minutes ago", "5 minutes ago"];

// Helper to generate a random masked phone number
const generatePhone = (networkName: string) => {
  const net = Object.values(NETWORKS).find(n => n.name === networkName)!;
  const prefix = net.prefixes[Math.floor(Math.random() * net.prefixes.length)];
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix} **** ${suffix}`;
};

// Generate 100 mock deliveries
const generateDeliveries = (): Delivery[] => {
  const deliveries: Delivery[] = [];
  const networkKeys = Object.keys(NETWORKS);
  
  for (let i = 0; i < 100; i++) {
    const netKey = networkKeys[Math.floor(Math.random() * networkKeys.length)];
    const network = NETWORKS[netKey];
    
    deliveries.push({
      id: `act-${i}-${Math.random().toString(36).substr(2, 9)}`,
      network: network.name,
      color: network.color,
      badge: network.badge,
      icon: network.icon,
      phone: generatePhone(network.name),
      bundle: BUNDLES[Math.floor(Math.random() * BUNDLES.length)],
      time: TIMES[Math.floor(Math.random() * TIMES.length)],
      status: Math.random() > 0.9 ? "Processing" : "Delivered"
    });
  }
  return deliveries.sort(() => 0.5 - Math.random());
};

export default function ActivityPage() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<Delivery[]>([]);
  
  const allDeliveries = useMemo(() => generateDeliveries(), []);

  useEffect(() => {
    setMounted(true);
    setItems(allDeliveries);
  }, [allDeliveries]);

  // Simulate active feed rotation for the full page
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setItems(prevItems => {
        const nextIndex = Math.floor(Math.random() * allDeliveries.length);
        const newItem = allDeliveries[nextIndex];
        
        // Replace top item
        const newArray = [{ ...newItem, id: `new-${Date.now()}`, time: "Just now" }, ...prevItems.slice(0, 99)];
        return newArray;
      });
    }, 2500); 
    
    return () => clearInterval(interval);
  }, [mounted, allDeliveries]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center">
              <Activity className="w-6 h-6 mr-2 text-green-600" /> Live Platform Activity
            </h1>
            <p className="text-slate-500 mt-1">Real-time view of all recent network transactions.</p>
          </div>
          <div className="flex items-center text-[11px] font-bold tracking-widest text-green-700 bg-green-100 px-3 py-1.5 rounded-full uppercase self-start sm:self-auto shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-2" />
            Live Feed Active
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4 grid grid-cols-12 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-4 sm:col-span-3">Network</div>
            <div className="col-span-4 sm:col-span-4">Customer</div>
            <div className="hidden sm:block sm:col-span-2">Bundle</div>
            <div className="col-span-4 sm:col-span-3 text-right">Status</div>
          </div>
          
          <div className="flex flex-col">
            <AnimatePresence initial={false}>
              {items.slice(0, 50).map((tx) => (
                <motion.div
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, y: -20, backgroundColor: "#F0FDF4" }}
                  animate={{ opacity: 1, y: 0, backgroundColor: "#FFFFFF" }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-12 items-center p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  {/* Network */}
                  <div className="col-span-4 sm:col-span-3 flex items-center gap-2 sm:gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-sm sm:text-lg border shadow-sm ${tx.color}`}>
                      {tx.icon}
                    </div>
                    <span className={`hidden sm:inline-flex text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-md ${tx.badge}`}>
                      {tx.network}
                    </span>
                  </div>

                  {/* Customer / Phone */}
                  <div className="col-span-4 sm:col-span-4">
                    <div className="font-mono font-bold text-slate-900 text-xs sm:text-sm tracking-tight">{tx.phone}</div>
                    <div className="sm:hidden text-[10px] font-semibold text-slate-500 mt-0.5">{tx.bundle}</div>
                  </div>

                  {/* Bundle */}
                  <div className="hidden sm:block sm:col-span-2">
                    <span className="text-sm font-semibold text-slate-700">{tx.bundle}</span>
                  </div>

                  {/* Status & Time */}
                  <div className="col-span-4 sm:col-span-3 text-right flex flex-col items-end">
                    {tx.status === "Delivered" ? (
                      <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-lg flex items-center shadow-sm">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Delivered
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-lg flex items-center shadow-sm">
                        <Clock className="w-3 h-3 mr-1" /> Processing
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 font-medium mt-1">{tx.time}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
