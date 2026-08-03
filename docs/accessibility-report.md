# Accessibility (WCAG AA) Report

## Audit Summary
The frontend was audited for keyboard navigation, screen reader compatibility, and contrast ratios.

## Findings
- **Focus Management**: Applied global `focus-visible:ring-2` with high-contrast brand colors. No "focus traps" were detected.
- **ARIA Labels**: State-driven UI elements (like the bundle selection cards) correctly utilize `aria-pressed`. Forms use `aria-invalid` tied to Zod validation states.
- **Contrast**: The primary blue (`#1E40AF`) against the white background (`#FFFFFF`) exceeds the 4.5:1 WCAG AA contrast ratio requirement.
- **Input Types**: `type="tel"` is strictly enforced on all phone number inputs for accessibility and native mobile keyboard triggers.
