# Design System v1.0

## Philosophy

**Minimalistic, Bright, UX-First Design**

This design system prioritizes clarity, accessibility, and elegant simplicity. Every component is intentionally built with:
- **Breathing room**: Whitespace is a design element, not wasted space
- **Purposeful interactions**: Each visual change communicates clear intent
- **Accessibility first**: WCAG AA standards are non-negotiable
- **Mobile-first responsive**: Design for the smallest screen, scale up
- **Flat aesthetic**: Clean, minimal surfaces with no unnecessary elevation or complexity

---

## Color Palette

### Primary Brand Color
- **Primary**: `#48546A` (dark slate blue)
  - Used for buttons, interactive elements, focus states, links
  - Maintains brand identity while supporting minimalist aesthetic

### Neutral Surfaces & Text
- **Text**: `text-gray-900` (#111827) on light backgrounds
- **Background**: `bg-white` (#FFFFFF) as default canvas
- **Subtle Hover**: `hover:bg-gray-50` (#F9FAFB) for light interaction feedback
- **Focus Ring**: `focus:ring-2 focus:ring-[#48546A]` with `focus:border-transparent`
- **Borders**: `border-gray-300` (#D1D5DB) for input/card edges
- **Disabled/Inactive**: `opacity-50` or `text-gray-400` (#9CA3AF)

### Semantic Color Usage
**No separate error/success/warning colors.** Rely on primary color + icons + text labels for semantic meaning:
- Error states: Red text label + primary border/ring
- Success states: Green text label + primary accent
- Warning states: Amber text label + primary highlight
- Info states: Blue text label + primary ring

**Rationale**: Minimizes color complexity while maintaining clarity through icon + text combination.

---

## Icons

### Icon Library
- **Library**: `lucide-react` — lightweight, minimal, clean icons
- **Installation**: Already in `package.json`
- **Stroke weight**: `strokeWidth={1}` (thin, modern appearance)
- **Import pattern**: `import { IconName } from 'lucide-react'`

### Icon Sizing Scale (Responsive)
Icons scale responsively like typography — base size for mobile, adjust upward for tablets/desktop.

| Usage | Size | Mobile | Desktop | Render |
|-------|------|--------|---------|--------|
| **Extra Small** (badges, tiny buttons) | 16px | `w-4 h-4` | `w-4 h-4` | Consistent |
| **Small** (form icons, list icons) | 20px | `w-5 h-5` | `w-5 h-5` | Consistent |
| **Medium** (button icons, card icons) | 24px | `w-6 h-6` | `w-6 h-6` | Consistent |
| **Large** (hero, prominent icons) | 32px | `w-8 h-8` | `w-8 h-8` | Consistent |

**Implementation**: Use Tailwind's `w-{n}` and `h-{n}` utilities directly:
```jsx
<ChevronDown className="w-4 h-4" strokeWidth={1} />  {/* Small */}
<Heart className="w-6 h-6" strokeWidth={1} />         {/* Medium */}
<Star className="w-8 h-8" strokeWidth={1} />           {/* Large */}
```

### Icon Color
- **Default**: Inherit text color (`text-gray-900`, `text-white`, etc.)
- **Interactive icons**: Inherit parent's color on hover/focus (no separate color change)
- **Do not color code**: Icons inherit parent element's color/styling

**Example:**
```jsx
{/* Icon inherits button text color */}
<button className="... text-white">
  <ChevronRight className="w-5 h-5 strokeWidth={1}" />
  Next
</button>
```

### Icon + Text Spacing
When icons are paired with text:
- **Gap between**: `gap-2` (8px) as minimum
- **Alignment**: `flex items-center gap-2` for proper vertical centering
- **Order**: Icon typically comes before text (left-to-right)

**Example:**
```jsx
<button className="flex items-center gap-2 px-4 py-3 ...">
  <ArrowRight className="w-5 h-5" strokeWidth={1} />
  Continue
</button>
```

### Icon-Only Buttons
When using icons without text, **always provide `aria-label`** for accessibility:

**Example:**
```jsx
<button
  onClick={handleClose}
  className="p-2 hover:bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#48546A]"
  aria-label="Close dialog"
>
  <X className="w-5 h-5" strokeWidth={1} />
</button>
```

### Icon Usage Patterns

**Decorative Icons** (no interaction)
```jsx
{/* Just render inline, inherits parent style */}
<p className="flex items-center gap-2 text-gray-600">
  <CheckCircle className="w-5 h-5" />
  Successfully completed
</p>
```

**Form Field Icons** (inside or next to input)
```jsx
{/* Inside: absolute positioning or flexbox wrapper */}
<div className="relative">
  <input className="pl-10 pr-4 py-3 ..." />
  <Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-500" strokeWidth={1} />
</div>
```

**List Item Icons**
```jsx
{/* Consistent sizing, centered with text */}
<li className="flex items-center gap-3 p-3 border rounded-lg">
  <MessageCircle className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
  <span className="text-base">Your message here</span>
</li>
```

### Stroke Weight Standard
- **Always use**: `strokeWidth={1}` for lucide-react icons
- **Why**: Matches minimalist, lightweight aesthetic
- **Never**: Leave default (usually stroke-width="2") unless justified

---

## Typography

### Font Families
- **Headings (H1-H4)**: `font-poppins` (weight: 400/normal) — friendly, rounded aesthetic
- **Body/Default**: `font-inter` (weights: 400)
- **Available Alternative**: None currently (Outfit available in globals.css if needed)

### Font Hierarchy & Responsive Sizing

All sizes are responsive (mobile-first, scale up) using Tailwind's breakpoint system. All headings use **Poppins, font-thin (100)**:

| Element | Mobile | Tablet/Desktop | Weight | Line Height |
|---------|--------|----------------|--------|-----------|
| **H1** (Page Title) | `text-3xl` (30px) | `text-5xl` (48px) | 100 | 1.2 |
| **H2** (Section Title) | `text-2xl` (24px) | `text-4xl` (36px) | 100 | 1.2 |
| **H3** (Subsection) | `text-xl` (20px) | `text-2xl` (24px) | 100 | 1.2 |
| **H4** (Card Title) | `text-lg` (18px) | `text-lg` (18px) | 100 | 1.2 |
| **Body Text** | `text-base` (16px) | `text-base` (16px) | 400 | 1.2 |
| **Small Text** (Labels, captions) | `text-sm` (14px) | `text-sm` (14px) | 400 | 1.2 |
| **Extra Small** (Hints, metadata) | `text-xs` (12px) | `text-xs` (12px) | 400 | 1.2 |

### Font Weight Usage
- **100** (Thin): All headings (H1–H4) — ultra-light, elegant, minimalist
- **400** (Normal): Body text, paragraphs, form inputs, descriptions
- **500** (Medium): Button text, input labels, emphasis within body (rare)
- **600** (Semibold): Reserved for strong emphasis if needed

### Line Height
- **1.2** across all text (headings and body) for tight, minimalist spacing

### Implementation Notes
- All `<h1>`, `<h2>`, `<h3>`, `<h4>` use `font-poppins font-thin` for a unified, ultra-light appearance
- Responsive scales via Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- No letter-spacing or text-transform unless semantically required (e.g., `<label>` inside forms)

---

## Spacing & Layout

### Spacing Scale
**Use Tailwind defaults** (no custom scale). Consistency comes from predictable utility usage:

- **Extra Small**: `px-2` / `py-2` / `gap-2` (8px)
- **Small**: `px-3` / `py-3` / `gap-3` (12px)
- **Medium**: `px-4` / `py-4` / `gap-4` (16px)
- **Large**: `px-6` / `py-6` / `gap-6` (24px)
- **Extra Large**: `px-8` / `py-8` / `gap-8` (32px)

### Whitespace Principles
- **Generous padding inside containers**: Forms, cards, modals use `px-4 py-4` minimum
- **Gap between elements**: Use `gap-3` or `gap-4` for consistent rhythm
- **Vertical breathing room**: Add space between sections with `mb-6` or `space-y-6`
- **Mobile padding**: Always include adequate padding on mobile (`px-3 sm:px-4`)

### Component Density
- Avoid packing elements tightly — each component needs visual isolation
- Use negative space to define component boundaries implicitly
- Reduce information per screen on mobile; expand on desktop

---

## Component Patterns

### Buttons

**Default Button** (Primary)
```jsx
<button className="px-4 py-3 bg-[#48546A] text-white rounded-lg font-outfit font-600 text-base hover:opacity-90 focus:ring-2 focus:ring-[#48546A] focus:outline-none disabled:opacity-50 transition">
  Click Me
</button>
```

**Secondary Button**
```jsx
<button className="px-4 py-3 bg-gray-100 text-gray-900 rounded-lg font-outfit font-600 text-base hover:bg-gray-200 focus:ring-2 focus:ring-[#48546A] focus:outline-none disabled:opacity-50 transition">
  Secondary
</button>
```

**Outline Button**
```jsx
<button className="px-4 py-3 border-2 border-[#48546A] bg-white text-[#48546A] rounded-lg font-outfit font-600 text-base hover:bg-slate-50 focus:ring-2 focus:ring-[#48546A] focus:outline-none disabled:opacity-50 transition">
  Outline
</button>
```

**Button States:**
- **Hover**: `hover:opacity-90` (subtle fade)
- **Focus**: `focus:ring-2 focus:ring-[#48546A] focus:outline-none` (clear focus indicator)
- **Disabled**: `disabled:opacity-50` (subtle dimming)
- **Transition**: `transition` (smooth state changes)

**Button Sizes:**
- **Small**: `px-3 py-2 text-sm`
- **Medium**: `px-4 py-3 text-base` (default)
- **Large**: `px-6 py-4 text-lg`

---

### Form Inputs

**Text Input / Textarea**
```jsx
<input
  type="text"
  placeholder="Enter value"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-base focus:ring-2 focus:ring-[#48546A] focus:border-transparent disabled:opacity-50 transition"
/>
```

**Select Field**
```jsx
<select className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-base focus:ring-2 focus:ring-[#48546A] focus:border-transparent disabled:opacity-50">
  <option>Choose option</option>
</select>
```

**Checkbox / Radio**
```jsx
<label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
  <input type="checkbox" className="w-5 h-5 cursor-pointer" />
  <span className="font-inter text-base text-gray-900">Label</span>
</label>
```

**Input States:**
- **Focus**: `focus:ring-2 focus:ring-[#48546A] focus:border-transparent`
- **Disabled**: `disabled:opacity-50`
- **Error**: Red text label above field + primary border (no separate error color)
- **Hover Container**: `hover:bg-gray-50` (for radio/checkbox groups)

---

### Cards & Containers

**Card**
```jsx
<div className="bg-white border border-gray-300 rounded-lg px-4 py-4">
  {/* content */}
</div>
```

**Properties:**
- **Flat aesthetic**: No shadow (`shadow-none`, borders only)
- **Border**: `border border-gray-300`
- **Border radius**: `rounded-lg` (consistent across all components)
- **Padding**: `px-4 py-4` (minimum)
- **Hover interaction**: Subtle `hover:border-[#48546A]` or `hover:bg-gray-50` (optional)

---

### Modals & Overlays

**Modal Container**
```jsx
<div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
  <div className="bg-white rounded-lg px-6 py-6 max-w-md w-full mx-3 shadow-lg">
    {/* Modal content */}
  </div>
</div>
```

**Properties:**
- **Overlay**: `bg-black bg-opacity-20` (subtle darkening)
- **Modal size**: `max-w-md` for forms, scale up for content
- **Padding**: `px-6 py-6` (more breathing room)
- **Border radius**: `rounded-lg`
- **Close button**: Use X icon, top-right, `p-2` size

---

### Links

**Inline Link**
```jsx
<a href="#" className="text-[#48546A] hover:underline focus:ring-2 focus:ring-[#48546A] focus:outline-none rounded-sm px-1">
  Link text
</a>
```

**Properties:**
- **Color**: Primary `#48546A`
- **Hover**: `hover:underline` (clear interaction)
- **Focus**: `focus:ring-2 focus:ring-[#48546A]` (accessible)

---

## Accessibility (WCAG AA)

### Color Contrast
- **Primary #48546A on white**: ✅ 9.2:1 (AAA compliant)
- **Gray-900 on white**: ✅ 17.5:1 (AAA compliant)
- **Gray-600 on white**: ✅ 7.1:1 (AA compliant)
- **Verify**: Test all text/background pairs with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Focus States
- **All interactive elements** must have visible focus indicators
- **Focus ring**: `focus:ring-2 focus:ring-[#48546A] focus:outline-none` (standard)
- **Never remove focus rings** (NB: no `focus:outline-none` without a ring alternative)

### Semantic HTML
- Use **`<button>`** for actions, **`<a>`** for navigation
- Use **`<label>`** with `htmlFor` for form fields
- Use **`<h1>`, `<h2>`, etc.** for proper heading hierarchy
- Use **`<nav>`** for navigation, **`<main>`** for content
- Use **`<fieldset>`** + **`<legend>`** for grouped form inputs

### Screen Reader Support
- Provide **alt text** for all images
- Use **`aria-label`** for icon-only buttons
- Use **`aria-describedby`** for helpful hints
- Test with screen readers (VoiceOver on macOS, NVDA on Windows)

### Touch Targets
- **Minimum size**: 44px × 44px (mobile buttons/inputs)
- **Mobile padding**: `px-3 py-3` minimum for buttons
- **Adequate gap**: `gap-3` or `gap-4` between touch targets

---

## Responsive Design (Mobile-First)

### Breakpoints (Tailwind Defaults)
- **Mobile**: `<640px` (no prefix, base styles)
- **Tablet**: `sm:` (640px)
- **Desktop**: `md:` (768px)
- **Large Desktop**: `lg:` (1024px)
- **Extra Large**: `xl:` (1280px)

### Mobile-First Pattern
```jsx
{/* Start with mobile, enhance for larger screens */}
<div className="text-base sm:text-lg md:text-2xl px-3 sm:px-4 md:px-6">
  Content scales responsively
</div>
```

### Typography Scaling
- Font sizes scale using breakpoints (see Typography table)
- Line height remains constant (1.2) across all breakpoints

### Layout Adjustments
- **Mobile**: Single column, full width containers
- **Tablet/Desktop**: Multi-column grids, wider max-widths
- **Use `flex-col sm:flex-row`** for responsive direction changes

---

## Animations & Transitions

### Minimal Animation Philosophy
Add animations **only** when they clarify state or guide attention.

### Approved Animations
- **State transitions**: `transition` class on hover/focus/active state changes
- **Fade in/out**: Use `opacity-0` → `opacity-100` for modal/dropdown reveals
- **Slide in**: Custom `slideup` keyframe for modals entering from bottom (if already defined)
- **Loading state**: Subtle spinner (icon rotation), never jarring

### Forbidden
- ❌ Bouncing, floating, or attention-grabbing effects
- ❌ Auto-playing animations (let user control)
- ❌ Parallax or depth effects
- ❌ Page transitions or splash screens

### Implementation
```css
/* In globals.css or component */
.transition {
  transition: all 150ms ease-in-out;
}
```

---

## Performance Guidelines

### Component Optimization
- **Memoize** components that receive stable props: `React.memo()` if not re-rendering unnecessarily
- **Lazy load** heavy components: `React.lazy()` + `Suspense` for below-the-fold sections
- **Minimize re-renders**: Use `useCallback()` for event handlers passed to child components
- **Avoid inline objects/arrays**: Move to component level or useMemo

### CSS Performance
- **No unused classes**: Tailwind purges automatically in production
- **CSS Grid/Flexbox**: Prefer for layout (performant native implementations)
- **Avoid expensive properties**: Avoid frequent transforms, filters, or blur effects

### Image Performance
- **Optimize images**: Use Next.js `<Image>` component with `priority`, `loading`, `quality`
- **Lazy load offscreen images**: Default Next.js behavior
- **Responsive images**: Use `srcSet` or Next.js automatic srcSet generation

---

## Implementation Checklist: Before Building Components

- [ ] **Semantics**: Correct HTML elements (`<button>`, `<a>`, `<label>`, etc.)
- [ ] **Accessibility**: Focus rings, contrast ratio ≥7:1, alt text for images
- [ ] **Responsive**: Mobile-first (`text-base sm:text-lg`), touch targets ≥44px
- [ ] **Spacing**: Consistent `gap-3`/`gap-4`, adequate padding (`px-4 py-3` minimum)
- [ ] **State feedback**: Clear hover/focus/disabled/active states using opacity/color shifts
- [ ] **Flat design**: No shadows, clean borders only
- [ ] **Typography**: Matches font hierarchy (Outfit headings, Inter body)
- [ ] **Colors**: Primary #48546A only, no separate error/success colors
- [ ] **Mobile tested**: Works cleanly on iPhone SE (375px) and up
- [ ] **Performance**: No unnecessary re-renders, lazy-loaded images

---

## Example Component: Minimal Input Form

```jsx
export default function ContactForm() {
  return (
    <form className="space-y-6 p-4 sm:p-6">
      <div>
        <label htmlFor="name" className="block font-poppins font-thin text-base text-gray-900 mb-2">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-base focus:ring-2 focus:ring-[#48546A] focus:border-transparent disabled:opacity-50 transition"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-poppins font-thin text-base text-gray-900 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-base focus:ring-2 focus:ring-[#48546A] focus:border-transparent disabled:opacity-50 transition"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 bg-[#48546A] text-white rounded-lg font-poppins font-thin text-base hover:opacity-90 focus:ring-2 focus:ring-[#48546A] focus:outline-none disabled:opacity-50 transition"
      >
        Submit
      </button>
    </form>
  );
}
```

---

## Version History

- **v1.0** (April 8, 2026): Initial design system — minimalistic, flat, accessibility-first, mobile-first responsive.

---

**Questions?** Refer to specific sections or ask for component guidance. This system is the source of truth for all new components.
