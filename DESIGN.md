# DESIGN.md — Nômade Voyage

> Design system for AI coding agents. Drop this file into the project root and instruct your agent: "use DESIGN.md for all UI work."
> Format: Google Stitch DESIGN.md (9 sections) · Style: Refined / Aurora Mediterrânea

---

## 1. Visual Theme & Atmosphere

**Brand essence:** A humanized digital travel agency for Brazilians who want to live, explore, and travel abroad. The visual language bridges aspiration and trust — like a friend who already lives in Lisbon and is helping you get there.

**Design philosophy:**
- Clean and airy, never cluttered
- Photography-driven: real people, real places, natural light
- Warm authority: trustworthy like a bank, warm like a friend
- Premium accessible: aspirational without being luxury or cold

**Mood keywords:** Mediterranean afternoon · warm coastal light · white walls + terracotta · open sky · purposeful calm

**Density:** Low-to-medium. Generous whitespace. Let content breathe.

**Overall aesthetic:** Refined — clean surfaces, subtle depth, intentional typography, warm accent. Inspired by the "Refined" typeui style: sophisticated restraint over decoration.

---

## 2. Color Palette & Roles

### Primary Colors

| Token | Name | Hex | Role |
|---|---|---|---|
| `--color-primary` | Ocean Blue | `#0C4A6E` | Headings, navbar, authority elements, footer background |
| `--color-primary-light` | Sky Blue | `#0EA5E9` | Interactive elements, links, icon accents, hover states |
| `--color-accent` | Terra | `#EA580C` | Primary CTA buttons, urgency badges, active states |

### Surface Colors

| Token | Name | Hex | Role |
|---|---|---|---|
| `--color-background` | Sky White | `#F0F9FF` | Page background |
| `--color-surface` | Pure White | `#FFFFFF` | Cards, modals, input backgrounds |
| `--color-muted` | Soft Sky | `#E8F2F8` | Section backgrounds, tag/badge backgrounds |

### Text Colors

| Token | Name | Hex | Role |
|---|---|---|---|
| `--color-foreground` | Deep Ocean | `#0C4A6E` | Primary text, dark headings |
| `--color-muted-foreground` | Slate | `#64748B` | Secondary text, captions, placeholders |
| `--color-on-primary` | White | `#FFFFFF` | Text on primary/accent backgrounds |

### Utility Colors

| Token | Name | Hex | Role |
|---|---|---|---|
| `--color-border` | Sky Border | `#BAE6FD` | Card borders, dividers, input borders |
| `--color-ring` | Focus Ring | `#0EA5E9` | Focus outlines for accessibility |
| `--color-destructive` | Error Red | `#DC2626` | Error states, destructive actions |

### Hero Gradient

```css
/* Aurora gradient — use ONLY in hero sections, not throughout the page */
background: linear-gradient(135deg, #0C4A6E 0%, #0EA5E9 55%, #F0F9FF 100%);
```

### CSS Custom Properties

```css
:root {
  --color-primary: #0C4A6E;
  --color-primary-light: #0EA5E9;
  --color-accent: #EA580C;
  --color-background: #F0F9FF;
  --color-surface: #FFFFFF;
  --color-muted: #E8F2F8;
  --color-foreground: #0C4A6E;
  --color-muted-foreground: #64748B;
  --color-on-primary: #FFFFFF;
  --color-border: #BAE6FD;
  --color-ring: #0EA5E9;
  --color-destructive: #DC2626;
}
```

---

## 3. Typography Rules

### Font Families

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap');

