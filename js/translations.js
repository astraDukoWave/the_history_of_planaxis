// POR QUÉ: Este objeto de traducciones es la ÚNICA FUENTE DE VERDAD para todo el texto de la
// aplicación. Al centralizar las traducciones, evitamos el texto codificado de forma dispersa y
// facilitamos la incorporación de nuevos idiomas en el futuro.
//
// CÓMO: Utilizamos un objeto JavaScript con códigos de idioma (en, es) como claves y objetos anidados
// que contienen todo el texto traducible identificado por claves únicas.
//
// RESULTADO: Fácil de mantener, fácil de ampliar con nuevos idiomas y garantiza la
// coherencia en toda la aplicación.

export const translations = {
  // English translations
  en: {
    // Header / Navigation
    'nav.logo': 'Planaxis',
    'nav.festival': 'Festival',
    'nav.lineup': 'Line-Up',
    'nav.brand': 'Brand Activation',
    'nav.cultural': 'Cultural Events',
    'nav.gallery': 'Experience Gallery',
    'nav.contact': 'Contact',
    'nav.toggle.menu': 'Toggle navigation menu',
    
    // Hero section
    'hero.title': 'The Story of Planaxis',
    'hero.tagline': 'Dive deep into the mystical underwater kingdom where golden seahorses guard ancient secrets and bioluminescent creatures light the way through forgotten coral palaces.',
    'hero.cta': 'Discover the Legend',
    'hero.scroll': '↓ Scroll Down',
    
    // Sidebar navigation
    'sidebar.label': 'Quick navigation',
    'sidebar.lineup': 'Line-Up',
    'sidebar.dreamville': 'DreamVille',
    'sidebar.tickets': 'Ticket Sale',
    'sidebar.journey': 'Global Journey',
    'sidebar.faq': 'FAQ',
    'sidebar.toggle': 'Toggle sidebar',
    
    // Main content sections
    'section.discover.title': 'Discover the Kingdom',
    'section.discover.text': 'More content coming soon... This is where we\'ll tell the complete story of Planaxis, the ancient underwater kingdom that existed long before the surface world knew of its wonders.',
    'section.festival.title': 'Festival Experience',
    'section.festival.text': 'Immerse yourself in the magic of Tomorrowland 2018, where the story of Planaxis comes alive through spectacular stages, world-class performances, and unforgettable moments.',
    'section.brand.title': 'Brand Activation',
    'section.brand.text': 'Experience innovative brand partnerships that enhance the Planaxis story through interactive installations and immersive experiences.',
    'section.cultural.title': 'Cultural Events',
    'section.cultural.text': 'Beyond the music, discover art installations, theatrical performances, and cultural celebrations that bring the underwater kingdom to life.',
    
    // Festival Experience Cards
    'card.artists.title': 'Main Stage Artists',
    'card.artists.description': 'Experience world-renowned DJs and producers on the iconic Planaxis main stage, featuring cutting-edge visuals and sound design.',
    'card.artists.button': 'View Line-Up',
    'card.stage.title': 'The Planaxis Stage',
    'card.stage.description': 'A breathtaking underwater kingdom rises from the ground, featuring giant seahorses, bioluminescent creatures, and immersive theatrical elements.',
    'card.stage.button': 'Explore Stages',
    'card.experience.title': 'Immersive Experience',
    'card.experience.description': 'Beyond music: art installations, theatrical performances, and interactive elements bring the Planaxis legend to life.',
    'card.experience.button': 'Learn More',
    
    // Contact page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Reach out to the keepers of Planaxis. We\'d love to hear from you.',
    'contact.form.name': 'Your Name',
    'contact.form.name.placeholder': 'Enter your name',
    'contact.form.email': 'Email Address',
    'contact.form.email.placeholder': 'your@email.com',
    'contact.form.subject': 'Subject',
    'contact.form.subject.option1': 'General Inquiry',
    'contact.form.subject.option2': 'Festival Information',
    'contact.form.subject.option3': 'Brand Partnership',
    'contact.form.subject.option4': 'Press & Media',
    'contact.form.subject.option5': 'Technical Support',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Tell us about your inquiry...',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': '✓ Message Sent Successfully!',
    'contact.form.success.detail': 'Thank you for reaching out. We\'ll get back to you soon.',
    
    // Footer
    'footer.copyright': '2024 Tomorrowland - The Story of Planaxis. All rights reserved.',
    'footer.nav.label': 'Footer navigation',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    'footer.press': 'Press Kit',
    
    // Festival Guide - Line-Up Section
    'lineup_title': 'Line-Up 2018',
    'lineup_subtitle': 'Three legendary stages, hundreds of world-class artists, one unforgettable experience.',
    'stage_mainstage': 'Mainstage',
    'mainstage_desc': 'The heart of Tomorrowland. Experience the most spectacular production in festival history with the world\'s biggest DJs performing on our legendary underwater kingdom stage design.',
    'mainstage_capacity': 'Capacity: 80,000 attendees',
    'mainstage_artists': 'Artists: Martin Garrix, Armin van Buuren, David Guetta',
    'mainstage_hours': 'Hours: 4:00 PM - 12:00 AM',
    'stage_atmosphere': 'Atmosphere',
    'atmosphere_desc': 'Dive deeper into electronic sounds. This intimate stage brings you closer to underground house and techno legends in an immersive bioluminescent coral reef setting.',
    'atmosphere_capacity': 'Capacity: 15,000 attendees',
    'atmosphere_artists': 'Artists: Tale Of Us, Solomun, Maceo Plex',
    'atmosphere_hours': 'Hours: 2:00 PM - 1:00 AM',
    'stage_core': 'Core',
    'core_desc': 'Hard-hitting bass and electrifying energy. The Core stage delivers raw power with hardstyle and bass music acts in an electric deep-sea trench atmosphere.',
    'core_capacity': 'Capacity: 25,000 attendees',
    'core_artists': 'Artists: Dimitri Vegas & Like Mike, Hardwell, Excision',
    'core_hours': 'Hours: 3:00 PM - 12:00 AM',
    
    // Festival Guide - Camping Section
    'camping_title': 'DreamVille Camping',
    'camping_subtitle': 'Stay at the most magical campground in the world. Choose your accommodation level.',
    'camping_mag_greens': 'Magnificent Greens',
    'mag_greens_desc': 'Bring your own tent and camp under the stars. Access to showers, toilets, and all DreamVille activities including pool parties, yoga sessions, and cinema.',
    'camping_easy_tent': 'Easy Tent',
    'easy_tent_desc': 'Pre-pitched 2-person tent with sleeping bags, mattresses, and camping chairs. Just arrive and relax. Perfect for hassle-free festival camping.',
    'camping_dreamlodge': 'DreamLodge',
    'dreamlodge_desc': 'Luxury camping at its finest. Spacious lodges with real beds, electricity, private bathrooms, and dedicated lounge areas. VIP festival access included.',
    'feature_bring_tent': '✓ Bring your own tent',
    'feature_shared_facilities': '✓ Shared facilities',
    'feature_all_activities': '✓ All DreamVille activities',
    'feature_festival_pass': '✓ Weekend festival pass included',
    'badge_popular': 'Popular',
    'feature_pre_pitched': '✓ Pre-pitched tent for 2',
    'feature_sleeping_bags': '✓ Sleeping bags & mattresses included',
    'feature_chairs_lights': '✓ Camping chairs & lights',
    'feature_luxury': '✓ Luxury lodge for 2-4 people',
    'feature_real_beds': '✓ Real beds & private bathroom',
    'feature_electricity': '✓ Electricity & air conditioning',
    'feature_vip_pass': '✓ VIP festival pass included',
    
    // Festival Guide - Tickets Section
    'tickets_title': 'Ticket Sale',
    'tickets_edition': '2018 EDITION',
    'sold_out_title': 'SOLD OUT',
    'sold_out_desc': 'All tickets for Tomorrowland 2018 have been sold. Join our waiting list for 2019 or explore the resale platform for verified ticket exchanges.',
    'btn_waiting_list': 'Join 2019 Waiting List',
    'btn_exchange': 'Ticket Exchange Platform',
    'warning_scams': '⚠️ Beware of scams. Only use the official Tomorrowland exchange platform.',
    
    // Festival Guide - Global Journey Section
    'gj_title': 'Global Journey',
    'gj_subtitle': 'Travel packages from over 300 cities worldwide. Festival ticket, transportation, and accommodation in one package.',
    'gj_flight_title': 'Flight Packages',
    'gj_flight_desc': 'Direct flights from major cities worldwide. Includes airport transfers, hotel accommodation near the festival grounds, and full weekend pass.',
    'gj_flight_price': 'From €1,200',
    'gj_flight_cities': '150+ departure cities',
    'gj_train_title': 'Train Packages',
    'gj_train_desc': 'Eco-friendly train journeys from European cities. Enjoy scenic routes to Belgium with hotel accommodation and festival pass included in your package.',
    'gj_train_price': 'From €750',
    'gj_train_cities': '50+ European cities',
    'gj_bus_title': 'Bus Packages',
    'gj_bus_desc': 'Budget-friendly bus travel from neighboring countries. Meet fellow festival-goers on the journey. Includes accommodation and festival pass.',
    'gj_bus_price': 'From €550',
    'gj_bus_cities': '100+ European cities',
    'gj_important': 'Important: All Global Journey packages include guaranteed festival access, even if regular tickets are sold out. Packages typically sell out within hours of release.',
    
    // Festival Guide - FAQ Section
    'faq_q1': 'What can I bring to the festival?',
    'faq_a1': 'You can bring: Personal items (phone, wallet, keys), sunscreen and medication, empty refillable water bottle (max 500ml), small backpack or bag (max 40x30x15cm), portable phone charger. NOT allowed: Glass bottles, weapons, illegal substances, professional cameras, drones, or outside food/drinks.',
    'faq_q2': 'What payment methods are accepted?',
    'faq_a2': 'Tomorrowland 2018 uses a cashless payment system with Pearls (festival currency). Load money onto your Tomorrowland bracelet via the app or top-up stations. Pay with your bracelet at all bars, food stands, and merchandise shops. Accepted methods: Credit card, debit card, PayPal. Unused Pearls will be refunded after the festival.',
    'faq_q3': 'Is there an age limit?',
    'faq_a3': 'Yes, Tomorrowland is an 18+ event. You must be born on or before July 21, 2000 to attend the 2018 edition. Valid government-issued photo ID is required for entry. Acceptable IDs include: Passport, National ID card, Driver\'s license (with photo). ID checks are conducted at entry. Attendees without valid ID will be denied entry with no refund.',
    'faq_q4': 'Can I leave and re-enter the festival?',
    'faq_a4': 'Full Madness Pass (Weekend): Yes, you can leave and re-enter as many times as you want each day. Your bracelet is scanned at entry/exit. Day Passes: No re-entry. Once you leave, you cannot return the same day. DreamVille Camping: Separate from festival grounds. You can freely move between DreamVille and the festival all weekend.',
    'faq_q5': 'What about lockers and phone charging?',
    'faq_a5': 'Lockers: Available for rent at various locations throughout the festival grounds. Reserve in advance via the Tomorrowland app or book on-site (subject to availability). Small locker: €10/day, Medium locker: €15/day, Large locker: €20/day. Phone Charging: Charging stations are available at dedicated areas. Bring your own cable. Charging is free but expect queues during peak times.',
    'faq_q6': 'What if it rains?',
    'faq_a6': 'Tomorrowland happens rain or shine! The festival is not canceled or refunded due to weather. Recommendations: Bring a lightweight rain poncho (available at merchandise stands), wear waterproof shoes or rain boots, protect your phone with a waterproof case or bag. Most stages have covered areas for shelter. DreamVille has covered communal areas and indoor spaces.',
    'faq_q7': 'How do I get to the festival from Brussels?',
    'faq_a7': 'Official Shuttle Buses: Book via the Tomorrowland website. Buses run continuously between Brussels city center and the festival from 12:00 PM to 2:00 AM. Train: Take a train to Boom station (20 minutes from Brussels Central). Then walk 20 minutes or take a shuttle bus to the festival entrance. Taxi/Uber: Direct ride costs €50-70. Drop-off zone is 1km from the entrance (security reasons). Organized Bus Tours: Many companies offer round-trip packages. Check the official Tomorrowland website for verified partners.',
    'faq_q8': 'Can I transfer my ticket to someone else?',
    'faq_a8': 'Yes, but only through the official Tomorrowland Ticket Exchange Platform (opens 4 weeks before the festival). Process: List your ticket on the official exchange platform, set your price (cannot exceed original price + service fees), wait for someone to purchase it, Tomorrowland transfers the ticket to the new owner, you receive your refund within 14 days. ⚠️ Warning: Tickets sold outside the official platform are invalid and will not grant entry.'
  },
  
  // Spanish translations
  es: {
    // Encabezado / Navegación
    'nav.logo': 'Planaxis',
    'nav.festival': 'Festival',
    'nav.lineup': 'Line-Up',
    'nav.brand': 'Activación de Marca',
    'nav.cultural': 'Eventos Culturales',
    'nav.gallery': 'Galería de Experiencia',
    'nav.contact': 'Contacto',
    'nav.toggle.menu': 'Alternar menú de navegación',
    
    // Sección Hero
    'hero.title': 'La Historia de Planaxis',
    'hero.tagline': 'Sumérgete en el místico reino submarino donde caballitos de mar dorados guardan secretos ancestrales y criaturas bioluminiscentes iluminan el camino a través de palacios de coral olvidados.',
    'hero.cta': 'Descubre la Leyenda',
    'hero.scroll': '↓ Desplázate',
    
    // Navegación lateral
    'sidebar.label': 'Navegación rápida',
    'sidebar.lineup': 'Line-Up',
    'sidebar.dreamville': 'DreamVille',
    'sidebar.tickets': 'Venta de Entradas',
    'sidebar.journey': 'Global Journey',
    'sidebar.faq': 'Preguntas Frecuentes',
    'sidebar.toggle': 'Alternar barra lateral',
    
    // Secciones de contenido principal
    'section.discover.title': 'Descubre el Reino',
    'section.discover.text': 'Más contenido próximamente... Aquí contaremos la historia completa de Planaxis, el antiguo reino submarino que existió mucho antes de que el mundo de la superficie conociera sus maravillas.',
    'section.festival.title': 'Experiencia del Festival',
    'section.festival.text': 'Sumérgete en la magia de Tomorrowland 2018, donde la historia de Planaxis cobra vida a través de escenarios espectaculares, actuaciones de clase mundial y momentos inolvidables.',
    'section.brand.title': 'Activación de Marca',
    'section.brand.text': 'Experimenta asociaciones innovadoras de marcas que enriquecen la historia de Planaxis a través de instalaciones interactivas y experiencias inmersivas.',
    'section.cultural.title': 'Eventos Culturales',
    'section.cultural.text': 'Más allá de la música, descubre instalaciones artísticas, actuaciones teatrales y celebraciones culturales que dan vida al reino submarino.',
    
    // Tarjetas de Experiencia del Festival
    'card.artists.title': 'Artistas del Escenario Principal',
    'card.artists.description': 'Experimenta DJs y productores de renombre mundial en el icónico escenario principal de Planaxis, con visuales de vanguardia y diseño de sonido.',
    'card.artists.button': 'Ver Line-Up',
    'card.stage.title': 'El Escenario Planaxis',
    'card.stage.description': 'Un impresionante reino submarino emerge del suelo, con caballitos de mar gigantes, criaturas bioluminiscentes y elementos teatrales inmersivos.',
    'card.stage.button': 'Explorar Escenarios',
    'card.experience.title': 'Experiencia Inmersiva',
    'card.experience.description': 'Más allá de la música: instalaciones artísticas, actuaciones teatrales y elementos interactivos dan vida a la leyenda de Planaxis.',
    'card.experience.button': 'Saber Más',
    
    // Página de contacto
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Comunícate con los guardianes de Planaxis. Nos encantaría saber de ti.',
    'contact.form.name': 'Tu Nombre',
    'contact.form.name.placeholder': 'Ingresa tu nombre',
    'contact.form.email': 'Correo Electrónico',
    'contact.form.email.placeholder': 'tu@correo.com',
    'contact.form.subject': 'Asunto',
    'contact.form.subject.option1': 'Consulta General',
    'contact.form.subject.option2': 'Información del Festival',
    'contact.form.subject.option3': 'Asociación de Marca',
    'contact.form.subject.option4': 'Prensa y Medios',
    'contact.form.subject.option5': 'Soporte Técnico',
    'contact.form.message': 'Mensaje',
    'contact.form.message.placeholder': 'Cuéntanos sobre tu consulta...',
    'contact.form.submit': 'Enviar Mensaje',
    'contact.form.sending': 'Enviando...',
    'contact.form.success': '✓ ¡Mensaje Enviado Exitosamente!',
    'contact.form.success.detail': 'Gracias por contactarnos. Te responderemos pronto.',
    
    // Pie de página
    'footer.copyright': '2024 Tomorrowland - La Historia de Planaxis. Todos los derechos reservados.',
    'footer.nav.label': 'Navegación del pie de página',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.contact': 'Contáctanos',
    'footer.press': 'Kit de Prensa',
    
    // Festival Guide - Sección Line-Up
    'lineup_title': 'Line-Up 2018',
    'lineup_subtitle': 'Tres escenarios legendarios, cientos de artistas de clase mundial, una experiencia inolvidable.',
    'stage_mainstage': 'Escenario Principal',
    'mainstage_desc': 'El corazón de Tomorrowland. Experimenta la producción más espectacular en la historia del festival con los DJs más grandes del mundo actuando en nuestro legendario diseño del reino submarino.',
    'mainstage_capacity': 'Capacidad: 80,000 asistentes',
    'mainstage_artists': 'Artistas: Dimitri Vegas & Like Mike, Martin Garrix, Armin van Buuren',
    'mainstage_hours': 'Horario: 10:00 PM - 12:00 AM',
    'stage_atmosphere': 'Atmosphere',
    'atmosphere_desc': 'Sumérgete en sonidos electrónicos. Este escenario íntimo te acerca a las leyendas del house y techno underground en un arrecife de coral bioluminiscente inmersivo.',
    'atmosphere_capacity': 'Capacidad: 15,000 asistentes',
    'atmosphere_artists': 'Artistas: Tale Of Us, Solomun, Maceo Plex',
    'atmosphere_hours': 'Horario: 2:00 PM - 1:00 AM',
    'stage_core': 'Freedom',
    'core_desc': 'Bajos contundentes y energía electrizante. El escenario Core ofrece poder puro con actos de hardstyle y bass music en una atmósfera de trinchera marina profunda.',
    'core_capacity': 'Capacidad: 25,000 asistentes',
    'core_artists': 'Artistas: Charlotte de Witte, Amelie Lens, Boris Brejcha',
    'core_hours': 'Horario: 3:00 PM - 12:00 AM',
    
    // Festival Guide - Sección Camping
    'camping_title': 'DreamVille Camping',
    'camping_subtitle': 'Alójate en el camping más mágico del mundo. Elige tu nivel de alojamiento.',
    'camping_mag_greens': 'Magnificent Greens',
    'mag_greens_desc': 'Trae tu propia tienda y acampa bajo las estrellas. Acceso a duchas, baños y todas las actividades de DreamVille incluyendo fiestas en la piscina, sesiones de yoga y cine.',
    'camping_easy_tent': 'Easy Tent',
    'easy_tent_desc': 'Tienda pre-montada para 2 personas con sacos de dormir, colchonetas y sillas de camping. Solo llega y relájate. Perfecto para acampar sin complicaciones.',
    'camping_dreamlodge': 'DreamLodge',
    'dreamlodge_desc': 'Glamping de lujo en su máxima expresión. Alojamientos espaciosos con camas reales, electricidad, baños privados y áreas de descanso dedicadas. Acceso VIP al festival incluido.',
    'feature_bring_tent': '✓ Trae tu propia tienda',
    'feature_shared_facilities': '✓ Instalaciones compartidas',
    'feature_all_activities': '✓ Todas las actividades de DreamVille',
    'feature_festival_pass': '✓ Pase de fin de semana incluido',
    'badge_popular': 'Popular',
    'feature_pre_pitched': '✓ Tienda pre-montada para 2',
    'feature_sleeping_bags': '✓ Sacos de dormir y colchonetas incluidos',
    'feature_chairs_lights': '✓ Sillas de camping y luces',
    'feature_luxury': '✓ Alojamiento de lujo para 2-4 personas',
    'feature_real_beds': '✓ Camas reales y baño privado',
    'feature_electricity': '✓ Electricidad y aire acondicionado',
    'feature_vip_pass': '✓ Pase VIP al festival incluido',
    
    // Festival Guide - Sección Tickets
    'tickets_title': 'Venta de Entradas',
    'tickets_edition': 'EDICIÓN 2018',
    'sold_out_title': 'AGOTADO',
    'sold_out_desc': 'Todas las entradas para Tomorrowland 2018 han sido vendidas. Únete a nuestra lista de espera para 2019 o explora la plataforma de reventa para intercambios verificados de entradas.',
    'btn_waiting_list': 'Unirse a Lista de Espera 2019',
    'btn_exchange': 'Plataforma de Intercambio de Entradas',
    'warning_scams': '⚠️ Cuidado con las estafas. Usa solo la plataforma oficial de intercambio de Tomorrowland.',
    
    // Festival Guide - Sección Global Journey
    'gj_title': 'Global Journey',
    'gj_subtitle': 'Paquetes de viaje desde más de 300 ciudades en todo el mundo. Entrada al festival, transporte y alojamiento en un solo paquete.',
    'gj_flight_title': 'Paquetes de Vuelo',
    'gj_flight_desc': 'Vuelos directos desde las principales ciudades del mundo. Incluye traslados al aeropuerto, alojamiento en hotel cerca del recinto del festival y pase completo de fin de semana.',
    'gj_flight_price': 'Desde €1,200',
    'gj_flight_cities': '150+ ciudades de salida',
    'gj_train_title': 'Paquetes de Tren',
    'gj_train_desc': 'Viajes en tren ecológicos desde ciudades europeas. Disfruta de rutas panorámicas a Bélgica con alojamiento en hotel y pase al festival incluido en tu paquete.',
    'gj_train_price': 'Desde €750',
    'gj_train_cities': '50+ ciudades europeas',
    'gj_bus_title': 'Paquetes de Autobús',
    'gj_bus_desc': 'Viajes en autobús económicos desde países vecinos. Conoce a otros asistentes al festival en el viaje. Incluye alojamiento y pase al festival.',
    'gj_bus_price': 'Desde €550',
    'gj_bus_cities': '100+ ciudades europeas',
    'gj_important': 'Importante: Todos los paquetes Global Journey incluyen acceso garantizado al festival, incluso si las entradas regulares están agotadas. Los paquetes suelen agotarse en horas después de su lanzamiento.',
    
    // Festival Guide - Sección FAQ
    'faq_q1': '¿Qué puedo llevar al festival?',
    'faq_a1': 'Puedes llevar: Artículos personales (teléfono, billetera, llaves), protector solar y medicamentos, botella de agua vacía recargable (máx 500ml), mochila pequeña o bolsa (máx 40x30x15cm), cargador portátil de teléfono. NO permitido: Botellas de vidrio, armas, sustancias ilegales, cámaras profesionales, drones, comida o bebidas externas.',
    'faq_q2': '¿Qué métodos de pago se aceptan?',
    'faq_a2': 'Tomorrowland 2018 utiliza un sistema de pago sin efectivo con Pearls (moneda del festival). Carga dinero en tu brazalete de Tomorrowland a través de la app o estaciones de recarga. Paga con tu brazalete en todos los bares, puestos de comida y tiendas de merchandising. Métodos aceptados: Tarjeta de crédito, tarjeta de débito, PayPal. Las Pearls no utilizadas serán reembolsadas después del festival.',
    'faq_q3': '¿Hay límite de edad?',
    'faq_a3': 'Sí, Tomorrowland es un evento +18. Debes haber nacido el 21 de julio de 2000 o antes para asistir a la edición 2018. Se requiere identificación oficial con foto para la entrada. IDs aceptables incluyen: Pasaporte, Cédula de identidad nacional, Licencia de conducir (con foto). Se realizan controles de identificación en la entrada. Los asistentes sin identificación válida no podrán entrar sin reembolso.',
    'faq_q4': '¿Puedo salir y volver a entrar?',
    'faq_a4': 'Por razones de seguridad, si sales del recinto del festival, no podrás volver a entrar ese mismo día.',
    'faq_q5': '¿Hay casilleros y cargadores?',
    'faq_a5': 'Sí, hay casilleros disponibles en la entrada y estaciones de carga móviles FreshPoints.',
    'faq_q6': '¿Qué pasa si llueve?',
    'faq_a6': '¡Bailamos bajo la lluvia! Algunos escenarios están cubiertos, pero se recomienda llevar impermeable. No paraguas.',
    'faq_q7': '¿Cómo llego desde Bruselas?',
    'faq_a7': 'Hay trenes especiales hacia la estación de Boom. Desde ahí, sigue las señales de \'A Tomorrowland\' (30 min a pie).',
    'faq_q8': '¿Puedo transferir mi entrada?',
    'faq_a8': 'No. Las entradas son nominativas. Solo se pueden cambiar a través del Exchange Desk oficial.'
  }
};

