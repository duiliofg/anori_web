/* =================================================================
   FUNDACIÓN ANORI — Sitio web · interacciones
   ================================================================= */
(function(){
  'use strict';

  /* ---------- Navbar: estado al hacer scroll ---------- */
  var nav = document.querySelector('.navbar-anori');
  function onScroll(){
    if(!nav) return;
    if(window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-anori');
  var backdrop = document.querySelector('.nav-backdrop');
  function closeMenu(){
    if(toggle) toggle.classList.remove('open');
    if(menu) menu.classList.remove('open');
    if(backdrop) backdrop.classList.remove('show');
  }
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      if(backdrop) backdrop.classList.toggle('show', open);
    });
  }
  if(backdrop) backdrop.addEventListener('click', closeMenu);
  if(menu) menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  /* ---------- Variante de hero (preview) ---------- */
  var heroA = document.querySelector('[data-hero="a"]');
  var heroB = document.querySelector('[data-hero="b"]');
  var switchEl = document.querySelector('.hero-switch');
  if(heroA && heroB && switchEl){
    var btns = switchEl.querySelectorAll('button');
    function setHero(v){
      heroA.style.display = (v === 'a') ? '' : 'none';
      heroB.style.display = (v === 'b') ? '' : 'none';
      btns.forEach(function(b){ b.classList.toggle('active', b.dataset.v === v); });
      try{ localStorage.setItem('anori_hero', v); }catch(e){}
    }
    btns.forEach(function(b){ b.addEventListener('click', function(){ setHero(b.dataset.v); }); });
    var saved = 'a';
    try{ saved = localStorage.getItem('anori_hero') || 'a'; }catch(e){}
    setHero(saved);
  }

  /* ---------- Reveal al hacer scroll (robusto) ---------- */
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  function revealInView(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for(var i = reveals.length - 1; i >= 0; i--){
      var el = reveals[i];
      var r = el.getBoundingClientRect();
      if(r.top < vh * 0.92 && r.bottom > 0){
        el.classList.add('in');
        reveals.splice(i, 1);
      }
    }
  }
  revealInView();
  window.addEventListener('scroll', revealInView, { passive:true });
  window.addEventListener('resize', revealInView);
  window.addEventListener('load', revealInView);
  // failsafe: nada debe quedar oculto
  setTimeout(function(){ document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); }); }, 2500);

  /* ---------- Mapa de acciones y colaboraciones ---------- */
  var mapStage = document.querySelector('[data-map]');
  if(mapStage){
    var SITES = [
      { id:'atacama', x:46, y:11, type:'collab', loc:'Desierto de Atacama', coord:'23.5°S · 4.300 m',
        title:'Glaciares de roca y permafrost andino',
        body:'Colaboración para mapear reservas de hielo subterráneo en la alta cordillera del norte, claves para la seguridad hídrica de las cuencas semiáridas.' },
      { id:'olivares', x:40, y:31, type:'accion', loc:'Glaciares de los Andes Centrales', coord:'33.5°S · 3.900 m',
        title:'Monitoreo de balance de masa',
        body:'Mediciones estacionales de acumulación y ablación en glaciares de la cuenca del Maipo, que abastecen de agua a la zona central de Chile.' },
      { id:'valdivia', x:54, y:48, type:'accion', loc:'Valdivia · Región de los Ríos', coord:'39.8°S · Sede',
        title:'Sede de la Fundación',
        body:'Centro de operaciones, laboratorio de datos y vínculo con la academia. Desde aquí coordinamos investigación, educación y activismo.' },
      { id:'villarrica', x:48, y:52, type:'accion', loc:'Volcán Villarrica · Araucanía', coord:'39.4°S · 2.847 m',
        title:'Educación y glaciología volcánica',
        body:'Programa de aula en terreno con comunidades y escuelas: la montaña como espacio de aprendizaje sobre el hielo y el riesgo volcánico.' },
      { id:'sanrafael', x:42, y:66, type:'collab', loc:'Campo de Hielo Norte', coord:'46.7°S · Laguna San Rafael',
        title:'Frente glaciar en retroceso',
        body:'Colaboración de monitoreo del glaciar San Rafael, uno de los frentes de marea de más rápido cambio del hemisferio sur.' },
      { id:'hielosur', x:38, y:78, type:'accion', loc:'Campo de Hielo Sur', coord:'49.5°S · Patagonia',
        title:'Expedición de criósfera austral',
        body:'Campañas de terreno sobre la tercera reserva de hielo continental del planeta: balance de masa, química del hielo y registro fotográfico.' },
      { id:'darwin', x:50, y:92, type:'collab', loc:'Cordillera Darwin · Tierra del Fuego', coord:'54.6°S · Magallanes',
        title:'Red austral de observación',
        body:'Colaboración con estaciones del extremo sur para vigilar glaciares de montaña, permafrost y ecosistemas del frío más austral de Chile.' }
    ];

    var detail = document.querySelector('[data-map-detail]');
    function renderDetail(s){
      if(!detail) return;
      detail.innerHTML =
        '<span class="mtag '+(s.type==='accion'?'accion':'collab')+'">'+(s.type==='accion'?'Acción Anori':'Colaboración')+'</span>'+
        '<p class="kicker kicker--glaciar mt-4 mb-2">'+s.loc+'</p>'+
        '<h3 class="title-lg mb-3">'+s.title+'</h3>'+
        '<p class="muted-ice mb-4">'+s.body+'</p>'+
        '<p class="map-coords mb-0">◍ '+s.coord+'</p>';
    }

    var pins = mapStage.querySelectorAll('.map-pin');
    function activate(id){
      var s = SITES.filter(function(x){ return x.id===id; })[0];
      if(!s) return;
      pins.forEach(function(p){ p.classList.toggle('active', p.dataset.site===id); });
      renderDetail(s);
    }
    pins.forEach(function(p){
      p.addEventListener('click', function(){ activate(p.dataset.site); });
    });
    // estado inicial: la sede
    activate('valdivia');
  }

  /* ---------- Año dinámico en el footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

  /* ---------- Newsletter / formularios demo ---------- */
  document.querySelectorAll('[data-demo-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var note = form.querySelector('[data-form-note]');
      if(note){ note.style.display='block'; }
      form.reset();
    });
  });

})();
