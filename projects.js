/* hide & geek — project lightbox */
(function () {
  'use strict';

  /* ---- project data (newest first) ----
     To add a render later: drop the image in /assets and add a line to `renders`.
     Set comingSoon:false once a project has at least one render. */
  var PROJECTS = [
    {
      id: 'concept-car',
      title: 'Concept Hypercar',
      cat: 'Concept vehicle',
      credit: 'a tutorial by CG Masters',
      desc: 'A custom concept sports car — gloss black panels, sculpted aero and cyan running lights, shot on a mountain road at golden hour. My most ambitious build so far.',
      renders: [
        { src: 'assets/concept-car.jpg', cap: 'Hero shot · Cycles' }
      ],
      more: 'More angles coming soon'
    },
    {
      id: 'sunday-kitchen',
      title: 'Sunday Kitchen',
      cat: 'Cosy scene',
      credit: 'a tutorial by Mad Candy 3D',
      desc: 'A warm, golden-hour kitchen caught mid-bake — lace curtains, worn enamel tins and a haze of flour dust. A study in soft light and homely clutter.',
      renders: [
        { src: 'assets/cosy-kitchen.jpg', cap: 'Golden hour · Cycles' }
      ],
      more: 'More angles coming soon'
    },
    {
      id: 'neon-city',
      title: 'Neon City',
      cat: 'Environment',
      credit: 'a tutorial by Max Hay',
      desc: 'A rain-slicked back alley after dark — a glowing red karaoke sign, tangled overhead cables and reflections pooling on the wet ground. My take on a moody, cinematic cyberpunk street.',
      renders: [
        { src: 'assets/neon-city.jpg', cap: 'Rainy night · Cycles' }
      ],
      more: 'More angles coming soon'
    },
    {
      id: 'warehouse',
      title: 'The Warehouse',
      cat: 'Interior',
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
      cat: 'First render',
      credit: 'the one tutorial every Blender artist starts with',
      desc: 'Where every Blender journey begins — the legendary pink-iced donut and a cup of coffee. Proof that everyone starts somewhere, sprinkles and all.',
      renders: [
        { src: 'assets/doughnuts.jpg', cap: 'The classic · Cycles' }
      ]
    }
  ];

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

  /* image zoom layer */
  var iz = document.getElementById('imgZoom');
  var izImg = document.getElementById('izImg');
  var izCap = document.getElementById('izCap');
  function openZoom(src, cap) {
    izImg.src = src; izImg.alt = cap || ''; izCap.textContent = cap || '';
    iz.setAttribute('aria-hidden', 'false'); iz.classList.add('open');
  }
  function closeZoom() {
    iz.classList.remove('open'); iz.setAttribute('aria-hidden', 'true'); izImg.removeAttribute('src');
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function buildGallery(p) {
    var html = '';
    (p.renders || []).forEach(function (r) {
      var cap = r.cap || p.title;
      html += '<figure class="lb-shot"><img src="' + r.src + '" alt="' + p.title +
        ' render" data-cap="' + cap + '" loading="lazy" />' +
        (r.cap ? '<figcaption class="cap">' + r.cap + '</figcaption>' : '') + '</figure>';
    });
    if (p.comingSoon || p.more) {
      html += '<div class="lb-soon"><span class="dotmark"></span>' +
        '<span class="big">' + (p.comingSoon ? 'Renders in progress' : p.more) + '</span>' +
        '<span class="small">' + (p.comingSoon ? 'this build is on the bench' : 'check back soon') + '</span></div>';
    }
    elGallery.innerHTML = html;
  }

  function render(i) {
    var p = PROJECTS[i];
    current = i;
    elCounter.innerHTML = pad(i + 1) + ' / ' + pad(PROJECTS.length) + ' &nbsp;·&nbsp; <b>' + p.title + '</b>';
    elCat.textContent = p.cat;
    elTitle.textContent = p.title;
    elDesc.textContent = p.desc;
    elCredit.innerHTML = '<b>Inspired by</b> ' + p.credit;
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
    render(i);
    document.body.classList.add('lb-lock');
    lb.setAttribute('aria-hidden', 'false');
    lb.classList.add('open');
    /* transform-only entrance: if the transition freezes, content stays visible */
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
    var n = PROJECTS.length;
    var next = (current + dir + n) % n;   /* wrap around */
    render(next);
    /* quick slide on swap (transform only — never hides content) */
    inner.style.transform = 'translateY(16px)';
    void inner.offsetWidth;
    inner.style.transform = '';
  }

  /* open triggers */
  document.querySelectorAll('[data-project]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      open(el.getAttribute('data-project'));
    });
  });

  /* controls */
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
  document.getElementById('lbNext').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) {
    /* click on the dimmed area (not the inner content or bar) closes */
    if (e.target === lb) close();
  });
  /* click a render to enlarge it (handles any proportion via object-fit) */
  elGallery.addEventListener('click', function (e) {
    var img = e.target.closest ? e.target.closest('.lb-shot img') : null;
    if (img) openZoom(img.getAttribute('src'), img.getAttribute('data-cap'));
  });
  iz.addEventListener('click', closeZoom);

  document.addEventListener('keydown', function (e) {
    if (iz.classList.contains('open')) {
      if (e.key === 'Escape') closeZoom();
      return;
    }
    if (lb.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
})();
