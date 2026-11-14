/* ==========================================================================
   ELZION motion layer
   - Intro curtain, scroll progress, cursor ring, magnetic buttons
   - Direction-aware word reveals (scroll down: words rise, scroll back up: words drop in)
   - Scrubbed scroll scenes that rewind when you scroll back
   - Contact form typing effects
   Works on top of the existing React components; no component changes needed.
   ========================================================================== */

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

export function initMotion() {
  if (typeof window === 'undefined' || window.__mxInit) return;
  window.__mxInit = true;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced) return;

  const root = document.documentElement;
  root.classList.add('mx-loading');
  curtain();

  // wait for React to mount the home page
  const ready = () => document.querySelector('main#top .hero');
  if (ready()) requestAnimationFrame(boot);
  else {
    const mo = new MutationObserver(() => { if (ready()) { mo.disconnect(); requestAnimationFrame(boot); } });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => { mo.disconnect(); boot(); }, 4000);
  }

  let booted = false;
  function boot() {
    if (booted || !ready()) return;
    booted = true;
    if (fine) smoothScroll();
    progressBar();
    wordReveals();
    scrubWords();
    scrambles();
    footerParticles();
    scenes();
    if (fine) { cursorRing(); magnetic(); heroMouse(); footerMouse(); heroLetters(); spotlights(); tilts(); }
    inkJumps();
    if (!fine) { mobileTilt(); touchFeedback(); }
    heroFlow();
    floatPill();
    contactTyping();
  }

  /* ---------------- Intro curtain ---------------- */
  function curtain() {
    const c = document.createElement('div');
    c.id = 'mx-curtain';
    const letters = (s, start) => [...s].map((ch, i) => `<span class="mx-c"><span style="--i:${start + i}">${ch}</span></span>`).join('');
    c.innerHTML = `<div class="mx-logo">${letters('elz', 0)}<span class="mx-box">${letters('ion.', 3)}</span></div>
      <div class="mx-count">LOADING <b>000</b></div><div class="mx-bar"></div>`;
    const g = document.createElement('div'); g.id = 'mx-curtain2';
    const mount = () => { document.body.appendChild(g); document.body.appendChild(c); };
    document.body ? mount() : document.addEventListener('DOMContentLoaded', mount, { once: true });
    const b = c.querySelector('b');
    const t0 = performance.now();
    const tick = (t) => {
      const p = clamp((t - t0) / 1050);
      b.textContent = String(Math.round(p * 100)).padStart(3, '0');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const lift = () => {
      c.classList.add('mx-out');
      setTimeout(() => g.classList.add('mx-out'), 140);
      root.classList.remove('mx-loading');
      const recheck = () => dispatchEvent(new Event('scroll'));
      setTimeout(recheck, 500);
      setTimeout(() => { c.remove(); g.remove(); recheck(); }, 1400);
    };
    setTimeout(lift, 1300);
  }

  /* ---------------- Scroll progress ---------------- */
  let bar;
  function progressBar() {
    bar = document.createElement('div');
    bar.id = 'mx-progress';
    document.body.appendChild(bar);
  }

  /* ---------------- Split helpers ---------------- */
  function splitWords(el) {
    if (el.dataset.mxSplit) return;
    el.dataset.mxSplit = '1';
    let n = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          const parts = ch.data.split(/(\s+)/);
          if (!ch.data.trim()) return;
          const frag = document.createDocumentFragment();
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'mx-w';
            const wi = document.createElement('span'); wi.className = 'mx-wi'; wi.style.setProperty('--wi', n++);
            wi.textContent = p; w.appendChild(wi); frag.appendChild(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR') walk(ch);
      });
    };
    walk(el);
  }

  function splitChars(el) {
    const out = [];
    const walk = (node) => {
      [...node.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          [...ch.data].forEach((c) => {
            const s = document.createElement('span'); s.className = 'mx-ch'; s.textContent = c;
            frag.appendChild(s); out.push(s);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1) walk(ch);
      });
    };
    walk(el);
    return out;
  }

  /* ---------------- Word reveals (both directions) ---------------- */
  function wordReveals() {
    const sel = ['.meet-title h2', '.expertise h2', '.engage-head h2', '.work-head h2',
      '.fk-contact-title h2', '.ways .way p', '.ft-cta h2'];
    const els = document.querySelectorAll(sel.join(','));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const el = e.target;
        if (e.isIntersecting) {
          el.classList.add('mx-in');
        } else {
          // remember which side it left from, so the way back in plays the mirrored animation
          el.dataset.mxDir = e.boundingClientRect.top < 0 ? 'up' : 'down';
          el.classList.remove('mx-in');
        }
      });
    }, { threshold: 0.15 });
    els.forEach((el) => { splitWords(el); el.dataset.mxDir = 'down'; io.observe(el); });
  }

  /* ---------------- Eyebrow scramble ---------------- */
  function scrambles() {
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*+<>';
    const els = [...document.querySelectorAll('.eyebrow, .fk-contact-title > span, .ways .wrap h3, .fk-heading > span')]
      .filter((el) => !el.closest('.hero') && el.childNodes.length === 1 && el.firstChild.nodeType === 3);
    const run = (el) => {
      const node = el.firstChild, final = el.dataset.mxText;
      const t0 = performance.now(), dur = 700 + final.length * 18;
      cancelAnimationFrame(el._mxRaf);
      const step = (t) => {
        const p = clamp((t - t0) / dur);
        const fixed = Math.floor(p * final.length);
        let s = '';
        for (let i = 0; i < final.length; i++) {
          const c = final[i];
          s += i < fixed || c === ' ' ? c : glyphs[(Math.random() * glyphs.length) | 0];
        }
        node.data = s;
        if (p < 1) el._mxRaf = requestAnimationFrame(step);
      };
      el._mxRaf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) run(e.target); }), { threshold: 0.6 });
    els.forEach((el) => { el.dataset.mxText = el.firstChild.data; el.classList.add('mx-scr'); io.observe(el); });
  }


  /* ---------------- Smooth (inertia) scrolling for mouse wheels / trackpads ---------------- */
  // Uses the page's real scroll position, so sticky elements and every existing scroll listener keep working.
  const smooth = { on: false, target: 0, current: 0, raf: 0 };
  function smoothScroll() {
    root.style.scrollBehavior = 'auto';
    smooth.on = true;
    smooth.target = smooth.current = scrollY;
    const maxY = () => document.documentElement.scrollHeight - innerHeight;
    const canScrollInside = (el, dy) => {
      for (; el && el !== document.body && el !== root; el = el.parentElement) {
        const oy = getComputedStyle(el).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
          if ((dy < 0 && el.scrollTop > 0) || (dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1)) return true;
        }
      }
      return false;
    };
    const tick = () => {
      smooth.current = lerp(smooth.current, smooth.target, 0.085);
      if (Math.abs(smooth.target - smooth.current) < 0.4) smooth.current = smooth.target;
      scrollTo(0, smooth.current);
      smooth.raf = smooth.current === smooth.target ? 0 : requestAnimationFrame(tick);
    };
    const go = (y) => {
      smooth.target = clamp(y, 0, maxY());
      if (!smooth.raf) { smooth.current = scrollY; smooth.raf = requestAnimationFrame(tick); }
    };
    addEventListener('wheel', (e) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) || root.classList.contains('mx-loading')) return;
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 40; else if (e.deltaMode === 2) d *= innerHeight;
      if (canScrollInside(e.target, d)) return;
      e.preventDefault();
      go((smooth.raf ? smooth.target : scrollY) + d);
    }, { passive: false });
    // keyboard, scrollbar drag, find-in-page: follow the native position
    addEventListener('scroll', () => { if (!smooth.raf) smooth.target = smooth.current = scrollY; }, { passive: true });
    smooth.go = go;
  }



  /* =====================================================================
     Mobile layer: phone tilt, 3D hero carousel, touch feedback, floating pill
     ===================================================================== */
  const tilt = { x: 0, y: 0, tx: 0, ty: 0, on: false };
  window.__mxTilt = tilt;
  function mobileTilt() {
    let b0 = null, g0 = null;
    const onOri = (e) => {
      if (e.beta == null || e.gamma == null) return;
      if (b0 === null) { b0 = e.beta; g0 = e.gamma; }
      // slowly re-centre so the "rest" pose follows how the phone is being held
      b0 = lerp(b0, e.beta, 0.01); g0 = lerp(g0, e.gamma, 0.01);
      tilt.tx = clamp((e.gamma - g0) / 22, -1, 1);
      tilt.ty = clamp((e.beta - b0) / 22, -1, 1);
      tilt.on = true;
    };
    const D = window.DeviceOrientationEvent;
    if (!D) return;
    addEventListener('deviceorientation', onOri);
    // iOS only sends tilt data after the visitor allows it, and it can only be asked on a tap
    if (typeof D.requestPermission === 'function') {
      addEventListener('touchend', () => { D.requestPermission().catch(() => {}); }, { once: true });
    }
    const loop = () => {
      tilt.x = lerp(tilt.x, tilt.tx, 0.08); tilt.y = lerp(tilt.y, tilt.ty, 0.08);
      if (tilt.on) {
        const rx = (-tilt.y * 7).toFixed(2) + 'deg', ry = (tilt.x * 9).toFixed(2) + 'deg';
        document.querySelectorAll('.work-project, .mx-tl .step').forEach((el) => {
          el.style.setProperty('--rx', rx); el.style.setProperty('--ry', ry);
        });
      }
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* Hero cards → 3D coverflow carousel on phones (auto-plays, swipe to spin) */
  function heroFlow() {
    const box = document.querySelector('.hero .shots');
    if (!box) return;
    const cards = [...box.querySelectorAll('.shot')];
    const n = cards.length;
    if (n < 3) return;
    const mq = matchMedia('(max-width: 820px)');
    const dots = document.createElement('div'); dots.className = 'mx-dots';
    dots.innerHTML = cards.map(() => '<i></i>').join('');
    const dotEls = [...dots.children];
    let pos = 0, vel = 0, target = 0, dragging = false, startX = 0, startPos = 0, lastX = 0, lastT = 0, auto = 0, active = false, cw = 250;
    const wrap = (v) => ((v % n) + n) % n;
    const layout = () => {
      if (!active) return;
      box.style.height = Math.max(...cards.map((c) => c.offsetHeight)) + 70 + 'px';
      cw = cards[0].offsetWidth;
    };
    const enable = () => {
      if (active === mq.matches) return;
      active = mq.matches;
      box.classList.toggle('mx-flow', active);
      if (active) { box.after(dots); requestAnimationFrame(layout); }
      else { dots.remove(); box.style.height = ''; cards.forEach((c) => { c.style.transform = ''; c.style.zIndex = ''; c.style.opacity = ''; }); }
    };
    mq.addEventListener ? mq.addEventListener('change', enable) : mq.addListener(enable);
    addEventListener('resize', layout);
    enable();
    const schedule = () => { clearInterval(auto); auto = setInterval(() => { if (!dragging && !document.hidden) target = Math.round(target) + 1; }, 3200); };
    schedule();
    box.addEventListener('pointerdown', (e) => {
      if (!active) return;
      dragging = true; startX = lastX = e.clientX; startPos = pos; lastT = performance.now(); vel = 0;
    });
    addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const now = performance.now();
      vel = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now;
      pos = startPos - (e.clientX - startX) / (cw * 0.62);
      target = pos;
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      target = Math.round(pos - clamp(vel * 1.6, -2, 2));
      schedule();
    };
    addEventListener('pointerup', end); addEventListener('pointercancel', end);
    const loop = () => {
      if (active) {
        if (!dragging) pos = lerp(pos, target, 0.09);
        const tx = tilt.x || 0;
        cards.forEach((c, i) => {
          let off = wrap(i - pos);
          if (off > n / 2) off -= n;
          const a = Math.abs(off);
          const x = off * cw * 0.62 + tx * 18 * (1 + a);
          c.style.transform = `translate3d(${x.toFixed(1)}px, ${(a * 14).toFixed(1)}px, ${(-a * 150).toFixed(1)}px) rotateY(${(-off * 34 + tx * 10).toFixed(2)}deg) rotateZ(${(off * 3).toFixed(2)}deg)`;
          c.style.zIndex = String(100 - Math.round(a * 10));
          c.style.opacity = String(clamp(1.9 - a * 0.75, 0, 1));
        });
        const cur = wrap(Math.round(pos));
        dotEls.forEach((d, i) => d.classList.toggle('on', i === cur));
      }
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* Touch: ripple where you tap, buttons squish like jelly, tiny haptic tick on Android */
  function touchFeedback() {
    const pressSel = 'a, button, .btn, .hero-cta, .nav-cta, .fk-send, .fk-q, .ft-orb, .mx-pill';
    document.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return;
      if (e.target.closest && e.target.closest('input, textarea')) return;
      const r = document.createElement('span'); r.className = 'mx-tap';
      r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
      document.body.appendChild(r);
      r.animate([{ transform: 'scale(.2)', opacity: 0.55 }, { transform: 'scale(3.2)', opacity: 0 }],
        { duration: 600, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = () => r.remove();
      const el = e.target.closest && e.target.closest(pressSel);
      if (!el) return;
      if (navigator.vibrate) { try { navigator.vibrate(8); } catch (_) {} }
      const down = el.animate([{ scale: 1 }, { scale: 0.93 }], { duration: 120, easing: 'ease-out', fill: 'forwards' });
      const up = () => {
        down.cancel();
        el.animate([{ scale: 0.93 }, { scale: 1.05 }, { scale: 0.99 }, { scale: 1 }], { duration: 480, easing: 'ease-out' });
        removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
      };
      addEventListener('pointerup', up); addEventListener('pointercancel', up);
    }, { passive: true });
  }

  /* Floating "Let's talk" pill with a scroll-progress ring (phones / tablets) */
  function floatPill() {
    const pill = document.createElement('a');
    pill.className = 'mx-pill'; pill.href = '#contact';
    pill.innerHTML = '<span>Let’s talk</span><i><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19"/><circle class="mx-pill-ring" cx="22" cy="22" r="19"/></svg><b>→</b></i>';
    document.body.appendChild(pill);
    const ring = pill.querySelector('.mx-pill-ring');
    const C = 2 * Math.PI * 19;
    ring.style.strokeDasharray = C.toFixed(2);
    const hero = document.querySelector('.hero');
    const stops = [document.getElementById('contact'), document.querySelector('footer')].filter(Boolean);
    const inView = new Set();
    const io = new IntersectionObserver((en) => en.forEach((x) => (x.isIntersecting ? inView.add(x.target) : inView.delete(x.target))), { threshold: 0.12 });
    stops.forEach((s) => io.observe(s));
    const loop = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      ring.style.strokeDashoffset = (C * (1 - (max > 0 ? clamp(scrollY / max) : 0))).toFixed(2);
      const show = innerWidth <= 820 && scrollY > (hero ? hero.offsetHeight * 0.55 : 400) && inView.size === 0;
      pill.classList.toggle('mx-show', show);
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------------- In-page links: glide, or an ink wipe for long jumps ---------------- */
  function inkJumps() {
    const ink = document.createElement('div');
    ink.id = 'mx-ink';
    ink.innerHTML = '<span>elz<b>ion.</b></span>';
    document.body.appendChild(ink);
    let busy = false;
    const jump = (y) => {
      if (smooth.on) { smooth.target = smooth.current = y; cancelAnimationFrame(smooth.raf); smooth.raf = 0; }
      scrollTo({ top: y, behavior: 'instant' });
    };
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || busy) return;
      const id = a.getAttribute('href').slice(1);
      const t = id ? document.getElementById(id) : null;
      if (!t && id !== 'top') return;
      e.preventDefault();
      const y = Math.max(0, t ? t.getBoundingClientRect().top + scrollY - 20 : 0);
      if (Math.abs(y - scrollY) < innerHeight * 1.6) {
        if (smooth.on) smooth.go(y); else scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
      // long jump: green ink floods out of the click, page moves underneath, ink drains away
      busy = true;
      const x = e.clientX || innerWidth / 2, cy = e.clientY || innerHeight / 2;
      ink.style.setProperty('--ix', x + 'px'); ink.style.setProperty('--iy', cy + 'px');
      ink.className = 'mx-ink-in';
      setTimeout(() => {
        jump(y);
        ink.className = 'mx-ink-hold';
        requestAnimationFrame(() => requestAnimationFrame(() => { ink.className = 'mx-ink-out'; }));
        setTimeout(() => { ink.className = ''; busy = false; }, 800);
      }, 620);
    }, true);
  }

  /* ---------------- Hero letters dodge the cursor (spring physics) ---------------- */
  function heroLetters() {
    const h1 = document.querySelector('.hero h1');
    const hero = document.querySelector('.hero');
    if (!h1 || !hero) return;
    const chars = [];
    const walk = (node) => [...node.childNodes].forEach((ch) => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.data.split(/(\s+)/).forEach((word) => {
          if (!word) return;
          if (/^\s+$/.test(word)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'mx-hw';
          [...word].forEach((c) => {
            const s = document.createElement('span'); s.className = 'mx-hc'; s.textContent = c;
            w.appendChild(s); chars.push({ el: s, x: 0, y: 0, vx: 0, vy: 0 });
          });
          frag.appendChild(w);
        });
        ch.replaceWith(frag);
      } else if (ch.nodeType === 1) walk(ch);
    });
    walk(h1);
    let mx = -9999, my = -9999, running = false;
    hero.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; if (!running) { running = true; requestAnimationFrame(step); } });
    hero.addEventListener('pointerleave', () => { mx = my = -9999; });
    const R = 130;
    function step() {
      let moving = false;
      chars.forEach((c) => {
        const r = c.el.getBoundingClientRect();
        const cx = r.left + r.width / 2 - c.x, cy = r.top + r.height / 2 - c.y;
        const dx = cx - mx, dy = cy - my, d = Math.hypot(dx, dy);
        let tx = 0, ty = 0;
        if (d < R && d > 0.01) { const f = Math.pow(1 - d / R, 2) * 32; tx = (dx / d) * f; ty = (dy / d) * f; }
        c.vx = (c.vx + (tx - c.x) * 0.16) * 0.72; c.vy = (c.vy + (ty - c.y) * 0.16) * 0.72;
        c.x += c.vx; c.y += c.vy;
        if (Math.abs(c.x) + Math.abs(c.y) + Math.abs(c.vx) + Math.abs(c.vy) > 0.05) moving = true;
        c.el.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0) rotate(${(c.x * 0.5).toFixed(2)}deg)`;
      });
      if (moving || mx > -9999) requestAnimationFrame(step); else running = false;
    }
  }

  /* ---------------- Cursor spotlight on dark surfaces ---------------- */
  function spotlights() {
    document.querySelectorAll('.pain-card, .work .dark-card, footer').forEach((card) => {
      const spot = document.createElement('i'); spot.className = 'mx-spot'; spot.setAttribute('aria-hidden', 'true');
      card.appendChild(spot);
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        spot.style.setProperty('--sx', (e.clientX - r.left).toFixed(0) + 'px');
        spot.style.setProperty('--sy', (e.clientY - r.top).toFixed(0) + 'px');
        spot.classList.add('mx-on');
      });
      card.addEventListener('pointerleave', () => spot.classList.remove('mx-on'));
    });
  }

  /* ---------------- 3D tilt ---------------- */
  function tilts() {
    const sel = '.work-project, .mx-tl .step, .ways .way';
    let cur = null;
    addEventListener('pointermove', (e) => {
      const el = e.target.closest && e.target.closest(sel);
      if (cur && cur !== el) { cur.style.setProperty('--rx', '0deg'); cur.style.setProperty('--ry', '0deg'); cur.classList.remove('mx-tilting'); }
      cur = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      const k = el.classList.contains('work-project') ? 7 : 10;
      el.classList.add('mx-tilting');
      el.style.setProperty('--rx', (-py * k).toFixed(2) + 'deg');
      el.style.setProperty('--ry', (px * k).toFixed(2) + 'deg');
    }, { passive: true });
  }

  /* ---------------- Scrubbed word highlight (Apple-style read-along) ---------------- */
  const scrubbed = [];
  function scrubWords() {
    const sel = ['.pain h2', '.expertise .lead', '.engage-head p', '.work-head .lead', '.fk-contact-title p'];
    document.querySelectorAll(sel.join(',')).forEach((el) => {
      el.dataset.mxSplit = '1';
      const words = [];
      const walk = (node) => [...node.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          if (!ch.data.trim()) return;
          const frag = document.createDocumentFragment();
          ch.data.split(/(\s+)/).forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'mx-sw'; w.textContent = p;
            frag.appendChild(w); words.push(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR') walk(ch);
      });
      walk(el);
      scrubbed.push({ el, words, p: 0 });
    });
  }


  /* ---------------- Footer: particle wordmark ----------------
     "elzion." is rebuilt from a few thousand dots. Scrolling in pulls them together,
     scrolling back up scatters them, the cursor pushes them aside, a click blasts them out. */
  function footerParticles() {
    const footer = document.querySelector('footer.ft');
    const giant = footer && footer.querySelector('.giant');
    if (!giant || !window.HTMLCanvasElement) return;
    window.__mxParticles = true;
    footer.classList.add('mx-particles');
    const canvas = document.createElement('canvas');
    giant.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let W = 0, Hc = 0, dpr = 1, parts = [], visible = false, raf = 0, A = 0;
    const mouse = { x: -9999, y: -9999, active: false };
    const GREEN = '#14C47F', PAPER = 'rgba(247,247,243,0.9)';

    function build() {
      const r = giant.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; Hc = r.height;
      if (!W || !Hc) return;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(Hc * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // render the word off-screen and sample its pixels
      const off = document.createElement('canvas'); off.width = Math.ceil(W); off.height = Math.ceil(Hc);
      const o = off.getContext('2d');
      const cs = getComputedStyle(giant);
      const fs = parseFloat(cs.fontSize);
      o.font = `800 ${fs}px ${cs.fontFamily}`;
      o.textBaseline = 'alphabetic';
      const ls = fs * -0.065;
      const wElz = o.measureText('elz').width + ls * 2, wIon = o.measureText('ion.').width + ls * 3;
      const m = o.measureText('elzion.');
      const asc = m.actualBoundingBoxAscent || fs * 0.72;
      const total = wElz + wIon + fs * 0.02;
      let x = (W - total) / 2;
      const y = Math.min(Hc - 4, (Hc + asc) / 2 + fs * 0.04);
      const drawSpaced = (txt, color) => { o.fillStyle = color; for (const ch of txt) { o.fillText(ch, x, y); x += o.measureText(ch).width + ls; } };
      drawSpaced('elz', '#f00');
      x += fs * 0.02;
      drawSpaced('ion.', '#0f0');
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const target = fine ? 2600 : 1300;
      // pick a sampling gap that lands near the target count
      let filled = 0;
      for (let i = 3; i < data.length; i += 16) if (data[i] > 128) filled++;
      const gap = Math.max(3, Math.round(Math.sqrt((filled * 4) / target)));
      const prev = parts;
      parts = [];
      for (let yy = 0; yy < off.height; yy += gap) {
        for (let xx = 0; xx < off.width; xx += gap) {
          const k = (yy * off.width + xx) * 4;
          if (data[k + 3] < 128) continue;
          const green = data[k + 1] > data[k];
          const ang = Math.random() * Math.PI * 2, rad = (0.4 + Math.random()) * Math.max(W, Hc) * 0.6;
          const old = prev[parts.length];
          parts.push({
            hx: xx, hy: yy, green,
            sx: xx + Math.cos(ang) * rad, sy: yy + Math.sin(ang) * rad - Hc * 0.6,
            x: old ? old.x : xx + Math.cos(ang) * rad, y: old ? old.y : yy + Math.sin(ang) * rad - Hc * 0.6,
            vx: 0, vy: 0, s: gap * (0.42 + Math.random() * 0.22), ph: Math.random() * 6.28,
          });
        }
      }
    }

    function frame(t) {
      raf = 0;
      if (!visible) return;
      const r = giant.getBoundingClientRect();
      const P = clamp((innerHeight - r.top) / (r.height * 0.72));
      A = lerp(A, P, 0.06);
      const a = clamp(A / 0.94), e = a * a * (3 - 2 * a);
      ctx.clearRect(0, 0, W, Hc);
      const R = Math.max(70, W * 0.07), R2 = R * R;
      let paper = new Path2D(), green = new Path2D();
      for (const p of parts) {
        const wob = Math.sin(t * 0.0015 + p.ph) * 0.6;
        const tl = window.__mxTilt;
        const tx = p.sx + (p.hx - p.sx) * e + (tl ? tl.x * 26 * (0.4 + p.hy / Hc) : 0),
              ty = p.sy + (p.hy - p.sy) * e + wob + (tl ? tl.y * 14 : 0);
        let ax = (tx - p.x) * 0.045, ay = (ty - p.y) * 0.045;
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.01) { const d = Math.sqrt(d2), f = (1 - d / R) * 5.5; ax += (dx / d) * f; ay += (dy / d) * f; }
        }
        p.vx = (p.vx + ax) * 0.86; p.vy = (p.vy + ay) * 0.86;
        p.x += p.vx; p.y += p.vy;
        const sz = p.s * (0.55 + 0.45 * e);
        (p.green ? green : paper).rect(p.x - sz / 2, p.y - sz / 2, sz, sz);
      }
      ctx.globalAlpha = 0.25 + 0.75 * e;
      ctx.fillStyle = PAPER; ctx.fill(paper);
      ctx.fillStyle = GREEN; ctx.fill(green);
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }
    const start = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };

    const toLocal = (e) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    footer.addEventListener('pointermove', (e) => { const [x, y] = toLocal(e); mouse.x = x; mouse.y = y; mouse.active = true; });
    footer.addEventListener('pointerleave', () => { mouse.active = false; });
    canvas.addEventListener('pointerdown', (e) => {
      const [x, y] = toLocal(e);
      for (const p of parts) {
        const dx = p.x - x, dy = p.y - y, d = Math.hypot(dx, dy) + 1;
        const f = Math.min(60, 4200 / d) * (0.6 + Math.random() * 0.8);
        p.vx += (dx / d) * f; p.vy += (dy / d) * f;
      }
    });

    new IntersectionObserver((en) => { visible = en[0].isIntersecting; start(); }, { rootMargin: '200px 0px' }).observe(giant);
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { build(); start(); }, 200); });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { build(); start(); });
  }

  /* ---------------- Scroll scenes (eased, rewind on scroll up) ---------------- */
  let lastY = scrollY, skew = 0, dir = 1, rate = 1;
  function scenes() {
    const hero = document.querySelector('.hero');
    const cards = [...document.querySelectorAll('.pain-card, .work .dark-card')].map((el) => ({ el, v: 0 }));
    const projects = [...document.querySelectorAll('.work-project')].map((el) => ({ el, v: 0.5 }));
    const faqH = document.querySelector('.fk-heading h1');
    const faqV = { v: 0.5 };
    const tlWrap = document.querySelector('.timeline-wrap');
    const giant = document.querySelector('.giant');
    const marquees = [...document.querySelectorAll('.marquee-ui__track, .ways-track, .ft-tape-track')];

    let steps = [], phases = [], week, note, spans = [], tlP = 0;
    if (tlWrap) {
      tlWrap.classList.add('mx-tl');
      steps = [...tlWrap.querySelectorAll('.step')];
      phases = [...tlWrap.querySelectorAll('.phase')];
      note = tlWrap.querySelector('.note');
      const stepsBox = tlWrap.querySelector('.steps');
      week = document.createElement('div'); week.className = 'mx-week'; week.innerHTML = '<b>WEEK 1</b>';
      stepsBox && stepsBox.appendChild(week);
      spans = [[0], [1, 2], [2, 3], [3], [3, 4], [4, 5]];
    }

    let chars = [], giantP = 0, lifts = [];
    if (giant && !window.__mxParticles) { chars = splitChars(giant); lifts = chars.map(() => 0); }
    window.__mxGiant = { chars, mouseX: null };

    let sp = 0;
    const ease = 0.14;
    const workStackEl = document.querySelector('.work-reel');
    function sink(list, all) {
      all.forEach((el) => { if (!list.includes(el)) { el.style.scale = ''; el.style.filter = ''; } });
      for (let i = 0; i < list.length; i++) {
        const el = list[i], next = list[i + 1];
        if (!next) { el.style.scale = ''; el.style.filter = ''; continue; }
        const a = el.getBoundingClientRect(), b = next.getBoundingClientRect();
        const cover = clamp(1 - (b.top - a.top) / Math.max(1, a.height));
        el.style.scale = (1 - cover * 0.07).toFixed(4);
        el.style.filter = cover > 0.01 ? `brightness(${(1 - cover * 0.35).toFixed(3)})` : '';
      }
    }

    function frame() {
      const y = scrollY, H = innerHeight;
      const v = y - lastY; lastY = y;
      if (Math.abs(v) > 0.5) dir = v > 0 ? 1 : -1;

      // marquees: speed up with scroll velocity and run backwards when you scroll back up
      skew = lerp(skew, clamp(v * 0.2, -7, 7), 0.1);
      root.style.setProperty('--mx-skew', skew.toFixed(2) + 'deg');
      rate = lerp(rate, dir * (1 + Math.min(Math.abs(v) / 6, 5)), 0.08);
      marquees.forEach((m) => {
        if (!m._mxAnims || !m._mxAnims.length) m._mxAnims = m.getAnimations ? m.getAnimations() : [];
        m._mxAnims.forEach((an) => { an.playbackRate = rate; });
      });

      if (bar) {
        const max = document.documentElement.scrollHeight - H;
        bar.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`;
      }

      if (hero) {
        sp = lerp(sp, clamp(y / (hero.offsetHeight * 0.85)), ease);
        hero.style.setProperty('--sp', sp.toFixed(4));
      }

      // dark cards open like a window as they arrive
      cards.forEach((c) => {
        const r = c.el.getBoundingClientRect();
        c.v = lerp(c.v, clamp((H - r.top) / (H * 0.75)), ease);
        const e = 1 - Math.pow(1 - c.v, 3);
        c.el.style.setProperty('--mx-in', e.toFixed(4));
      });

      projects.forEach((p) => {
        const r = p.el.getBoundingClientRect();
        p.v = lerp(p.v, clamp((H - r.top) / (H + r.height)), ease);
        p.el.style.setProperty('--t', p.v.toFixed(4));
      });
      projects.forEach((p, i) => {
        const r = p.el.getBoundingClientRect();
        p.w = lerp(p.w ?? 0, clamp((H - r.top) / (H * 0.55) - i * 0.18), ease);
        const e = 1 - Math.pow(1 - p.w, 3);
        p.el.style.setProperty('--wi', e.toFixed(4));
      });
      if (faqH) {
        const r = faqH.getBoundingClientRect();
        faqV.v = lerp(faqV.v, clamp((H - r.top) / (H + r.height)), ease);
        faqH.style.setProperty('--t', faqV.v.toFixed(4));
      }

      // read-along words
      scrubbed.forEach((o) => {
        const r = o.el.getBoundingClientRect();
        o.p = lerp(o.p, clamp((H * 0.88 - r.top) / (H * 0.45 + r.height * 0.6)), ease);
        const n = o.words.length, x = o.p * (n + 2);
        o.words.forEach((w, i) => {
          const k = clamp(x - i);
          if (w._k === undefined || Math.abs(w._k - k) > 0.01) { w._k = k; w.style.setProperty('--k', k.toFixed(3)); }
        });
      });

      // phones: timeline steps and Work cards become a sticky stack; covered cards sink back
      const stack = innerWidth <= 820;
      if (tlWrap) tlWrap.classList.toggle('mx-stack', stack);
      if (workStackEl) {
        const one = stack && getComputedStyle(workStackEl).gridTemplateColumns.split(' ').length === 1;
        workStackEl.classList.toggle('mx-wstack', one);
        sink(one ? projects.map((p) => p.el) : [], projects.map((p) => p.el));
      }
      if (stack) sink(steps, steps);

      // process timeline
      if (tlWrap && steps.length && !stack) {
        const r = tlWrap.getBoundingClientRect();
        tlP = lerp(tlP, clamp((H * 0.82 - r.top) / (r.height * 0.85)), ease);
        const P = tlP;
        const lit = new Set();
        steps.forEach((s, i) => {
          const seg = clamp((P - i * 0.13) / 0.2);
          const e = 1 - Math.pow(1 - seg, 3);
          s.style.setProperty('--s', e.toFixed(4));
          if (seg > 0.45) spans[i].forEach((k) => lit.add(k));
        });
        phases.forEach((ph, k) => ph.classList.toggle('mx-lit', lit.has(k)));
        if (week) {
          week.style.transform = `translateX(${(clamp(P * 1.05) * week.parentElement.clientWidth).toFixed(1)}px)`;
          week.classList.toggle('mx-on', P > 0.02 && P < 0.99);
          const w = 1 + Math.round(clamp(P) * 11);
          if (week._w !== w) { week._w = w; week.firstChild.textContent = `WEEK ${w}`; }
        }
        if (note) note.style.setProperty('--note', P > 0.55 ? 1 : 0);
      }

      // footer wordmark
      if (giant && chars.length) {
        const r = giant.getBoundingClientRect();
        giantP = lerp(giantP, clamp((H - r.top) / (r.height * 0.95)), ease);
        const mx = window.__mxGiant.mouseX;
        chars.forEach((ch, i) => {
          const local = clamp(giantP * 1.5 - i * 0.07);
          const e = 1 - Math.pow(1 - local, 3);
          let target = 0;
          if (mx != null) {
            const cr = ch.getBoundingClientRect(); const cx = cr.left + cr.width / 2;
            const dx = (cx - mx) / 150;
            target = -40 * Math.exp(-dx * dx);
          }
          lifts[i] = lerp(lifts[i], target, 0.12);
          ch.style.transform = `translate3d(0, calc(${((1 - e) * 105).toFixed(2)}% + ${lifts[i].toFixed(1)}px), 0) rotate(${((1 - e) * (i % 2 ? 8 : -8)).toFixed(2)}deg)`;
        });
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------------- Cursor ring ---------------- */
  function cursorRing() {
    const ring = document.createElement('div');
    ring.id = 'mx-ring'; ring.innerHTML = '<span>VIEW</span>';
    document.body.appendChild(ring);
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY; ring.classList.add('mx-show');
      const t = e.target;
      const view = t.closest && t.closest('.work-project, .deck-card');
      const text = t.closest && t.closest('input, textarea');
      const link = t.closest && t.closest('a, button, [role="button"], .fk-q');
      ring.classList.toggle('mx-view', !!view);
      ring.classList.toggle('mx-text', !view && !!text);
      ring.classList.toggle('mx-link', !view && !text && !!link);
    }, { passive: true });
    document.addEventListener('pointerleave', () => ring.classList.remove('mx-show'));
    addEventListener('pointerdown', () => ring.classList.add('mx-down'));
    addEventListener('pointerup', () => ring.classList.remove('mx-down'));
    const loop = () => {
      rx = lerp(rx, x, 0.2); ry = lerp(ry, y, 0.2);
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------------- Magnetic buttons ---------------- */
  function magnetic() {
    const sel = '.btn, .hero-cta, .nav-cta, .fk-send, .work-project-link i, .fk-project button';
    let active = null;
    addEventListener('pointermove', (e) => {
      const el = e.target.closest && e.target.closest(sel);
      if (active && active !== el) { release(active); active = null; }
      if (!el) return;
      active = el;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const k = el.classList.contains('fk-send') ? 0.06 : 0.28;
      el.style.transition = 'translate .15s ease-out';
      el.style.translate = `${(dx * k).toFixed(1)}px ${(dy * k * 1.2).toFixed(1)}px`;
    }, { passive: true });
    const release = (el) => {
      el.style.transition = 'translate .7s cubic-bezier(.34,1.8,.64,1)';
      el.style.translate = '0px 0px';
    };
  }

  /* ---------------- Hero mouse depth ---------------- */
  function heroMouse() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    });
    hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; });
    const loop = () => {
      cx = lerp(cx, tx, 0.07); cy = lerp(cy, ty, 0.07);
      hero.style.setProperty('--mx', cx.toFixed(4));
      hero.style.setProperty('--my', cy.toFixed(4));
      requestAnimationFrame(loop);
    };
    loop();
  }

  function footerMouse() {
    const f = document.querySelector('footer');
    if (!f) return;
    f.addEventListener('pointermove', (e) => { if (window.__mxGiant) window.__mxGiant.mouseX = e.clientX; });
    f.addEventListener('pointerleave', () => { if (window.__mxGiant) window.__mxGiant.mouseX = null; });
  }

  /* ---------------- Contact: typing effects ---------------- */
  function caretXY(el) {
    const cs = getComputedStyle(el);
    const m = document.createElement('div');
    const props = ['boxSizing', 'width', 'height', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
      'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'fontFamily', 'fontSize',
      'fontWeight', 'fontStyle', 'letterSpacing', 'lineHeight', 'textTransform', 'wordSpacing', 'textIndent'];
    props.forEach((p) => { m.style[p] = cs[p]; });
    const r = el.getBoundingClientRect();
    Object.assign(m.style, {
      position: 'fixed', left: r.left + 'px', top: r.top + 'px', visibility: 'hidden', overflow: 'hidden',
      whiteSpace: el.tagName === 'TEXTAREA' ? 'pre-wrap' : 'pre', wordWrap: 'break-word', borderStyle: 'solid',
    });
    const pos = el.selectionEnd ?? el.value.length;
    m.textContent = el.value.slice(0, pos);
    const s = document.createElement('span'); s.textContent = '​'; m.appendChild(s);
    document.body.appendChild(m);
    const sr = s.getBoundingClientRect();
    m.remove();
    return {
      x: clamp(sr.left - el.scrollLeft, r.left, r.right),
      y: clamp(sr.top - el.scrollTop + sr.height / 2, r.top, r.bottom),
    };
  }

  function burst(x, y, n = 12, spread = 90) {
    for (let i = 0; i < n; i++) {
      const s = document.createElement('i'); s.className = 'mx-spark';
      s.style.left = x + 'px'; s.style.top = y + 'px';
      document.body.appendChild(s);
      const a = (Math.PI * 2 * i) / n + Math.random() * 0.5, d = spread * (0.5 + Math.random() * 0.7);
      s.animate([
        { transform: 'translate(0,0) rotate(0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px) rotate(${Math.random() * 360}deg) scale(.2)`, opacity: 0 },
      ], { duration: 650 + Math.random() * 300, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = () => s.remove();
    }
  }

  function contactTyping() {
    const expected = { name: 14, email: 1, message: 140 };
    const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    const state = { name: false, email: false, type: false, message: false };

    const updateSignal = () => {
      const head = document.querySelector('.fk-console-head');
      if (!head) return;
      const n = Object.values(state).filter(Boolean).length;
      head.dataset.mxSig = `SIGNAL ${'▮'.repeat(n)}${'▯'.repeat(4 - n)} ${n * 25}%`;
    };
    updateSignal();

    document.addEventListener('input', (e) => {
      const el = e.target;
      if (!el.matches || !el.matches('.fk-contact input, .fk-contact textarea')) return;
      const bubble = el.closest('.fk-bubble');
      const kind = el.tagName === 'TEXTAREA' ? 'message' : el.type === 'email' ? 'email' : 'name';
      const v = el.value;

      // fill line + validity
      let fill = kind === 'email' ? (isEmail(v) ? 1 : clamp(v.length / 22) * 0.8) : clamp(v.length / expected[kind]);
      if (bubble) {
        bubble.classList.add('mx-typed');
        bubble.style.setProperty('--fill', fill.toFixed(3));
        const ok = kind === 'email' ? isEmail(v) : kind === 'name' ? v.trim().length > 1 : v.trim().length > 10;
        if (ok && !state[kind]) {
          const r = bubble.getBoundingClientRect();
          burst(r.right - 35, r.top + 35, 10, 60);
        }
        bubble.classList.toggle('mx-valid', ok);
        state[kind] = ok;
        updateSignal();
        bubble.animate([{ scale: 1 }, { scale: 1.012 }, { scale: 1 }], { duration: 180, easing: 'ease-out' });
      }

      // flying glyph from the caret
      const deleting = e.inputType && e.inputType.startsWith('delete');
      const ch = deleting ? '×' : (e.data || '').slice(-1);
      if (!ch || ch === ' ') return;
      const { x, y } = caretXY(el);
      const g = document.createElement('span');
      g.className = 'mx-glyph' + (deleting ? ' mx-del' : '');
      g.textContent = ch;
      g.style.left = x + 'px'; g.style.top = y - 14 + 'px';
      document.body.appendChild(g);
      const dx = (Math.random() - 0.5) * 60, rot = (Math.random() - 0.5) * 70;
      g.animate(deleting ? [
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, 60px) rotate(${rot}deg) scale(.6)`, opacity: 0 },
      ] : [
        { transform: 'translate(0,0) scale(.6)', opacity: 0 },
        { transform: `translate(${dx * 0.3}px, -18px) scale(1.5)`, opacity: 1, offset: 0.25 },
        { transform: `translate(${dx}px, -70px) rotate(${rot}deg) scale(.8)`, opacity: 0 },
      ], { duration: 750, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = () => g.remove();

      if (!deleting) {
        const rp = document.createElement('span'); rp.className = 'mx-ripple';
        rp.style.left = x + 'px'; rp.style.top = y + 'px';
        document.body.appendChild(rp);
        rp.animate([{ transform: 'scale(1)', opacity: 0.9 }, { transform: 'scale(4.5)', opacity: 0 }],
          { duration: 500, easing: 'ease-out' }).onfinish = () => rp.remove();
      }
    }, true);

    document.addEventListener('click', (e) => {
      const t = e.target.closest && e.target.closest('.fk-project button, .fk-send');
      if (!t) return;
      const r = t.getBoundingClientRect();
      const cx = e.clientX || r.left + r.width / 2, cy = e.clientY || r.top + r.height / 2;
      if (t.classList.contains('fk-send')) {
        burst(cx, cy, 28, 220);
        const s = document.createElement('i'); s.className = 'mx-shock';
        s.style.left = cx + 'px'; s.style.top = cy + 'px';
        document.body.appendChild(s);
        s.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(90)', opacity: 0 }],
          { duration: 900, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = () => s.remove();
      } else {
        burst(cx, cy, 12, 80);
        t.animate([{ scale: 1 }, { scale: 0.9 }, { scale: 1.08 }, { scale: 1 }], { duration: 420, easing: 'ease-out' });
        state.type = true; updateSignal();
      }
    }, true);
  }
}
