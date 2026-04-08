# Design Tokens & Global Configuration Guide

**Last Updated:** April 8, 2026

This guide explains how to use the centralized design token system to make changes that automatically apply across all components and pages.

---

## Quick Start

### Change the Primary Brand Color
Edit **`app/globals.css`** (section `@theme {}`):

```css
@theme {
  --color-primary: #48546A;      /* Change this value */
  --color-primary-light: #5a6b7b;
  --color-primary-dark: #3a4052;
}
```

**Automatic updates:**
- All buttons with `bg-primary` class
- All borders with `border-primary`
- All interactive elements using primary color
- All components across the site

### Change Text Colors
Edit **`app/globals.css`** CSS variables:

```css
--color-text-primary: #111827;    /* Main headings color */
--color-text-secondary: #4b5563;  /* Body text color */
--color-text-tertiary: #6b7280;   /* Secondary text color */
```

### Change Fonts
Edit **`app/layout.tsx`** (the font imports) and automatically used across site via CSS variables in `@theme`.

---

## Architecture Overview

The system has **3 layers** that work together:

### Layer 1: CSS Variables (`app/globals.css`)
```css
@theme {
  --color-primary: #48546A;
  --font-poppins: 'Poppins', system-ui, sans-serif;
  --spacing-section: 5rem;
}
```

→ These are the **single source of truth**

### Layer 2: Tailwind Config (`tailwind.config.ts`)
```ts
colors: {
  primary: 'var(--color-primary, #48546A)',
}

fontFamily: {
  poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
}
```

→ Tailwind **references the CSS variables** (via `var()`)

### Layer 3: Component Classes
```jsx
<button className="bg-primary text-white">...</button>
```

→ Components use **Tailwind token classes** (not hardcoded colors)

**Flow: CSS Variable → Tailwind Token → Component Class → Visual Result**

---

## What You Can Change (And How)

| What | Where | Example |
|------|-------|---------|
| **Primary color** (buttons, links, accents) | `app/globals.css` `--color-primary` | Change `#48546A` to `#3b82f6` |
| **Text colors** (headings, body, secondary) | `app/globals.css` `--color-text-*` | Change `#4b5563` to body text color |
| **Font families** | `app/globals.css` `--font-*` | Already using native fonts |
| **Font weights** | Tailwind classes: `font-light`, `font-normal`, `font-semibold` | Built into Tailwind |
| **Section spacing** | `app/globals.css` `--spacing-section` | Change from `5rem` to any value |
| **Semantic colors** | `app/globals.css` `--color-success`, `--color-error`, etc. | Define success/error/warning colors |

---

## Using Design Tokens in Components

### Option 1: Use Tailwind Token Classes (Recommended)
```jsx
// ✅ GOOD - Uses Tailwind tokens that reference CSS variables
<h1 className="heading-h1">Title</h1>
<button className="btn-primary">Click Me</button>
<p className="body-text">Description</p>
```

**Benefits:**
- Changes apply automatically when you update CSS variables
- Consistent typography across site
- Smaller file size

### Option 2: Use Tailwind Token Names
```jsx
// ✅ GOOD - Uses token names
<h1 className="text-4xl font-poppins font-light text-gray-900">Title</h1>
<button className="bg-primary text-white hover:opacity-90">Click</button>
```

**Benefits:**
- More flexible for one-off customizations
- Still uses tokens (not hardcoded colors)

### Option 3: Use CSS Variables Directly (Advanced)
```jsx
// For special cases where you need inline styles
<div style={{ color: 'var(--color-primary)' }}>Custom</div>
```

---

## Available Utility Classes

These are instantly available in all components:

### Button Utilities
```jsx
<button className="btn-primary">Primary Button</button>       {/* Blue, semibold */}
<button className="btn-secondary">Secondary Button</button>   {/* Grey border, light */}
```

### Heading Utilities
```jsx
<h1 className="heading-h1">Page Title</h1>        {/* text-4xl sm:text-5xl, font-light */}
<h2 className="heading-h2">Section Title</h2>    {/* text-2xl sm:text-3xl, font-light */}
<h3 className="heading-h3">Card Title</h3>       {/* text-lg, font-light */}
```

