# Reusable Component Definitions

All components utilize Tailwind CSS + Shadcn, wrapped in Framer Motion where necessary.

## 1. Core Elements
- **Button**: Primary, Secondary, Outline, Ghost, Destructive. Includes `isLoading` prop (spinner + disabled state).
- **Input/Textarea/Select**: Form elements with `error` and `helperText` props. Uses `react-hook-form` integration.
- **Card**: Glassmorphism option available. Contains Header, Title, Description, Content, Footer.
- **Badge**: Pill-shaped status indicators (Success, Warning, Danger, Default).

## 2. Navigation
- **Navbar**: Sticky top, transparent to solid on scroll. Mobile hamburger menu.
- **Sidebar**: Collapsible (Admin/Dashboard). Active state highlighting.
- **Breadcrumb**: Automated based on route path.

## 3. Data Display
- **Table / Data Grid**: Includes sortable headers, pagination controls, and row selection.
- **Statistic Card**: Displays Title, Value, Icon, and Percentage change (+/-).
- **Product Card**: Image, Network Logo, Title, Price, and "Buy Now" button.
- **Order Card**: Status Badge, Date, Amount, Product Name, Tracking Link.

## 4. Feedback & Overlay
- **Modal / Dialog**: Centered overlay with backdrop blur. Used for confirmations and quick forms.
- **Drawer / Sheet**: Slides from right (desktop) or bottom (mobile). Used for filters and mobile navigation.
- **Toast**: Sonner integration. Appears bottom-right. Success/Error variants.
- **Skeleton**: Pulsing generic shapes for loading states (ProductCardSkeleton, TableSkeleton).

## 5. States
- **Empty State**: Centralized icon (muted), Title, Description, and optional Action Button (e.g., "No orders yet -> Browse Products").
- **Error State**: Danger icon, "Something went wrong", and "Retry" button.
- **Loading State**: Full page spinner or inline skeletons.
