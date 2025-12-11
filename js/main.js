// ¿POR QUÉ? Importamos translations como un módulo para mantener nuestro código organizado
// y mantenible. De esta manera, los datos de traducción viven en su propio archivo, haciendo
// fácil actualizarlos sin tocar el código de lógica.
//
// ¿CÓMO FUNCIONA? La declaración import de ES6 trae el objeto translations desde translations.js.
//
// ANALOGÍA FEYNMAN: Imagina que tienes un diccionario bilingüe en un libro separado. En vez
// de escribir todas las traducciones aquí mezcladas con el código, simplemente "importamos"
// ese diccionario cuando lo necesitamos. Esto mantiene todo ordenado y fácil de encontrar.
//
// RESULTADO: Separación limpia de datos (translations) y comportamiento (este archivo).
import { translations } from './translations.js';

// ============================================================================
// SISTEMA DE INTERNACIONALIZACIÓN (i18n)
// ============================================================================

// ¿POR QUÉ? Necesitamos una variable para rastrear el idioma actual. Esto nos permite recordar
// qué idioma seleccionó el usuario y usarlo en toda la aplicación.
//
// ¿CÓMO FUNCIONA? Empezamos con un valor predeterminado (inglés), luego verificamos si el
// usuario tiene una preferencia guardada.
//
// RESULTADO: Estado de idioma consistente que persiste entre cargas de página.
let currentLanguage = 'en';

// ¿POR QUÉ? localStorage es almacenamiento del navegador que persiste incluso después de
// cerrar el navegador. Lo usamos para recordar la elección de idioma del usuario para que
// no tengan que seleccionarlo cada vez que visiten el sitio.
//
// ¿CÓMO FUNCIONA? localStorage.getItem('key') recupera datos. localStorage.setItem('key', value)
// guarda datos. Ambos funcionan solo con strings.
//
// RESULTADO: Las preferencias del usuario se recuerdan entre sesiones, creando mejor UX.
//
// EXPLICACIÓN FEYNMAN:
// Piensa en localStorage como una libreta que el navegador guarda para cada sitio web.
// Cuando escribes algo en ella (setItem), se queda ahí incluso si cierras el navegador
// y vuelves mañana. Esto es diferente de las variables normales de JavaScript que
// desaparecen cuando cierras la página. Lo usamos para recordar si al usuario le gusta
// inglés o español, así no tienen que decirnos cada vez que visitan.

function initializeLanguage() {
  // ¿POR QUÉ? Verificar localStorage primero para ver si el usuario seleccionó previamente
  // un idioma. Si lo hizo, usar ese. De lo contrario, usar inglés como predeterminado.
  //
  // ¿CÓMO FUNCIONA? Intentamos obtener 'preferred-language' de localStorage. Si existe y es
  // válido (en o es), lo usamos. De lo contrario, predeterminado a 'en'.
  //
  // RESULTADO: Respeta la elección previa del usuario o proporciona un predeterminado sensato.
  
  const savedLanguage = localStorage.getItem('preferred-language');
  
  if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
    currentLanguage = savedLanguage;
  }
  
  // ¿POR QUÉ? Después de determinar el idioma, necesitamos realmente actualizar el texto
  // de la página para que coincida.
  //
  // ¿CÓMO FUNCIONA? Llamamos nuestra función translatePage para aplicar las traducciones correctas.
  //
  // RESULTADO: La página carga en el idioma preferido del usuario inmediatamente.
  translatePage(currentLanguage);
  updateLanguageSelectorUI(currentLanguage);
}

