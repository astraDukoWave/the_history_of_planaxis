// WHY: We import translations as a module to keep our code organized and maintainable.
// This way, translation data lives in its own file, making it easy to update without
// touching the logic code.
//
// HOW: ES6 import statement pulls the translations object from translations.js.
//
// RESULT: Clean separation of data (translations) and behavior (this file).
import { translations } from './translations.js';

// ============================================================================
// INTERNATIONALIZATION (i18n) SYSTEM
// ============================================================================

// WHY: We need a variable to track the current language. This lets us remember
// which language the user selected and use it throughout the application.
//
// HOW: Start with a default (English), then check if user has a saved preference.
//
// RESULT: Consistent language state that persists across page loads.
let currentLanguage = 'en';

// WHY: localStorage is browser storage that persists even after closing the browser.
// We use it to remember the user's language choice so they don't have to select it
// every time they visit the site.
//
// HOW: localStorage.getItem('key') retrieves data. localStorage.setItem('key', value)
// saves data. Both work with strings only.
//
// RESULT: User preferences are remembered across sessions, creating a better UX.
//
// FEYNMAN EXPLANATION:
// Think of localStorage like a notepad that the browser keeps for each website.
// When you write something on it (setItem), it stays there even if you close the
// browser and come back tomorrow. This is different from regular JavaScript variables
// that disappear when you close the page. We use this to remember if the user likes
// English or Spanish, so they don't have to tell us every time they visit.

function initializeLanguage() {
  // WHY: Check localStorage first to see if user previously selected a language.
  // If they did, use that. Otherwise, use English as the default.
  //
  // HOW: Try to get 'preferred-language' from localStorage. If it exists and is
  // valid (en or es), use it. Otherwise, default to 'en'.
  //
  // RESULT: Respects user's previous choice or provides sensible default.
  
  const savedLanguage = localStorage.getItem('preferred-language');
  
  if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
    currentLanguage = savedLanguage;
  }
  
  // WHY: After determining the language, we need to actually update the page
  // text to match it.
  //
  // HOW: Call our translatePage function to apply the correct translations.
  //
  // RESULT: Page loads in the user's preferred language immediately.
  translatePage(currentLanguage);
  updateLanguageSelectorUI(currentLanguage);
}

function translatePage(language) {
  // WHY: To translate the page, we need to find all elements marked for translation
  // and replace their text with the correct language version.
  //
  // HOW: We use the data-i18n attribute as a marker. Elements with data-i18n="key"
  // get their text replaced with translations[language][key].
  //
  // RESULT: Entire page updates to the selected language dynamically.
  
  // WHY: querySelectorAll finds ALL elements matching a CSS selector (unlike
  // querySelector which finds only the first one). [data-i18n] is an attribute
  // selector that matches any element with a data-i18n attribute.
  //
  // HOW: Returns a NodeList (array-like) of all matching elements.
  //
  // RESULT: We can loop through every translatable element on the page.
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    // WHY: Each element's data-i18n attribute contains a KEY that maps to the
    // translation text in our translations object.
    //
    // HOW: getAttribute reads the data-i18n value, then we look it up in
    // translations[language][key].
    //
    // RESULT: We get the correct translated text for this element.
    const key = element.getAttribute('data-i18n');
    const translatedText = translations[language][key];
    
    // WHY: Safety check - only update if translation exists. This prevents errors
    // if a key is missing from the translations object.
    //
    // HOW: Simple if statement checks for undefined/null.
    //
    // RESULT: Robust code that doesn't break if translations are incomplete.
    if (translatedText) {
      // WHY: Different elements need their text updated in different ways.
      // - Input placeholders use the placeholder attribute
      // - Buttons and links use textContent
      // - Some elements might have aria-label for accessibility
      //
      // HOW: Check element type and update the appropriate property.
      //
      // RESULT: All element types translate correctly.
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        // For form inputs, update the placeholder
        element.placeholder = translatedText;
      } else if (element.hasAttribute('aria-label')) {
        // For accessibility labels
        element.setAttribute('aria-label', translatedText);
      } else {
        // For regular text content
        element.textContent = translatedText;
      }
    }
  });
  
  // WHY: We also need to translate aria-label attributes separately, as some
  // elements use data-i18n-aria instead of data-i18n to avoid conflicts.
  //
  // HOW: Query for elements with data-i18n-aria and update their aria-label.
  //
  // RESULT: Complete translation of all text including accessibility labels.
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
  // WHY: We need visual feedback showing which language is currently active.
  // This helps users understand the current state.
  //
  // HOW: Add an 'active' class to the selected language button and remove it
  // from the other one.
  //
  // RESULT: Clear visual indicator of the current language.
  
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
  // WHY: When the user clicks a language button, we need to:
  // 1. Update our state variable
  // 2. Save the preference to localStorage
  // 3. Update the page text
  // 4. Update the UI to show which language is active
  //
  // HOW: Orchestrate all these actions in one function.
  //
  // RESULT: Complete language switch with all side effects handled.
  
  currentLanguage = newLanguage;
  
  // WHY: Save to localStorage so the choice persists across page loads.
  //
  // FEYNMAN EXPLANATION:
  // We're writing the user's choice on that browser notepad (localStorage)
  // so next time they visit, we can read it and automatically show their
  // preferred language. It's like leaving yourself a reminder note.
  localStorage.setItem('preferred-language', newLanguage);
  
  translatePage(newLanguage);
  updateLanguageSelectorUI(newLanguage);
}

