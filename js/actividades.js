/* =================================================================
   FUNDACIÓN ANORI — Actividades
   -----------------------------------------------------------------
   Para publicar una actividad nueva: copia un bloque, cámbialo y
   ponlo PRIMERO en la lista (el orden de aquí es el orden del sitio).
   La página Actividades y las últimas dos noticias de Inicio se
   actualizan solas. Deja fuera lo que no necesites.
   ================================================================= */
window.ANORI_ACTIVIDADES = [
  {
    id: 'prensa-lmd',
    fecha: 'Agosto 2026',
    tag: 'Aparición en prensa',
    lugar: 'Le Monde Diplomatique Chile',
    titulo: 'Encuentro por la protección y defensa de la cuenca Valdivia',
    resumen: 'Le Monde Diplomatique Chile cubrió el encuentro por la cuenca del río Valdivia, donde participamos.',
    cuerpo: [
      'Le Monde Diplomatique Chile publicó una nota sobre el encuentro por la protección y defensa de la cuenca Valdivia, instancia en la que participamos junto a organizaciones del territorio.'
    ],
    enlace: {
      texto: 'Leer la nota en Le Monde Diplomatique',
      url: 'https://www.lemondediplomatique.cl/encuentro-por-la-proteccion-y-defensa-de-la-cuenca-valdivia.html'
    },
    portada: 'assets/photos/valdi-2.webp'
  },
  {
    id: 'hornopiren',
    fecha: 'Julio 2026',
    tag: 'Educación ambiental',
    lugar: 'Hornopirén · Región de Los Lagos',
    lat: -41.9436, lon: -72.4361,
    titulo: 'Aula Viva Hornopirén, con Fundación Alerce 3000',
    resumen: 'Camila Asenjo Vargas lideró un taller de glaciares y geomorfología para niñas y niños de la zona.',
    cuerpo: [
      'Tuvimos una gran experiencia participando en la instancia educativa promovida por Fundación Alerce 3000 Aula Viva. Durante la actividad, nuestra integrante Camila Asenjo Vargas lideró un taller para niñas y niños, explorando el fascinante mundo de los glaciares y la geomorfología que moldea el territorio que habitan.',
      'Agradecemos a la fundación por abrir estos espacios de aprendizaje y conexión territorial, fundamentales para despertar la curiosidad científica desde temprana edad.'
    ],
    portada: 'assets/photos/news-hornopiren.webp',
    fotos: [
      'assets/photos/horno-2.webp',
      'assets/photos/horno-3.webp',
      'assets/photos/horno-4.webp',
      'assets/photos/horno-5.webp'
    ]
  },
  {
    id: 'valdivia',
    fecha: 'Junio 2026',
    tag: 'Comunicación',
    lugar: 'Valdivia · Región de Los Ríos',
    lat: -39.8142, lon: -73.2459,
    titulo: 'Charla de cuenca del río Valdivia y río San Pedro y criósfera',
    resumen: 'Charla abierta para el bloque ambiental, donde la criósfera se cuenta desde la cultura local.',
    cuerpo: [
      'Charla abierta en Valdivia para el bloque ambiental, donde la criósfera se cuenta desde la cultura local.',
      'Como regalo dejamos un mapa hidrográfico de la cuenca, disponible para descargar.'
    ],
    enlace: {
      texto: 'Descargar el mapa hidrográfico',
      url: 'https://drive.google.com/file/d/1uSYNrDnhmtU7pxS_xU1W6p5PsiFPlmsj/view?usp=drive_link'
    },
    portada: 'assets/photos/valdi-2.webp',
    fotos: ['assets/photos/news-valdivia.webp']
  }
];