function translatePage(language) {
  // ¿POR QUÉ? Para traducir la página, necesitamos encontrar todos los elementos marcados
  // para traducción y reemplazar su texto con la versión del idioma correcto.
  //
  // ¿CÓMO FUNCIONA? Usamos el atributo data-i18n como marcador. Elementos con data-i18n="key"
  // obtienen su texto reemplazado con translations[language][key].
  //
  // RESULTADO: Toda la página se actualiza al idioma seleccionado dinámicamente.
  
  // ¿POR QUÉ? querySelectorAll encuentra TODOS los elementos que coinciden con un selector
  // CSS (a diferencia de querySelector que encuentra solo el primero). [data-i18n] es un
  // selector de atributo que coincide con cualquier elemento con atributo data-i18n.
  //
  // ¿CÓMO FUNCIONA? Retorna un NodeList (tipo array) de todos los elementos coincidentes.
  //
  // RESULTADO: Podemos iterar sobre cada elemento traducible en la página.
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    // ¿POR QUÉ? El atributo data-i18n de cada elemento contiene una KEY que mapea al texto
    // de traducción en nuestro objeto translations.
    //
    // ¿CÓMO FUNCIONA? getAttribute lee el valor data-i18n, luego lo buscamos en
    // translations[language][key].
    //
    // RESULTADO: Obtenemos el texto traducido correcto para este elemento.
    const key = element.getAttribute('data-i18n');
    const translatedText = translations[language][key];
    
    // ¿POR QUÉ? Verificación de seguridad - solo actualizar si la traducción existe. Esto
    // previene errores si falta una key del objeto translations.
    //
    // ¿CÓMO FUNCIONA? Simple if statement verifica undefined/null.
    //
    // RESULTADO: Código robusto que no se rompe si las traducciones están incompletas.
    if (translatedText) {
      // ¿POR QUÉ? Diferentes elementos necesitan su texto actualizado de diferentes maneras.
      // - Los placeholders de input usan el atributo placeholder
      // - Botones y enlaces usan textContent
      // - Algunos elementos podrían tener aria-label para accesibilidad
      //
      // ¿CÓMO FUNCIONA? Verificamos el tipo de elemento y actualizamos la propiedad apropiada.
      //
      // RESULTADO: Todos los tipos de elemento se traducen correctamente.
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        // Para inputs de formulario, actualizar el placeholder
        element.placeholder = translatedText;
      } else if (element.hasAttribute('aria-label')) {
        // Para labels de accesibilidad
        element.setAttribute('aria-label', translatedText);
      } else {
        // Para contenido de texto regular
        element.textContent = translatedText;
      }
    }
  });
  
  // ¿POR QUÉ? También necesitamos traducir atributos aria-label por separado, ya que algunos
  // elementos usan data-i18n-aria en lugar de data-i18n para evitar conflictos.
  //
  // ¿CÓMO FUNCIONA? Consultar elementos con data-i18n-aria y actualizar su aria-label.
  //
  // RESULTADO: Traducción completa de todo el texto incluyendo labels de accesibilidad.
  const ariaElements = document.querySelectorAll('[data-i18n-aria]');
  
  ariaElements.forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    const translatedText = translations[language][key];
    
    if (translatedText) {
      element.setAttribute('aria-label', translatedText);
    }
  });
}

function updateLanguageSelectorUI(language) {
  // ¿POR QUÉ? Necesitamos retroalimentación visual mostrando qué idioma está actualmente activo.
  // Esto ayuda a los usuarios a entender el estado actual.
  //
  // ¿CÓMO FUNCIONA? Agregamos una clase 'active' al botón de idioma seleccionado y la
  // removemos del otro.
  //
  // RESULTADO: Indicador visual claro del idioma actual.
  
  const enButton = document.querySelector('[data-lang="en"]');
  const esButton = document.querySelector('[data-lang="es"]');
  
  if (enButton && esButton) {
    if (language === 'en') {
      enButton.classList.add('active');
      esButton.classList.remove('active');
    } else {
      esButton.classList.add('active');
      enButton.classList.remove('active');
    }
  }
}

