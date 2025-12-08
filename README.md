# Tomorrowland 2018: The Story of Planaxis

A modern, responsive landing page for Tomorrowland's mystical underwater kingdom of Planaxis, featuring an immersive dark ocean theme with educational Feynman-methodology comments throughout.

## 🌊 Theme

The design uses an ocean-inspired color palette representing the deep sea kingdom of Planaxis:

- **Deep Ocean Black** (#050a14) - Primary background
- **Ocean Blue** (#0a1e3c) - Secondary backgrounds and overlays
- **Golden Seahorse** (#ffd700) - Primary accent color
- **Bioluminescent Cyan** (#00bcd4) - Secondary accent for interactive states
- **Pure White** (#ffffff) - Primary text
- **Muted Blue-Gray** (#a0b3c5) - Secondary text

## 📁 Project Structure

```
the_history_of_planaxis/
├── index.html              # Main landing page with semantic structure
├── contact.html            # Contact form page with glassmorphism design
├── festival-guide.html     # Festival information and guide
├── js/
│   ├── main.js            # Main JavaScript (i18n, form handling, UI)
│   └── translations.js    # Translation strings (EN/ES)
├── css/
│   ├── reset.css          # Browser normalization
│   ├── variables.css      # CSS custom properties (colors, spacing, fonts)
│   ├── layout.css         # Grid/Flexbox foundation and utilities
│   ├── header.css         # Transparent navigation overlay + language selector
│   ├── hero.css           # Full-screen hero section
│   ├── sidebar.css        # Fixed utility navigation
│   ├── contact.css        # Contact form glassmorphism styles
│   ├── guide.css          # Festival guide page styles
│   └── responsive.css     # Mobile-first media queries
├── assets/
│   ├── images/            # Image assets (hero backgrounds, etc.)
│   └── icons/             # SVG icons for sidebar
└── README.md              # This file
```

## ✨ Features

### Design Features
- **Full-screen hero section** with background image support
- **Transparent header** that overlays the hero and gains background on scroll
- **Fixed sidebar navigation** with animated hover effects
- **Smooth scroll behavior** for anchor links
- **Responsive design** with mobile-first approach (320px - 4K screens)
- **Glassmorphism contact form** with frosted glass effect and underwater aesthetic
- **Language selector (EN/ES)** with localStorage persistence

### Functionality Features
- **Internationalization (i18n)** - Full English and Spanish translations
- **Contact form** with simulated submission and feedback
- **Language preference persistence** using localStorage
- **Modular JavaScript architecture** with ES6 modules

### Accessibility Features
- Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`)
- ARIA labels and landmarks for screen readers
- Keyboard navigation support
- `prefers-reduced-motion` support for users with motion sensitivity
- Proper heading hierarchy (h1 → h2 → h3)
- Sufficient color contrast ratios (WCAG AAA compliant)

### Performance Features
- System font stack (no external font loading)
- Minimal CSS with no dependencies
- Mobile-first responsive design (loads mobile CSS first)
- Deferred JavaScript execution (scripts at end of body)

## 🚀 Getting Started

1. **Open the project:**
   ```bash
   cd the_history_of_planaxis
   ```

2. **View in browser:**
   Simply open `index.html` in your web browser, or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (npx)
   npx serve
   ```

3. **Add your images:**
   - Replace the gradient placeholder in `index.html` with your hero image
   - Add images to `assets/images/`
   - Update the `style="background-image: ..."` attribute in the hero section

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (hamburger menu, hidden sidebar)
- **Tablet:** 768px - 1023px (horizontal nav, toggleable sidebar)
- **Desktop:** 1024px+ (full layout, visible sidebar)
- **Large Desktop:** 1440px+ (enhanced spacing and typography)

## 🎨 Customization

### Colors
All colors are defined as CSS custom properties in `css/variables.css`. Update them there to change the entire theme:

```css
--color-bg-primary: #050a14;
--color-accent-gold: #ffd700;
/* etc. */
```

### Spacing
The design uses an 8px spacing system. All spacing values are in `css/variables.css`:

```css
--spacing-xs: 0.5rem;   /* 8px */
--spacing-sm: 1rem;     /* 16px */
--spacing-md: 1.5rem;   /* 24px */
/* etc. */
```

### Typography
Font sizes and weights are also variables:

```css
--font-size-base: 1rem;      /* 16px */
--font-size-xl: 2rem;        /* 32px */
--font-weight-bold: 700;
/* etc. */
```

## 📚 Educational Comments

Every file contains comprehensive **Feynman-methodology comments** that explain:

1. **WHY** we're doing something (the reason/purpose)
2. **HOW** it works (the mechanism)
3. **RESULT** what it achieves (the outcome)

These comments are designed to help beginners understand modern web development practices, not just what the code does, but why it's written that way.

## 🧪 Testing

Test the site across different:
- **Browsers:** Chrome, Firefox, Safari, Edge
- **Devices:** Mobile phones, tablets, laptops, desktop monitors
- **Screen sizes:** 320px (small phones) to 4K displays
- **Accessibility tools:** Screen readers (NVDA, JAWS, VoiceOver)

## 📄 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari iOS 12+
- Chrome Android (latest)

## 🔧 Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, Media Queries, Backdrop-filter (glassmorphism)
- **Vanilla JavaScript (ES6 Modules)** - No frameworks or libraries
- **localStorage API** - For language preference persistence
- **No build process required** - Works directly in browser

## 🌐 Internationalization (i18n)

The site supports English and Spanish with a simple language switcher in the navigation:

- Click **EN** or **ES** in the header to switch languages
- Language preference is saved in localStorage
- All text content is translated dynamically
- Translations are centralized in `js/translations.js`

### Adding a New Language

1. Open `js/translations.js`
2. Add a new language object (e.g., `fr` for French)
3. Copy the structure from `en` or `es`
4. Translate all keys
5. Update the language selector in HTML files

## 📬 Contact Form

The contact form (`contact.html`) features:

- **Glassmorphism design** with backdrop blur effect
- **Form validation** for required fields
- **Simulated submission** with 2-second delay
- **Visual feedback** (loading state, success message)
- **Fully translatable** with i18n support

Note: The form currently simulates submission. To connect to a real backend:
1. Replace the `setTimeout` in `main.js` with a `fetch()` call
2. Send data to your API endpoint
3. Handle real success/error responses

## 📝 License

This is an educational project for Tomorrowland 2018: The Story of Planaxis.

## 🤝 Contributing

This is a learning project. Feel free to:
- Study the code and comments
- Experiment with modifications
- Use it as a template for your own projects

## 📧 Contact

For questions about the Planaxis story or Tomorrowland, visit [tomorrowland.com](https://www.tomorrowland.com)

---

**Dive into the deep ocean kingdom of Planaxis** 🌊✨🐚

