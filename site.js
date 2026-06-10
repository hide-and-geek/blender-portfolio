/* hide & geek — interactions */
(function () {
  'use strict';

  /* nav: solidify after hero */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 60) nav.classList.add('solid');
    else nav.classList.remove('solid');
    requestParallax();
  }

  /* ---- hero parallax: background and foreground move at different rates ---- */
  var heroMediaEl = document.querySelector('[data-parallax]');   /* image layer */
  var heroInner = document.querySelector('.hero-inner');         /* text layer  */
  var heroFoot = document.querySelector('.hero-foot');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ticking = false;

  function parallax() {
    ticking = false;
    if (reduce || document.body.classList.contains('no-motion')) {
      if (heroMediaEl) heroMediaEl.style.transform = '';
      if (heroInner) { heroInner.style.transform = ''; heroInner.style.opacity = ''; }
      return;
    }
    var y = window.scrollY;
    var vh = window.innerHeight || 800;
    if (y > vh) return; /* hero off-screen — stop updating */
    /* background drifts DOWN as you scroll up, so it exits ~40% slower than the page */
    if (heroMediaEl) heroMediaEl.style.transform = 'translate3d(0,' + (y * 0.42).toFixed(1) + 'px,0)';
    /* foreground text drifts UP a touch faster and fades, deepening the separation */
    if (heroInner) {
      heroInner.style.transform = 'translate3d(0,' + (y * -0.12).toFixed(1) + 'px,0)';
      heroInner.style.opacity = Math.max(0, 1 - y / (vh * 0.92)).toFixed(3);
    }
    if (heroFoot) heroFoot.style.opacity = Math.max(0, 1 - y / (vh * 0.4)).toFixed(3);
  }

  function requestParallax() {
    if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
  }

  /* scroll reveal — getBoundingClientRect based (robust across iframe contexts) */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function checkReveals() {
    var h = window.innerHeight || document.documentElement.clientHeight;
    for (var i = reveals.length - 1; i >= 0; i--) {
      var el = reveals[i];
      var top = el.getBoundingClientRect().top;
      if (top < h * 0.92) {
        void el.offsetWidth; /* commit the hidden base state so the transition runs */
        el.classList.add('in');
        reveals.splice(i, 1);
      }
    }
  }

  function onScrollAll() { onScroll(); checkReveals(); }
  window.addEventListener('scroll', onScrollAll, { passive: true });
  window.addEventListener('resize', checkReveals, { passive: true });
  onScroll();
  /* defer the first reveal past first paint so the hidden state renders and the
     transition actually runs (otherwise elements can stick at opacity:0) */
  requestAnimationFrame(function () { requestAnimationFrame(checkReveals); });
  /* run a few more times as fonts/layout settle */
  setTimeout(checkReveals, 200);
  setTimeout(checkReveals, 500);
  /* hard safety net: if any element is still hidden, force it visible with no
     transition so content can never get stuck at opacity:0 */
  setTimeout(function () {
    document.querySelectorAll('.reveal').forEach(function (el) {
      if (parseFloat(getComputedStyle(el).opacity) < 0.9) {
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
      el.classList.add('in');
    });
    reveals.length = 0;
  }, 1600);

  /* hero glow follows cursor */
  var hero = document.querySelector('.hero');
  var glow = document.getElementById('heroGlow');
  if (hero && glow) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      glow.style.left = (e.clientX - r.left) + 'px';
      glow.style.top = (e.clientY - r.top) + 'px';
    });
  }

  /* copy email */
  var btn = document.getElementById('copyMail');
  var toast = document.getElementById('toast');
  if (btn) {
    btn.addEventListener('click', function () {
      var email = 'tony@hideandgeek.co.uk';
      var done = function () {
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 1700);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(done);
      } else {
        var t = document.createElement('textarea');
        t.value = email; document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); } catch (err) {}
        document.body.removeChild(t); done();
      }
    });
  }
})();
