"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { mockBundles } from "@/lib/mock-data";

// Types
type NetworkData = { name: string; prefixes: string[]; color: string; badge: string; icon: string };
type Delivery = { id: string; phone: string; bundle: string; time: string; network: string; color: string; badge: string; icon: string };

// Configuration Data
const NETWORKS: Record<string, NetworkData> = {
  MTN: { name: "MTN", prefixes: ["024", "025", "053", "054", "055", "059"], color: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-100 text-yellow-800", icon: "🟡" },
  TELECEL: { name: "Telecel", prefixes: ["020", "050"], color: "bg-red-50 border-red-200", badge: "bg-red-100 text-red-800", icon: "🔴" },
  AIRTELTIGO: { name: "AirtelTigo", prefixes: ["026", "027", "056", "057"], color: "bg-blue-50 border-blue-200", badge: "bg-blue-100 text-blue-800", icon: "🔵" },
};

const BUNDLES = Array.from(new Set(mockBundles.map(b => b.size)));
const TIMES = ["Just now", "8 seconds ago", "12 seconds ago", "15 seconds ago", "27 seconds ago", "45 seconds ago", "1 minute ago"];

// Helper to generate a random masked phone number
const generatePhone = (networkName: string) => {
  const net = Object.values(NETWORKS).find(n => n.name === networkName)!;
  const prefix = net.prefixes[Math.floor(Math.random() * net.prefixes.length)];
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix} **** ${suffix}`;
};

// Generate 200 mock deliveries
const generateDeliveries = (): Delivery[] => {
  const deliveries: Delivery[] = [];
  const networkKeys = Object.keys(NETWORKS);
  
  for (let i = 0; i < 200; i++) {
    const netKey = networkKeys[Math.floor(Math.random() * networkKeys.length)];
    const network = NETWORKS[netKey];
    
    deliveries.push({
      id: `del-${i}-${Math.random().toString(36).substr(2, 9)}`,
      network: network.name,
      color: network.color,
      badge: network.badge,
      icon: network.icon,
      phone: generatePhone(network.name),
      bundle: BUNDLES[Math.floor(Math.random() * BUNDLES.length)],
      time: TIMES[Math.floor(Math.random() * TIMES.length)],
    });
  }
  return deliveries.sort(() => 0.5 - Math.random());
};

export const LiveDeliveryFeed = () => {
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [items, setItems] = useState<Delivery[]>([]);
  const [counter, setCounter] = useState(1284);
  
  const allDeliveries = useMemo(() => generateDeliveries(), []);

  useEffect(() => {
    setMounted(true);
    setItems(allDeliveries.slice(0, 4));
    
    const checkMobile = () => setVisibleCount(window.innerWidth < 768 ? 3 : 4);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [allDeliveries]);

  // Simulate counter counting up
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Simulate active feed rotation
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setItems(prevItems => {
        const nextIndex = Math.floor(Math.random() * allDeliveries.length);
        const newItem = allDeliveries[nextIndex];
        
        // Prevent duplicate IDs in current view
        if (prevItems.some(i => i.id === newItem.id)) return prevItems;
        
        // Replace the oldest item (or randomly) to simulate a stream
        // Easiest is to pop the bottom one and unshift to the top
        const newArray = [newItem, ...prevItems.slice(0, visibleCount - 1)];
        return newArray;
      });
    }, 3000); // New delivery every 3 seconds
    
    return () => clearInterval(interval);
  }, [mounted, allDeliveries, visibleCount]);

  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Background Animated Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-green-100/30 to-purple-100/50 rounded-[24px] blur-xl opacity-70 animate-pulse" />
      
      {/* Main Glassmorphic Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 p-6 relative overflow-hidden flex flex-col h-[520px] sm:h-[580px]">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-extrabold text-slate-900 flex items-center text-xl tracking-tight">
              <Zap className="w-5 h-5 mr-1.5 text-blue-600 fill-blue-600" />
              Live Deliveries
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Real customers receiving data right now</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="flex items-center text-[10px] font-bold tracking-widest text-green-700 bg-green-100 px-2 py-1 rounded-full uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1.5" />
              Live
            </span>
            <div className="mt-2 text-right">
              <div className="text-xs text-slate-400 font-medium">Orders Today</div>
              <div className="font-mono font-bold text-slate-800 text-sm">
                {counter.toLocaleString()} <span className="text-green-500">↑</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Status Strip */}
        <div className="flex flex-wrap gap-2 py-3 border-y border-slate-100 mb-4 mt-2">
          <span className="text-[10px] font-semibold text-slate-500 flex items-center bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
            <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" /> MTN Online
          </span>
          <span className="text-[10px] font-semibold text-slate-500 flex items-center bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
            <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" /> Telecel Online
          </span>
          <span className="text-[10px] font-semibold text-slate-500 flex items-center bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
            <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" /> AirtelTigo Online
          </span>
        </div>

        {/* Live Feed List */}
        <div className="flex-1 relative overflow-hidden -mx-2 px-2">
          <AnimatePresence mode="popLayout">
            {items.map((tx) => (
              <motion.div
                key={tx.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="group mb-3 p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg border shadow-sm ${tx.color}`}>
                      {tx.icon}
                    </div>
                    <div>
                      <div className="font-mono font-bold text-slate-900 text-sm tracking-tight">{tx.phone}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${tx.badge}`}>
                          {tx.network}
                        </span>
                        <span className="text-xs font-semibold text-slate-600">{tx.bundle}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-lg flex items-center shadow-sm">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Delivered
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium mt-1.5">{tx.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* View All Modal Link */}
        <div className="pt-3 border-t border-slate-100 text-center mt-auto">
          <Link href="/activity" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center w-full py-2 rounded-lg hover:bg-blue-50">
            View Live Activity <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

      </div>
    </div>
  );
};
