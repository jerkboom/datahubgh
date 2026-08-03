import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | DataHubGH",
  description: "Need help with your DataHubGH order? Contact our 24/7 support team via WhatsApp, email, or phone. We are here to help.",
  openGraph: {
    title: "Contact Support | DataHubGH",
    description: "Get instant support for your data bundle purchases.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
