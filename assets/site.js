/* ── Mobile toggle ─────────────────────────────────── */
const t = document.querySelector("[data-mobile-toggle]");
const p = document.querySelector("[data-mobile-panel]");
if (t && p) {
  const syncToggle = () => {
    const open = p.getAttribute("data-open") === "true";
    t.classList.toggle("is-open", open);
    t.setAttribute("aria-expanded", String(open));
    t.setAttribute("aria-label", open ? (t.dataset.labelClose || "Fermer") : (t.dataset.labelOpen || "Menu"));
    t.textContent = "";
  };
  syncToggle();
  t.addEventListener("click", () => {
    const open = p.getAttribute("data-open") === "true";
    p.setAttribute("data-open", String(!open));
    syncToggle();
  });
}

/* ── Mobile dropdown accordéon ────────────────────── */
(function buildMobileDropdowns() {
  const card = document.querySelector(".mobile-card");
  if (!card) return;

  const submenus = {
    "Le parti": [
      { label: "Vision", href: "le-parti.html#vision" },
      { label: "Organisation", href: "le-parti.html#organisation" },
      { label: "Organigramme", href: "le-parti.html#organigramme" },
      { label: "Leadership", href: "le-parti.html#leadership" },
      { label: "Méthode", href: "le-parti.html#methodes" },
    ],
    "Actualités": [
      { label: "Communiqués", href: "actualites.html#communiques" },
      { label: "Tribunes", href: "actualites.html#tribunes" },
      { label: "Campagnes", href: "actualites.html#campagnes" },
    ],
    "Programme": [
      { label: "Cap 2035", href: "programme.html#cap" },
      { label: "Économie productive", href: "axe-economie.html" },
      { label: "Services publics", href: "axe-services-publics.html" },
      { label: "Justice", href: "axe-justice.html" },
      { label: "Bonne gouvernance", href: "axe-bonne-gouvernance.html" },
    ],
    "Agir": [
      { label: "Adhérer", href: "adherer.html" },
      { label: "Donner", href: "donner.html" },
    ],
    "Pati a": [
      { label: "Vizyon", href: "le-parti.html#vision" },
      { label: "Òganizasyon", href: "le-parti.html#organisation" },
      { label: "Òganigram", href: "le-parti.html#organigramme" },
      { label: "Lidèchip", href: "le-parti.html#leadership" },
      { label: "Metòd", href: "le-parti.html#methodes" },
    ],
    "Nouvèl": [
      { label: "Kominike", href: "actualites.html#communiques" },
      { label: "Tribin", href: "actualites.html#tribunes" },
      { label: "Kanpay", href: "actualites.html#campagnes" },
    ],
    "Pwogram": [
      { label: "Kap 2035", href: "programme.html#cap" },
      { label: "Ekonomi pwodiktif", href: "axe-economie.html" },
      { label: "Sèvis piblik", href: "axe-services-publics.html" },
      { label: "Jistis", href: "axe-justice.html" },
      { label: "Bon gouvènans", href: "axe-bonne-gouvernance.html" },
    ],
    "Aji": [
      { label: "Adere", href: "adherer.html" },
      { label: "Bay", href: "donner.html" },
    ],
  };

  const newCard = document.createElement("div");
  newCard.className = "mobile-card";

  const links = Array.from(card.querySelectorAll(":scope > a"));
  links.forEach((link) => {
    const label = link.textContent.trim();
    if (submenus[label]) {
      const group = document.createElement("div");
      group.className = "mob-group";

      const btn = document.createElement("button");
      btn.className = "mob-trigger";
      btn.type = "button";
      btn.innerHTML = `${label} <span class="mob-arrow">▾</span>`;
      btn.setAttribute("aria-expanded", "false");

      const sub = document.createElement("div");
      sub.className = "mob-sub";
      const inner = document.createElement("div");
      inner.className = "mob-sub-inner";
      submenus[label].forEach((item) => {
        const a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        inner.appendChild(a);
      });
      sub.appendChild(inner);

      btn.addEventListener("click", () => {
        const isOpen = group.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(isOpen));
      });

      group.appendChild(btn);
      group.appendChild(sub);
      newCard.appendChild(group);
    } else {
      const a = document.createElement("a");
      a.href = link.getAttribute("href") || "#";
      a.textContent = label;
      if (link.className) a.className = link.className;
      newCard.appendChild(a);
    }
  });

  const langDiv = card.querySelector(".mobile-lang");
  if (langDiv) newCard.appendChild(langDiv.cloneNode(true));

  card.replaceWith(newCard);
})();