function switchLanguage(newLanguage) {
  // ¿POR QUÉ? Cuando el usuario hace clic en un botón de idioma, necesitamos:
  // 1. Actualizar nuestra variable de estado
  // 2. Guardar la preferencia a localStorage
  // 3. Actualizar el texto de la página
  // 4. Actualizar la UI para mostrar qué idioma está activo
  //
  // ¿CÓMO FUNCIONA? Orquestamos todas estas acciones en una función.
  //
  // RESULTADO: Cambio completo de idioma con todos los efectos secundarios manejados.
  
  currentLanguage = newLanguage;
  
  // ¿POR QUÉ? Guardar a localStorage para que la elección persista entre cargas de página.
  //
  // EXPLICACIÓN FEYNMAN:
  // Estamos escribiendo la elección del usuario en esa libreta del navegador (localStorage)
  // para que la próxima vez que visiten, podamos leerla y automáticamente mostrar su
  // idioma preferido. Es como dejarte una nota recordatoria.
  localStorage.setItem('preferred-language', newLanguage);
  
  translatePage(newLanguage);
  updateLanguageSelectorUI(newLanguage);
}

function initializeLanguageSelector() {
  // ¿POR QUÉ? Necesitamos escuchar clics en los botones selectores de idioma y activar
  // el cambio de idioma cuando se hace clic.
  //
  // ¿CÓMO FUNCIONA? Encontramos todos los elementos con atributo data-lang y agregamos listeners de clic.
  //
  // RESULTADO: Selector de idioma interactivo que responde a clics del usuario.
  
  const languageButtons = document.querySelectorAll('[data-lang]');
  
  languageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevenir comportamiento de enlace predeterminado
      const selectedLanguage = button.getAttribute('data-lang');
      switchLanguage(selectedLanguage);
    });
  });
}

// ============================================================================
// MANEJADOR DE FORMULARIO DE CONTACTO
// ============================================================================

