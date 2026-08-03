import React from "react";
import Link from "next/link";
import { ArrowRight, Wifi } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockNetworks, mockBundles } from "@/lib/mock-data";

export const metadata = {
  title: "Select Network | DataHubGH",
};

export default function NetworkSelectionPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-12 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Select Your Network
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose a provider to view available data bundles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockNetworks.map((network) => {
              const bundleCount = mockBundles.filter(b => b.network === network.name).length;
              return (
                <Link key={network.id} href={`/networks/${network.slug}`}>
                  <div className="group relative bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 ease-in-out hover:-translate-y-1 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${network.color}`}>
                        {network.logo}
                      </div>
                      <ArrowRight className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-foreground mb-2">{network.name}</h2>
                    <p className="text-sm text-muted-foreground mb-6 flex-grow">
                      Fast and reliable data bundles starting from just GH₵5.
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground bg-muted w-max px-3 py-1.5 rounded-lg">
                      <Wifi className="w-4 h-4 text-primary" />
                      {bundleCount} bundles available
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
