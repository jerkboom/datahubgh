"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Zap, ShieldCheck, CheckCircle2, Clock, X, Info } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/api";
import { mockNetworks, mockBundles, Bundle } from "@/lib/mock-data";

const checkoutSchema = z.object({
  recipientPhone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit number"),
  confirmPhone: z.string().regex(/^[0-9]{10}$/, "Please confirm your 10-digit number"),
  customerName: z.string().optional(),
  promoCode: z.string().optional(),
}).refine(data => data.recipientPhone === data.confirmPhone, {
  message: "Phone numbers do not match",
  path: ["confirmPhone"],
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function BundleSelectionAndCheckout({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const router = useRouter();
  const network = mockNetworks.find((n) => n.slug === slug);
  const bundles = mockBundles.filter((b) => b.network === network?.name);

  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<"standard" | "instant">("instant");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrePayModalOpen, setIsPrePayModalOpen] = useState(false);
  const [checkoutFormData, setCheckoutFormData] = useState<CheckoutForm | null>(null);
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [canConfirmPayment, setCanConfirmPayment] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isDirty } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  const recipientPhone = watch("recipientPhone");

  // Handle ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isPrePayModalOpen) {
          setIsPrePayModalOpen(false);
        } else if (isModalOpen) {
          handleCloseModal();
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen, isPrePayModalOpen, isDirty]);

  // Tap-through delay safety hook
  useEffect(() => {
    if (isPrePayModalOpen) {
      setCanConfirmPayment(false);
      const timer = setTimeout(() => {
        setCanConfirmPayment(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPrePayModalOpen]);

  if (!network) {
    return <div className="p-8 text-center">Network not found.</div>;
  }

  const handleCloseModal = () => {
    if (isDirty) {
      if (window.confirm("You have unsaved changes. Are you sure you want to close?")) {
        setIsModalOpen(false);
      }
    } else {
      setIsModalOpen(false);
    }
  };

  const onSubmit = async (data: CheckoutForm) => {
    if (!selectedBundle) return;
    setIsModalOpen(false);
    setIsInitLoading(true);
    setCheckoutFormData(data);
    
    setTimeout(() => {
      setIsInitLoading(false);
      setIsPrePayModalOpen(true);
    }, 500);
  };

  const proceedToPayment = async (data: CheckoutForm | null) => {
    if (!selectedBundle || !data || isProcessing) return;
    setIsPrePayModalOpen(false);
    setIsProcessing(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/payments/paystack/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientPhone: data.recipientPhone,
          customerName: data.customerName,
          promoCode: data.promoCode,
          bundleId: selectedBundle.id,
          networkId: network.slug,
          deliveryMode: deliveryMode,
          amount: currentPrice(selectedBundle),
          currency: "GHS"
        })
      });

      const result = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        alert(result.message || "Failed to initialize payment.");
        setIsProcessing(false);
        return;
      }

      const accessCode = result?.data?.accessCode || result?.accessCode;
      const publicKey = result?.data?.publicKey || result?.publicKey;
      const email = result?.data?.email || result?.email;
      const reference = result?.data?.reference || result?.reference;
      const checkoutUrl = result?.data?.authorizationUrl || result?.authorizationUrl || result?.checkout_url;

      if (accessCode && publicKey && (window as any).PaystackPop) {
        const handler = (window as any).PaystackPop.setup({
          key: publicKey,
          email: email,
          amount: Math.round(currentPrice(selectedBundle) * 100),
          ref: reference,
          currency: "GHS",
          channels: ["mobile_money"],
          access_code: accessCode,
          callback: (transaction: any) => {
            window.location.href = `/success?trxref=${reference || transaction.reference}&reference=${reference || transaction.reference}`;
          },
          onClose: () => {
            setIsProcessing(false);
          }
        });
        handler.openIframe();
      } else if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert("Payment gateway did not return a valid checkout configuration.");
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "A network error occurred while reaching the backend.");
      setIsProcessing(false);
    }
  };


  const currentPrice = (bundle: Bundle) => deliveryMode === "instant" ? bundle.instantPrice : bundle.standardPrice;
  const serviceFee = 0.00; // Free

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-card border-b border-border pt-8 pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Link href="/networks" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors focus:ring-2 focus:ring-primary rounded-md outline-none">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Networks
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${network.color}`}>
                  {network.logo}
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {network.name} Bundles
                </h1>
              </div>
              
              {/* Delivery Mode Toggle */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center bg-muted p-1 rounded-xl shadow-inner w-[300px]">
                  <button 
                    onClick={() => setDeliveryMode("standard")}
                    className={`flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all ${deliveryMode === "standard" ? "bg-white shadow-sm" : "hover:bg-black/5"}`}
                  >
                    <span className={`text-sm font-bold flex items-center ${deliveryMode === "standard" ? "text-foreground" : "text-muted-foreground"}`}>
                      <Clock className="w-4 h-4 mr-1.5" /> Standard
                    </span>
                  </button>
                  <button 
                    onClick={() => setDeliveryMode("instant")}
                    className={`flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all ${deliveryMode === "instant" ? "bg-white shadow-sm" : "hover:bg-black/5"}`}
                  >
                    <span className={`text-sm font-bold flex items-center ${deliveryMode === "instant" ? "text-foreground" : "text-muted-foreground"}`}>
                      <Zap className="w-4 h-4 mr-1.5 text-orange-500" /> Instant
                    </span>
                  </button>
                </div>
                <p className="text-[11px] font-medium text-muted-foreground bg-accent/30 px-3 py-1 rounded-full border border-border">
                  {deliveryMode === "instant" ? "⚡ Priority credit (10 to 15 mins)" : "🕒 Standard processing (10 to 40 mins)"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6">
          {/* Bundle Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {bundles.length > 0 ? (
              bundles.map((bundle) => {
                const isSelected = selectedBundle?.id === bundle.id;
                return (
                  <button
                    key={bundle.id}
                    onClick={() => {
                      setSelectedBundle(bundle);
                      setIsModalOpen(true);
                    }}
                    className={`relative flex flex-col p-5 rounded-2xl border-2 text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary group ${
                      isSelected 
                        ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                        : "border-border bg-card hover:border-primary/40 hover:bg-muted/50 hover:-translate-y-1 hover:shadow-lg"
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Select ${bundle.size} bundle for GH₵${currentPrice(bundle).toFixed(2)}`}
                  >
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </motion.div>
                    )}
                    {bundle.isPopular && (
                      <span className="absolute -top-3 left-5 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                        Best Value
                      </span>
                    )}
                    
                    <div className="flex-1 w-full pt-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-black text-foreground tracking-tight">{bundle.size}</span>
                        {!isSelected && (
                          <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-widest bg-muted rounded-md px-2 py-1 border border-border">
                            {bundle.category || "DATA"}
                          </span>
                        )}
                      </div>
                      <div className="text-3xl font-extrabold text-foreground mb-1 tracking-tighter">
                        <span className="text-lg font-bold text-muted-foreground mr-1">GH₵</span>
                        {currentPrice(bundle).toFixed(2)}
                      </div>
                      <div className="text-xs font-semibold text-muted-foreground mb-5">
                        Valid for {bundle.validity}
                      </div>
                    </div>

                    <div className="w-full mt-auto pt-2">
                      <div
                        className={`w-full h-11 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-blue-600/10 text-blue-700 group-hover:bg-blue-600 group-hover:text-white"
                        }`}
                      >
                        Buy Now
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center bg-card border border-border rounded-3xl shadow-sm">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No bundles available</h3>
                <p className="text-muted-foreground mb-6">Please try another network.</p>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/networks">Back to Networks</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isModalOpen && selectedBundle && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={handleCloseModal}
              aria-hidden="true"
            />
            
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full sm:w-[600px] max-h-[90vh] overflow-y-auto bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl pointer-events-auto flex flex-col"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-card/95 backdrop-blur z-10 border-b border-border p-5 flex justify-between items-start">
                  <div className="flex gap-4 items-start">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${network.color}`}>
                      {network.logo}
                    </div>
                    <div>
                      <h2 id="modal-title" className="text-xl font-bold text-foreground flex items-center gap-2">
                        {network.name} {selectedBundle.size}
                      </h2>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                        {selectedBundle.category} • {selectedBundle.validity}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Left: Form */}
                  <form id="modal-checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-foreground">
                        Recipient Phone *
                      </label>
                      <Input 
                        type="tel" 
                        placeholder="e.g. 024XXXXXXX" 
                        className={`h-12 rounded-xl transition-shadow ${errors.recipientPhone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        {...register("recipientPhone")}
                        autoFocus
                      />
                      {errors.recipientPhone && (
                        <p className="text-xs text-destructive mt-1.5">{errors.recipientPhone.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-foreground">
                        Confirm Phone *
                      </label>
                      <Input 
                        type="tel" 
                        placeholder="e.g. 024XXXXXXX" 
                        className={`h-12 rounded-xl transition-shadow ${errors.confirmPhone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        {...register("confirmPhone")}
                      />
                      {errors.confirmPhone && (
                        <p className="text-xs text-destructive mt-1.5">{errors.confirmPhone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-2 block text-muted-foreground">
                        Customer Name (Optional)
                      </label>
                      <Input 
                        type="text" 
                        placeholder="John Doe" 
                        className="h-12 rounded-xl"
                        {...register("customerName")}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-2 block text-muted-foreground">
                        Promo Code (Optional)
                      </label>
                      <Input 
                        type="text" 
                        placeholder="SUMMER24" 
                        className="h-12 rounded-xl uppercase"
                        {...register("promoCode")}
                      />
                    </div>
                  </form>

                  {/* Right: Summary */}
                  <div className="bg-muted/30 rounded-2xl p-5 border border-border h-fit">
                    <h3 className="font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Order Summary</h3>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bundle</span>
                        <span className="font-semibold">{selectedBundle.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Network</span>
                        <span className="font-semibold">{network.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Validity</span>
                        <span className="font-semibold">{selectedBundle.validity}</span>
                      </div>
                      <div className="flex justify-between border-b border-border pb-3">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className={`font-semibold flex items-center ${deliveryMode === "instant" ? "text-orange-600" : "text-slate-700"}`}>
                          {deliveryMode === "instant" ? <Zap className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                          {deliveryMode === "instant" ? "Priority" : "Standard"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between pt-1">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">GH₵{currentPrice(selectedBundle).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service Fee</span>
                        <span className="font-medium text-green-600">Free</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 mt-3 border-t border-border">
                        <span className="font-bold text-foreground">Total</span>
                        <span className="text-2xl font-extrabold text-foreground">
                          GH₵{(currentPrice(selectedBundle) + serviceFee).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-5 sm:p-6 border-t border-border bg-card">
                  <Button 
                    type="submit" 
                    form="modal-checkout-form"
                    disabled={isProcessing}
                    className="w-full h-14 text-lg font-bold rounded-xl shadow-md hover:shadow-lg transition-all relative overflow-hidden group"
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Initializing Payment...
                      </span>
                    ) : (
                      <>
                        Pay with Mobile Money
                        <div className="absolute inset-0 h-full w-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      </>
                    )}
                  </Button>
                  {isProcessing && (
                    <p className="text-[11px] text-muted-foreground text-center mt-3 animate-pulse leading-normal">
                      🔒 Securing payment. You will receive an OTP or USSD prompt on your phone. Please keep this window open until completed.
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Pre-Payment Information Modal */}
      <AnimatePresence>
        {isPrePayModalOpen && checkoutFormData && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsPrePayModalOpen(false)}
              aria-hidden="true"
            />
            
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="w-full max-w-[420px] bg-card rounded-2xl shadow-2xl pointer-events-auto flex flex-col border border-border overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby="prepay-modal-title"
              >
                {/* Header */}
                <div className="p-5 border-b border-border flex items-center gap-3 bg-muted/20">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${network.color}`}>
                    {network.logo}
                  </div>
                  <div>
                    <h2 id="prepay-modal-title" className="text-base font-bold text-foreground">
                      Before You Continue
                    </h2>
                    <p className="text-[11px] text-muted-foreground">Advisory for {network.name} customers</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4 text-sm leading-relaxed">
                   {/* MTN Specific content */}
                  {network.slug === "mtn" && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-bold text-foreground text-xs uppercase tracking-wider">MTN Mobile Money</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Your payment prompt usually arrives within a few seconds.
                      </p>
                      <div className="text-xs font-bold text-foreground pt-1">If your payment prompt or OTP is delayed:</div>
                      <ul className="space-y-2.5 text-xs text-muted-foreground">
                        <li className="flex items-start gap-2 leading-relaxed">
                          <span className="text-green-500 font-bold select-none mt-0.5">✓</span>
                          <span>Wait <strong className="text-foreground whitespace-nowrap">30–60 seconds</strong>.</span>
                        </li>
                        <li className="flex items-start gap-2 leading-relaxed">
                          <span className="text-green-500 font-bold select-none mt-0.5">✓</span>
                          <span>Tap <strong className="text-foreground">Resend</strong> on the Paystack checkout.</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Telecel Specific content */}
                  {network.slug === "telecel" && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-bold text-foreground text-xs uppercase tracking-wider">Telecel Cash</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Some Telecel customers may experience temporary delays receiving their payment OTP.
                      </p>
                      <div className="text-xs font-bold text-foreground pt-1">If your payment prompt or OTP is delayed:</div>
                      <ul className="space-y-2.5 text-xs text-muted-foreground">
                        <li className="flex items-start gap-2 leading-relaxed">
                          <span className="text-green-500 font-bold select-none mt-0.5">✓</span>
                          <span>Wait <strong className="text-foreground whitespace-nowrap">30–60 seconds</strong>.</span>
                        </li>
                        <li className="flex items-start gap-2 leading-relaxed">
                          <span className="text-green-500 font-bold select-none mt-0.5">✓</span>
                          <span>Tap <strong className="text-foreground">Resend</strong> on the Paystack checkout.</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* AirtelTigo Specific content */}
                  {network.slug === "airteltigo" && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        <span className="font-bold text-foreground text-xs uppercase tracking-wider">AirtelTigo Money</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Some AirtelTigo customers may experience temporary delays receiving their payment OTP.
                      </p>
                      <div className="text-xs font-bold text-foreground pt-1">If your payment prompt or OTP is delayed:</div>
                      <ul className="space-y-2.5 text-xs text-muted-foreground">
                        <li className="flex items-start gap-2 leading-relaxed">
                          <span className="text-green-500 font-bold select-none mt-0.5">✓</span>
                          <span>Wait <strong className="text-foreground whitespace-nowrap">30–60 seconds</strong>.</span>
                        </li>
                        <li className="flex items-start gap-2 leading-relaxed">
                          <span className="text-green-500 font-bold select-none mt-0.5">✓</span>
                          <span>Tap <strong className="text-foreground">Resend</strong> on the Paystack checkout.</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Footer note */}
                  <div className="pt-3.5 border-t border-border/60 text-center">
                    <p className="text-[10px] text-muted-foreground leading-normal flex items-center justify-center gap-1 font-semibold">
                      🔒 Secure payments powered by Paystack
                    </p>
                    <p className="text-[9px] text-muted-foreground/80 mt-1 leading-relaxed italic">
                      Your Mobile Money PIN and payment credentials are never stored by DataHubGH.
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 border-t border-border bg-muted/10 flex flex-col gap-2">
                  <Button 
                    disabled={!canConfirmPayment || isProcessing}
                    onClick={() => {
                      if (canConfirmPayment && !isProcessing) {
                        proceedToPayment(checkoutFormData);
                      }
                    }}
                    className="w-full h-12 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-60"
                  >
                    Continue to Secure Checkout
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsPrePayModalOpen(false)}
                    className="w-full h-10 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Full-screen initial loader overlay */}
      <AnimatePresence>
        {isInitLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4"
          >
            <div className="flex flex-col items-center gap-4">
              <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <div className="text-center">
                <h3 className="font-bold text-foreground">Securing Checkout...</h3>
                <p className="text-xs text-muted-foreground mt-1">Preparing your network payment channel</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
