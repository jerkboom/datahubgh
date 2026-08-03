"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { mockBundles } from "@/lib/mock-data";

// Types
type NetworkData = { name: string; prefixes: string[]; color: string };
type Transaction = { id: string; phone: string; bundle: string; time: string; network: string; color: string; isProcessing: boolean };

// Configuration Data
const NETWORKS: Record<string, NetworkData> = {
  MTN: { name: "MTN", prefixes: ["024", "025", "053", "054", "055", "059"], color: "bg-yellow-400 text-yellow-900" },
  TELECEL: { name: "Telecel", prefixes: ["020", "050"], color: "bg-red-500 text-white" },
  AIRTELTIGO: { name: "AirtelTigo", prefixes: ["026", "027", "056", "057"], color: "bg-blue-500 text-white" },
};

const BUNDLES = Array.from(new Set(mockBundles.map(b => b.size)));
const TIMES = ["Just now", "8 seconds ago", "15 seconds ago", "22 seconds ago", "32 seconds ago", "41 seconds ago", "55 seconds ago", "1 minute ago", "2 minutes ago", "3 minutes ago", "4 minutes ago", "5 minutes ago"];

// Helper to generate a random masked phone number for a network
const generatePhone = (networkName: string) => {
  const net = Object.values(NETWORKS).find(n => n.name === networkName)!;
  const prefix = net.prefixes[Math.floor(Math.random() * net.prefixes.length)];
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix} **** ${suffix}`;
};

// Generate 100 mock transactions
const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const networkKeys = Object.keys(NETWORKS);
  
  for (let i = 0; i < 100; i++) {
    const netKey = networkKeys[Math.floor(Math.random() * networkKeys.length)];
    const network = NETWORKS[netKey];
    
    transactions.push({
      id: `tx-${i}-${Math.random().toString(36).substr(2, 9)}`,
      network: network.name,
      color: network.color,
      phone: generatePhone(network.name),
      bundle: BUNDLES[Math.floor(Math.random() * BUNDLES.length)],
      time: TIMES[Math.floor(Math.random() * TIMES.length)],
      isProcessing: Math.random() > 0.85 // ~15% chance of being "Processing" instead of "Delivered"
    });
  }
  
  // Shuffle array
  return transactions.sort(() => 0.5 - Math.random());
};

export const LivePurchasesTicker = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Generate the 100 items exactly once per mount
  const tickers = useMemo(() => generateTransactions(), []);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // For Mobile: Rotate single item every 3 seconds
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tickers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile, tickers.length]);

  if (!mounted) return null; // Prevent hydration mismatch

  // Infinite duplicate array for seamless desktop CSS marquee
  const marqueeItems = [...tickers, ...tickers, ...tickers];

  return (
    <div className="w-full bg-[#F8FAFC] py-4 relative z-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl h-16 flex items-center overflow-hidden">
          
          {/* LEFT SIDE: Title */}
          <div className="bg-slate-50 h-full px-2.5 sm:px-6 flex items-center gap-1.5 sm:gap-2 border-r border-slate-200 shrink-0 z-10 shadow-[4px_0_15px_-3px_rgba(0,0,0,0.05)]">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0" />
            <span className="font-bold text-[10px] sm:text-sm tracking-wider uppercase text-slate-700 whitespace-nowrap">
              Live Purchases
            </span>
          </div>

          {/* RIGHT SIDE: Scrolling Marquee (Desktop) or Fading Single (Mobile) */}
          <div className="flex-1 overflow-hidden relative h-full bg-white group flex items-center px-2.5 sm:px-4 min-w-0">
            
            {isMobile ? (
              // Mobile View: Single fading item
              <div className="w-full relative h-full flex items-center min-w-0">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-1 items-center justify-between gap-1.5 w-full min-w-0"
                  >
                    <div className="flex items-center gap-1.5 min-w-0 truncate">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 ${tickers[index].color}`}>
                        {tickers[index].network === 'AirtelTigo' ? 'AT' : tickers[index].network}
                      </span>
                      <span className="font-semibold text-slate-900 tracking-tight text-[11px] min-[375px]:text-xs whitespace-nowrap truncate">
                        {tickers[index].phone}
                      </span>
                    </div>
                    <div className="flex items-center shrink-0">
                      <span className="text-slate-300 mx-1 hidden min-[375px]:inline">•</span>
                      <span className="text-slate-700 font-bold text-[11px] min-[375px]:text-xs whitespace-nowrap shrink-0">
                        {tickers[index].bundle}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              // Desktop View: Smooth Infinite CSS Marquee
              <>
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />
                
                <div className="flex items-center gap-12 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
                  {marqueeItems.map((tx, idx) => (
                    <div key={`${tx.id}-${idx}`} className="flex items-center gap-3 text-[15px]">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold shadow-sm ${tx.color}`}>
                        {tx.network}
                      </span>
                      <span className="font-bold font-mono text-slate-800 tracking-tight">{tx.phone}</span>
                      <span className="text-slate-500">Purchased <span className="font-bold text-slate-700">{tx.bundle}</span></span>
                      <span className="text-slate-300 mx-1">•</span>
                      <span className="text-slate-400 text-sm font-medium">{tx.time}</span>
                      
                      {tx.isProcessing ? (
                        <span className="flex items-center text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded ml-2 border border-yellow-200">
                          <Clock className="w-3.5 h-3.5 mr-1" /> Processing
                        </span>
                      ) : (
                        <span className="flex items-center text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded ml-2 border border-green-200">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Delivered
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
      
      {/* Required CSS for Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-marquee {
          animation: marquee 400s linear infinite;
        }
      `}} />
    </div>
  );
};
