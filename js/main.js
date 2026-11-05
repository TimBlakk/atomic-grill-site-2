/* Atomic Grill - renders the menu tabs and wires up the contact links.
   Needs menu-data.js loaded first. Vanilla JS, no dependencies. */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text; // textContent = safe, no HTML injection
    return n;
  };

  /* ---------- Contact links ---------- */
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.orderMessage)}`;
  document.querySelectorAll("[data-wa]").forEach(a => { a.href = waUrl; });
  document.querySelectorAll("[data-call]").forEach(a => { a.href = `tel:${SITE.tel}`; });
  document.querySelectorAll("[data-map]").forEach(a => { a.href = SITE.mapsUrl; });
  const optional = { bolt: SITE.boltUrl, instagram: SITE.instagram, tiktok: SITE.tiktok, facebook: SITE.facebook };
  document.querySelectorAll("[data-link]").forEach(a => {
    const url = optional[a.dataset.link];
    if (url) a.href = url; else a.hidden = true; // empty link = hide, never a dead button
  });
  document.querySelectorAll("[data-year]").forEach(n => { n.textContent = new Date().getFullYear(); });


  /* ---------- Hero slider ---------- */
  (function heroSlider() {
    const box = $("#hero-slides");
    if (!box || typeof HERO_SLIDES === "undefined") return;
    const wrap = $("#hero-slider"), capTitle = $("#hero-cap-title"), capPrice = $("#hero-cap-price"), caption = $("#hero-caption");
    const dotsBox = $("#hero-dots"), toggle = $("#hero-toggle"), prev = $("#hero-prev"), next = $("#hero-next");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const INTERVAL = 6000;
    let cur = 0, timer = null, playing = !reduce.matches, hovering = false, focusing = false, loaded = false;

    const priceOf = s => {
      const [tab, sec, item] = s.price || [];
      const t = typeof MENU !== "undefined" && MENU.find(c => c.id === tab);
      const section = t && t.sections.find(x => x.title === sec);
      if (!section) return "";
      if (s.from) return `from GH₵${Math.min(...section.items.map(i => i.price))}`;
      const it = section.items.find(i => i.name.toLowerCase() === String(item).toLowerCase());
      return it ? `GH₵${it.price}` : "";
    };

    const imgs = [box.querySelector(".hero__slide")];
    HERO_SLIDES.forEach((s, i) => {
      if (i > 0) { // slide 1 is already in the HTML; the rest get their image only after page load
        const im = el("img", "hero__slide");
        im.width = 1600; im.height = 900; im.alt = s.alt; im.decoding = "async";
        im.setAttribute("aria-hidden", "true");
        box.append(im); imgs.push(im);
      }
    });
    const dots = HERO_SLIDES.map((s, i) => {
      const b = el("button", "hero__dot"); b.type = "button";
      b.setAttribute("aria-label", `Show slide ${i + 1} of ${HERO_SLIDES.length}: ${s.title}`);
      b.addEventListener("click", () => go(i));
      dotsBox.append(b); return b;
    });

    function loadAll() {
      if (loaded) return; loaded = true;
      HERO_SLIDES.forEach((s, i) => {
        if (i === 0) return;
        imgs[i].srcset = `images/hero-${s.img}-800.webp 800w, images/hero-${s.img}-1600.webp 1600w`;
        imgs[i].sizes = "100vw";
        imgs[i].src = `images/hero-${s.img}-800.webp`;
      });
    }

    function show(n) {
      cur = (n + HERO_SLIDES.length) % HERO_SLIDES.length;
      const s = HERO_SLIDES[cur];
      imgs.forEach((im, i) => { im.classList.toggle("is-active", i === cur); im.setAttribute("aria-hidden", i !== cur); });
      dots.forEach((d, i) => { if (i === cur) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
      capTitle.textContent = s.title;
      capPrice.textContent = priceOf(s);
      caption.setAttribute("aria-live", playing ? "off" : "polite"); // announce changes only when not auto-rotating
    }
    function go(n) { loadAll(); show(n); restart(); }
    function stop() { clearInterval(timer); timer = null; }
    function restart() {
      stop();
      if (playing && !hovering && !focusing && !document.hidden) timer = setInterval(() => show(cur + 1), INTERVAL);
    }
    function setPlaying(on) {
      playing = on;
      toggle.setAttribute("aria-pressed", String(!on));
      toggle.querySelector("span").textContent = on ? "Pause" : "Play";
      toggle.setAttribute("aria-label", on ? "Pause slideshow" : "Play slideshow");
      caption.setAttribute("aria-live", on ? "off" : "polite");
      restart();
    }

    prev.addEventListener("click", () => go(cur - 1));
    next.addEventListener("click", () => go(cur + 1));
    toggle.addEventListener("click", () => setPlaying(!playing));
    wrap.addEventListener("mouseenter", () => { hovering = true; restart(); });
    wrap.addEventListener("mouseleave", () => { hovering = false; restart(); });
    wrap.addEventListener("focusin", () => { focusing = true; loadAll(); restart(); });
    wrap.addEventListener("focusout", () => { focusing = false; restart(); });
    document.addEventListener("visibilitychange", restart);
    reduce.addEventListener("change", e => setPlaying(!e.matches));

    if (document.readyState === "complete") loadAll(); else window.addEventListener("load", loadAll);
    show(0);
    setPlaying(playing);
  })();

  /* ---------- Menu ---------- */
  const tablist = $("#menu-tabs");
  const panel = $("#menu-panel");
  if (!tablist || !panel || typeof MENU === "undefined") return;

  const tabs = MENU.map((cat, i) => {
    const b = el("button", "menu-tab", cat.label);
    b.type = "button";
    b.id = `tab-${cat.id}`;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-controls", "menu-panel");
    b.addEventListener("click", () => select(i, true));
    tablist.append(b);
    return b;
  });

  function renderPanel(cat) {
    panel.replaceChildren();
    panel.setAttribute("aria-labelledby", `tab-${cat.id}`);

    const photos = el("div", "menu-photos");
    cat.photos.forEach((p, i) => {
      const img = el("img");
      img.src = p.src; img.alt = p.alt;
      img.width = 800; img.height = 600;       // reserves space, stops layout jump
      img.loading = i === 0 ? "eager" : "lazy";
      img.decoding = "async";
      const shown = () => img.classList.add("is-loaded"); // photos fade in once they have loaded
      img.addEventListener("load", shown); img.addEventListener("error", shown);
      photos.append(img);
      if (img.complete) shown();
    });

    const lists = el("div", "menu-lists");
    cat.sections.forEach((sec, idx) => {
      const s = el("section", "menu-section");
      s.style.setProperty("--i", idx); // delays each card slightly so they appear one after another
      s.append(el("h3", "menu-section__title", sec.title));
      if (sec.note) s.append(el("p", "menu-section__note", sec.note));
      const ul = el("ul", "menu-items");
      sec.items.forEach(it => {
        const li = el("li", "menu-item");
        const left = el("span", "menu-item__name", it.name);
        if (it.desc) left.append(el("small", "menu-item__desc", it.desc));
        li.append(left, el("span", "menu-item__price", `GH₵${it.price}`));
        ul.append(li);
      });
      s.append(ul);
      lists.append(s);
    });
    panel.append(photos, lists);
  }

  // Smooth tab change: fade the old menu out, swap it, then let the new cards rise in.
  // Skipped on first load and for people who have "reduce motion" switched on.
  let swapTimer = null, firstRender = true;
  function swap(cat) {
    clearTimeout(swapTimer);
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (firstRender || !motionOk) {
      firstRender = false;
      panel.classList.remove("is-leaving", "is-entering", "is-swapping");
      panel.style.height = "";
      renderPanel(cat);
      return;
    }
    // 1. Pin the current height and fade the old menu out.
    const from = panel.offsetHeight;
    panel.classList.add("is-swapping");
    panel.style.height = from + "px";
    panel.classList.remove("is-entering");
    panel.classList.add("is-leaving");
    swapTimer = setTimeout(() => {
      // 2. Swap the content and measure how tall the new menu naturally is.
      renderPanel(cat);
      panel.style.height = "auto";
      const to = panel.offsetHeight;
      panel.style.height = from + "px";
      void panel.offsetHeight; // force a reflow so the browser starts the animation from the old height
      // 3. Glide the height to the new size while the new cards rise in, so everything below moves smoothly.
      panel.classList.remove("is-leaving");
      panel.classList.add("is-entering");
      panel.style.height = to + "px";
      swapTimer = setTimeout(() => {
        panel.classList.remove("is-entering", "is-swapping");
        panel.style.height = "";
      }, 560);
    }, 160);
  }

  function select(i, scroll) {
    tabs.forEach((t, n) => {
      const on = n === i;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
    });
    swap(MENU[i]);
    tabs[i].scrollIntoView({ inline: "center", block: "nearest" }); // keep active tab visible in the scroll row
    if (scroll) {
      const top = $("#menu").getBoundingClientRect().top + window.scrollY - 8;
      if (window.scrollY > top) window.scrollTo({ top, behavior: "auto" });
    }
  }

  // Keyboard: arrows, Home, End move between tabs
  tablist.addEventListener("keydown", e => {
    const cur = tabs.indexOf(document.activeElement);
    if (cur < 0) return;
    const last = tabs.length - 1;
    const next = { ArrowRight: cur === last ? 0 : cur + 1, ArrowLeft: cur === 0 ? last : cur - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    tabs[next].focus();
    select(next, false);
  });

  select(0, false);
})();
