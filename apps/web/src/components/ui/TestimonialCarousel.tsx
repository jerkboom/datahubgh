"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Zap } from "lucide-react";
import { Button } from "./button";
import { mockBundles } from "@/lib/mock-data";

// Configuration Data
const NETWORKS: Record<string, { name: string; prefixes: string[]; color: string; dot: string }> = {
  MTN: { name: "MTN", prefixes: ["024", "025", "053", "054", "055", "059"], color: "bg-yellow-100 text-yellow-800", dot: "🟡" },
  TELECEL: { name: "Telecel", prefixes: ["020", "050"], color: "bg-red-100 text-red-800", dot: "🔴" },
  AIRTELTIGO: { name: "AirtelTigo", prefixes: ["026", "027", "056", "057"], color: "bg-blue-100 text-blue-800", dot: "🔵" },
};

const BUNDLES = Array.from(new Set(mockBundles.map(b => b.size)));
const TIMES = ["Just now", "15 minutes ago", "1 hour ago", "3 hours ago", "Yesterday", "2 days ago", "3 days ago", "Last week"];
const REVIEWS = [
  "I received my data in less than 20 seconds. Very reliable service.",
  "I've been buying every week. Never had a failed transaction.",
  "The checkout is very simple. Much better than dialing long USSD codes.",
  "Fastest data delivery service I have ever used in Ghana. Highly recommend!",
  "Very transparent pricing and extremely secure payments. 5 solid stars.",
  "I always use this for emergency night browsing. The delivery is instant.",
  "Customer support is very responsive. Great platform overall.",
  "Saves me so much time. I just bookmarked it on my phone home screen.",
  "Flawless experience. The mobile money prompt arrived instantly.",
  "I love the live order summary and tracking. Very modern interface.",
  "Best data bundle site in Ghana right now without a doubt.",
  "Super easy to use. I buy for my parents and siblings all the time.",
  "No hidden fees, no delays. Exactly what a modern service should be.",
  "Perfect for remote work. When my WiFi goes down, I buy data here.",
  "The UI is incredibly smooth and works perfectly on my phone.",
];

type Testimonial = {
  id: string;
  phone: string;
  review: string;
  product: string;
  network: string;
  color: string;
  dot: string;
  date: string;
  deliverySpeed: number;
};

// Generate 50 mock testimonials dynamically
const generateTestimonials = (): Testimonial[] => {
  const testimonials: Testimonial[] = [];
  const networkKeys = Object.keys(NETWORKS);
  
  for (let i = 0; i < 50; i++) {
    const netKey = networkKeys[Math.floor(Math.random() * networkKeys.length)];
    const network = NETWORKS[netKey];
    const prefix = network.prefixes[Math.floor(Math.random() * network.prefixes.length)];
    const suffix = Math.floor(1000 + Math.random() * 9000);
    const phone = `${prefix} **** ${suffix}`;
    const bundle = BUNDLES[Math.floor(Math.random() * BUNDLES.length)];
    
    testimonials.push({
      id: `review-${i}-${Math.random().toString(36).substr(2, 9)}`,
      phone,
      review: REVIEWS[Math.floor(Math.random() * REVIEWS.length)],
      product: bundle,
      network: network.name,
      color: network.color,
      dot: network.dot,
      date: TIMES[Math.floor(Math.random() * TIMES.length)],
      deliverySpeed: Math.floor(10 + Math.random() * 45), // 10s to 54s
    });
  }
  
  // Shuffle array
  return testimonials.sort(() => 0.5 - Math.random());
};

export const TestimonialCarousel = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Generate on client mount
  useEffect(() => {
    setItems(generateTestimonials());
  }, []);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      (prevIndex + itemsPerPage >= items.length) ? 0 : prevIndex + 1
    );
  }, [items.length, itemsPerPage]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 < 0) ? Math.max(0, items.length - itemsPerPage) : prevIndex - 1
    );
  };

  useEffect(() => {
    if (isPaused || items.length === 0) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused, items.length]);

  if (items.length === 0) return null;

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);
  
  // Handle wraparound for infinite feel
  if (visibleItems.length < itemsPerPage) {
    visibleItems.push(...items.slice(0, itemsPerPage - visibleItems.length));
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div 
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Trusted by Thousands</h2>
          <p className="text-lg text-slate-600">Real reviews from our verified customers.</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full border-slate-200" onClick={prevSlide}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full border-slate-200" onClick={nextSlide}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden relative min-h-[340px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 absolute inset-0"
          >
            {visibleItems.map((t, idx) => (
              <div key={`${currentIndex}-${idx}`} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>
                
                <p className="text-slate-700 mb-6 italic flex-grow text-sm leading-relaxed">"{t.review}"</p>
                
                <div className="flex items-center gap-4 border-t border-slate-200 pt-5 mt-auto">
                  {/* Network Initial Avatar */}
                  <div className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center font-bold text-lg ${t.color}`}>
                    {t.network[0]}
                  </div>
                  
                  <div className="overflow-hidden">
                    <h4 className="font-bold font-mono text-slate-900 text-sm truncate flex items-center gap-1 tracking-tight">
                      {t.phone}
                    </h4>
                    <p className="text-xs text-green-600 font-medium truncate flex items-center mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Purchase • {t.date}
                    </p>
                    <p className="text-[11px] font-bold mt-1.5 text-slate-500 uppercase tracking-wider truncate flex items-center">
                      <span className="mr-1">{t.dot}</span> {t.network} • {t.product}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs text-slate-400 font-medium">
                  <Zap className="w-3 h-3 text-orange-400 mr-1.5" />
                  Delivered in {t.deliverySpeed} seconds
                </div>

              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Controls */}
      <div className="flex sm:hidden justify-center items-center gap-4 mt-8">
        <Button variant="outline" size="icon" className="rounded-full border-slate-200 h-10 w-10" onClick={prevSlide}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-1.5">
          {items.slice(0, 10).map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-4 bg-blue-600' : 'w-1.5 bg-slate-200'}`} />
          ))}
        </div>
        <Button variant="outline" size="icon" className="rounded-full border-slate-200 h-10 w-10" onClick={nextSlide}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
