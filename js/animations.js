// ============================================================================
// ANIMATIONS.JS - GSAP-Powered Animation Module
//
// This module implements progressive enhancement on top of the existing
// CSS-first animation layer. It uses GSAP + ScrollTrigger for:
//   - Hero entrance timeline with text split + number counters
//   - Staggered scroll reveals (cascade card/bento entry)
//   - Scroll-pinned storytelling (bento grid)
//   - Parallax hero background
//   - CSS custom property animation (section theming)
//   - Lenis smooth scroll integration
//   - Scroll progress bar
//   - Magnetic hover effect on CTA buttons
//   - Horizontal scroll lineup section
//
// ARCHITECTURE:
// Tier 0: prefers-reduced-motion → no JS animations at all
// Tier 1: low-end device → CSS-only (existing animation-timeline: view())
// Tier 2: mid-range → GSAP hero timeline + stagger + scroll progress
// Tier 3: high-end → full GSAP (pin, parallax, CSS var, Lenis, magnetic, horizontal)
//
// Responsive control via ScrollTrigger.matchMedia():
// - Desktop (>=1024px): pin, parallax, horizontal scroll
// - Mobile (<1024px): simplified stagger, no pin
// - All breakpoints: hero timeline, stagger, scroll progress
// ============================================================================


// ============================================================================
// DEVICE PROFILING
// Determines animation tier based on hardware capabilities.
// ============================================================================

function getAnimationTier() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 0;
  }

  const cores = navigator.hardwareConcurrency || 2;
  const memory = navigator.deviceMemory || 4;

  if (cores <= 2 || memory <= 2) return 1;
  if (cores <= 4 || memory <= 4) return 2;
  return 3;
}


// ============================================================================
// GSAP AVAILABILITY CHECK
// ============================================================================

function isGsapAvailable() {
  return typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
}


// ============================================================================
// HERO TEXT SPLIT
// Wraps each word of the hero title in a <span> for individual animation.
// Preserves the original text for screen readers via aria-label.
// ============================================================================

function splitHeroTitle(heroTitle) {
  const originalText = heroTitle.textContent.trim();
  heroTitle.setAttribute('aria-label', originalText);

  heroTitle.innerHTML = originalText
    .split(/\s+/)
    .map((word) => `<span class="word"><span class="word-inner">${word}</span></span>`)
    .join(' ');

  return heroTitle.querySelectorAll('.word-inner');
}


// ============================================================================
// HERO NUMBER COUNTERS
// Animates the stat values (16, 3, 400K+) counting up from 0.
// Parses numeric prefix and preserves any suffix (K+, etc.).
// ============================================================================

function animateCounters(timeline) {
  const valueElements = document.querySelectorAll('.hero-highlight-value');
  if (valueElements.length === 0) return;

  valueElements.forEach((el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d+)(.*)/);
    if (!match) return;

    const targetNum = parseInt(match[1], 10);
    const suffix = match[2] || '';

    // Create a proxy object for GSAP to tween
    const proxy = { val: 0 };

    timeline.to(
      proxy,
      {
        val: targetNum,
        duration: 1.8,
        ease: 'power2.out',
        snap: { val: 1 },
        onUpdate: () => {
          el.textContent = Math.round(proxy.val) + suffix;
        },
      },
      '-=1.2'
    );
  });
}


// ============================================================================
// 1. HERO ENTRANCE TIMELINE
// Sequences: text split words → tagline → CTAs → counters → scroll indicator
// ============================================================================