function initializeContactForm() {
  // ¿POR QUÉ? Necesitamos interceptar el envío del formulario para prevenir una recarga de
  // página y manejarlo con JavaScript en su lugar. Esto crea una UX más suave y moderna.
  //
  // ¿CÓMO FUNCIONA? Escuchamos el evento 'submit' en el formulario y lo manejamos con nuestra
  // función personalizada.
  //
  // RESULTADO: Envío de formulario estilo Ajax sin recarga de página.
  
  const contactForm = document.getElementById('contact-form');
  
  // ¿POR QUÉ? Verificar si el formulario existe antes de agregar listeners. No todas las
  // páginas tienen un formulario de contacto, así que necesitamos ser defensivos.
  //
  // ¿CÓMO FUNCIONA? Simple verificación de existencia con if statement.
  //
  // RESULTADO: El código funciona en todas las páginas, incluso aquellas sin formulario de contacto.
  if (!contactForm) {
    return; // Salir temprano si el formulario no existe
  }
  
  contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
  // ¿POR QUÉ? preventDefault() detiene el comportamiento de envío de formulario predeterminado
  // del navegador, que recargaría la página y enviaría datos a un servidor. Queremos manejar
  // el envío con JavaScript en su lugar para una experiencia más suave.
  //
  // ¿CÓMO FUNCIONA? Llamamos preventDefault() en el objeto evento.
  //
  // RESULTADO: El formulario no recarga la página; nosotros controlamos qué pasa después.
  //
  // EXPLICACIÓN FEYNMAN:
  // Normalmente, cuando haces clic en "Enviar" en un formulario, el navegador dice "Okay,
  // déjame enviar estos datos a un servidor y recargar la página." Pero nosotros decimos
  // "¡Espera! Queremos manejar esto nosotros mismos!" Eso es lo que preventDefault() hace -
  // le dice al navegador "no hagas tu cosa normal, nosotros nos encargamos." De esta manera,
  // podemos mostrar un mensaje de carga bonito y mensaje de éxito sin la recarga de página brusca.
  e.preventDefault();
  
  // ¿POR QUÉ? Obtener referencias a los elementos que necesitaremos manipular (botón, mensajes).
  //
  // ¿CÓMO FUNCIONA? Usar querySelector para encontrar elementos por ID o clase.
  //
  // RESULTADO: Podemos actualizar estos elementos para mostrar retroalimentación al usuario.
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const successMessage = document.getElementById('success-message');
  const originalButtonText = submitButton.textContent;
  
  // ¿POR QUÉ? Obtener datos del formulario para validar y potencialmente enviar a un servidor.
  //
  // ¿CÓMO FUNCIONA? Acceder valores de input del formulario a través de sus atributos name.
  //
  // RESULTADO: Tenemos todos los datos de input del usuario.
  const formData = {
    name: form.querySelector('[name="name"]').value,
    email: form.querySelector('[name="email"]').value,
    subject: form.querySelector('[name="subject"]').value,
    message: form.querySelector('[name="message"]').value
  };
  
  // ¿POR QUÉ? Validación básica para asegurar que los campos requeridos estén llenos.
  //
  // ¿CÓMO FUNCIONA? Verificar si algún campo está vacío.
  //
  // RESULTADO: Prevenir envío de formularios incompletos.
  if (!formData.name || !formData.email || !formData.message) {
    alert('Por favor llena todos los campos requeridos.');
    return;
  }
  
  // ¿POR QUÉ? Deshabilitar el botón de envío para prevenir múltiples envíos mientras estamos
  // procesando el primero. Esto previene envíos duplicados.
  //
  // ¿CÓMO FUNCIONA? Establecer disabled = true en el elemento botón.
  //
  // RESULTADO: El usuario no puede enviar accidentalmente el formulario dos veces.
  submitButton.disabled = true;
  
  // ¿POR QUÉ? Actualizar texto del botón para mostrar que estamos procesando el envío. Esto
  // da retroalimentación inmediata de que algo está pasando.
  //
  // ¿CÓMO FUNCIONA? Cambiar textContent a un mensaje de carga (traducido).
  //
  // RESULTADO: El usuario ve "Enviando..." en lugar de "Enviar Mensaje".
  submitButton.textContent = translations[currentLanguage]['contact.form.sending'];
  
  // ¿POR QUÉ? Simulamos una solicitud de red con setTimeout. En una aplicación real, esto
  // sería una llamada fetch() a tu backend API. El retraso de 2 segundos simula latencia
  // de red para que los usuarios vean el estado de carga.
  //
  // ¿CÓMO FUNCIONA? setTimeout ejecuta una función después de un retraso especificado (en milisegundos).
  //
  // RESULTADO: Simulación realista de envío de datos a un servidor.
  //
  // EXPLICACIÓN FEYNMAN:
  // En un sitio web real, enviaríamos estos datos del formulario a un servidor (computadora
  // lejana) que los guardaría en una base de datos o enviaría un email. Eso toma tiempo -
  // tal vez 1-2 segundos. Aquí, estamos pretendiendo hacer eso con setTimeout. Es como cuando
  // ordenas comida y el restaurante dice "espera 10 minutos" - estamos haciendo esperar al
  // usuario 2 segundos para simular cómo se sentiría un envío real.
  setTimeout(() => {
    // ¿POR QUÉ? Después de "enviar" (o en app real, después de obtener respuesta del servidor),
    // mostrar mensaje de éxito y resetear el formulario.
    //
    // ¿CÓMO FUNCIONA? Mostrar mensaje de éxito, resetear botón, limpiar campos del formulario.
    //
    // RESULTADO: Ciclo completo de retroalimentación mostrando al usuario que su envío funcionó.
    
    // Ocultar formulario y mostrar mensaje de éxito
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // ¿POR QUÉ? En una aplicación real, también harías:
    // - Enviar datos a un servidor con fetch() o XMLHttpRequest
    // - Manejar errores si la solicitud de red falla
    // - Tal vez mostrar diferentes mensajes basados en respuesta del servidor
    //
    // ¿CÓMO FUNCIONA? Usarías algo como:
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    //
    // RESULTADO: Los datos se guardarían en el servidor.
    
    console.log('Formulario enviado con datos:', formData);
    
    // ¿POR QUÉ? Después de 5 segundos, resetear todo para que el usuario pueda enviar otro
    // mensaje si quisiera. Esto crea una interacción completa y cíclica.
    //
    // ¿CÓMO FUNCIONA? Otro setTimeout para resetear después de un retraso.
    //
    // RESULTADO: El formulario está listo para otro envío.
    setTimeout(() => {
      form.style.display = 'block';
      successMessage.style.display = 'none';
      form.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }, 5000);
    
  }, 2000); // Retraso de red simulado de 2 segundos
}

