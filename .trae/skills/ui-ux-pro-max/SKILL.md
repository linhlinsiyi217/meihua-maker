---
name: ui-ux-pro-max
description: "UI/UX design intelligence for web, mobile, and desktop. Use when designing, building, reviewing, or fixing interfaces: pages, components, design systems, accessibility, interaction, responsive layout, typography, color, charts, and stack-specific UI implementation. Local data: 79 searchable styles (50 active), 192 product palettes, 74 font pairings, 119 UX guidelines, 105 icons, 25 chart types, 22 stacks."
---

# UI/UX Pro Max

AI-powered design intelligence: 79 UI styles, 192 color palettes, 74 font pairings, 119 UX guidelines, 25 chart types across 22 tech stacks.

## When to Apply

Use this skill when the task changes how something **looks, feels, moves, or is interacted with**:
- Design new pages / components
- Choose color / font / spacing / layout systems
- Review UI for UX, accessibility, or visual consistency
- Implement navigation, animation, responsive behavior

Skip for: backend logic, API/DB design, non-visual performance, DevOps.

## Quick Reference (Priority Order)

| # | Category | Impact | Key Checks | Anti-Patterns |
|---|----------|--------|------------|---------------|
| 1 | Accessibility | CRITICAL | Contrast 4.5:1, alt text, keyboard nav, aria-labels | Removing focus rings, icon-only buttons without labels |
| 2 | Touch & Interaction | CRITICAL | Min 44×44px targets, 8px+ spacing, loading feedback | Hover-only interaction, 0ms state changes |
| 3 | Style Selection | HIGH | Match product type, consistency, SVG icons (no emoji) | Mixing flat & skeuomorphic, emoji as icons |
| 4 | Layout & Responsive | HIGH | Mobile-first breakpoints, no horizontal scroll | Fixed px containers, disable zoom |
| 5 | Typography & Color | MEDIUM | Base 16px, line-height 1.5, semantic color tokens | Text <12px, gray-on-gray, raw hex in components |
| 6 | Animation | MEDIUM | Context-aware timing, spatial continuity | One duration for all, animating width/height, no reduced-motion |
| 7 | Forms & Feedback | MEDIUM | Visible labels, error near field, helper text | Placeholder-only labels, errors only at top |

## Neumorphism (新拟态) Style Spec

From `data/styles.csv` row 2 (Style ID: `neumorphism`):

- **Colors**: Monochromatic pastels; light source top-left
- **Border radius**: 12–16px (project overrides allowed)
- **Shadows**: Multi-layer soft shadows
  - Convex (外凸): `box-shadow: -5px -5px 15px rgba(0,0,0,0.1), 5px 5px 15px rgba(255,255,255,0.8)`
  - Concave (内凹/按下): `inset` same shadow group
- **Press animation**: 150ms, `transform: scale` on active
- **Best for**: Health/wellness, meditation, fitness, minimal UIs
- **Avoid for**: Complex apps, critical accessibility, data-heavy dashboards
- **Accessibility risk**: HIGH — must verify text contrast 4.5:1

## How to Use (No Python Required)

This skill ships CSV datasets under `src/ui-ux-pro-max/data/`. Read them directly:

| File | Contents |
|------|----------|
| `styles.csv` | 79 UI styles with colors, effects, checklists, design tokens |
| `colors.csv` | 192 industry-aligned color palettes |
| `typography.csv` | 74 font pairings with Google Fonts links |
| `ux-guidelines.csv` | 119 UX/accessibility rules |
| `products.csv` | 192 product type reasoning profiles |
| `landing.csv` | 34 landing page modes |
| `charts.csv` | 25 chart type recommendations |
| `stacks/*.csv` | 22 tech-stack UI guidelines (incl. `html-tailwind.csv`) |

If Python 3 is available, the full search engine is at `src/ui-ux-pro-max/scripts/search.py`:
```bash
python src/ui-ux-pro-max/scripts/search.py --design-system "产品描述"
python src/ui-ux-pro-max/scripts/search.py --domain ux "触控目标"
python src/ui-ux-pro-max/scripts/search.py --style "neumorphism"
python src/ui-ux-pro-max/scripts/search.py --stack html-tailwind
```

## Design System Output Checklist

For any UI deliverable, verify:
- [ ] No emoji as icons (use SVG: Lucide / Phosphor / Heroicons)
- [ ] All interactive elements have `cursor: pointer`
- [ ] Interaction timing matches platform & component
- [ ] Light mode: text contrast ≥ 4.5:1
- [ ] Focus state visible for keyboard nav
- [ ] Respect `prefers-reduced-motion`
- [ ] Text / chips / badges reflow without clipping
- [ ] Responsive at 375px / 768px / 1024px / 1440px