:root {
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

| Role | Font | Weight | When to use |
|---|---|---|---|
| **Display / Hero** | Poppins | 700 | H1, hero taglines, section titles |
| **Heading** | Poppins | 600 | H2, H3, card titles |
| **Subheading** | Poppins | 400 italic | Pull quotes, testimonials, highlighted phrases |
| **Body** | Inter | 400 | All body copy, descriptions |
| **UI Label** | Inter | 500 | Buttons, nav links, form labels |
| **Caption** | Inter | 400 | Metadata, timestamps, small helper text |

### Type Scale

```css
/* Display */
.text-display   { font-size: 56px; line-height: 1.05; font-weight: 700; font-family: var(--font-heading); }

/* Headings */
.text-h1        { font-size: 48px; line-height: 1.1;  font-weight: 700; font-family: var(--font-heading); }
.text-h2        { font-size: 36px; line-height: 1.2;  font-weight: 600; font-family: var(--font-heading); }
.text-h3        { font-size: 24px; line-height: 1.3;  font-weight: 600; font-family: var(--font-heading); }
.text-h4        { font-size: 20px; line-height: 1.4;  font-weight: 600; font-family: var(--font-heading); }

/* Body */
.text-body-lg   { font-size: 18px; line-height: 1.65; font-weight: 400; font-family: var(--font-body); }
.text-body      { font-size: 16px; line-height: 1.6;  font-weight: 400; font-family: var(--font-body); }
.text-body-sm   { font-size: 14px; line-height: 1.5;  font-weight: 400; font-family: var(--font-body); }

/* UI */
.text-label     { font-size: 12px; line-height: 1.4;  font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; font-family: var(--font-body); }
.text-caption   { font-size: 12px; line-height: 1.4;  font-weight: 400; font-family: var(--font-body); }
```

### Typography Rules

- Minimum body text: **16px** (prevents iOS auto-zoom)
- Max line length: **65–75 characters** on desktop, **35–55** on mobile
- Never use Poppins below 14px (readability degrades)
- Inter for all form inputs and UI copy
- Italic Poppins only for testimonials and inspirational quotes

---

## 4. Component Stylings

### Buttons

```css
/* Primary CTA — Terra accent */
.btn-primary {
  background: #EA580C;
  color: #FFFFFF;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 150ms ease-out, transform 100ms ease-out;
}
.btn-primary:hover  { background: #C2410C; }
.btn-primary:active { transform: scale(0.98); }

/* Secondary — Ocean Blue outline */
.btn-secondary {
  background: transparent;
  color: #0C4A6E;
  border: 1.5px solid #0C4A6E;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 150ms ease-out;
}
.btn-secondary:hover { background: #E8F2F8; }

/* Ghost — Sky Blue text */
.btn-ghost {
  background: transparent;
  color: #0EA5E9;
  border: none;
  font-weight: 500;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid #BAE6FD;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 16px rgba(14, 165, 233, 0.07);
  transition: box-shadow 200ms ease-out, transform 200ms ease-out;
}
.card:hover {
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.14);
  transform: translateY(-2px);
}

/* Feature/pillar card */
.card-feature {
  background: #FFFFFF;
  border: 1px solid #BAE6FD;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
}
.card-feature .icon {
  width: 48px;
  height: 48px;
  color: #0EA5E9;
  margin-bottom: 16px;
}
```

### Navigation

```css
.navbar {
  background: #FFFFFF;
  border-bottom: 1px solid #BAE6FD;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
}
.navbar-logo {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 20px;
  color: #0C4A6E;
}
.navbar-link {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 15px;
  color: #64748B;
  text-decoration: none;
  transition: color 150ms;
}
.navbar-link:hover { color: #0C4A6E; }
.navbar-link.active { color: #0C4A6E; font-weight: 600; }
```

### Badges / Tags

```css
.badge {
  display: inline-flex;
  align-items: center;
  background: #E8F2F8;
  color: #0C4A6E;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  padding: 4px 12px;
  border-radius: 999px;
}
.badge-accent {
  background: #FFF7ED;
  color: #EA580C;
}
```

### Form Inputs

```css
.input {
  background: #FFFFFF;
  border: 1.5px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: 16px;
  color: #0C4A6E;
  width: 100%;
  transition: border-color 150ms;
  min-height: 44px; /* touch target */
}
.input:focus {
  outline: none;
  border-color: #0EA5E9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
}
.input::placeholder { color: #94A3B8; }
.input.error { border-color: #DC2626; }

label {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: #0C4A6E;
  display: block;
  margin-bottom: 6px;
}
```

### WhatsApp CTA Block

```css
/* Sticky WhatsApp CTA — signature element of the brand */
.whatsapp-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #25D366;
  color: #FFFFFF;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  padding: 14px 28px;
  border-radius: 999px;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
  transition: transform 150ms, box-shadow 150ms;
}
.whatsapp-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(37, 211, 102, 0.4);
}
```

---

## 5. Layout Principles

### Spacing Scale (4px base)

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### Grid & Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Section vertical rhythm */
section { padding: 80px 0; }
section.compact { padding: 48px 0; }

/* Column grids */
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
```

### Page Section Structure

```
[Navbar — sticky, white]
[Hero — aurora gradient, full-width]
[3 Pillars — Viajar / Explorar / Morar — sky white bg]
[How it works — white bg, 3 steps]
[Destinations — white bg, photo cards]
[Testimonials — muted bg, quotes]
[Final CTA — ocean blue bg, white text]
[Footer — deep ocean bg]
```

### Whitespace Philosophy

- Section padding: 80px top/bottom minimum
- Card internal padding: 24–32px
- Between heading and body: 16px
- Between sections visually separated: use background color change, not just margin
- Hero text block: max-width 640px for readability

---

## 6. Depth & Elevation

### Shadow Scale

```css
/* Level 0 — flat, no shadow */
--shadow-none: none;

/* Level 1 — cards, subtle surfaces */
--shadow-sm: 0 2px 16px rgba(14, 165, 233, 0.07);

/* Level 2 — card hover, dropdowns */
--shadow-md: 0 8px 32px rgba(14, 165, 233, 0.14);

/* Level 3 — modals, overlays */
--shadow-lg: 0 16px 48px rgba(12, 74, 110, 0.18);

/* WhatsApp CTA special */
--shadow-whatsapp: 0 4px 20px rgba(37, 211, 102, 0.3);
```

### Surface Hierarchy

```
Background (#F0F9FF)        ← Page canvas
  └── Sections (#FFFFFF or #E8F2F8)  ← Section alternation
        └── Cards (#FFFFFF + border) ← Content containers
              └── Modals (#FFFFFF + shadow-lg) ← Top layer
```

### Border Radius Scale

```css
--radius-sm:   4px;   /* tags, small elements */
--radius-md:   8px;   /* buttons, inputs */
--radius-lg:   16px;  /* cards, large containers */
--radius-xl:   24px;  /* hero image frames */
--radius-full: 999px; /* badges, pills, WhatsApp button */
```

---

## 7. Do's and Don'ts

### Do

- **Show real people** — use photos of actual people in European destinations, not stock models
- **Lead with emotion, close with clarity** — headline inspires, subheadline explains
- **One primary CTA per section** — never compete between two CTAs of the same weight
- **Use whitespace generously** — the empty space is part of the design
- **Keep nav simple** — max 4 links + WhatsApp CTA button
- **Use Lucide icons** — consistent stroke (1.5px), outline style, 24px default size
- **Alternate section backgrounds** — white ↔ sky white ↔ muted to create rhythm without borders
- **Use the gradient only in the hero** — not on cards or repeated sections

### Don't

- **Don't use emoji as icons** — use Lucide SVG icons instead
- **Don't compete with OTAs on price** — never show "cheapest prices" as the main CTA
- **Don't use all-caps for body text** — only for micro-labels (12px uppercase)
- **Don't put more than 3 cards in a row on mobile** — max 1 column below 768px
- **Don't use the aurora gradient on dark text** — always white text on gradient backgrounds
- **Don't use more than 2 font families** — Poppins and Inter only
- **Don't use raw hex values in components** — always use CSS variables
- **Don't build complex booking flows** — the CTA is always WhatsApp, not a checkout
- **Don't use yellow/gold** — the accent is Terra (#EA580C), not the original navy+gold from early docs

---

## 8. Responsive Behavior

### Breakpoints

```css
/* Mobile first */
/* xs: 0–374px      — small phones */
/* sm: 375px        — standard mobile */
/* md: 768px        — tablet */
/* lg: 1024px       — small desktop */
/* xl: 1280px       — large desktop */
/* 2xl: 1536px      — wide screens */

@media (max-width: 767px) { /* mobile overrides */ }
@media (min-width: 768px) { /* tablet+ */ }
@media (min-width: 1024px) { /* desktop */ }
```

### Component Behavior by Breakpoint

| Component | Mobile (< 768px) | Tablet (768–1024px) | Desktop (> 1024px) |
|---|---|---|---|
| Navbar | Hamburger menu | Hamburger or full links | Full links + CTA button |
| Hero | Stack (text above image) | Side by side | Side by side, larger type |
| 3 Pillars grid | 1 column | 2+1 columns | 3 columns |
| Destination cards | 1 column scroll | 2 columns | 3 columns |
| Testimonials | 1 at a time (carousel) | 2 columns | 3 columns |
| Footer | Stack, single column | 2 columns | 4 columns |

### Touch Targets

- All interactive elements: minimum **44×44px**
- Spacing between adjacent tappable elements: minimum **8px**
- WhatsApp floating button: **56×56px**, fixed bottom-right, 20px from edges

### Mobile Priorities

1. WhatsApp CTA always visible (sticky or prominent)
2. Hero text above the fold, readable at 16px minimum
3. No horizontal scroll at any breakpoint
4. Inputs height minimum 44px

---

## 9. Agent Prompt Guide

### Quick Color Reference

```
Primary dark:    #0C4A6E  (Ocean Blue)
Primary light:   #0EA5E9  (Sky Blue)
CTA / Accent:    #EA580C  (Terra)
Background:      #F0F9FF  (Sky White)
Surface:         #FFFFFF  (White)
Muted bg:        #E8F2F8  (Soft Sky)
Text primary:    #0C4A6E
Text secondary:  #64748B
Border:          #BAE6FD
```

### Ready-to-Use Prompts

**Landing page hero:**
> "Build a hero section with the aurora gradient background (#0C4A6E → #0EA5E9 → #F0F9FF), a Poppins 700 56px white headline, Inter 18px white subtitle, a Terra (#EA580C) CTA button, and a real travel photo on the right side."

**3 Pillars section:**
> "Create a 3-card section on #F0F9FF background. Each card uses the .card-feature style with a Lucide icon in #0EA5E9, Poppins 600 24px title in #0C4A6E, and Inter 16px body in #64748B. Cards: Viajar, Explorar, Morar."

**WhatsApp CTA section:**
> "Build a CTA section with #0C4A6E background, white Poppins 700 headline, white Inter subtitle, and a rounded WhatsApp button in #25D366 with the WhatsApp icon from Lucide."

**Testimonial card:**
> "Create a testimonial card on #E8F2F8 background with an opening quote mark in #0EA5E9, body text in Poppins 400 italic #0C4A6E, author name in Inter 500 #0C4A6E, and a real photo avatar."

**Form / Lead capture:**
> "Build a lead capture form with white surface, Inter labels, inputs with #BAE6FD borders and #0EA5E9 focus ring, and a full-width Terra CTA button. Keep it to 3 fields max: name, email, WhatsApp."

---

*DESIGN.md — Nômade Voyage · Created 2026-04-27 · Format: Google Stitch + typeui Refined aesthetic*
*For site: Next.js + Tailwind CSS + Lucide Icons + shadcn/ui (optional)*
