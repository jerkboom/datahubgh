"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How long does delivery take?", a: "Most data bundles are delivered within 10–60 seconds after successful payment. In rare cases, network delays may take a few minutes." },
  { q: "Which networks are supported?", a: "We support MTN Ghana, Telecel Ghana, and AirtelTigo Ghana." },
  { q: "Is payment secure?", a: "Yes. All payments are securely processed through Paystack using encrypted transactions." },
  { q: "Can I buy for someone else?", a: "Yes. Simply enter the recipient's phone number during checkout." },
  { q: "What happens if my bundle is delayed?", a: "Your order will continue processing automatically. If it exceeds the expected time, contact support with your order reference." },
  { q: "Can I track my order?", a: "Yes. Use the Track Order page and enter your order reference or recipient phone number." },
  { q: "Are there any hidden charges?", a: "No. The amount shown during checkout is exactly what you pay." },
  { q: "Can I become a reseller?", a: "Yes. Visit the Become a Seller page to apply." },
];

export const FAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-shadow hover:shadow-md">
            <button 
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
              aria-expanded={openFaq === i}
            >
              <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
              <motion.div
                animate={{ rotate: openFaq === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {openFaq === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-0 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
