# Tomorrowland 2018: The Story of Planaxis

A modern, responsive landing page for Tomorrowland's mystical underwater kingdom of Planaxis, featuring an immersive dark ocean theme with educational Feynman-methodology comments throughout.

---

## 📖 GLOSARIO TÉCNICO - Aprende los Conceptos Clave

Este glosario explica los términos técnicos más importantes del proyecto usando **analogías simples** y **lenguaje natural**. Léelo antes de explorar el código para entender mejor cómo funciona todo.

### 🎨 **CSS & DISEÑO**

#### **CSS Custom Properties (Variables CSS)**
**¿Qué es?** Como tener un "libro de recetas" para tu diseño. Defines un valor una vez (ej. `--color-gold: #ffd700`) y lo usas en todo el sitio.

**¿Por qué usarlo?** Si quieres cambiar el color dorado a plateado, solo lo cambias en un lugar y automáticamente se actualiza en todas partes donde se usa. Sin variables, tendrías que cambiar `#ffd700` en cientos de lugares.

**Analogía:** Es como tener un apodo para un número de teléfono. En vez de memorizar "555-1234" en 50 lugares, memorizas "Número de Mamá" una vez.

---

#### **Flexbox (Sistema de Layout Flexible)**
**¿Qué es?** Una forma de organizar elementos en una línea (horizontal o vertical) con superpoderes: puedes centrarlos, distribuir el espacio automáticamente, cambiar el orden, etc.

**¿Por qué usarlo?** Antes de Flexbox, centrar cosas verticalmente era un dolor de cabeza. Flexbox hace estas tareas comunes súper fáciles.

**Analogía:** Imagina que estás organizando libros en un estante. Flexbox es como tener reglas especiales: "pon todos los libros al centro", "distribuye el espacio equitativamente", "el libro rojo va siempre al final". El estante ajusta todo automáticamente.

**Términos clave:**
- `display: flex` → Activa el modo Flexbox
- `justify-content` → Controla distribución horizontal (inicio, centro, fin, espaciado)
- `align-items` → Controla alineación vertical
- `flex-direction: column` → Cambia de horizontal a vertical

---

#### **CSS Grid (Sistema de Layout en Cuadrícula)**
**¿Qué es?** Como una tabla de Excel para tu layout. Puedes definir filas y columnas y colocar elementos en celdas específicas.

**¿Por qué usarlo?** Para layouts complejos con múltiples columnas y filas (como una galería de fotos), Grid es más poderoso que Flexbox.

**Analogía:** Flexbox es como organizar libros en UN estante. Grid es como organizar una biblioteca entera con múltiples estantes (columnas) y pisos (filas). Cada libro puede ocupar varias celdas.

**Ejemplo en el código:**
```css
.guide-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas iguales */
  gap: 32px; /* Espacio entre tarjetas */
}
```

---

#### **Glassmorphism (Efecto Vidrio Esmerilado)**
**¿Qué es?** Un efecto de diseño moderno donde un elemento parece ser vidrio translúcido/esmerilado. Puedes ver a través de él, pero borroso.

**¿Por qué usarlo?** Crea profundidad y jerarquía visual sin bloquear completamente el fondo. Se ve futurista y elegante.

**Analogía:** Como la ventana del baño con vidrio esmerilado. Puedes ver formas y colores detrás, pero no los detalles claros. Permite luz pero mantiene privacidad.

**Cómo se logra:**
- `background: rgba(...)` → Fondo semi-transparente
- `backdrop-filter: blur(12px)` → Difumina lo que está DETRÁS del elemento
- `border: 1px solid rgba(...)` → Borde sutil para definir los bordes

---

#### **z-index (Capas de Apilamiento)**
**¿Qué es?** Controla qué elementos aparecen "encima" de otros cuando se superponen. Como capas de hojas de papel transparente.

**¿Por qué usarlo?** Para asegurar que el menú de navegación siempre esté encima del contenido, o que un modal tape todo lo demás.

