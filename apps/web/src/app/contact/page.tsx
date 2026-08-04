"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, Mail, Phone, Clock, ChevronDown, CheckCircle2, 
  Send, ShieldCheck, Zap, PhoneCall
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be valid"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    mode: "onChange"
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const FAQS = [
    { q: "How long does delivery take?", a: "Delivery is instant. Once payment is verified via Mobile Money, the data bundle is credited to your recipient in less than 60 seconds." },
    { q: "How do I track my order?", a: "You can use the 'Track Order' link in the navigation menu. Simply enter your order reference or recipient phone number to view live status." },
    { q: "What happens if payment succeeds but data isn't delivered?", a: "Our system automatically detects failed deliveries. If data cannot be delivered due to telco downtime, your money is automatically refunded within 24 hours." },
    { q: "Can I buy for another number?", a: "Yes! You can enter any valid MTN, Telecel, or AirtelTigo number during checkout, and the bundle will be sent directly to them." },
    { q: "How do refunds work?", a: "Refunds are processed automatically to the Mobile Money wallet used for the original transaction. No manual follow-up is needed." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* HERO SECTION */}
        <section className="bg-slate-900 pt-20 pb-32 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900" />
          
          {/* Animated Blobs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Need help with your order or have a question? Our support team is available 24/7 to assist you.
            </motion.p>
          </div>
        </section>

        {/* SUPPORT OPTIONS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageCircle, title: "WhatsApp", desc: "Fastest response time", info: "+233 24 000 0000", color: "text-green-600 bg-green-50" },
              { icon: Mail, title: "Email Support", desc: "For detailed inquiries", info: "support@datahubgh.com", color: "text-blue-600 bg-blue-50" },
              { icon: Phone, title: "Phone Support", desc: "Speak with an agent", info: "+233 30 200 0000", color: "text-purple-600 bg-purple-50" },
              { icon: Clock, title: "Working Hours", desc: "We are always online", info: "24/7 Availability", color: "text-orange-600 bg-orange-50" }
            ].map((opt, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all text-center group cursor-pointer"
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 ${opt.color} group-hover:scale-110 transition-transform`}>
                  <opt.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{opt.title}</h3>
                <p className="text-sm text-slate-500 mb-3">{opt.desc}</p>
                <p className="font-semibold text-slate-800">{opt.info}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT (Form + FAQ) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* CONTACT FORM */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100"
            >
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Send us a message</h2>
              <p className="text-slate-500 mb-8">Fill out the form below and we'll get back to you shortly.</p>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h3>
                  <p className="text-green-700">Thank you for reaching out. Our support team will reply via SMS or Email shortly.</p>
                  <Button 
                    className="mt-6" 
                    variant="outline" 
                    onClick={() => setIsSuccess(false)}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                      <input 
                        {...register("name")}
                        className={`w-full h-12 px-4 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-slate-50`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                      <input 
                        {...register("phone")}
                        className={`w-full h-12 px-4 rounded-xl border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-slate-50`}
                        placeholder="024 XXX XXXX"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input 
                      {...register("email")}
                      type="email"
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all bg-slate-50"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                    <input 
                      {...register("subject")}
                      className={`w-full h-12 px-4 rounded-xl border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-slate-50`}
                      placeholder="Order not received"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                    <textarea 
                      {...register("message")}
                      rows={4}
                      className={`w-full p-4 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-slate-50 resize-none`}
                      placeholder="Please describe your issue in detail..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold rounded-xl bg-blue-700 hover:bg-blue-800 text-white shadow-lg transition-all flex items-center justify-center"
                    disabled={isSubmitting || !isValid}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Send Message <Send className="w-5 h-5 ml-2" /></>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* RIGHT COLUMN (WhatsApp & FAQ) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-8"
            >
              {/* WhatsApp CTA */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 scale-150 translate-x-8 translate-y-8">
                  <MessageCircle className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-extrabold mb-2">Need an instant reply?</h3>
                  <p className="text-green-50 mb-6">Chat with our support team directly on WhatsApp for real-time assistance.</p>
                  <Button asChild size="lg" className="w-full sm:w-auto bg-white text-green-700 hover:bg-green-50 font-bold h-14 px-8 rounded-xl">
                    <a href="https://wa.me/233245726892" target="_blank" rel="noreferrer">
                      Chat on WhatsApp <MessageCircle className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-extrabold text-slate-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50">
                      <button 
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none"
                      >
                        <span className="font-bold text-slate-800 text-sm">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 pt-0 text-slate-600 text-sm leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">Company</h4>
                  <p className="text-sm text-slate-500">DataHubGH Tech Ltd.</p>
                  <p className="text-sm text-slate-500 mt-2">Accra, Ghana</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-3">Connect</h4>
                  <div className="flex gap-3">
                    <a href="#" className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z"/></svg>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-200 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* TRUST SECTION */}
        <section className="bg-slate-50 border-y border-slate-200 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Instant Delivery</h3>
              <p className="text-slate-500 text-sm mt-2">Automated system credits bundles in seconds.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Secure Payments</h3>
              <p className="text-slate-500 text-sm mt-2">Bank-grade encryption for all MoMo transactions.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <PhoneCall className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">24/7 Support</h3>
              <p className="text-slate-500 text-sm mt-2">Round the clock human assistance via WhatsApp.</p>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Still need help?</h2>
            <p className="text-slate-600 mb-8">Our support team typically responds within minutes. You can also track an existing order without contacting support.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-lg">
                <Link href="/networks">Buy Data</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-xl border-slate-200 text-slate-700 font-bold">
                <Link href="/track">Track Order</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