// ============================================================================
// MENÚ MÓVIL ACCESIBLE Y ANIMADO
// ============================================================================

// ¿POR QUÉ? El menú móvil es una pieza crítica de UX. Necesita ser:
// 1. Accesible (lectores de pantalla entienden el estado)
// 2. Animado suavemente (usando CSS moderno con allow-discrete)
// 3. Navegable con teclado (Escape cierra el menú)
//
// ¿CÓMO FUNCIONA?
// Usamos data-attributes para controlar el estado:
// - data-visible="true/false" en el menú
// - data-menu-open="true/false" en el botón
// - aria-expanded="true/false" para accesibilidad
//
// El CSS usa transition-behavior: allow-discrete para animar la propiedad
// display, y @starting-style define los valores iniciales de la animación.
//
// EXPLICACIÓN FEYNMAN:
// Imagina que el menú es una puerta de garaje. Antes, CSS solo podía hacer
// que la puerta estuviera "abierta" o "cerrada" instantáneamente. Con las
// nuevas propiedades, la puerta puede ABRIRSE GRADUALMENTE, como en la realidad.
// - @starting-style dice: "cuando la puerta empiece a abrirse, empieza cerrada"
// - transition-behavior dice: "está bien animar esta puerta que solo tiene
//   dos posiciones (abierta/cerrada)"

function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!mobileMenuToggle || !navLinks) {
    return; // Salir si los elementos no existen
  }
  
  // ¿POR QUÉ? Esta función centraliza la lógica de abrir/cerrar el menú.
  // Actualiza todos los atributos necesarios para CSS y accesibilidad.
  function toggleMenu() {
    const isCurrentlyOpen = navLinks.getAttribute('data-visible') === 'true';
    const newState = !isCurrentlyOpen;
    
    // Actualizar atributos para CSS
    navLinks.setAttribute('data-visible', newState);
    mobileMenuToggle.setAttribute('data-menu-open', newState);
    
    // Actualizar atributo ARIA para accesibilidad
    // Los lectores de pantalla anunciarán "menú expandido" o "menú colapsado"
    mobileMenuToggle.setAttribute('aria-expanded', newState);
  }
  
  // Click en el botón hamburguesa
  mobileMenuToggle.addEventListener('click', toggleMenu);
  
  // ¿POR QUÉ? Cerrar el menú con la tecla Escape es una convención de UX
  // que los usuarios esperan. Mejora la accesibilidad de teclado.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.getAttribute('data-visible') === 'true') {
      toggleMenu();
      mobileMenuToggle.focus(); // Devolver foco al botón
    }
  });
  
  // ¿POR QUÉ? Cerrar el menú cuando se hace clic en un enlace mejora la UX
  // en móviles donde el menú cubre toda la pantalla.
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.getAttribute('data-visible') === 'true') {
        toggleMenu();
      }
    });
  });
}

function initializeSidebar() {
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.utility-sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('show');
      const isExpanded = sidebar.classList.contains('show');
      sidebarToggle.setAttribute('aria-expanded', isExpanded);
    });
  }
}

