// ===== Theme toggle =====
const themeToggleBtn = document.getElementById("themeToggle");
function applyTheme(theme) {
  if (theme === "light") { document.documentElement.setAttribute("data-theme","light"); if(themeToggleBtn) themeToggleBtn.textContent="☀️"; }
  else { document.documentElement.removeAttribute("data-theme"); if(themeToggleBtn) themeToggleBtn.textContent="🌙"; }
}
function getInitialTheme() {
  try { const s=localStorage.getItem("pf_theme"); if(s==="light"||s==="dark") return s; } catch(e){}
  return window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";
}
applyTheme(getInitialTheme());
themeToggleBtn?.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme")==="light" ? "dark" : "light";
  applyTheme(next);
  try { localStorage.setItem("pf_theme", next); } catch(e){}
});

// ===== Smooth scroll =====
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
  document.getElementById("mainNav")?.classList.remove("open");
}

// ===== Mobile nav =====
document.getElementById("navToggle")?.addEventListener("click", () => {
  document.getElementById("mainNav")?.classList.toggle("open");
});

// ===== Active nav on scroll =====
const NAV_SECTIONS = ["home","about","projects","certifications","contact"];
function updateActiveNav() {
  let current = "home";
  NAV_SECTIONS.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 120) current = id;
  });
  document.querySelectorAll(".main-nav button").forEach(btn => {
    const cls = Array.from(btn.classList).find(c => c.startsWith("nav-"));
    if (cls) btn.classList.toggle("active", cls === "nav-" + current || (current==="about" && cls==="nav-about") || (current==="certifications" && cls==="nav-certs"));
  });
}
window.addEventListener("scroll", updateActiveNav, { passive:true });

// ===== Reveal on scroll =====
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold:0.1, rootMargin:"0px 0px -40px 0px" });
  items.forEach(el => obs.observe(el));
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initReveal();
  updateActiveNav();
});

document.addEventListener("keydown", e => { if(e.key==="Escape") closeCaseStudy?.(); });
