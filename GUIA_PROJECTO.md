# 🎓 GUÍA DEL PROYECTO - Planaxis Project

### ✅ **Archivos HTML **
- ✅ `index.html` - Página principal con explicaciones de estructura semántica
- ✅ `festival-guide.html` - Guía del festival con componentes explicados
- ✅ `contact.html` - Formulario con glassmorphism explicado

**Marcadores importantes:** Buscar `⚠️ PERSONALIZA` para saber dónde cambiar contenido

---

### ✅ **Archivos JavaScript **
- ✅ `js/main.js` - Lógica completa con analogías Feynman
  - Sistema i18n explicado
  - localStorage como "libreta del navegador"
  - Event listeners como "vigilantes"
  - preventDefault como "interceptar una carta"

---

### ✅ **Archivos CSS Traducidos (Principales)**
- ✅ `css/variables.css` - **COMPLETO** - Sistema de design tokens
- ✅ `css/reset.css` - **COMPLETO** - Normalización de navegadores
- ✅ `css/layout.css` - **COMPLETO** - Flexbox, Grid, contenedores

---

### **1. Empezar Por el Glosario**
Abre `README.md` y lee el **GLOSARIO TÉCNICO** primero. Allí encontrarás:
- Explicaciones de Flexbox, Grid, z-index, rem vs px
- Analogías simples para cada concepto
- Ejemplos del mundo real

### **2. Explorar el Código HTML**
Los archivos HTML tienen explicaciones de:
- **¿POR QUÉ?** usamos cada elemento
- **¿CÓMO FUNCIONA?** la técnica
- **RESULTADO:** qué logramos

### **3. Entender el JavaScript**
`js/main.js` explica paso a paso:
- Cómo funciona el cambio de idioma
- Cómo se guarda la preferencia del usuario
- Cómo funciona el formulario de contacto

### **4. Estudiar el CSS**
Los archivos CSS traducidos (`variables.css`, `reset.css`, `layout.css`) explican:
- Por qué cada propiedad es necesaria
- Cómo trabajan juntas las propiedades
- Analogías del mundo real para conceptos abstractos

---

## 🔑 **Conceptos Clave Para Dominar**

### **1. Flexbox (Sistema de Una Dimensión)**
**Archivo:** `css/layout.css`
```css
.flex-center {
  display: flex;
  justify-content: center;  /* Horizontal */
  align-items: center;      /* Vertical */
}
```
**Analogía:** Como organizar libros en UN estante con reglas especiales de alineación.

---

### **2. CSS Grid (Sistema de Dos Dimensiones)**
**Archivo:** `css/layout.css`
```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-md);
}
```
**Analogía:** Como una tabla de Excel para layout - defines filas y columnas.

---

### **3. CSS Variables (Design Tokens)**
**Archivo:** `css/variables.css`
```css
:root {
  --color-accent-gold: #ffd700;
}

.button {
  background: var(--color-accent-gold);
}
```
**Analogía:** Como tener un "libro de recetas" - defines el valor una vez, úsalo en todas partes.

---

### **4. Box-Sizing: Border-Box**
**Archivo:** `css/reset.css`
```css
* {
  box-sizing: border-box;
}
```
**Analogía:** Una caja de zapatos. Con border-box, el papel burbuja (padding) va DENTRO - el tamaño exterior nunca cambia.

---

### **5. Z-Index (Capas de Apilamiento)**
**Archivo:** `css/variables.css`
```css
--z-content: 1;      /* Contenido (abajo) */
--z-sidebar: 900;    /* Sidebar flotante */
--z-header: 1000;    /* Header (arriba de todo) */
```
**Analogía:** Como capas de hojas de papel transparente. Números más altos están "más arriba" en la pila.

---

### **6. Position: Fixed**
**Archivo:** `css/layout.css`
```css
.fixed {
  position: fixed;
}
```
**Analogía:** Como una nota adhesiva en tu monitor. No importa qué desplaces en la pantalla, la nota permanece en el mismo lugar.

---

### **7. localStorage**
**Archivo:** `js/main.js`
```javascript
localStorage.setItem('preferred-language', 'es');
const lang = localStorage.getItem('preferred-language');
```
**Analogía:** Una libreta que el navegador guarda para tu sitio. Los datos permanecen incluso si cierras el navegador.

---

### **8. Event Listeners**
**Archivo:** `js/main.js`
```javascript
button.addEventListener('click', function() {
  console.log('¡Me hicieron clic!');
});
```
**Analogía:** Como tener un timbre en tu puerta. El timbre "escucha" cuando alguien lo presiona y entonces suena.

---

## 📞 **Estructura de Archivos Clave**

```
📦 the_history_of_planaxis/
│
├── 📄 index.html ✅ (Principal)
├── 📄 festival-guide.html ✅ (Guía)
├── 📄 contact.html ✅ (Contacto)
│
├── 📂 js/
│   ├── main.js ✅ (Lógica principal)
│   └── translations.js (Textos EN/ES)
│
├── 📂 css/
│   ├── variables.css  (Design tokens)
│   ├── reset.css  (Normalización)
│   ├── layout.css  (Estructura)
│   ├── header.css  
│   ├── hero.css 
│   ├── sidebar.css  
│   ├── contact.css  
│   ├── guide.css  
│   └── responsive.css 
│
├── 📄 README.md ✅ (Con GLOSARIO TÉCNICO)
└── 📄 GUIA_ESTUDIANTE.md ✅ (Este archivo)
```

---