function initializeScrollHeader() {
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
}

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        const navLinks = document.querySelector('.nav-links');
        const sidebar = document.querySelector('.utility-sidebar');
        if (navLinks) navLinks.setAttribute('data-visible', 'false');
        if (sidebar) sidebar.classList.remove('show');
      }
    });
  });
}

// ============================================================================
// SISTEMA DE FILTRADO CON VIEW TRANSITIONS API
// ============================================================================

// ¿QUÉ ES LA VIEW TRANSITIONS API?
// ================================
// Es una API nativa del navegador que permite crear transiciones animadas
// entre estados del DOM sin librerías externas. Funciona así:
//
// 1. Llamas document.startViewTransition(callback)
// 2. El navegador toma un "screenshot" del estado actual
// 3. Tu callback ejecuta los cambios en el DOM
// 4. El navegador toma otro "screenshot" del nuevo estado
// 5. El navegador anima automáticamente entre los dos estados
//
// ¿POR QUÉ ES MÁGICO?
// ===================
// Sin View Transitions, cuando ocultas/muestras elementos, simplemente
// desaparecen/aparecen. Con View Transitions, el navegador INTERPOLA
// suavemente entre los estados, creando animaciones fluidas.
//
// ANALOGÍA FEYNMAN:
// Imagina que tienes fotos de un libro de fotos flip-book. Cada foto es un
// estado del DOM. Normalmente, al cambiar de página el cambio es instantáneo.
// View Transitions es como tener una cámara que filma la transición entre
// páginas, creando una animación suave automáticamente.
//
// COMPATIBILIDAD:
// View Transitions es relativamente nueva. Si el navegador no la soporta,
// los cambios ocurren instantáneamente (degradación elegante).

function initializeLineupFilters() {
  // ========================================================================
  // SISTEMA DE FILTRADO CON VIEW TRANSITIONS API
  // 
  // ¿POR QUÉ? Permite filtrar artistas por escenario y día con animaciones
  // suaves gracias a View Transitions API.
  //
  // SELECTOR IMPORTANTE: Usamos '#lineup-grid .card' para seleccionar SOLO
  // las tarjetas dentro de la sección de line-up, no todas las tarjetas.
  // ========================================================================
  
  const lineupGrid = document.getElementById('lineup-grid');
  const noResultsMessage = document.querySelector('.no-results');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (!lineupGrid || filterButtons.length === 0) {
    return; // No hay sección de line-up en esta página
  }
  
  // Seleccionar TODAS las tarjetas del line-up (usando .card, no .card--artist)
  const artistCards = lineupGrid.querySelectorAll('.card');
  
  // Estado actual de los filtros
  let activeFilters = {
    stage: 'all',
    day: 'all'
  };
  
  // ¿POR QUÉ? Esta función aplica los filtros a las tarjetas.
  function applyFilters() {
    let visibleCount = 0;
    
    // Iterar sobre cada tarjeta y verificar si coincide con los filtros
    artistCards.forEach(card => {
      const cardStage = card.dataset.stage;
      const cardDay = card.dataset.day;
      
      // Verificar si la tarjeta coincide con ambos filtros
      const stageMatch = activeFilters.stage === 'all' || cardStage === activeFilters.stage;
      const dayMatch = activeFilters.day === 'all' || cardDay === activeFilters.day;
      
      // ¿POR QUÉ? Usamos el atributo `hidden` en lugar de display: none.
      // El atributo hidden es más semántico y accesible.
      if (stageMatch && dayMatch) {
        card.hidden = false;
        visibleCount++;
      } else {
        card.hidden = true;
      }
    });
    
    // Mostrar mensaje si no hay resultados
    if (noResultsMessage) {
      noResultsMessage.hidden = visibleCount > 0;
    }
  }
  
  // ¿POR QUÉ? Esta función envuelve applyFilters() en View Transitions.
  // Si el navegador soporta View Transitions, la transición es animada.
  function applyFiltersWithTransition() {
    // ========================================================================
    // VIEW TRANSITIONS: La "Magia" Explicada
    //
    // document.startViewTransition() hace:
    // 1. Captura un "snapshot" del estado visual actual
    // 2. Ejecuta la función callback (nuestros cambios en el DOM)
    // 3. Captura otro snapshot del nuevo estado
    // 4. Anima automáticamente entre los dos estados
    //
    // ¡Sin escribir código de animación manualmente!
    // ========================================================================
    
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        applyFilters();
      });
    } else {
      // Fallback para navegadores sin soporte
      applyFilters();
    }
  }
  
  // Agregar event listeners a todos los botones de filtro
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Actualizar estado visual de botones
      // Encontrar el grupo de botones al que pertenece
      const group = btn.closest('.filter-buttons');
      if (group) {
        const currentActive = group.querySelector('.active');
        if (currentActive) {
          currentActive.classList.remove('active');
        }
        btn.classList.add('active');
      }
      
      // 2. Actualizar estado lógico de filtros
      if (btn.dataset.filterStage !== undefined) {
        activeFilters.stage = btn.dataset.filterStage;
      }
      if (btn.dataset.filterDay !== undefined) {
        activeFilters.day = btn.dataset.filterDay;
      }
      
      // 3. Aplicar filtros con animación View Transitions
      applyFiltersWithTransition();
    });
  });
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

