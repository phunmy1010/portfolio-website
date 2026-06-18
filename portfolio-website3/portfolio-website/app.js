// ===== Smooth scroll to section =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  document.getElementById("mainNav")?.classList.remove("open");
}

// ===== Mobile nav toggle =====
document.getElementById("navToggle")?.addEventListener("click", () => {
  document.getElementById("mainNav")?.classList.toggle("open");
});

// ===== Active nav state on scroll =====
const sections = ["home", "projects", "contact"];
const navButtons = {
  home: document.querySelector(".nav-home"),
  projects: document.querySelector(".nav-projects"),
  contact: document.querySelector(".nav-contact")
};

function updateActiveNav() {
  let current = "home";
  for (const id of sections) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 120) {
      current = id;
    }
  }
  Object.entries(navButtons).forEach(([key, btn]) => {
    if (!btn) return;
    btn.classList.toggle("active", key === current);
  });
}
window.addEventListener("scroll", updateActiveNav, { passive: true });

// ===== Reveal on scroll =====
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  items.forEach(item => observer.observe(item));
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initReveal();
  updateActiveNav();
});

// Close modal on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCaseStudy();
});
