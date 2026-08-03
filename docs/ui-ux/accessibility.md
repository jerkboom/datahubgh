# Accessibility (a11y) Specifications

## 1. Keyboard Navigation
- All interactive elements (Buttons, Inputs, Links) must be focusable.
- Visible focus rings (`ring-2 ring-primary ring-offset-2`) are mandatory.
- Modals must trap focus while open and return focus to the trigger element when closed.

## 2. Screen Readers
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).
- All icons must have `aria-hidden="true"` or an accompanying `sr-only` descriptive text.
- Forms must use explicitly associated `<label>` elements or `aria-label`.
- Toast notifications must use `role="alert"` or `role="status"` to announce dynamically.

## 3. Color & Contrast
- Maintain WCAG AA standard (4.5:1 contrast ratio) for all text.
- Ensure danger/error states do not rely on color alone (include warning icons).
- Dark mode must invert shadows to maintain depth perception.
