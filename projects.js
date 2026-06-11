/* ============================================================
   hide & geek — projects data + gallery builder
   ============================================================

   ▶ THIS IS THE ONLY FILE YOU NEED TO EDIT TO MANAGE YOUR WORK.
     It builds the homepage gallery, the big "Most proud of"
     feature, and the click-through project views — all from the
     single list below.

   ─ HOW TO… ─────────────────────────────────────────────────
   • ADD A PHOTO to a project: add a line to its `renders` list:
        { src: 'assets/my-new-image.jpg', cap: 'Detail shot' }
     (drop the image file in the /assets folder first)

   • ADD A VIDEO (e.g. a turntable): same as a photo, but point at
     an .mp4 file. It autoplays muted, loops, and goes fullscreen
     when clicked. A `poster` image shows before it loads:
        { src: 'assets/spin.mp4', poster: 'assets/spin.jpg', cap: 'Turntable' }
     Tip: keep videos short and under ~10 MB.

   • ADD A NEW PROJECT: copy one whole { … } block, paste it,
     and change the details. `id` must be unique (lowercase,
     no spaces). Newest projects go nearer the TOP of the list.

   • CHANGE THE MAIN PROJECT: move `featured: true` onto the one
     you want as the big hero piece (only ONE should have it).

   • A PROJECT WITH NO PHOTOS YET: give it `renders: []` and add
     `comingSoon: true,` — it shows a tidy "in progress" card.

   • The little card number (01, 02…) is added automatically —
     you don't need to touch it.
   ============================================================ */

var PROJECTS = [
  {
    id: 'concept-car',
    title: 'Concept Hypercar',
    category: 'Concept vehicle',
    credit: 'a tutorial by CG Masters',
    desc: 'The H6 — a custom concept hypercar in gloss black, liquid silver and deep red, with sculpted aero, gullwing doors and cyan running lights. Shot from city streets to a mountain pass, inside and out. My most ambitious build so far.',
    featured: true,
    renders: [
      { src: 'assets/concept-car.jpg', cap: 'Mountain road · golden hour' },
      { src: 'assets/car-city.jpg', cap: 'City street · gloss black' },
      { src: 'assets/car-racing.jpg', cap: 'Mountain pass · in red' },
      { src: 'assets/car-rear.jpg', cap: 'Gullwing doors · in silver' },
      { src: 'assets/car-interior.jpg', cap: 'The cockpit · neon trim' }
    ]
  },
  {
    id: 'sunday-kitchen',
    title: 'Sunday Kitchen',
    category: 'Cosy scene',
    credit: 'a tutorial by Mad Candy 3D',
    desc: 'A warm, golden-hour cottage kitchen caught mid-bake — lace curtains, worn enamel tins, vintage stove and a haze of flour dust. A study in soft light and homely clutter.',
    renders: [
      { src: 'assets/kitchen-wide.jpg', cap: 'The whole scene · golden hour' },
      { src: 'assets/cosy-kitchen.jpg', cap: 'Baking counter · Cycles' },
      { src: 'assets/kitchen-baking.jpg', cap: 'Mid-bake · overhead' },
      { src: 'assets/kitchen-window.jpg', cap: 'By the window' },
      { src: 'assets/kitchen-dining.jpg', cap: 'Afternoon tea' },
      { src: 'assets/kitchen-corner.jpg', cap: 'The old stove · morning light' }
    ]
  },
  {
    id: 'neon-city',
    title: 'Neon City',
    category: 'Environment',
    credit: 'a tutorial by Max Hay',
    desc: 'A moody, cinematic cyberpunk world after dark — rain-soaked back alleys, dizzying rooftop views over light-trail intersections, and the strange glow of a derelict hall. My take on neon-soaked sci-fi.',
    renders: [
      { src: 'assets/neon-city.jpg', cap: 'Rainy night · Cycles' },
      { src: 'assets/neon-city-rooftop.jpg', cap: 'Crossing the lights · rooftop view' },
      { src: 'assets/neon-city-cube.jpg', cap: 'The data cube · derelict hall' }
    ],
    more: 'More angles coming soon'
  },
  {
    id: 'warehouse',
    title: 'The Warehouse',
    category: 'Interior',
    credit: 'a tutorial by Company of Visuals',
    desc: 'A cavernous industrial interior — skylight shafts cutting through dust, puddle reflections on the concrete and a battered shipping container in the corner. A study in grit, scale and natural light.',
    renders: [
      { src: 'assets/warehouse.jpg', cap: 'Wide interior · Cycles' }
    ],
    more: 'More angles coming soon'
  },
  {
    id: 'doughnuts',
    title: 'Doughnuts',
    category: 'First render',
    credit: 'the one tutorial every Blender artist starts with',
    desc: 'Where every Blender journey begins — the legendary pink-iced donut and a cup of coffee. Proof that everyone starts somewhere, sprinkles and all.',
    renders: [
      { src: 'assets/doughnuts.jpg', cap: 'The classic · Cycles' },
      { src: 'assets/doughnut-turntable.mp4', poster: 'assets/doughnuts.jpg', cap: 'Turntable · click to enlarge' }
    ]
  }
];