function initHeroTimeline() {
  const heroTitle = document.querySelector('.hero-title');
  const heroTagline = document.querySelector('.hero-tagline');
  const heroActions = document.querySelector('.hero-actions');
  const heroHighlights = document.querySelector('.hero-highlights');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (!heroTitle) return;

  // Split the title into word spans
  const words = splitHeroTitle(heroTitle);

  // Set initial state for non-split elements
  const fadeElements = [heroTagline, heroActions, heroHighlights, scrollIndicator].filter(Boolean);
  gsap.set(fadeElements, { opacity: 0, y: 30 });

  // Set initial state for word spans (translate up out of overflow clip)
  gsap.set(words, { y: '110%', opacity: 0 });

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    delay: 0.3,
  });

  // Word-by-word stagger reveal
  tl.to(words, {
    y: '0%',
    opacity: 1,
    duration: 0.7,
    stagger: 0.06,
  });

  if (heroTagline) {
    tl.to(heroTagline, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3');
  }

  if (heroActions) {
    tl.to(heroActions, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }

  // Counter animation on the highlight cards
  if (heroHighlights) {
    tl.to(heroHighlights, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
    animateCounters(tl);
  }

  if (scrollIndicator) {
    tl.to(scrollIndicator, { opacity: 0.8, y: 0, duration: 0.5 }, '-=0.8');
  }
}


// ============================================================================
// 2. STAGGERED SCROLL REVEALS
// ============================================================================

function initStaggerReveals() {
  document.documentElement.classList.add('gsap-active');

  const grids = document.querySelectorAll('.grid-auto-fit');
  grids.forEach((grid) => {
    const cards = grid.querySelectorAll('.card');
    if (cards.length === 0) return;

    gsap.from(cards, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
    });
  });

  const bentoGrid = document.querySelector('.bento-grid');
  if (bentoGrid && getAnimationTier() < 3) {
    const bentoItems = bentoGrid.querySelectorAll('.bento-item');
    gsap.from(bentoItems, {
      scrollTrigger: {
        trigger: bentoGrid,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
    });
  }

  const faqContainer = document.querySelector('.faq-container');
  if (faqContainer) {
    const faqItems = faqContainer.querySelectorAll('.faq-item');
    gsap.from(faqItems, {
      scrollTrigger: {
        trigger: faqContainer,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }
}


// ============================================================================
// 3. SCROLL-PINNED STORYTELLING (BENTO GRID)
// ============================================================================

function initScrollPin() {
  const gallerySection = document.querySelector('#gallery');
  const bentoGrid = document.querySelector('.bento-grid');
  if (!gallerySection || !bentoGrid) return;

  const items = bentoGrid.querySelectorAll('.bento-item');
  if (items.length === 0) return;

  gsap.set(items, { opacity: 0, scale: 0.9 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: gallerySection,
      pin: true,
      start: 'top top',
      end: () => `+=${items.length * 200}`,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  items.forEach((item, i) => {
    tl.to(
      item,
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
      i * 0.4
    );
  });
}


// ============================================================================
// 4. PARALLAX HERO BACKGROUND
// ============================================================================

function initParallaxHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  gsap.to(hero, {
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    backgroundPositionY: '50%',
    ease: 'none',
  });

  const heroContent = hero.querySelector('.hero-content');
  if (heroContent) {
    gsap.to(heroContent, {
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: -80,
      opacity: 0.3,
      ease: 'none',
    });
  }
}


// ============================================================================
// 5. CSS CUSTOM PROPERTY ANIMATION
// ============================================================================

function initCssVarAnimation() {
  const main = document.querySelector('main');
  if (!main) return;

  const sections = main.querySelectorAll('.section-spacing');
  if (sections.length === 0) return;

  const goldStops = [
    'hsl(51 100% 50%)',
    'hsl(48 100% 52%)',
    'hsl(45 100% 55%)',
    'hsl(42 95% 58%)',
  ];

  sections.forEach((section, i) => {
    if (i === 0) return;

    const colorIndex = Math.min(i, goldStops.length - 1);

    gsap.to(document.documentElement, {
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'top 20%',
        scrub: true,
      },
      '--color-accent-gold': goldStops[colorIndex],
      ease: 'none',
    });
  });
}


// ============================================================================
// 6. LENIS SMOOTH SCROLL
// ============================================================================

function initLenisSmooth() {
  if (typeof Lenis === 'undefined') return null;

  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}


// ============================================================================
// 7. SCROLL PROGRESS BAR
// A thin bar at the top of the viewport that fills as the user scrolls.
// ============================================================================

function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });
}


// ============================================================================
// 8. MAGNETIC HOVER EFFECT ON CTA BUTTONS
// Buttons subtly follow the cursor when hovered, creating a magnetic pull.
// Uses gsap.quickTo() for GPU-accelerated, 60fps mouse tracking.
// Only runs on non-touch devices at Tier 3.
// ============================================================================

function initMagneticButtons() {
  // Skip on touch devices where hover doesn't apply
  if (window.matchMedia('(hover: none)').matches) return;

  const buttons = document.querySelectorAll('.hero-cta, .banner-btn-primary');
  if (buttons.length === 0) return;

  buttons.forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });

    btn.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = btn.getBoundingClientRect();
      const offsetX = e.clientX - left - width / 2;
      const offsetY = e.clientY - top - height / 2;
      xTo(offsetX * 0.3);
      yTo(offsetY * 0.3);
    });

    btn.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}


// ============================================================================
// 9. HORIZONTAL SCROLL SECTION (LINEUP)
// Pins the lineup section and scrolls the card grid horizontally.
// Only on desktop where the wide layout makes horizontal scrolling natural.
// ============================================================================

function initHorizontalScroll() {
  const lineupSection = document.querySelector('#lineup');
  const lineupGrid = document.querySelector('#lineup-grid');
  if (!lineupSection || !lineupGrid) return;

  // Add the class that switches the grid to a horizontal flex layout
  lineupGrid.classList.add('gsap-horizontal');

  // Wait one frame for layout to recalculate after class change
  requestAnimationFrame(() => {
    const scrollWidth = lineupGrid.scrollWidth - lineupGrid.clientWidth;
    if (scrollWidth <= 0) return;

    gsap.to(lineupGrid, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: lineupSection,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
  });
}


// ============================================================================
// MAIN INITIALIZATION
// Uses ScrollTrigger.matchMedia() for responsive animation control.
// ============================================================================

function initAnimations() {
  if (!isGsapAvailable()) {
    console.warn('[animations] GSAP not available — falling back to CSS animations.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const tier = getAnimationTier();

  // Tier 0: reduced motion — do nothing, CSS handles it
  if (tier === 0) return;

  // Tier 1: low-end — let CSS animation-timeline handle reveals
  if (tier === 1) return;

  // Tier 2+: Use matchMedia for responsive animation control
  if (tier >= 3) {
    ScrollTrigger.matchMedia({
      // Desktop: full experience (pin, parallax, horizontal scroll, magnetic)
      '(min-width: 1024px)': function () {
        initScrollPin();
        initParallaxHero();
        initHorizontalScroll();
      },

      // All breakpoints: shared animations
      all: function () {
        initHeroTimeline();
        initStaggerReveals();
        initScrollProgress();
        initCssVarAnimation();
        initLenisSmooth();
        initMagneticButtons();
      },
    });
  } else {
    // Tier 2: simpler animations, no matchMedia overhead
    initHeroTimeline();
    initStaggerReveals();
    initScrollProgress();
  }
}


// ============================================================================
// BOOTSTRAP
// ============================================================================

document.addEventListener('DOMContentLoaded', initAnimations);