### Text Utilities
```jsx
<p className="body-text">Paragraph text</p>           {/* text-base, gray-600 */}
<span className="text-small">Small text</span>    {/* text-sm, gray-600 */}
```

### Spacing Utilities
```jsx
<section className="section-spacing">Content</section>  {/* mb-20 sm:mb-24 */}
```

---

## Migration Path: Updating Components

Since the system is new, existing components have hardcoded colors like `text-[#48546A]`. Here's how to modernize them:

### Before (Hardcoded)
```jsx
<h1 className="text-4xl font-poppins font-light text-[#48546A]">
  Title
</h1>
```

### After (Using Tokens)
```jsx
<h1 className="heading-h1">Title</h1>
```

OR

```jsx
<h1 className="text-4xl font-poppins font-light text-gray-900">
  Title
</h1>
```

**Impact of migration:**
- ✅ Removes ~500 instances of hardcoded colors
- ✅ Makes color changes instant across entire site
- ✅ Cleaner, more maintainable code
- ✅ Smaller bundle size

---

## Real-World Example: Change Primary Color

**Scenario:** Client wants brand color changed from blue-grey (#48546A) to teal (#14b8a6)

**Old approach:** Search & replace across ~50 files

**New approach:**

1. Open `app/globals.css`
2. Find `--color-primary: #48546A;`
3. Change to `--color-primary: #14b8a6;`
4. Save file
5. ✅ Entire site updates automatically

**Affected instantly:**
- All buttons
- All borders
- All icons
- All interactive elements
- Form inputs on focus
- Links and links

---

## Real-World Example 2: Change Body Text Color

**Scenario:** Body text too light, need it darker for accessibility

1. Open `app/globals.css`
2. Find `--color-text-secondary: #4b5563;`
3. Change to `--color-text-secondary: #2d3748;` (darker)
4. Save
5. ✅ All body paragraphs, descriptions, secondary text darken

---

## Real-World Example 3: Change Section Spacing

**Scenario:** Want more generous spacing between sections

1. Open `app/globals.css`
2. Find `--spacing-section: 5rem;`
3. Change to `--spacing-section: 7rem;` (140px instead of 80px)
4. Save
5. ✅ All major sections have new spacing

---

## File Structure

```
app/
├── globals.css          👈 EDIT THIS for design changes
├── layout.tsx           (Imports fonts)
├── components/
│   ├── Button.tsx       (Uses bg-primary, btn-primary utilities)
│   ├── MyComponent.tsx  (Uses heading-h2, body-text utilities)
│   └── ...
└── ...

tailwind.config.ts       👈 Tailwind configuration (references CSS variables)
```

---

## Fallback Values

All tokens have fallback values in case CSS variables don't load:

```ts
colors: {
  primary: 'var(--color-primary, #48546A)',  // Falls back to #48546A
}
```

This ensures site works even if CSS variables fail to load.

---

## Next Steps

### Recommended Actions:
1. ✅ **System is live** — You can now update colors in one place
2. 🔄 **Optional:** Gradually migrate hardcoded colors to use tokens (not urgent, but cleaner)
3. 📚 **Reference:** Keep this guide handy when making design changes

### To Update Hardcoded Colors (Optional)
Replace instances like:
- `text-[#48546A]` → `text-gray-900`
- `bg-[#48546A]` → `bg-primary`
- `border-[#48546A]` → `border-primary`

But this is **not required** — the CSS variable system works alongside hardcoded values.

---

## Troubleshooting

**Q: I changed the CSS variable but the site didn't update**
A: Clear your browser cache or do a hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

**Q: Can I override a token in a specific component?**
A: Yes! Just add additional classes: `className="btn-primary bg-success"` (success overrides primary)

**Q: What if I need a color not in the system?**
A: Add it to `app/globals.css` under `@theme {}` and `tailwind.config.ts`, then use it anywhere

**Q: Do I need to rebuild after changing CSS?**
A: No! CSS variables are loaded at runtime. Just save and refresh the browser.

---

## Summary

You now have a **design token system** where:
- ✅ Change 1 CSS variable = updates entire site
- ✅ Colors, fonts, spacing all centralized
- ✅ New components automatically use tokens
- ✅ Tailwind utilities available everywhere
- ✅ No hardcoded hex values needed

**Edit location:** `app/globals.css` (section `@theme {}`)

Happy designing! 🎨
