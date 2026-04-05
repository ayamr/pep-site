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
      newCard.appendChild(a);
    }
  });

  const langDiv = card.querySelector(".mobile-lang");
  if (langDiv) newCard.appendChild(langDiv.cloneNode(true));

  card.replaceWith(newCard);
})();

/* ── Year ───────────────────────────────────────────── */
document.querySelectorAll("[data-year]").forEach((y) => { y.textContent = new Date().getFullYear(); });

/* ── Reveal on scroll ───────────────────────────────── */
const ob = new IntersectionObserver(
  (e) => e.forEach((x) => { if (x.isIntersecting) x.target.classList.add("visible"); }),
  { threshold: 0.10 }
);
document.querySelectorAll(".reveal").forEach((el) => ob.observe(el));

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
