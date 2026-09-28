/* =================================================================
   FUNDACIÓN ANORI — Recursos pedagógicos
   -----------------------------------------------------------------
   Para agregar material nuevo:
   · Sube los archivos a la carpeta recursos/<nombre-del-taller>/
   · Copia un bloque de "actividades" (o un taller completo) y
     cambia textos y rutas. El orden de aquí es el orden del sitio.
   · Deja fuera los campos que no necesites (p. ej. "docx").
   ================================================================= */
window.ANORI_RECURSOS = [
  {
    id: 'explorando-la-criosfera',
    taller: 'Explorando la Criósfera',
    bajada: 'Un taller de tres sesiones prácticas para entender cómo funciona el hielo del planeta: de dónde viene su energía, cómo mueve el océano y cómo ha tallado el paisaje del sur de Chile.',
    ficha: [
      ['Nivel', '7° básico a 4° medio (13 a 17 años)'],
      ['Duración', '3 sesiones de 90 minutos, con más de una hora de experimentación en cada una'],
      ['Organización', 'Equipos de 4 a 5 estudiantes con roles rotativos'],
      ['Currículum', 'Alineado a las Bases Curriculares de Ciencias Naturales (7° básico a 2° medio) y Ciencias para la Ciudadanía (3° y 4° medio), Mineduc'],
      ['Incluye', 'Planificación docente y guía de estudiantes por actividad']
    ],
    actividades: [
      {
        n: '01',
        titulo: 'El Sol, la Tierra y el glaciar',
        pregunta: '¿Por qué existe el hielo en la Tierra y qué lo hace derretirse?',
        resumen: 'Con una esfera y una linterna modelan cómo la geometría Tierra–Sol reparte la energía. Luego miden cómo se derrite un glaciar de laboratorio expuesto al Sol, a una lámpara infrarroja y a un secador de pelo, y comparan hielo limpio con hielo cubierto de carbón.',
        temas: ['Insolación', 'Glaciaciones', 'Balance de energía', 'Albedo'],
        espacio: 'Sala que se pueda oscurecer y un lugar con sol directo',
        archivos: [
          { tipo: 'Planificación docente', paginas: 9,
            pdf: 'recursos/explorando-la-criosfera/act1-docente-sol-tierra-glaciar.pdf',
            docx: 'recursos/explorando-la-criosfera/act1-docente-sol-tierra-glaciar.docx' },
          { tipo: 'Guía de estudiantes', paginas: 7,
            pdf: 'recursos/explorando-la-criosfera/act1-guia-estudiantes-sol-tierra-glaciar.pdf',
            docx: 'recursos/explorando-la-criosfera/act1-guia-estudiantes-sol-tierra-glaciar.docx' }
        ]
      },
      {
        n: '02',
        titulo: 'Corrientes oceánicas en el laboratorio',
        pregunta: '¿Cómo se mueve el agua del océano… y qué tiene que ver el hielo?',
        resumen: 'Un océano en miniatura con agua fría, caliente, dulce y salada para descubrir la circulación termohalina. Cuatro experimentos muestran por qué el agua fría y salada se hunde y cómo el deshielo puede frenar las corrientes, de la Corriente de Humboldt a los fiordos de la Patagonia.',
        temas: ['Densidad', 'Salinidad', 'Circulación termohalina', 'Hielo marino'],
        espacio: 'Sala con mesas estables, agua caliente y hielo',
        archivos: [
          { tipo: 'Planificación docente', paginas: 8,
            pdf: 'recursos/explorando-la-criosfera/act2-docente-corrientes-oceanicas.pdf',
            docx: 'recursos/explorando-la-criosfera/act2-docente-corrientes-oceanicas.docx' },
          { tipo: 'Guía de estudiantes', paginas: 6,
            pdf: 'recursos/explorando-la-criosfera/act2-guia-estudiantes-corrientes-oceanicas.pdf',
            docx: 'recursos/explorando-la-criosfera/act2-guia-estudiantes-corrientes-oceanicas.docx' }
        ]
      },
      {
        n: '03',
        titulo: 'El agua esculpe el paisaje',
        pregunta: '¿Cómo los ríos y los glaciares dan forma a nuestro territorio?',
        resumen: 'Una cuenca de arena para modelar la erosión, el transporte y el depósito de sedimentos. Reconocen huellas glaciares del sur de Chile (morrenas, drumlins, valles en U) y analizan peligros como los aluviones y el vaciamiento de lagos glaciares, a partir del caso de Villa Santa Lucía (2017).',
        temas: ['Cuencas', 'Dinámica glaciar', 'Erosión', 'Peligros naturales'],
        espacio: 'Al aire libre o laboratorio con lavaplatos',
        archivos: [
          { tipo: 'Planificación docente', paginas: 7,
            pdf: 'recursos/explorando-la-criosfera/act3-docente-agua-esculpe-paisaje.pdf',
            docx: 'recursos/explorando-la-criosfera/act3-docente-agua-esculpe-paisaje.docx' },
          { tipo: 'Guía de estudiantes', paginas: 6,
            pdf: 'recursos/explorando-la-criosfera/act3-guia-estudiantes-agua-esculpe-paisaje.pdf',
            docx: 'recursos/explorando-la-criosfera/act3-guia-estudiantes-agua-esculpe-paisaje.docx' }
        ]
      }
    ]
  }
];