// ¿POR QUÉ? Envolvemos toda la inicialización en DOMContentLoaded para asegurar que el HTML
// esté completamente cargado antes de intentar manipularlo. Si ejecutamos muy temprano, los
// elementos no existirán aún y querySelector retornará null.
//
// ¿CÓMO FUNCIONA? addEventListener en el evento 'DOMContentLoaded' espera a que el HTML esté listo.
//
// ANALOGÍA FEYNMAN: Es como llegar a una fiesta. No quieres tocar el timbre antes de que
// los anfitriones terminen de arreglar la casa. DOMContentLoaded es como el anfitrión diciendo
// "¡Okay, todo está listo, puedes entrar ahora!" Solo entonces empezamos a interactuar con
// los elementos de la página.
//
// RESULTADO: Todo nuestro código se ejecuta en el momento correcto, cuando los elementos existen.
document.addEventListener('DOMContentLoaded', () => {
  // ========================================================================
  // MÓDULO 1: SISTEMA DE IDIOMAS (i18n)
  // ========================================================================
  initializeLanguage();
  initializeLanguageSelector();
  
  // ========================================================================
  // MÓDULO 2: FORMULARIO DE CONTACTO
  // Solo se inicializa si existe en la página actual
  // ========================================================================
  initializeContactForm();
  
  // ========================================================================
  // MÓDULO 3: NAVEGACIÓN Y UI
  // Menú móvil, sidebar, efectos de scroll
  // ========================================================================
  initializeMobileMenu();  // Menú hamburguesa con animación CSS moderna
  initializeSidebar();      // Sidebar flotante
  initializeScrollHeader(); // Header con efecto glassmorphism en scroll
  initializeSmoothScroll(); // Scroll suave a anchors
  
  // ========================================================================
  // MÓDULO 4: SISTEMA DE FILTRADO CON VIEW TRANSITIONS
  // Filtra tarjetas de line-up con animaciones automáticas del navegador
  // ========================================================================
  initializeLineupFilters();
  
  // ========================================================================
  // LOG DE DESARROLLO
  // ========================================================================
  console.log('🎪 Planaxis initialized with:');
  console.log('  ✓ Mobile menu (CSS allow-discrete animation)');
  console.log('  ✓ Line-up filters (View Transitions API)');
  console.log('  ✓ Scroll-driven animations (animation-timeline: view)');
  console.log('  ✓ i18n system (localStorage persistence)');
});
