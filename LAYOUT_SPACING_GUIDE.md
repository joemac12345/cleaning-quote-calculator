# Layout & Spacing Guide

## Problem That Was Fixed

Your site had **excessive margins and padding**, especially on mobile devices. The root cause was:

**The layout already provides spacing**, but pages were **adding their own spacing on top**, creating double padding:

```
Layout:        max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8
Page on top:   max-w-4xl mx-auto px-6 sm:px-8
Result:        32px+ total horizontal padding on mobile (too much!)
```

## How the Layout Works

### Root Layout (`app/layout.tsx`)
The `<main>` wrapper handles ALL width, centering, and padding:

```tsx
<main className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
  {children}
</main>
```

This provides:
- ✅ **Width constraint**: `max-w-[700px]` (mobile-friendly width)
- ✅ **Centering**: `mx-auto` (centers on larger screens)
- ✅ **Horizontal padding**: `px-4 sm:px-6 lg:px-8` (gutters on all screens)
- ✅ **Top margin**: `mt-12` (breathing room from navbar)

### What Pages Should Do

**Pages should NOT add:**
- ❌ `max-w-*` (layout already constrains width)
- ❌ `mx-auto` (layout already centers)
- ❌ `px-*` (layout already provides horizontal padding)
- ❌ Top padding `pt-*` (layout already provides `mt-12`)
- ❌ Excessive bottom padding like `pb-24`

**Pages SHOULD only add:**
- ✅ Page-specific margins (e.g., between sections: `mb-8`)
- ✅ Component spacing (e.g., `gap-4` between items)
- ✅ Bottom padding ONLY if content is hidden behind fixed elements (e.g., `pb-28` for bottom nav)

## Pattern Examples

### ❌ WRONG (Old Pattern - Double Padding)
```tsx
export default function MyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
      <h1>Page Title</h1>
      {/* content */}
    </div>
  );
}
```
Problems:
- Redundant `max-w-4xl` conflicts with layout's `max-w-[700px]`
- Adds `px-6` on top of layout's `px-4 sm:px-6` (too much padding)
- Excessive `py-12` vertical padding

### ✅ CORRECT (New Pattern - Clean & Simple)
```tsx
export default function MyPage() {
  return (
    <>
      <h1>Page Title</h1>
      {/* content */}
    </>
  );
}
```
Benefits:
- No redundant wrappers
- Trusts layout for spacing
- Cleaner, more maintainable code

### ✅ CORRECT (With Section Spacing)
```tsx
export default function MyPage() {
  return (
    <>
      <section className="mb-8">
        <h2>Section 1</h2>
        {/* content */}
      </section>

      <section>
        <h2>Section 2</h2>
        {/* content */}
      </section>
    </>
  );
}
```
Good practices:
- Uses fragments `<>...</>` for clean structure
- Only adds margins **between** sections
- Layout handles all width/padding

## Special Cases

### Fixed Overlays (Modals, Bottom Navigation)
Fixed overlays that need their own padding:

```tsx
// Modal or fixed bottom nav - OK to add padding
<div className="fixed inset-0 z-50 p-4">
  <div className="bg-white rounded-lg pt-6 px-4 pb-6">
    {/* modal content */}
  </div>
</div>
```

### Hero Sections or Full-Width Components
If a component intentionally spans full width or has custom sizing:

```tsx
export default function HeroSection() {
  return (
    <section className="w-full bg-primary py-12 sm:py-16">
      {/* Hero content - inherits layout padding from parent */}
    </section>
  );
}
```

## Spacing Scale (Recommended)

Use these standardized spacing values:

```
pt-0   = 0px      (no padding)
pt-4   = 16px     (small)
pt-6   = 24px     (medium)
pt-8   = 32px     (large)
pt-12  = 48px     (extra large)

mb-3   = 12px     (paragraph spacing)
mb-4   = 16px     (component spacing)
mb-6   = 24px     (section spacing)
mb-8   = 32px     (major section spacing)
```

## When Adding New Components

**Checklist:**
- [ ] Does the component need its own `max-w-*`? Usually NO - let layout handle it
- [ ] Does the component need `mx-auto`? Usually NO - already centered
- [ ] Does the component need horizontal `px-*`? Usually NO - layout provides it
- [ ] Does the component need special spacing? Only add if it's *different* from the layout
- [ ] Is the component a fixed overlay? If yes, it needs its own padding

## Files Already Updated

✅ This spacing system has been applied to:
- EstimateCalculator.tsx (Form page)
- BookingsPage (Booking confirmation)
- HeroSection (Deep clean page)
- FormNavigation (Bottom navigation bar)

## Summary

The key principle:
> **The layout provides width, centering, and horizontal padding. Pages should only add vertical/section spacing.**

This means:
- Consistent spacing across all pages ✓
- Better mobile experience ✓
- Easier to maintain ✓
- Simpler component code ✓