/* ============================================================
   Below here is the machinery — you shouldn't need to edit it.
   ============================================================ */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function isVideo(src) { return /\.(mp4|webm|mov|m4v)$/i.test(src || ''); }
  function coverOf(p) {
    if (!p.renders) return null;
    for (var i = 0; i < p.renders.length; i++) {       /* card/hero want a still image */
      if (!isVideo(p.renders[i].src)) return p.renders[i].src;
    }
    return (p.renders[0] && p.renders[0].poster) ? p.renders[0].poster : null;
  }

  /* ---------- build the homepage from PROJECTS ---------- */
  var featured = PROJECTS.filter(function (p) { return p.featured; })[0] || PROJECTS[0];
  var gridProjects = PROJECTS.filter(function (p) { return p !== featured; });

  function featuredHTML(p) {
    var cover = coverOf(p);
    var media = cover
      ? '<div class="media reveal" data-project="' + esc(p.id) + '"><img src="' + esc(cover) +
        '" alt="' + esc(p.title) + ' render" /><span class="meta">Blender · Cycles</span><div class="arrow">↗</div></div>'
      : '<div class="media ph reveal" data-project="' + esc(p.id) + '"><span class="ph-name">' + esc(p.title) +
        '</span><span class="ph-tag">render coming soon</span><div class="arrow">↗</div></div>';
    return '<article class="featured">' + media +
      '<div class="featured-info">' +
        '<div class="kicker reveal"><span class="eyebrow">★ Most proud of</span></div>' +
        '<h3 class="reveal" style="--d:.06s">' + esc(p.title) + '</h3>' +
        '<p class="reveal" style="--d:.1s">' + esc(p.desc) + '</p>' +
        '<p class="credit reveal" style="--d:.14s"><b>Inspired by</b> ' + esc(p.credit) + '</p>' +
        '<div class="reveal" style="--d:.18s; margin-top:26px;">' +
          '<button class="btn ghost" type="button" data-project="' + esc(p.id) + '">View project <span class="ar">→</span></button>' +
        '</div>' +
      '</div></article>';
  }

  function cardHTML(p, number, delay) {
    var cover = coverOf(p);
    var media = cover
      ? '<div class="media"><img src="' + esc(cover) + '" alt="' + esc(p.title) +
        ' render" /><div class="shade"></div><div class="arrow">↗</div></div>'
      : '<div class="media ph"><span class="ph-name">' + esc(p.title) +
        '</span><span class="ph-tag">render coming soon</span><div class="arrow">↗</div></div>';
    var d = delay ? ' style="--d:' + delay + '"' : '';
    return '<article class="card reveal"' + d + ' data-project="' + esc(p.id) + '">' + media +
      '<div class="card-foot"><h3>' + esc(p.title) + '</h3><span class="num">' +
        pad(number) + ' / ' + esc(String(p.category).toLowerCase()) + '</span></div>' +
      '<p class="credit"><b>Inspired by</b> ' + esc(p.credit) + '</p></article>';
  }

  var heroImg = document.getElementById('heroImg');
  if (heroImg && coverOf(featured)) { heroImg.src = coverOf(featured); heroImg.alt = featured.title + ' render'; }
  var heroTag = document.getElementById('heroTag');
  if (heroTag) heroTag.innerHTML = 'Featured · <b>' + esc(featured.title) + '</b>';

  var fm = document.getElementById('featuredMount');
  if (fm) fm.innerHTML = featuredHTML(featured);
  var gm = document.getElementById('gridMount');
  if (gm) {
    var n = gridProjects.length;
    gm.innerHTML = gridProjects.map(function (p, k) {
      return cardHTML(p, n - k, (k % 2) ? '.08s' : '');
    }).join('');
  }

  /* ---------- project lightbox ---------- */
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  var elCounter = document.getElementById('lbCounter');
  var elCat = document.getElementById('lbCat');
  var elTitle = document.getElementById('lbTitle');
  var elDesc = document.getElementById('lbDesc');
  var elCredit = document.getElementById('lbCredit');
  var elGallery = document.getElementById('lbGallery');
  var inner = lb.querySelector('.lb-inner');
  var current = -1;
  var lastFocus = null;

  /* image / video zoom layer */
  var iz = document.getElementById('imgZoom');
  var izStage = document.getElementById('izStage');
  var izCap = document.getElementById('izCap');
  function openZoom(src, cap, isVid, poster) {
    if (isVid) {
      izStage.innerHTML = '<video src="' + esc(src) + '" ' + (poster ? 'poster="' + esc(poster) + '" ' : '') +
        'autoplay loop muted playsinline controls></video>';
      izStage.onclick = function (e) { e.stopPropagation(); };   /* keep the controls usable */
    } else {
      izStage.innerHTML = '<img src="' + esc(src) + '" alt="' + esc(cap || '') + '" />';
      izStage.onclick = null;                                    /* click image → backdrop closes */
    }
    izCap.textContent = cap || '';
    iz.setAttribute('aria-hidden', 'false'); iz.classList.add('open');
  }
  function closeZoom() {
    iz.classList.remove('open'); iz.setAttribute('aria-hidden', 'true'); izStage.innerHTML = '';
  }

  function buildGallery(p) {
    var html = '';
    (p.renders || []).forEach(function (r) {
      var cap = r.cap || p.title;
      if (isVideo(r.src)) {
        html += '<figure class="lb-shot is-video"><video src="' + esc(r.src) + '" ' +
          (r.poster ? 'poster="' + esc(r.poster) + '" ' : '') +
          'data-cap="' + esc(cap) + '" autoplay muted loop playsinline preload="metadata"></video>' +
          (r.cap ? '<figcaption class="cap">' + esc(r.cap) + '</figcaption>' : '') + '</figure>';
      } else {
        html += '<figure class="lb-shot"><img src="' + esc(r.src) + '" alt="' + esc(p.title) +
          ' render" data-cap="' + esc(cap) + '" loading="lazy" />' +
          (r.cap ? '<figcaption class="cap">' + esc(r.cap) + '</figcaption>' : '') + '</figure>';
      }
    });
    if (p.comingSoon || p.more) {
      html += '<div class="lb-soon"><span class="dotmark"></span>' +
        '<span class="big">' + (p.comingSoon ? 'Renders in progress' : esc(p.more)) + '</span>' +
        '<span class="small">' + (p.comingSoon ? 'this build is on the bench' : 'check back soon') + '</span></div>';
    }
    elGallery.innerHTML = html;
  }

  function renderView(i) {
    var p = PROJECTS[i];
    current = i;
    elCounter.innerHTML = pad(i + 1) + ' / ' + pad(PROJECTS.length) + ' &nbsp;·&nbsp; <b>' + esc(p.title) + '</b>';
    elCat.textContent = p.category;
    elTitle.textContent = p.title;
    elDesc.textContent = p.desc;
    elCredit.innerHTML = '<b>Inspired by</b> ' + esc(p.credit);
    buildGallery(p);
    lb.scrollTop = 0;
  }

  function indexOfId(id) {
    for (var i = 0; i < PROJECTS.length; i++) { if (PROJECTS[i].id === id) return i; }
    return -1;
  }

  function open(id) {
    var i = indexOfId(id);
    if (i < 0) return;
    lastFocus = document.activeElement;
    renderView(i);
    document.body.classList.add('lb-lock');
    lb.setAttribute('aria-hidden', 'false');
    lb.classList.add('open');
    inner.style.transform = 'translateY(24px)';
    void inner.offsetWidth;
    inner.style.transform = '';
    document.getElementById('lbClose').focus();
  }

  function close() {
    lb.classList.remove('open');
    document.body.classList.remove('lb-lock');
    lb.setAttribute('aria-hidden', 'true');
    closeZoom();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(dir) {
    var nn = PROJECTS.length;
    renderView((current + dir + nn) % nn);
    inner.style.transform = 'translateY(16px)';
    void inner.offsetWidth;
    inner.style.transform = '';
  }

  /* open triggers (on the freshly-built cards + feature) */
  document.querySelectorAll('[data-project]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      open(el.getAttribute('data-project'));
    });
  });

  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
  document.getElementById('lbNext').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  elGallery.addEventListener('click', function (e) {
    var img = e.target.closest ? e.target.closest('.lb-shot img') : null;
    if (img) { openZoom(img.getAttribute('src'), img.getAttribute('data-cap'), false); return; }
    var vid = e.target.closest ? e.target.closest('.lb-shot video') : null;
    if (vid) { openZoom(vid.getAttribute('src'), vid.getAttribute('data-cap'), true, vid.getAttribute('poster')); }
  });
  iz.addEventListener('click', closeZoom);

  document.addEventListener('keydown', function (e) {
    if (iz.classList.contains('open')) { if (e.key === 'Escape') closeZoom(); return; }
    if (lb.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
})();
