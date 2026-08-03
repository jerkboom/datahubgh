# Design Token Specification

## 1. Colors
- **Primary:** `#1E40AF` (Interactive elements, main CTA)
- **Primary Foreground:** `#F8FAFC`
- **Secondary:** `#2563EB` (Secondary actions, highlights)
- **Secondary Foreground:** `#F8FAFC`
- **Accent:** `#22C55E` (Success states, positive indicators)
- **Accent Foreground:** `#FFFFFF`
- **Background (Light):** `#F8FAFC`
- **Foreground (Light):** `#0F172A`
- **Background (Dark):** `#020817`
- **Foreground (Dark):** `#F8FAFC`
- **Card Background:** `#FFFFFF` (Dark: `#0F172A`)
- **Border:** `#E5E7EB` (Dark: `#1E293B`)
- **Destructive/Danger:** `#EF4444`
- **Warning:** `#F59E0B`
- **Muted:** `#F1F5F9` (Text: `#64748B`)

## 2. Typography
- **Font Family:** `Inter`, sans-serif
- **Headings (h1 - h6):** Font weights `600`, `700`.
- **Body:** `14px` (Base), `16px` (Large), `12px` (Small). Font weight `400`, `500`.
- **Line Height:** Relaxed (`1.5` to `1.75`) for readability.

## 3. Spacing & Grid
- **System:** 8px baseline grid (8, 16, 24, 32, 40, 48, 64).
- **Page Container:** Max-width `1280px` with `16px` padding on mobile, `32px` on desktop.
- **Gaps:** Standard component gap is `16px` or `24px`.

## 4. Breakpoints
- `sm`: 640px (Mobile landscape)
- `md`: 768px (Tablet portrait)
- `lg`: 1024px (Tablet landscape / Small desktop)
- `xl`: 1280px (Standard desktop)
- `2xl`: 1536px (Large desktop)

## 5. Elevation & Shadows
- **Card/Surface:** `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`
- **Hover/Floating:** `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`
- **Modal:** `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`

## 6. Radius
- **Base Radius:** `16px` (Soft, modern Apple-like corners for cards and modals).
- **Button Radius:** `8px` or `12px`.
- **Badge Radius:** `9999px` (Pill shape).

## 7. Icons & Imagery
- **Library:** `Lucide React`
- **Weight:** `2px` stroke, consistent rounded caps.
- **Size:** `16px` (inline), `20px` (buttons), `24px` (headers/sidebar).

## 8. Animations & Transitions
- **Duration:** Fast (`150ms`), Medium (`300ms`), Slow (`500ms`).
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Standard smooth ease-in-out).
- **Scale:** Button active state scales to `0.95`.
