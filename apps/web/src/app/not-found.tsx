import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <div className="text-[10rem] font-black text-slate-200 leading-none mb-4 select-none">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Page not found
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-blue-700 hover:bg-blue-800 font-bold">
            <Link href="/">
              Return Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-2xl border-slate-200 font-semibold">
            <Link href="/track">
              <Search className="w-4 h-4 mr-2" /> Track Order
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