**Analogía:** Imagina que estás haciendo un collage con hojas de papel transparente. El z-index es como el orden de las hojas en tu pila. z-index: 1 está al fondo, z-index: 1000 está hasta arriba.

**En el código:**
- `--z-content: 1` → Contenido normal (abajo)
- `--z-sidebar: 900` → Sidebar flotante
- `--z-header: 1000` → Header (arriba de todo)

---

#### **Media Queries (Consultas de Medios)**
**¿Qué es?** Reglas CSS que solo se aplican en ciertos tamaños de pantalla. Esto es lo que hace que tu sitio se vea bien tanto en teléfonos como en computadoras.

**¿Por qué usarlo?** Un layout de 3 columnas se ve bien en escritorio pero horrible en móvil. Media queries te permiten cambiar el diseño según el dispositivo.

**Analogía:** Como tener un guardarropa con diferentes outfits para diferentes ocasiones. "Si estoy en una fiesta formal, usar traje. Si estoy en la playa, usar shorts." Media queries dicen "Si estoy en móvil, 1 columna. Si estoy en escritorio, 3 columnas."

**Ejemplo:**
```css
/* Móvil por defecto */
.hero-title { font-size: 2rem; }

/* Escritorio (1024px+) */
@media (min-width: 1024px) {
  .hero-title { font-size: 3rem; }
}
```

---

#### **rem vs px (Unidades de Medida)**
**¿Qué es la diferencia?**
- `px` (píxeles) → Tamaño fijo. 16px siempre es 16px.
- `rem` (root em) → Relativo al tamaño de fuente del navegador. 1rem = tamaño de fuente base (usualmente 16px).

**¿Por qué usar rem?** Accesibilidad. Si un usuario con baja visión aumenta el tamaño de texto en su navegador a 20px, tu `1rem` se convierte automáticamente en 20px. Con `px` fijo, el texto permanece pequeño.

**Analogía:** `px` es como decir "dame EXACTAMENTE 16 granos de arroz". `rem` es como decir "dame una cucharada de arroz" - el tamaño de la cucharada se ajusta según las necesidades de la persona.

---

### 💻 **JAVASCRIPT**

#### **ES6 Modules (Módulos de JavaScript)**
**¿Qué es?** Una forma de organizar tu código JavaScript en archivos separados y compartir funciones/datos entre ellos.

**¿Por qué usarlo?** En vez de tener TODO tu JavaScript en un archivo gigante de 5000 líneas, lo divides en archivos pequeños y manejables. Cada archivo tiene un propósito claro.

**Analogía:** Como organizar tu cocina. En vez de tener TODO (platos, cubiertos, comida, ollas) en un cajón gigante, tienes cajones separados. Cuando necesitas un tenedor, sabes exactamente a qué cajón ir.

**En el código:**
```javascript
// translations.js EXPORTA datos
export const translations = { ... };

// main.js IMPORTA esos datos
import { translations } from './translations.js';
```

---

#### **localStorage (Almacenamiento Local)**
**¿Qué es?** Como una libreta que el navegador guarda específicamente para tu sitio web. Los datos permanecen incluso si cierras el navegador.

**¿Por qué usarlo?** Para recordar preferencias del usuario (como su idioma preferido) sin necesidad de un servidor o base de datos.

**Analogía:** Es como dejar una nota pegada en tu refrigerador. Mañana cuando vuelvas a la cocina, la nota todavía está ahí. localStorage guarda información que persiste entre visitas.

**Limitaciones:** Solo guarda strings (texto), no objetos complejos. Máximo ~5-10MB de datos.

**En el código:**
```javascript
// GUARDAR preferencia
localStorage.setItem('preferred-language', 'es');

// RECUPERAR preferencia
const lang = localStorage.getItem('preferred-language'); // 'es'
```

---

