import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "DataHubGH - Premium Data Bundle Platform",
    template: "%s | DataHubGH",
  },
  description: "Purchase MTN, Telecel, AirtelTigo Data, Airtime, BigTime, iShare, WAEC Checker and more digital products.",
  keywords: ["DataHubGH", "Ghana", "Data Bundles", "MTN Data", "Airtime", "Telecel Data", "WAEC Checker"],
  authors: [{ name: "DataHubGH Team" }],
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://datahubgh.com",
    siteName: "DataHubGH",
    title: "DataHubGH - Premium Data Bundle Platform",
    description: "Purchase MTN, Telecel, AirtelTigo Data, Airtime, BigTime, iShare, WAEC Checker and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DataHubGH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataHubGH - Premium Data Bundle Platform",
    description: "Purchase MTN, Telecel, AirtelTigo Data, Airtime, BigTime, iShare, WAEC Checker and more.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("h-full", "antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        {/* Providers will go here */}
        {children}
      </body>
    </html>
  );
}
