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

  /* ---------- Mapa Leaflet: acciones y colaboraciones ---------- */
  var mapEl = document.getElementById('map');
  if(mapEl && window.L){
    var SITES = [
      { id:'hornopiren', lat:-41.9436, lon:-72.4361, type:'accion', loc:'Hornopirén · Región de Los Lagos', coord:'41.94°S · 72.44°O',
        title:'Aula Viva Hornopirén',
        body:'Taller de glaciología y geomorfología para niñas y niños, en la instancia educativa Aula Viva promovida por Fundación Alerce 3000.' },
      { id:'valdivia', lat:-39.8142, lon:-73.2459, type:'accion', loc:'Valdivia · Región de Los Ríos', coord:'39.81°S · 73.25°O',
        title:'Charla de cuenca del río Valdivia y río San Pedro y criósfera',
        body:'Charla abierta en Valdivia para el bloque ambiental, donde la criósfera se cuenta desde la cultura local. Valdivia es además la sede de la fundación.' }
    ];
    var map = L.map('map', { scrollWheelZoom:false }).setView([-40.9, -72.8], 6);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:'&copy; OpenStreetMap &middot; &copy; CARTO', subdomains:'abcd', maxZoom:18
    }).addTo(map);

    var detail = document.querySelector('[data-map-detail]');
    function renderDetail(s){
      if(!detail) return;
      detail.innerHTML =
        '<div class="mb-3"><span class="mtag '+(s.type==='accion'?'accion':'collab')+'">'+(s.type==='accion'?'Acción Anori':'Colaboración')+'</span></div>'+
        '<p class="kicker kicker--glaciar mb-2">'+s.loc+'</p>'+
        '<h3 class="title-lg mb-3">'+s.title+'</h3>'+
        '<p class="muted-ice mb-4">'+s.body+'</p>'+
        '<p class="map-coords mb-0">◍ '+s.coord+'</p>';
    }

    var markers = {};
    SITES.forEach(function(s){
      var m = L.circleMarker([s.lat, s.lon], {
        radius:8, weight:2, color:'#A9C4D4', fillColor:'#A9C4D4', fillOpacity:.5
      }).addTo(map);
      m.bindTooltip(s.title, { direction:'top', offset:[0,-8], className:'anori-tip' });
      m.on('click', function(){
        Object.keys(markers).forEach(function(k){ markers[k].setStyle({ fillOpacity:.5, weight:2 }); });
        m.setStyle({ fillOpacity:.95, weight:3 });
        renderDetail(s);
        map.panTo([s.lat, s.lon]);
      });
      markers[s.id] = m;
    });
    markers.hornopiren.setStyle({ fillOpacity:.95, weight:3 });
    renderDetail(SITES[0]);
  }

  /* ---------- Filtro por etiqueta en Actividades ---------- */
  var entriesWrap = document.querySelector('[data-entries]');
  if(entriesWrap){
    var chips = document.querySelectorAll('.tag-chip');
    chips.forEach(function(chip){
      chip.addEventListener('click', function(){
        var f = chip.dataset.filter;
        chips.forEach(function(c){ c.classList.toggle('active', c === chip); });
        entriesWrap.querySelectorAll('.entry').forEach(function(en){
          var show = (f === 'all') || (en.dataset.tag === f);
          en.style.display = show ? '' : 'none';
        });
      });
    });
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