#### **Event Listeners (Escuchadores de Eventos)**
**¿Qué es?** Como poner un "vigilante" en un elemento que espera que algo pase (un clic, hover, tecla presionada) y entonces ejecuta tu código.

**¿Por qué usarlo?** Para hacer tu sitio interactivo. Sin event listeners, nada pasaría cuando el usuario hace clic en botones.

**Analogía:** Como tener un timbre en tu puerta. El timbre "escucha" cuando alguien lo presiona y entonces suena. Un event listener "escucha" cuando el usuario hace clic en un botón y entonces ejecuta una función.

**En el código:**
```javascript
button.addEventListener('click', function() {
  console.log('¡Me hicieron clic!');
});
```

---

#### **preventDefault() (Prevenir Comportamiento Predeterminado)**
**¿Qué es?** Le dice al navegador "no hagas tu comportamiento normal para este evento, déjame manejarlo yo".

**¿Por qué usarlo?** Los formularios normalmente recargan la página cuando los envías. Con `preventDefault()`, detienes eso para poder manejar el envío con JavaScript (mostrar animaciones, enviar por AJAX, etc.).

**Analogía:** Es como interceptar una carta antes de que llegue al buzón. Normalmente, cuando pones una carta en el buzón (submit del formulario), el cartero (navegador) la recoge y la envía (recarga la página). `preventDefault()` te permite atrapar la carta antes: "¡Espera! Yo quiero revisar/modificar esto primero."

---

#### **DOM (Document Object Model)**
**¿Qué es?** La representación que el navegador hace de tu HTML. Es como un "árbol" de objetos JavaScript que representa tu página.

**¿Por qué importa?** JavaScript no puede tocar el HTML directamente. Interactúa con el DOM. Cuando haces `document.querySelector('.button')`, estás buscando en el árbol DOM.

**Analogía:** Tu HTML es como el plano de una casa. El DOM es la casa construida. JavaScript es el arquitecto que puede hacer modificaciones a la casa (mover muebles, cambiar colores) pero solo puede trabajar con la casa construida (DOM), no con el plano (HTML).

---

#### **querySelector & querySelectorAll**
**¿Qué es?** Funciones para ENCONTRAR elementos en tu página usando selectores CSS.

**Diferencia:**
- `querySelector()` → Encuentra el PRIMER elemento que coincide
- `querySelectorAll()` → Encuentra TODOS los elementos que coinciden

**Analogía:** Como buscar en una biblioteca.
- `querySelector('.book')` → "Dame el PRIMER libro que encuentres"
- `querySelectorAll('.book')` → "Dame TODOS los libros"

**En el código:**
```javascript
const primerBoton = document.querySelector('.button'); // Uno
const todosLosBotones = document.querySelectorAll('.button'); // Lista
```

---

### 🌐 **WEB & ACCESIBILIDAD**

#### **Semantic HTML (HTML Semántico)**
**¿Qué es?** Usar tags HTML que describen el SIGNIFICADO del contenido, no solo cómo se ve.

**¿Por qué usarlo?** Los lectores de pantalla (para personas ciegas) y motores de búsqueda entienden mejor tu página.

**Mal:** `<div class="header">` (solo dice "es un contenedor")
**Bien:** `<header>` (dice "esto es el encabezado de la página")

**Otros ejemplos:**
- `<nav>` → Navegación
- `<main>` → Contenido principal
- `<aside>` → Contenido tangencial (sidebar)
- `<footer>` → Pie de página
- `<article>` → Contenido auto-contenido (como un post de blog)

---

#### **ARIA (Accessible Rich Internet Applications)**
**¿Qué es?** Atributos extra que agregas al HTML para hacer tu sitio más accesible para personas con discapacidades.

**¿Por qué usarlo?** Los lectores de pantalla usan ARIA para entender la estructura y estado de tu página.

**Ejemplos comunes:**
- `aria-label="Cerrar menú"` → Describe un elemento (útil para íconos sin texto)
- `aria-expanded="true"` → Indica si algo está expandido/colapsado
- `aria-hidden="true"` → Oculta elementos decorativos de lectores de pantalla
- `aria-current="page"` → Marca la página actual en navegación

