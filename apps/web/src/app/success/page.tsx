"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2, ArrowRight, Download, Clock, MapPin, ShieldAlert, Check } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");
  
  const [status, setStatus] = useState<"loading" | "success" | "failed" | "offline">("loading");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  // Delivery tracking states
  const [deliveryStatus, setDeliveryStatus] = useState<"processing" | "sending" | "delivered" | "failed">("processing");
  const [showConfetti, setShowConfetti] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const verifyPayment = async () => {
    if (!reference) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/payments/paystack/verify/${reference}`, {
        cache: 'no-store'
      });
      
      if (!res.ok) {
        if (status === "loading") setStatus("failed");
        return;
      }

      const result = await res.json();
      const data = result.data || result;
      
      if (data && (data.success || data.status === 'success' || data.status === 'COMPLETED')) {
        setStatus("success");
        setOrderDetails(data);
        
        const backendDeliveryStatus = data.deliveryStatus?.toLowerCase() || 'processing';
        
        if (backendDeliveryStatus === 'delivered') {
          setDeliveryStatus("delivered");
          setShowConfetti(true);
          if (pollingRef.current) clearInterval(pollingRef.current);
        } else if (backendDeliveryStatus === 'failed') {
          setDeliveryStatus("failed");
          if (pollingRef.current) clearInterval(pollingRef.current);
        } else if (backendDeliveryStatus === 'sending') {
          setDeliveryStatus("sending");
        } else {
          setDeliveryStatus("processing");
        }
      } else {
        if (status === "loading") setStatus("failed");
      }
    } catch (err) {
      console.error("Verification failed", err);
      if (status === "loading") setStatus("offline");
    }
  };

  useEffect(() => {
    if (!reference) {
      router.push("/");
      return;
    }
    
    // Initial verification
    verifyPayment();
    
    // Start polling every 3 seconds for delivery updates
    pollingRef.current = setInterval(() => {
      verifyPayment();
    }, 3000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [reference, router]);

  // Network Logo Helper
  const getNetworkLogo = (bundleId: string) => {
    const b = bundleId.toLowerCase();
    if (b.includes('mtn')) return '🔴 MTN';
    if (b.includes('telecel')) return '🔴 Telecel';
    if (b.includes('at')) return '🔴 AT';
    return '📶';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-100 font-sans relative overflow-hidden">
      
      {/* Basic CSS Confetti for Celebration */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-start justify-center overflow-hidden">
           {/* Confetti simulation */}
           {Array.from({ length: 50 }).map((_, i) => (
             <motion.div
               key={i}
               initial={{ y: -50, x: Math.random() * window.innerWidth - window.innerWidth/2, opacity: 1, rotate: 0 }}
               animate={{ 
                 y: window.innerHeight + 50, 
                 x: (Math.random() - 0.5) * window.innerWidth,
                 rotate: Math.random() * 360,
                 opacity: [1, 1, 0]
               }}
               transition={{ duration: 2 + Math.random() * 2, ease: "linear" }}
               className="w-3 h-3 absolute rounded-sm"
               style={{ backgroundColor: ['#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 5)] }}
             />
           ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* LOADING STATE */}
        {status === "loading" && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-blue-100 rounded-full animate-pulse" />
              <Loader2 className="w-20 h-20 text-blue-600 animate-spin absolute top-0 left-0" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Verifying Payment...</h1>
            <p className="text-slate-500 font-medium">Communicating securely with Paystack.</p>
          </motion.div>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-1 relative z-10"
          >
            <div className="p-8 pb-6 flex flex-col items-center border-b-2 border-slate-100 border-dashed relative">
              
              <div className="absolute -left-4 bottom-[-16px] w-8 h-8 bg-slate-100 rounded-full shadow-inner" />
              <div className="absolute -right-4 bottom-[-16px] w-8 h-8 bg-slate-100 rounded-full shadow-inner" />

              <motion.div 
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.1, bounce: 0.6 }}
                className="w-24 h-24 bg-gradient-to-tr from-green-400 to-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/30"
              >
                <Check className="w-12 h-12 stroke-[3]" />
              </motion.div>

              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Payment Confirmed</h1>
              
              {/* Dynamic Delivery Status Pill */}
              <motion.div 
                key={deliveryStatus}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 ${
                  deliveryStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                  deliveryStatus === 'failed' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}
              >
                {deliveryStatus === 'processing' && <Loader2 className="w-4 h-4 animate-spin" />}
                {deliveryStatus === 'sending' && <Loader2 className="w-4 h-4 animate-spin" />}
                {deliveryStatus === 'delivered' && <CheckCircle className="w-4 h-4" />}
                {deliveryStatus === 'failed' && <XCircle className="w-4 h-4" />}
                
                {deliveryStatus === 'processing' && "Preparing Bundle..."}
                {deliveryStatus === 'sending' && "Sending to Network..."}
                {deliveryStatus === 'delivered' && "Bundle Delivered!"}
                {deliveryStatus === 'failed' && "Delivery Failed"}
              </motion.div>
            </div>

            <div className="p-8 pt-6">
              
              {/* Receipt Details Grid */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 font-medium">Amount Paid</span>
                  <span className="text-slate-900 text-2xl font-black tracking-tight">GH₵{orderDetails?.amount || '0.00'}</span>
                </div>
                
                <hr className="border-slate-100" />
                
                <div className="space-y-3.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm font-medium">Order Reference</span>
                    <span className="text-slate-900 text-sm font-bold tracking-wide">{reference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm font-medium">Recipient Phone</span>
                    <span className="text-slate-900 text-sm font-bold tracking-wide">{orderDetails?.recipientPhone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm font-medium">Bundle</span>
                    <span className="text-slate-900 text-sm font-bold flex items-center gap-1.5">
                      <span className="text-xs">{getNetworkLogo(orderDetails?.bundleId || '')}</span>
                      {orderDetails?.bundleId?.replace(/-/g, ' ').toUpperCase() || 'DATA BUNDLE'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm font-medium">Payment Method</span>
                    <span className="text-slate-900 text-sm font-bold">Paystack (MoMo / Card)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm font-medium">Delivery</span>
                  </div>
                </div>
                
                {/* Delivery Status Banner */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                  <div className="mt-0.5">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-blue-900 text-sm font-bold">Estimated Delivery</h4>
                    <p className="text-blue-700/80 text-xs mt-1 font-medium leading-relaxed">
                      {deliveryStatus === 'processing' ? 'Processing...' : deliveryStatus === 'sending' ? 'In Progress' : deliveryStatus === 'delivered' ? 'Delivered' : 'Failed'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href={`/track?ref=${reference}`} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-4 rounded-[1rem] transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20">
                  <MapPin className="w-5 h-5" />
                  Track Order
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/" className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-[1rem] transition-all flex items-center justify-center gap-2 text-sm">
                    Return Home
                  </Link>
                  <button onClick={() => alert('Downloading PDF...')} className="w-full border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3.5 rounded-[1rem] transition-all flex items-center justify-center gap-2 text-sm bg-white">
                    <Download className="w-4 h-4" />
                    Receipt
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* FAILED STATE */}
        {status === "failed" && (
          <motion.div 
            key="failed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <XCircle className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Payment Verification Failed</h1>
            <p className="text-slate-500 mb-8 font-medium">We could not confirm this transaction. Please ensure your payment went through.</p>
            
            <div className="space-y-3">
              <button 
                onClick={verifyPayment}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg shadow-slate-900/20"
              >
                Retry Verification
              </button>
              <Link href="/contact" className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-4 rounded-xl transition-colors block">
                Contact Support
              </Link>
            </div>
          </motion.div>
        )}

        {/* OFFLINE / ERROR STATE */}
        {status === "offline" && (
          <motion.div 
            key="offline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Connection Error</h1>
            <p className="text-slate-500 mb-8 font-medium">We couldn't reach the server to verify your transaction. Your money is safe.</p>
            
            <div className="space-y-3">
              <button 
                onClick={verifyPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg shadow-blue-600/20"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-100"><Loader2 className="w-12 h-12 text-blue-600 animate-spin" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
