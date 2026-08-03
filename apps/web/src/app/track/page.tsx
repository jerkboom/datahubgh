"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  CheckCircle, XCircle, Loader2, ArrowRight, Download, 
  MapPin, Clock, Smartphone, CreditCard, ReceiptText,
  Search, AlertCircle, Copy, Home, LifeBuoy
} from "lucide-react";
import { API_URL } from "@/lib/api";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("ref");
  
  const [searchQuery, setSearchQuery] = useState(queryParam || "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "failed" | "not_found">("idle");
  const [order, setOrder] = useState<any>(null);
  
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const fetchOrder = async (query: string, isPolling = false) => {
    if (!query) return;
    if (!isPolling) setStatus("loading");
    
    try {
      const res = await fetch(`${API_URL}/api/v1/orders/track/${query}`, {
        cache: 'no-store'
      });
      
      if (res.status === 404) {
        setStatus("not_found");
        setOrder(null);
        stopPolling();
        return;
      }
      
      if (!res.ok) {
        if (!isPolling) setStatus("failed");
        return;
      }

      const result = await res.json();
      const data = result.data || result;
      
      setStatus("success");
      setOrder(data);
      
      // Stop polling if delivery is completed or failed
      if (data.deliveryStatus === 'DELIVERED' || data.deliveryStatus === 'FAILED') {
        stopPolling();
      }
      
    } catch (err) {
      console.error("Tracking failed", err);
      if (!isPolling) setStatus("failed");
    }
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const startSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    
    router.replace(`/track?ref=${encodeURIComponent(searchQuery.trim())}`);
    stopPolling();
    fetchOrder(searchQuery.trim());
    
    // Start polling every 5s
    pollingRef.current = setInterval(() => {
      fetchOrder(searchQuery.trim(), true);
    }, 5000);
  };

  // Initial load
  useEffect(() => {
    if (queryParam) {
      startSearch();
    }
    return () => stopPolling();
  }, [queryParam]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const getNetworkStyle = (bundleId: string) => {
    const b = (bundleId || "").toLowerCase();
    if (b.includes('mtn')) return { color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200', name: 'MTN' };
    if (b.includes('telecel') || b.includes('vodafone')) return { color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200', name: 'Telecel' };
    if (b.includes('at') || b.includes('airtel')) return { color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200', name: 'AirtelTigo' };
    return { color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', name: 'Network' };
  };

  const getProgressDetails = (deliveryStatus: string) => {
    switch (deliveryStatus) {
      case 'PENDING': return { percent: 20, stage: 1 };
      case 'PROCESSING': return { percent: 40, stage: 2 };
      case 'SENDING': return { percent: 80, stage: 3 };
      case 'DELIVERED': return { percent: 100, stage: 4 };
      case 'FAILED': return { percent: 100, stage: -1, isError: true };
      default: return { percent: 20, stage: 1 };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header Search Bar */}
      <div className="bg-slate-900 pt-16 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Track Your Order</h1>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">Enter your Order Reference, Paystack Transaction ID, or Phone Number to get live delivery updates.</p>
          
          <form onSubmit={startSearch} className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-32 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all backdrop-blur-sm shadow-xl outline-none"
              placeholder="e.g. ORD-12345 or 0501234567"
              required
            />
            <button
              type="submit"
              className="absolute inset-y-2 right-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-xl transition-colors shadow-md"
            >
              Track
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <AnimatePresence mode="wait">
          
          {/* IDLE STATE */}
          {status === "idle" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl p-12 text-center border border-slate-100 flex flex-col items-center">
              <MapPin className="w-16 h-16 text-slate-200 mb-4" />
              <h3 className="text-xl font-bold text-slate-800">Enter your details above</h3>
              <p className="text-slate-500 mt-2">Track any purchase instantly via our direct carrier integration.</p>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {status === "loading" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-3xl shadow-xl p-12 flex flex-col items-center border border-slate-100">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <h3 className="text-xl font-bold text-slate-800">Searching...</h3>
            </motion.div>
          )}

          {/* NOT FOUND STATE */}
          {status === "not_found" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl p-12 text-center border border-slate-100">
              <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Order Not Found</h3>
              <p className="text-slate-500 mt-2 max-w-sm mx-auto">We couldn't find any transaction matching "{searchQuery}". Please check the reference or phone number and try again.</p>
            </motion.div>
          )}

          {/* FAILED STATE */}
          {status === "failed" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl p-12 text-center border border-slate-100">
               <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <XCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Connection Error</h3>
              <p className="text-slate-500 mt-2">There was an error communicating with the tracking server. Please try again.</p>
            </motion.div>
          )}

          {/* SUCCESS STATE */}
          {status === "success" && order && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Timeline & Delivery */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Timeline Card */}
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Delivery Timeline</h2>
                    <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full flex items-center gap-2">
                      {order.deliveryStatus !== 'DELIVERED' && order.deliveryStatus !== 'FAILED' && <Loader2 className="w-3 h-3 animate-spin" />}
                      Live Updates
                    </span>
                  </div>

                  {(() => {
                    const progress = getProgressDetails(order.deliveryStatus);
                    return (
                      <div className="relative pt-2">
                        {/* Progress Bar */}
                        <div className="flex justify-between mb-2">
                          <span className="text-xs font-bold text-slate-400">0%</span>
                          <span className="text-xs font-bold text-blue-600">{progress.percent}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percent}%` }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className={`h-3 rounded-full ${progress.isError ? 'bg-red-500' : 'bg-blue-600'}`}
                          />
                        </div>

                        {/* Timeline Steps */}
                        <div className="space-y-6">
                          
                          <div className="flex gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${progress.stage >= 1 ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-300'}`}>
                              <CheckCircle className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className={`font-bold ${progress.stage >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>Payment Received</h4>
                              <p className="text-sm text-slate-500">Order logged securely.</p>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${progress.stage >= 2 ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-300'}`}>
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className={`font-bold ${progress.stage >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>Preparing Bundle</h4>
                              <p className="text-sm text-slate-500">Authenticating with {getNetworkStyle(order.bundleId).name}.</p>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${progress.stage >= 3 ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-300'}`}>
                              <Smartphone className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className={`font-bold ${progress.stage >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>Sending to Network</h4>
                              <p className="text-sm text-slate-500">Injecting data to {order.recipientPhone}.</p>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              progress.isError ? 'bg-red-100 text-red-600' : 
                              progress.stage >= 4 ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-300'
                            }`}>
                              {progress.isError ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                            </div>
                            <div>
                              <h4 className={`font-bold ${
                                progress.isError ? 'text-red-600' :
                                progress.stage >= 4 ? 'text-green-600' : 'text-slate-400'
                              }`}>
                                {progress.isError ? 'Delivery Failed' : 'Bundle Delivered'}
                              </h4>
                              {progress.isError ? (
                                <p className="text-sm text-red-500 font-medium mt-1">Network rejected the request. <button className="underline">Retry Delivery</button></p>
                              ) : (
                                <p className="text-sm text-slate-500">Your data bundle has been successfully delivered.</p>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Delivery Summary Card */}
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Delivery Details</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Recipient Number</span>
                      <span className="text-slate-900 font-semibold">{order.recipientPhone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Bundle</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${getNetworkStyle(order.bundleId).bg} ${getNetworkStyle(order.bundleId).color}`}>
                          {getNetworkStyle(order.bundleId).name}
                        </span>
                        <span className="text-slate-900 font-semibold">{order.bundleId?.replace(/-/g, ' ').toUpperCase()}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Validity</span>
                      <span className="text-slate-900 font-semibold">{order.validity || 'Non-Expiry'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Delivery Type</span>
                      <span className="text-slate-900 font-semibold">{order.deliveryType || 'Priority'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Estimated Time</span>
                      <span className="text-slate-900 font-semibold">
                        {order.deliveryStatus === 'PROCESSING' ? 'Processing' : order.deliveryStatus === 'SENDING' ? 'In Progress' : order.deliveryStatus === 'DELIVERED' ? 'Delivered' : 'Failed'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Payment & Actions */}
              <div className="space-y-6">
                
                {/* Payment Summary */}
                <div className="bg-slate-900 rounded-3xl shadow-xl p-6 sm:p-8 text-white">
                  <h2 className="text-lg font-bold mb-6 text-white">Payment Summary</h2>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Subtotal</span>
                      <span className="font-medium">GH₵{order.amount?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Service Fee</span>
                      <span className="font-medium text-green-400">Free</span>
                    </div>
                    <hr className="border-slate-700" />
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold text-white">Total Paid</span>
                      <span className="font-bold text-white">GH₵{order.amount?.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div>
                      <span className="text-slate-500 text-xs font-bold uppercase block mb-1">Payment Method</span>
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <CreditCard className="w-4 h-4" /> {order.paymentMethod || 'Mobile Money'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs font-bold uppercase block mb-1">Paystack Reference</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate max-w-[150px]">{order.paymentReference}</span>
                        <button onClick={() => copyToClipboard(order.paymentReference)} className="text-blue-400 hover:text-blue-300">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs font-bold uppercase block mb-1">Order Reference</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate max-w-[150px]">{order.orderReference}</span>
                        <button onClick={() => copyToClipboard(order.orderReference)} className="text-blue-400 hover:text-blue-300">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs font-bold uppercase block mb-1">Purchased At</span>
                      <span className="text-sm font-medium">
                        {order.createdAt ? new Date(order.createdAt).toLocaleString() : new Date().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-3xl shadow-xl p-2 border border-slate-100 flex flex-col gap-2">
                  <button onClick={() => alert('Downloading PDF...')} className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Download Receipt</span>
                      <span className="block text-xs text-slate-500 font-medium">Save as PDF document</span>
                    </div>
                  </button>
                  
                  <Link href="/" className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Buy Another Bundle</span>
                      <span className="block text-xs text-slate-500 font-medium">Top up a different number</span>
                    </div>
                  </Link>

                  <Link href="/contact" className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                      <LifeBuoy className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Contact Support</span>
                      <span className="block text-xs text-slate-500 font-medium">Get help with this order</span>
                    </div>
                  </Link>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-12 h-12 text-blue-600 animate-spin" /></div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