---

#### **WCAG (Web Content Accessibility Guidelines)**
**¿Qué es?** Estándares internacionales que definen cómo hacer sitios web accesibles para personas con discapacidades.

**Niveles:**
- **A** → Básico
- **AA** → Estándar (la mayoría de sitios deben cumplir este)
- **AAA** → Óptimo

**Ejemplo importante:** Ratio de contraste de texto
- **AA:** 4.5:1 mínimo (texto normal), 3:1 (texto grande)
- **AAA:** 7:1 mínimo (texto normal), 4.5:1 (texto grande)

**En nuestro código:** Blanco sobre negro oscuro tiene ratio ~14:1 (¡excelente!)

---

#### **Viewport (Área Visible)**
**¿Qué es?** El área visible de tu página web en el navegador. En móvil es pequeño, en escritorio es grande.

**Meta tag importante:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**¿Por qué?** Sin esto, los navegadores móviles renderizan la página a 980px de ancho y hacen zoom out, haciendo todo diminuto.

**Analogía:** Como mirar a través de una ventana. El viewport es el tamaño de tu ventana. Este meta tag le dice al móvil "tu ventana es tu tamaño real (375px), no pretendas ser una ventana de escritorio (980px)".

---

### 🎯 **CONCEPTOS DE DISEÑO**

#### **Mobile-First (Móvil Primero)**
**¿Qué es?** Una estrategia de diseño donde diseñas para móvil PRIMERO, luego agregas mejoras para pantallas más grandes.

**¿Por qué?** La mayoría del tráfico web es móvil ahora. Es más fácil agregar features para escritorio que quitarlas para móvil.

**En el código:**
```css
/* Móvil por defecto */
.nav-links { display: none; }

/* Escritorio - AGREGA features */
@media (min-width: 768px) {
  .nav-links { display: flex; }
}
```

---

#### **Responsive Design (Diseño Responsivo)**
**¿Qué es?** Tu sitio se adapta a cualquier tamaño de pantalla: teléfono, tablet, escritorio, TV.

**Cómo se logra:**
1. **Fluid layouts** → Usar % en vez de px fijos
2. **Flexible images** → `max-width: 100%` para que nunca se desborden
3. **Media queries** → Diferentes estilos para diferentes tamaños

**Analogía:** Como un líquido que toma la forma de su contenedor. Tu diseño "fluye" y se adapta a cualquier tamaño de pantalla.

---

#### **Design Tokens (Tokens de Diseño)**
**¿Qué es?** Variables que definen tu sistema de diseño: colores, espaciados, tipografía.

**¿Por qué?** Consistencia. En vez de usar azul arbitrario (#1a2b3c) en 50 lugares, usas `var(--color-primary)` y mantienes consistencia.

**En el código:** Todo el archivo `variables.css` son design tokens.

---

#### **8px Spacing System (Sistema de Espaciado de 8px)**
**¿Qué es?** Todos tus espaciados son múltiplos de 8px: 8, 16, 24, 32, 48, 64...

**¿Por qué?** Crea ritmo visual consistente y hace las decisiones de diseño más fáciles. Es usado por Google, Apple, y muchas otras empresas.

**Analogía:** Como construir con LEGO. Cada pieza es múltiplo de una unidad base. No puedes tener 1.7 bloques - siempre es 1, 2, 3, etc. Todo encaja perfectamente.

---

## 🚀 **Cómo Usar Este Glosario**

1. **Antes de editar el código:** Lee los términos relevantes aquí primero
2. **Mientras lees el código:** Referencia el glosario cuando veas un término desconocido
3. **Al aprender:** Usa las analogías para explicarte conceptos a ti mismo

**Recuerda:** No necesitas memorizar todo. Este glosario es tu referencia rápida mientras aprendes.

---

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

