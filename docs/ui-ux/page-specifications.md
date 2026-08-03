# Page Specifications

## 1. Landing Page / Purchase Interface
- **Purpose**: A single, ultra-fast interface to select a bundle and pay instantly.
- **Target User**: Unauthenticated Guests.
- **Layout**: Simplified form taking center stage.
- **Validation**: 
  - Recipient Number: Must be exactly 10 digits and match Ghana telecom patterns.
  - Bundle: Must be selected.
- **Interactions**: No typing required for bundle selection (use quick-tap chips/badges).

## 2. Order Tracking Page
- **Purpose**: Allow users to check status without an account.
- **Inputs**: Reference ID or Phone Number.
- **Success State**: Shows receipt, status, and an upsell block: "Create an account to track all future purchases".

## 3. Success / Receipt Page
- **Purpose**: Confirmation of delivery.
- **CTA**: "Create Free Account" (Optional post-purchase funnel).

## 4. Admin Dashboard
- **Purpose**: System management.
- **Access**: Guarded by JWT. Fully authenticated only.
