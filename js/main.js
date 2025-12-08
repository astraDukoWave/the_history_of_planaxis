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
// FUNCIONALIDAD EXISTENTE (de scripts inline)
// ============================================================================

function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });
  }
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
        if (navLinks) navLinks.classList.remove('show');
        if (sidebar) sidebar.classList.remove('show');
      }
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
  // Inicializar sistema de idiomas
  initializeLanguage();
  initializeLanguageSelector();
  
  // Inicializar formulario de contacto (si está presente)
  initializeContactForm();
  
  // Inicializar funcionalidad existente
  initializeMobileMenu();
  initializeSidebar();
  initializeScrollHeader();
  initializeSmoothScroll();
});