function initializeLanguageSelector() {
  // WHY: We need to listen for clicks on the language selector buttons and
  // trigger the language switch when clicked.
  //
  // HOW: Find all elements with data-lang attribute and add click listeners.
  //
  // RESULT: Interactive language switcher that responds to user clicks.
  
  const languageButtons = document.querySelectorAll('[data-lang]');
  
  languageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior
      const selectedLanguage = button.getAttribute('data-lang');
      switchLanguage(selectedLanguage);
    });
  });
}

// ============================================================================
// CONTACT FORM HANDLER
// ============================================================================

function initializeContactForm() {
  // WHY: We need to intercept the form submission to prevent a page reload and
  // handle it with JavaScript instead. This creates a smoother, more modern UX.
  //
  // HOW: Listen for the 'submit' event on the form and handle it with our
  // custom function.
  //
  // RESULT: Ajax-style form submission without page reload.
  
  const contactForm = document.getElementById('contact-form');
  
  // WHY: Check if the form exists before adding listeners. Not all pages have
  // a contact form, so we need to be defensive.
  //
  // HOW: Simple existence check with if statement.
  //
  // RESULT: Code works on all pages, even those without the contact form.
  if (!contactForm) {
    return; // Exit early if form doesn't exist
  }
  
  contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
  // WHY: preventDefault() stops the browser's default form submission behavior,
  // which would reload the page and send data to a server. We want to handle
  // submission with JavaScript instead for a smoother experience.
  //
  // HOW: Call preventDefault() on the event object.
  //
  // RESULT: Form doesn't reload the page; we control what happens next.
  //
  // FEYNMAN EXPLANATION:
  // Normally, when you click "Submit" on a form, the browser says "Okay, let me
  // send this data to a server and reload the page." But we say "Wait! We want
  // to handle this ourselves!" That's what preventDefault() does - it tells the
  // browser "don't do your normal thing, we've got this." This way, we can show
  // a nice loading message and success message without the jarring page reload.
  e.preventDefault();
  
  // WHY: Get references to the elements we'll need to manipulate (button, messages).
  //
  // HOW: Use querySelector to find elements by ID or class.
  //
  // RESULT: We can update these elements to show feedback to the user.
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const successMessage = document.getElementById('success-message');
  const originalButtonText = submitButton.textContent;
  
  // WHY: Get form data to validate and potentially send to a server.
  //
  // HOW: Access form input values through their name attributes.
  //
  // RESULT: We have all the user's input data.
  const formData = {
    name: form.querySelector('[name="name"]').value,
    email: form.querySelector('[name="email"]').value,
    subject: form.querySelector('[name="subject"]').value,
    message: form.querySelector('[name="message"]').value
  };
  
  // WHY: Basic validation to ensure required fields are filled.
  //
  // HOW: Check if any field is empty.
  //
  // RESULT: Prevent submission of incomplete forms.
  if (!formData.name || !formData.email || !formData.message) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // WHY: Disable the submit button to prevent multiple submissions while we're
  // processing the first one. This prevents duplicate submissions.
  //
  // HOW: Set disabled = true on the button element.
  //
  // RESULT: User can't accidentally submit the form twice.
  submitButton.disabled = true;
  
  // WHY: Update button text to show we're processing the submission. This gives
  // immediate feedback that something is happening.
  //
  // HOW: Change textContent to a loading message (translated).
  //
  // RESULT: User sees "Sending..." instead of "Send Message".
  submitButton.textContent = translations[currentLanguage]['contact.form.sending'];
  
  // WHY: Simulate a network request with setTimeout. In a real application, this
  // would be a fetch() call to your backend API. The 2-second delay simulates
  // network latency so users see the loading state.
  //
  // HOW: setTimeout runs a function after a specified delay (in milliseconds).
  //
  // RESULT: Realistic simulation of sending data to a server.
  //
  // FEYNMAN EXPLANATION:
  // In a real website, we'd send this form data to a server (computer far away)
  // that would save it in a database or send an email. That takes time - maybe
  // 1-2 seconds. Here, we're pretending to do that with setTimeout. It's like
  // when you order food and the restaurant says "wait 10 minutes" - we're making
  // the user wait 2 seconds to simulate what a real submission would feel like.
  setTimeout(() => {
    // WHY: After "sending" (or in real app, after getting server response),
    // show success message and reset the form.
    //
    // HOW: Display success message, reset button, clear form fields.
    //
    // RESULT: Complete feedback loop showing the user their submission worked.
    
    // Hide form and show success message
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // WHY: In a real application, you'd also:
    // - Send data to a server with fetch() or XMLHttpRequest
    // - Handle errors if the network request fails
    // - Maybe show different messages based on server response
    //
    // HOW: Would use something like:
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    //
    // RESULT: Data would be saved on the server.
    
    console.log('Form submitted with data:', formData);
    
    // WHY: After 5 seconds, reset everything so user could submit another message
    // if they wanted to. This creates a complete, cyclical interaction.
    //
    // HOW: Another setTimeout to reset after a delay.
    //
    // RESULT: Form is ready for another submission.
    setTimeout(() => {
      form.style.display = 'block';
      successMessage.style.display = 'none';
      form.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }, 5000);
    
  }, 2000); // 2-second simulated network delay
}

// ============================================================================
// EXISTING FUNCTIONALITY (from inline scripts)
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
// INITIALIZATION
// ============================================================================

// WHY: We wrap all initialization in DOMContentLoaded to ensure the HTML is
// fully loaded before we try to manipulate it. If we run too early, elements
// won't exist yet and querySelector will return null.
//
// HOW: addEventListener on 'DOMContentLoaded' event waits for HTML to be ready.
//
// RESULT: All our code runs at the right time, when elements exist.
document.addEventListener('DOMContentLoaded', () => {
  // Initialize language system
  initializeLanguage();
  initializeLanguageSelector();
  
  // Initialize contact form (if present)
  initializeContactForm();
  
  // Initialize existing functionality
  initializeMobileMenu();
  initializeSidebar();
  initializeScrollHeader();
  initializeSmoothScroll();
});

