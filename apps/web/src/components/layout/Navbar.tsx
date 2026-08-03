"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/signin");
  };

  const handleHowItWorksClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Bundles", href: "/networks" },
    { name: "Track Order", href: "/track" },
    { name: "FAQ", href: "/faq" },
    { name: "Become a Seller", href: "/seller" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80 z-[101]">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">DataHubGH</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/networks" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
              Products
            </Link>
            <Link 
              href="/#how-it-works" 
              onClick={handleHowItWorksClick}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              How it Works
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/track" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Track Order
            </Link>

            {user ? (
              <div className="relative hidden sm:block">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-sm font-bold bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  {user.name?.split(' ')[0]}
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-slate-100 mb-2">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">My Orders</Link>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">Profile</Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button asChild variant="outline" className="hidden sm:flex rounded-full shadow-sm hover:shadow-md transition-all px-6 border-slate-200">
                <Link href="/signin">Sign In</Link>
              </Button>
            )}

            <Button asChild className="rounded-full shadow-sm hover:shadow-md transition-all px-6 hidden sm:flex">
              <Link href="/networks">
                Buy Data
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden z-[101] relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop for clicking outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-16 left-0 right-0 bg-background border-b border-border shadow-xl z-[95] md:hidden overflow-y-auto max-h-[calc(100vh-4rem)]"
            >
              <div className="flex flex-col p-6 space-y-6">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-lg font-bold transition-colors ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                <hr className="border-border" />

                <div className="flex flex-col space-y-3 pt-2">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                      <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 font-bold text-slate-700 hover:text-blue-600 bg-slate-50 rounded-xl">My Orders</Link>
                      <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 font-bold text-slate-700 hover:text-blue-600 bg-slate-50 rounded-xl">Profile</Link>
                      <button onClick={handleLogout} className="text-left px-4 py-3 font-bold text-red-600 hover:bg-red-50 rounded-xl">Logout</button>
                    </>
                  ) : (
                    <Button variant="outline" className="w-full justify-start text-base h-12 rounded-xl font-bold border-slate-200" onClick={() => { router.push('/signin'); setIsMenuOpen(false); }}>
                      Sign In
                    </Button>
                  )}
                  <Button className="w-full justify-start text-base h-12 rounded-xl font-bold gap-2" onClick={() => { router.push('/networks'); setIsMenuOpen(false); }}>
                    Buy Data <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
