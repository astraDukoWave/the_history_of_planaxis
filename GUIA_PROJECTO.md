# Guia del Proyecto / Project Guide

Developer reference for navigating and modifying the Planaxis codebase. For architecture overview and design system, see [README.md](README.md).

Referencia para desarrolladores sobre la estructura y modificacion del codigo. Para arquitectura y sistema de diseno, ver [README.md](README.md).

---

## Quick Reference / Referencia Rapida

| Task | File(s) |
|------|---------|
| Change colors, spacing, typography | `css/style.css` (design tokens in `:root`, base layer) |
| Modify hero section | `css/components/hero.css`, hero markup in `index.html` |
| Update navigation / header | `css/components/header.css`, `<header>` in each HTML file |
| Add or edit sidebar links | `css/components/sidebar.css`, `<aside>` in each HTML file |
| Add a new language | `js/translations.js` + language selector in HTML nav |
| Change contact form behavior | `js/main.js` (form submit handler) |
| Adjust animations | `js/animations.js` (GSAP) or `css/style.css` (scroll-driven) |
| Add page-specific styles | Create new CSS file, import in that page's `<head>` |

---

## File Map / Mapa de Archivos

### HTML

| File | Role |
|------|------|
| `index.html` | Landing: hero, content sections, bento grid, footer. Entry point. |
| `contact.html` | Contact form with glassmorphism. Uses `contact.css`. |
| `festival-guide.html` | Festival info: lineup, DreamVille, tickets. Uses `guide.css`. |

**Customization markers:** Search for `PERSONALIZA` or `TODO` in HTML for placeholder content.

### CSS

| File | Layer / Role |
|------|--------------|
| `css/style.css` | Main stylesheet. Declares `@layer` order, defines all 5 layers inline, design tokens, typography, components. Single source of truth for cascade. |
| `css/reset.css` | Imported inside `@layer reset` in style.css. Browser normalization. |
| `css/responsive.css` | Outside `@layer`. Mobile-first media queries. Highest cascade priority. |
| `css/contact.css` | Contact page. Imported in `contact.html`. |
| `css/guide.css` | Festival guide page. Imported in `festival-guide.html`. |
| `css/components/header.css` | Nav overlay, glassmorphism on scroll. |
| `css/components/hero.css` | Full-screen hero, responsive backgrounds. |
| `css/components/sidebar.css` | Fixed sidebar, hover states. |

**Note:** There is no separate `variables.css` or `layout.css`. Tokens and layout live in `style.css`.

### JavaScript

| File | Responsibility |
|------|----------------|
| `js/main.js` | i18n engine (`data-i18n` attribute lookup), `localStorage` persistence, contact form `preventDefault` + validation, mobile menu, sidebar toggle. |
| `js/translations.js` | EN/ES string map. Export: `{ en: {...}, es: {...} }`. |
| `js/animations.js` | GSAP module. Device profiling, hero timeline, scroll reveals, parallax, Lenis. Loaded deferred. |

---

## Common Modifications / Modificaciones Frecuentes

### Change theme colors

Edit `:root` in `css/style.css` (base layer):

```css
--color-deep-blue: hsl(220 47% 5%);
--color-accent-gold: hsl(51 100% 50%);
--color-accent-teal: hsl(187 100% 42%);
```

### Add a new page

1. Create `newpage.html` (copy structure from `index.html`).
2. Add nav link in `<header>` of all HTML files.
3. Create `css/newpage.css` if needed; import in `newpage.html` `<head>`.
4. Add translations in `js/translations.js` under `en` and `es` for any new strings.

### Add a new language (e.g. French)

1. In `js/translations.js`: add `fr: { ... }` with same keys as `en`/`es`.
2. In each HTML file: add `<button data-lang="fr">FR</button>` in the language selector.
3. No changes needed in `main.js`; it reads `data-lang` and looks up the key in `translations`.

### Connect contact form to a backend

In `js/main.js`, locate the form submit handler. Replace the `setTimeout` simulation with:

```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

Handle `response.ok` for success/error UI.

### Adjust responsive breakpoints

Edit `css/responsive.css`. Breakpoints: 768px (tablet), 1024px (desktop), 1440px (large). For GSAP behavior, see `ScrollTrigger.matchMedia()` in `js/animations.js`.

---

## Architecture Decisions / Decisiones de Arquitectura

| Decision | Rationale |
|----------|-----------|
| No build step | Static site; direct browser execution. No bundler overhead. |
| CSS `@layer` | Explicit cascade order. Avoids specificity wars and `!important`. |
| Design tokens in `:root` | Single source for colors, spacing, typography. Easy theming. |
| ES6 modules | Clear separation of concerns. `main.js` and `animations.js` load independently. |
| GSAP progressive enhancement | Animations degrade: Tier 0 (reduced motion) -> Tier 1 (CSS only) -> Tier 2/3 (GSAP). |
| `responsive.css` outside `@layer` | Breakpoint overrides must win over component defaults. |

---

## Testing Checklist / Lista de Pruebas

Before shipping changes:

- [ ] Test language switch (EN/ES) and verify `localStorage` persistence
- [ ] Test contact form validation and submit feedback
- [ ] Verify responsive layout at 320px, 768px, 1024px, 1440px
- [ ] Check `prefers-reduced-motion: reduce` disables GSAP animations
- [ ] Validate keyboard navigation (Tab, Enter on buttons/links)
- [ ] Run Lighthouse (Performance, Accessibility)

---

## Related Docs / Documentacion Relacionada

- [README.md](README.md) — Tech stack, architecture, design system, getting started
