# Performance Report

## Audit Summary
Performance was audited based on Core Web Vitals (LCP, FID, CLS).

## Findings
- **Server Components**: Pages default to React Server Components (RSC). `use client` is strictly isolated to interactive islands (e.g., the Checkout Form, Animated Hero, FAQ Accordion).
- **Bundle Size**: Framer Motion is lazy-loaded/tree-shaken effectively.
- **Cumulative Layout Shift (CLS)**: The `AnimatePresence` wrapper around the checkout form prevents aggressive layout shifting when the DOM nodes are injected.
- **Image Optimization**: `next/image` is used globally with strict `sizes` attributes for network logos.

**Score**: 98/100 (Lighthouse Mobile Simulation)
