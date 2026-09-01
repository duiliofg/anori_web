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
    document.body.classList.remove('nav-open');
  }
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      if(backdrop) backdrop.classList.toggle('show', open);
      document.body.classList.toggle('nav-open', open);
    });
    if(backdrop) backdrop.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });
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

  /* ---------- Actividades: se generan desde js/actividades.js ---------- */
  var ACTS = window.ANORI_ACTIVIDADES || [];
  function esc(s){ return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function carruselHTML(a){
    if(!a.fotos || !a.fotos.length) return '';
    var slots = a.fotos.map(function(src, i){
      return '<image-slot id="' + esc(a.id) + '-f' + i + '" src="' + esc(src) + '" shape="rounded" radius="4" placeholder="Foto"></image-slot>';
    }).join('');
    return '<div class="carousel">' +
      '<button type="button" class="carousel__nav carousel__nav--prev" aria-label="Anterior">&#8249;</button>' +
      '<div class="carousel__track">' + slots + '</div>' +
      '<button type="button" class="carousel__nav carousel__nav--next" aria-label="Siguiente">&#8250;</button>' +
      '</div>';
  }

  var entriesWrap = document.querySelector('[data-entries]');
  if(entriesWrap && ACTS.length){
    entriesWrap.innerHTML = ACTS.map(function(a){
      var cuerpo = (a.cuerpo || []).map(function(p, i){
        return '<p class="' + (i === 0 ? 'entry__lead' : 'muted-ice') + '">' + esc(p) + '</p>';
      }).join('');
      var enlace = a.enlace ? '<a href="' + esc(a.enlace.url) + '" target="_blank" rel="noopener" class="btn-anori btn-outline-ice">' + esc(a.enlace.texto) + ' <span class="arr">&rarr;</span></a>' : '';
      return '<details class="entry" data-tag="' + esc(a.tag) + '" data-screen-label="' + esc(a.titulo) + '">' +
        '<summary class="entry__head">' +
          '<span class="entry__thumb"><image-slot id="' + esc(a.id) + '-portada" src="' + esc(a.portada) + '" shape="rounded" radius="4" placeholder="Portada"></image-slot></span>' +
          '<span class="entry__meta">' +
            '<span class="entry__date">' + esc(a.fecha) + '</span>' +
            '<span class="entry__t">' + esc(a.titulo) + '</span>' +
            '<span class="entry__place">' + esc(a.lugar) + '</span>' +
          '</span>' +
          '<span class="entry__tag">' + esc(a.tag) + '</span>' +
          '<span class="entry__chev" aria-hidden="true"></span>' +
        '</summary>' +
        '<div class="entry__body">' + cuerpo + enlace + carruselHTML(a) + '</div>' +
      '</details>';
    }).join('');

    var chipsWrap = document.querySelector('[data-entries-filter]');
    if(chipsWrap){
      var tags = [];
      ACTS.forEach(function(a){ if(tags.indexOf(a.tag) < 0) tags.push(a.tag); });
      chipsWrap.innerHTML = '<button type="button" class="tag-chip active" data-filter="all">Todas</button>' +
        tags.map(function(t){ return '<button type="button" class="tag-chip" data-filter="' + esc(t) + '">' + esc(t) + '</button>'; }).join('');
    }
  }

  var ultimas = document.querySelector('[data-ultimas]');
  if(ultimas && ACTS.length){
    ultimas.innerHTML = ACTS.slice(0, 2).map(function(a, i){
      return '<div class="col-md-6"><article class="news-card">' +
        '<image-slot id="' + esc(a.id) + '-card" src="' + esc(a.portada) + '" class="news-img" shape="rounded" radius="6" placeholder="Foto"></image-slot>' +
        '<div class="news-meta"><span class="news-date">' + esc(a.fecha) + '</span><span class="news-tag">' + esc(a.tag) + '</span></div>' +
        '<h3 class="news-title">' + esc(a.titulo) + '</h3>' +
        '<p class="muted-ice news-excerpt">' + esc(a.resumen || '') + '</p>' +
        '<a href="actividades.html" class="link-arrow text-glaciar">Leer más <span class="arr">&rarr;</span></a>' +
      '</article></div>';
    }).join('');
  }

  /* ---------- Mapa Leaflet: acciones y colaboraciones ---------- */
  var mapEl = document.getElementById('map');
  if(mapEl && window.L){
    var SITES = ACTS.filter(function(a){ return a.lat && a.lon; }).map(function(a){
      return {
        id: a.id, lat: a.lat, lon: a.lon, type: 'accion', loc: a.lugar,
        coord: Math.abs(a.lat).toFixed(2) + '°S · ' + Math.abs(a.lon).toFixed(2) + '°O',
        title: a.titulo,
        body: (a.cuerpo && a.cuerpo[0]) || ''
      };
    });
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
    if(SITES.length){
      markers[SITES[0].id].setStyle({ fillOpacity:.95, weight:3 });
      renderDetail(SITES[0]);
    }
  }

  /* ---------- Publicaciones: se leen desde js/publicaciones.js ---------- */
  var PUBS = window.ANORI_PUBLICACIONES || [];
  var pubsWrap = document.querySelector('[data-pubs]');
  if(pubsWrap && PUBS.length){
    pubsWrap.insertAdjacentHTML('afterbegin', PUBS.map(function(p){
      return '<div class="pub-row" data-tag="' + esc(p.tag) + '" data-authors="' + esc((p.colaboradores || []).join('|')) + '">' +
        '<span class="yr">' + esc(p.anio) + '</span>' +
        '<div><div class="tt"><a class="pub-link" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.titulo) + '</a></div>' +
        '<p class="pub-authors">' + (p.autores || '') + '</p>' +
        '<p class="pub-source">' + esc(p.fuente || '') + '</p></div>' +
        '<span class="tag">' + esc(p.tag) + '</span>' +
      '</div>';
    }).join(''));

    var tagWrap = document.querySelector('[data-pubs-filter]');
    if(tagWrap){
      var tags = [];
      PUBS.forEach(function(p){ if(tags.indexOf(p.tag) < 0) tags.push(p.tag); });
      tagWrap.innerHTML = '<span class="filter-label">Tópico</span>' +
        '<button type="button" class="tag-chip active" data-filter="all">Todos</button>' +
        tags.map(function(t){ return '<button type="button" class="tag-chip" data-filter="' + esc(t) + '">' + esc(t) + '</button>'; }).join('');
    }
  }

  /* ---------- Filtros por etiqueta y por colaborador ---------- */
  document.querySelectorAll('[data-entries], [data-filterable]').forEach(function(wrap){
    var groups = [], prev = wrap.previousElementSibling;
    while(prev && prev.classList && (prev.classList.contains('tag-filter') || prev.classList.contains('pub-filters'))){
      groups.unshift(prev); prev = prev.previousElementSibling;
    }
    if(!groups.length) return;
    var items = [].slice.call(wrap.querySelectorAll('.entry, .pub-row'));
    if(!items.length) return;
    var empty = wrap.querySelector('.pub-empty');
    function apply(){
      var shown = 0;
      items.forEach(function(en){
        var ok = groups.every(function(g){
          var active = g.querySelector('.tag-chip.active');
          var f = active ? active.dataset.filter : 'all';
          var dim = g.dataset.dim || 'tag';
          if(f === 'all') return true;
          var val = en.dataset[dim] || '';
          if(f === '__any') return val.length > 0;
          return val.split('|').indexOf(f) > -1;
        });
        en.style.display = ok ? '' : 'none';
        if(ok) shown++;
      });
      if(empty) empty.style.display = shown ? 'none' : 'block';
      wrap.scrollTop = 0;
    }
    groups.forEach(function(g){
      g.addEventListener('click', function(e){
        var chip = e.target.closest('.tag-chip');
        if(!chip) return;
        g.querySelectorAll('.tag-chip').forEach(function(c){ c.classList.toggle('active', c === chip); });
        apply();
      });
    });
  });

  /* ---------- Formulario de contacto (Formspree) ---------- */
  var ajaxForm = document.querySelector('[data-ajax-form]');
  if(ajaxForm){
    ajaxForm.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = ajaxForm.querySelector('button[type=submit]');
      var note = ajaxForm.querySelector('[data-form-note]');
      var original = btn ? btn.innerHTML : '';
      if(btn){ btn.disabled = true; btn.innerHTML = 'Enviando…'; }
      fetch(ajaxForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(ajaxForm)
      }).then(function(res){
        if(!res.ok) throw new Error('fallo');
        ajaxForm.reset();
        if(note){ note.textContent = '✓ Mensaje enviado. Te responderemos pronto.'; note.style.color = 'var(--glaciar)'; note.style.display = 'block'; }
      }).catch(function(){
        if(note){ note.textContent = 'No pudimos enviar el mensaje. Escríbenos a contacto@anori.cl'; note.style.color = '#E4A79B'; note.style.display = 'block'; }
      }).finally(function(){
        if(btn){ btn.disabled = false; btn.innerHTML = original; }
      });
    });
  }

  /* ---------- Visor de fotos ---------- */
  (function(){
    var slots = [].filter.call(document.querySelectorAll('image-slot'), function(s){ return s.getAttribute('src'); });
    if(!slots.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = '<button class="lightbox__close" aria-label="Cerrar">&times;</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" aria-label="Anterior">&#8249;</button>' +
      '<figure class="lightbox__fig"><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lightbox__nav lightbox__nav--next" aria-label="Siguiente">&#8250;</button>';
    document.body.appendChild(box);
    var img = box.querySelector('img');
    var cap = box.querySelector('figcaption');
    var idx = 0;

    function show(i){
      idx = (i + slots.length) % slots.length;
      var s = slots[idx];
      img.src = s.getAttribute('src');
      var fig = s.closest('figure');
      var label = s.getAttribute('data-caption') || (fig ? ((fig.querySelector('h3') || {}).textContent || '') : '');
      cap.textContent = label || '';
      cap.style.display = cap.textContent ? '' : 'none';
    }
    function open(i){ show(i); box.classList.add('open'); document.body.classList.add('lightbox-open'); }
    function close(){ box.classList.remove('open'); document.body.classList.remove('lightbox-open'); }

    slots.forEach(function(s, i){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'zoom-btn';
      btn.setAttribute('aria-label', 'Ver la foto en grande');
      btn.innerHTML = '<span></span>';
      var host = s.parentElement;
      // si el contenedor alberga varias fotos (carrusel), envolver cada una
      if(host.querySelectorAll('image-slot').length > 1){
        var cell = document.createElement('span');
        cell.className = 'slot-cell';
        host.insertBefore(cell, s);
        cell.appendChild(s);
        host = cell;
      }
      if(getComputedStyle(host).position === 'static') host.style.position = 'relative';
      host.appendChild(btn);
      btn.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); open(i); });
      if(s.closest('summary')) btn.addEventListener('mousedown', function(e){ e.preventDefault(); });
    });

    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.querySelector('.lightbox__nav--prev').addEventListener('click', function(){ show(idx - 1); });
    box.querySelector('.lightbox__nav--next').addEventListener('click', function(){ show(idx + 1); });
    box.addEventListener('click', function(e){ if(e.target === box) close(); });
    document.addEventListener('keydown', function(e){
      if(!box.classList.contains('open')) return;
      if(e.key === 'Escape') close();
      if(e.key === 'ArrowLeft') show(idx - 1);
      if(e.key === 'ArrowRight') show(idx + 1);
    });
  })();

  /* ---------- Carruseles ---------- */
  document.querySelectorAll('.carousel').forEach(function(car){
    var track = car.querySelector('.carousel__track');
    var prev = car.querySelector('.carousel__nav--prev');
    var next = car.querySelector('.carousel__nav--next');
    function step(){ var first = track.querySelector('image-slot'); return first ? first.getBoundingClientRect().width + 14 : 300; }
    function sync(){
      var max = track.scrollWidth - track.clientWidth - 2;
      if(prev) prev.disabled = track.scrollLeft <= 2;
      if(next) next.disabled = track.scrollLeft >= max;
      var hide = max <= 2;
      if(prev) prev.style.display = hide ? 'none' : '';
      if(next) next.style.display = hide ? 'none' : '';
    }
    if(prev) prev.addEventListener('click', function(){ track.scrollLeft -= step(); });
    if(next) next.addEventListener('click', function(){ track.scrollLeft += step(); });
    track.addEventListener('scroll', sync);
    setTimeout(sync, 300);
    car.closest('details') && car.closest('details').addEventListener('toggle', function(){ setTimeout(sync, 60); });
  });

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