/* ── Year ───────────────────────────────────────────── */
document.querySelectorAll("[data-year]").forEach((y) => { y.textContent = new Date().getFullYear(); });

/* ── Stat number count-up ─────────────────────────────── */
(function countUpStats() {
  const targets = document.querySelectorAll(".stat-box strong, .metric-panel strong");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !targets.length) return;

  const animate = (el) => {
    const match = el.textContent.trim().match(/^(\d+)(.*)$/);
    if (!match) return;
    const end = parseInt(match[1], 10);
    const suffix = match[2] || "";
    const duration = 700;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * end) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  targets.forEach((el) => observer.observe(el));
})();

/* ── Reveal on scroll (staggered, motion-aware) ─────── */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

(function assignStagger() {
  const groups = new Map();
  document.querySelectorAll(".reveal").forEach((el) => {
    const group = el.closest(
      ".grid, .hero-shell, .hero-stat, .agir-reasons, .story-grid, .footer-top, .related-grid"
    ) || el.parentElement;
    const index = groups.get(group) || 0;
    el.style.setProperty("--stagger", Math.min(index, 6));
    groups.set(group, index + 1);
  });
})();

if (prefersReducedMotion) {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
} else {
  const ob = new IntersectionObserver(
    (e) => e.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("visible"); ob.unobserve(x.target); } }),
    { threshold: 0.10 }
  );
  document.querySelectorAll(".reveal").forEach((el) => ob.observe(el));
}

/* ── Header scroll state ─────────────────────────────── */
const header = document.querySelector(".site-header");
if (header) {
  const syncHeaderScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  syncHeaderScroll();
  window.addEventListener("scroll", syncHeaderScroll, { passive: true });
}

/* ── Sticky mobile join bar ──────────────────────────── */
(function stickyJoinBar() {
  const path = window.location.pathname;
  const isCreole = /\/ht\//.test(path);
  const isJoinPage = /\/adherer\.html$/.test(path);
  if (isJoinPage) return;

  const bar = document.createElement("div");
  bar.className = "join-sticky";
  bar.innerHTML = isCreole
    ? `<span>Vin nan mouvman an.</span><a href="adherer.html">Adere</a>`
    : `<span>Rejoignez le mouvement.</span><a href="adherer.html">Adhérer</a>`;
  document.body.appendChild(bar);

  const footer = document.querySelector(".footer");
  let pastHero = false;
  let footerVisible = false;

  const sync = () => bar.classList.toggle("is-visible", pastHero && !footerVisible);

  window.addEventListener("scroll", () => {
    pastHero = window.scrollY > 480;
    sync();
  }, { passive: true });

  if (footer) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => { footerVisible = entry.isIntersecting; sync(); });
    }, { threshold: 0.01 }).observe(footer);
  }
})();

/* ── Google Forms submit handling ───────────────────── */
document.querySelectorAll('.google-form').forEach((form) => {
  const status = document.createElement('p');
  status.className = 'field-status';
  status.setAttribute('aria-live', 'polite');
  form.appendChild(status);

  form.addEventListener('submit', () => {
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.dataset.originalText = button.textContent;
    }
    window.setTimeout(() => {
      form.classList.add('is-success');
      status.textContent = form.dataset.successMessage || '';
      form.reset();
      if (button) {
        button.disabled = false;
        button.textContent = button.dataset.originalText || button.textContent;
      }
    }, 900);
  });
});


/* ── Collections extensibles : 3 cartes puis afficher tout ── */
(function contentCollections(){
  document.querySelectorAll('[data-content-collection]').forEach((collection) => {
    const items = Array.from(collection.querySelectorAll('[data-content-item]'));
    const initial = Number(collection.dataset.initialCount || 3);
    const wrap = collection.nextElementSibling;
    const button = wrap && wrap.querySelector('[data-content-more]');
    if (!button || items.length <= initial) {
      if (wrap) wrap.hidden = true;
      return;
    }
    const isCreole = document.documentElement.lang === 'ht';
    const collapseLabel = isCreole ? 'Montre mwens' : 'Afficher moins';
    const expandLabel = isCreole ? `Montre tout ${items.length} kontni yo` : `Afficher les ${items.length} contenus`;
    let expanded = false;
    const sync = () => {
      items.forEach((item, index) => { item.hidden = !expanded && index >= initial; });
      collection.classList.toggle('is-expanded', expanded);
      button.textContent = expanded ? collapseLabel : expandLabel;
      button.setAttribute('aria-expanded', String(expanded));
    };
    button.addEventListener('click', () => {
      expanded = !expanded;
      sync();
      if (!expanded) collection.scrollIntoView({behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start'});
    });
    sync();
  });
})();
