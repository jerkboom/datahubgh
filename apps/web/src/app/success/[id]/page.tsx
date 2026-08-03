"use client";

import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockOrder } from "@/lib/mock-data";

export default function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  // In a real app, fetch order details using id

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border h-16 flex items-center justify-center">
        <a href="/" className="font-bold text-xl text-primary">DataHubGH</a>
      </nav>

      <section className="flex-1 flex flex-col items-center p-4 max-w-md mx-auto w-full pt-12">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-center">Payment Successful!</h1>
        <p className="text-muted-foreground text-center mb-8">
          Your {mockOrder.product} is being delivered to <br/>
          <span className="font-semibold text-foreground">{mockOrder.recipientPhone}</span>.
        </p>

        <Card className="w-full rounded-2xl border-border shadow-sm overflow-hidden mb-8">
          <div className="bg-muted p-4 border-b border-border flex justify-between items-center">
            <span className="text-sm font-medium">Receipt</span>
            <span className="font-mono text-xs text-muted-foreground">{mockOrder.reference}</span>
          </div>
          <CardContent className="p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Amount Paid</span>
              <span className="font-bold text-lg">GHS {mockOrder.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Date</span>
              <span className="font-medium text-sm">{new Date().toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Optional Account Creation Upsell */}
        <div className="w-full bg-primary/5 rounded-2xl p-6 border border-primary/20 mb-8 text-center">
          <h3 className="font-semibold mb-2">Want to save this number?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create a free account to track your purchases and checkout faster next time.
          </p>
          <Button className="w-full h-12 rounded-xl" variant="outline">
            Create Free Account
          </Button>
        </div>

        <Button onClick={() => window.location.href = "/"} className="w-full h-14 rounded-xl text-lg font-semibold" variant="default">
          Buy Another Bundle <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </section>
    </main>
  );
}
