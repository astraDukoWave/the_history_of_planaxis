# Tomorrowland 2018: The Story of Planaxis

A static, responsive landing page for Tomorrowland 2018's underwater kingdom theme. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools.

Pagina de aterrizaje estatica y responsiva para el tema del reino submarino de Tomorrowland 2018. Construida con HTML, CSS y JavaScript vanilla — sin frameworks, sin herramientas de compilacion.

---

## Tech Stack / Stack Tecnologico

| Layer       | Technologies                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------|
| Markup      | HTML5 (semantic elements, ARIA attributes)                                                                      |
| Styling     | CSS3 — `@layer` cascade architecture, custom properties, Grid, Flexbox, `backdrop-filter`, logical properties, scroll-driven animations (`animation-timeline: view()`), View Transitions API, fluid typography via `clamp()` |
| Scripting   | Vanilla JavaScript (ES6 modules), localStorage API                                                              |
| Animation   | GSAP + ScrollTrigger + Lenis (progressive enhancement, loaded via CDN)                                          |
| Images      | WebP format                                                                                                     |
| Build       | None — runs directly in the browser                                                                             |

---

## Architecture / Arquitectura

### CSS — 5-Layer Cascade

All styles are organized using `@layer` to enforce explicit cascade ordering, eliminating specificity conflicts:

```
@layer reset, base, layout, components, utilities;
```

| Layer        | Priority | Responsibility                                           |
|--------------|----------|----------------------------------------------------------|
| `reset`      | 1 (lowest) | Browser normalization, box-sizing, font smoothing       |
| `base`       | 2        | Design tokens, typography scale, semantic element styles |
| `layout`     | 3        | Wrapper, grid systems, section containers                |
| `components` | 4        | Cards, buttons, navigation, hero, bento grid             |
| `utilities`  | 5 (highest) | `.flow`, `.wrapper[data-width]`, `.visually-hidden`   |

`responsive.css` sits **outside** any layer, giving it the highest cascade priority for breakpoint overrides.

### JavaScript — ES6 Module System

```
index.html
  ├── <script type="module"> js/main.js
  │     └── imports js/translations.js
  └── <script type="module"> js/animations.js (deferred, progressive)
```

- **`main.js`** — Application core: i18n engine (reads `data-i18n` attributes, swaps text from translations object), language persistence via `localStorage`, contact form handling with `preventDefault`, mobile menu toggle, sidebar interactions.
- **`translations.js`** — Centralized EN/ES string map exported as a single object. Adding a language means adding a key to this file.
- **`animations.js`** — GSAP progressive enhancement with 4-tier device profiling:

| Tier | Condition                   | Behavior                                                      |
|------|-----------------------------|---------------------------------------------------------------|
| 0    | `prefers-reduced-motion`    | No JS animations                                              |
| 1    | Low-end device              | CSS-only (`animation-timeline: view()`)                       |
| 2    | Mid-range device            | GSAP hero timeline + stagger reveals + scroll progress bar    |
| 3    | High-end device             | Full GSAP: pin, parallax, CSS variable animation, Lenis smooth scroll, magnetic hover, horizontal scroll lineup |

Responsive breakpoints are handled via `ScrollTrigger.matchMedia()` (desktop >= 1024px gets pin/parallax; mobile gets simplified stagger).

### Pages

| File                  | Purpose                                                        |
|-----------------------|----------------------------------------------------------------|
| `index.html`          | Main landing page — hero, content sections, bento grid, footer |
| `contact.html`        | Contact form with glassmorphism design and simulated submission |
| `festival-guide.html` | Festival information: lineup, DreamVille, tickets              |

---

## Project Structure / Estructura del Proyecto

```
the_history_of_planaxis/
├── index.html                  # Main landing page
├── contact.html                # Contact form (glassmorphism)
├── festival-guide.html         # Festival guide and lineup
├── css/
│   ├── style.css               # Primary stylesheet — all 5 @layer definitions, design tokens, typography, components
│   ├── reset.css               # Browser normalization (imported by style.css @layer reset)
│   ├── responsive.css          # Mobile-first media queries (outside @layer for max priority)
│   ├── contact.css             # Contact page-specific styles
│   ├── guide.css               # Festival guide page-specific styles
│   └── components/
│       ├── header.css          # Transparent nav with glassmorphism on scroll
│       ├── hero.css            # Full-screen hero with responsive background images
│       └── sidebar.css         # Fixed utility sidebar with animated hover
├── js/
│   ├── main.js                 # App logic: i18n, form handling, UI interactions
│   ├── translations.js         # EN/ES translation strings (ES6 export)
│   └── animations.js           # GSAP animation module with device profiling
├── assets/
│   ├── images/                 # WebP assets (hero backgrounds, festival photos)
│   └── icons/                  # SVG icons directory
├── README.md
└── GUIA_PROJECTO.md            # Learning guide for beginners (Spanish)
```

