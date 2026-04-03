/* ── Mobile toggle ─────────────────────────────────── */
const t = document.querySelector("[data-mobile-toggle]");
const p = document.querySelector("[data-mobile-panel]");
if (t && p) {
  t.addEventListener("click", () => {
    const o = p.getAttribute("data-open") === "true";
    p.setAttribute("data-open", String(!o));
    const openLabel = t.getAttribute("data-label-open") || "Menu";
    const closeLabel = t.getAttribute("data-label-close") || "Fermer";
    t.textContent = o ? openLabel : closeLabel;
  });
}

/* ── Year ───────────────────────────────────────────── */
document.querySelectorAll("[data-year]").forEach((y) => { y.textContent = new Date().getFullYear(); });

/* ── Reveal on scroll ───────────────────────────────── */
const ob = new IntersectionObserver(
  (e) => e.forEach((x) => { if (x.isIntersecting) x.target.classList.add("visible"); }),
  { threshold: 0.10 }
);
document.querySelectorAll(".reveal").forEach((el) => ob.observe(el));

/* ── Org chart connector lines (dynamic SVG) ───────── */
function drawOrgLines() {
  const svg = document.getElementById("org-lines");
  if (!svg) return;

  const container = svg.closest(".org-svg-wrapper");
  if (!container) return;

  const rect = container.getBoundingClientRect();
  svg.setAttribute("width", rect.width);
  svg.setAttribute("height", rect.height);
  svg.innerHTML = "";

  const pairs = document.querySelectorAll("[data-org-from]");
  pairs.forEach((child) => {
    const parentId = child.getAttribute("data-org-from");
    const parent = document.getElementById(parentId);
    if (!parent) return;

    const pRect = parent.getBoundingClientRect();
    const cRect = child.getBoundingClientRect();
    const offsetX = -rect.left;
    const offsetY = -rect.top + container.scrollTop;

    const x1 = pRect.left + pRect.width / 2 + offsetX;
    const y1 = pRect.bottom + offsetY;
    const x2 = cRect.left + cRect.width / 2 + offsetX;
    const y2 = cRect.top + offsetY;
    const mx = (y1 + y2) / 2;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `M ${x1} ${y1} C ${x1} ${mx}, ${x2} ${mx}, ${x2} ${y2}`
    );
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", getComputedStyle(document.documentElement).getPropertyValue("--org-line").trim() || "#6db4ff");
    path.setAttribute("stroke-width", "1.5");
    path.setAttribute("stroke-dasharray", "none");
    path.setAttribute("opacity", "0.6");
    svg.appendChild(path);
  });
}

window.addEventListener("load", drawOrgLines);
window.addEventListener("resize", drawOrgLines);


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
      button.textContent = button.textContent;
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
