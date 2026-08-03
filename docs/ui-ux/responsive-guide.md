# Responsive & Interaction Guidelines

## Responsive Behavior
- **Mobile First**: All layouts default to a single column (flex-col).
- **Navigation**:
  - `sm` (Mobile): Hamburger menu opens a full-screen drawer or bottom sheet.
  - `lg` (Desktop): Top navbar with horizontal links.
- **Tables**:
  - `sm`: Transform into stacked cards to prevent horizontal scrolling.
  - `md+`: Standard horizontal data grid.

## Interactions & Animations
- **Page Transitions**: Framer Motion `opacity` fade (0 to 1) and slight vertical translation (`y: 10` to `0`) on route change.
- **Hover States**: 
  - Buttons scale to `1.02`, elevation increases.
  - Cards lift up by `-4px` and shadow intensifies.
- **Loading Mechanisms**:
  - Initial Load: React Suspense Skeletons.
  - Form Submit: Button text replaced by spinner, inputs disabled.
  - Data Fetching (React Query): Background fetching shows a subtle progress bar at the top of the screen (nprogress).