---

## Design System / Sistema de Diseno

### Color Palette — Ocean Theme

| Token                  | Value                     | Role                       |
|------------------------|---------------------------|----------------------------|
| `--color-deep-blue`    | `hsl(220 47% 5%)`        | Primary background         |
| `--color-ocean-dark`   | `hsl(214 60% 15%)`       | Secondary background       |
| `--color-accent-gold`  | `hsl(51 100% 50%)`       | Primary accent             |
| `--color-accent-teal`  | `hsl(187 100% 42%)`      | Secondary accent (interactive states) |
| `--color-text-primary` | `hsl(0 0% 100%)`         | Primary text               |
| `--color-text-muted`   | `hsl(210 25% 70%)`       | Secondary text             |

### Typography

System font stack — no external font loading. Fluid scale using `clamp()`:

| Token              | Range       | Computed  |
|--------------------|-------------|-----------|
| `--font-size-sm`   | 0.875–0.9375rem | 14–15px |
| `--font-size-base` | 1–1.125rem     | 16–18px |
| `--font-size-md`   | 1.125–1.25rem  | 18–20px |
| `--font-size-lg`   | 1.5–2rem       | 24–32px |
| `--font-size-xl`   | 2–3rem         | 32–48px |
| `--font-size-2xl`  | 2.5–4rem       | 40–64px |

### Spacing

8px base unit. Scale adjusts at tablet+ breakpoints via media query:

| Token          | Mobile   | Tablet+  |
|----------------|----------|----------|
| `--space-3xs`  | 0.25rem (4px)  | —        |
| `--space-2xs`  | 0.5rem (8px)   | —        |
| `--space-xs`   | 0.75rem (12px) | —        |
| `--space-sm`   | 1rem (16px)    | —        |
| `--space-md`   | 1.5rem (24px)  | —        |
| `--space-lg`   | 2rem (32px)    | —        |
| `--space-xl`   | 3rem (48px)    | 4rem (64px)  |
| `--space-2xl`  | 4rem (64px)    | 5rem (80px)  |
| `--space-3xl`  | 6rem (96px)    | 8rem (128px) |

---

## Features / Funcionalidades

### Design

- Full-screen hero section with responsive background images (desktop/mobile variants)
- Transparent header with glassmorphism effect (`backdrop-filter: blur`) that activates on scroll
- Fixed sidebar navigation with animated hover effects
- Glassmorphism contact form with frosted-glass aesthetic
- Responsive from 320px to 4K displays
- Bento grid layout for content sections

### Functionality

- Internationalization (i18n) — English and Spanish with `data-i18n` attribute-driven text replacement
- Language preference persistence via `localStorage`
- Contact form with client-side validation and simulated submission (replace `setTimeout` with `fetch()` for a real backend)
- Modular ES6 architecture — each concern in its own module

### Accessibility

- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`)
- ARIA labels and landmarks for screen readers
- Keyboard navigation support
- `prefers-reduced-motion` respected at both CSS and JS layers
- Proper heading hierarchy (h1 through h6)
- WCAG AAA color contrast ratios (white on deep ocean ~14:1)

### Performance

- System font stack (zero external font requests)
- No build process, no bundler, no runtime dependencies
- WebP images with responsive `srcset` variants
- Deferred JavaScript execution (`type="module"` at end of body)
- Mobile-first CSS (base styles are mobile; desktop enhancements added via `min-width` queries)

---

## Getting Started / Inicio Rapido

Clone the repository and serve the files with any static server:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve

# Then open http://localhost:8000
```

No installation, no `npm install`, no build step required.

### Responsive Breakpoints

| Breakpoint     | Width      | Layout changes                              |
|----------------|------------|---------------------------------------------|
| Mobile         | < 768px    | Hamburger menu, sidebar hidden, single column |
| Tablet         | 768–1023px | Horizontal nav, toggleable sidebar           |
| Desktop        | 1024px+    | Full layout, visible sidebar, GSAP pin/parallax |
| Large Desktop  | 1440px+    | Enhanced spacing and typography scaling      |

---

## Adding a New Language / Agregar un Nuevo Idioma

1. Open `js/translations.js`
2. Add a new key (e.g. `fr`) following the existing `en`/`es` structure
3. Translate all string values
4. Add a language button to the header nav in each HTML file
5. The i18n engine in `main.js` picks up the new key automatically

---

## Browser Support / Soporte de Navegadores

- Chrome / Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari iOS 12+
- Chrome Android (latest)

**Note:** `@layer`, `backdrop-filter`, and scroll-driven animations require modern browser versions. The site degrades gracefully in older browsers.

---

## License / Licencia

Educational project. Tomorrowland 2018: The Story of Planaxis.

For official Tomorrowland information, visit [tomorrowland.com](https://www.tomorrowland.com).
