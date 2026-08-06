const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");

document.body.classList.add("is-loaded");

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
  });
}

const revealItems = document.querySelectorAll(
  ".overview > div, .profile-snapshot > div, .section-title, .editorial-intro > *, .quote-panel, .education-card, .credential-grid article, .image-feature > *, .career-overview, .timeline article, .strategy-card, .framework-grid article, .team-card, .person-page > *"
);

if ("IntersectionObserver" in window) {
  revealItems.forEach((item) => item.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 45}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
