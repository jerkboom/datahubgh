import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <span className="font-bold text-xl tracking-tight text-foreground mb-4 block">DataHubGH</span>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Fast, secure, and affordable mobile data bundles and airtime across all networks in Ghana.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/networks/mtn" className="hover:text-primary transition-colors">MTN Data</Link></li>
              <li><Link href="/networks/telecel" className="hover:text-primary transition-colors">Telecel Data</Link></li>
              <li><Link href="/networks/airteltigo" className="hover:text-primary transition-colors">AirtelTigo Data</Link></li>
              <li><Link href="/networks" className="hover:text-primary transition-colors">WAEC Checker</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/track" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/seller" className="hover:text-primary transition-colors">Become a Seller</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DataHubGH. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded-md">Fully Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
