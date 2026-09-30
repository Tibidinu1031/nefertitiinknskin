/* Interface interactions. Edit content.js for salon information and photos. */
"use strict";

const header = document.querySelector(".header");
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".mobile-menu");
const main = document.querySelector("main");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const formatNumber = (value) => String(value).padStart(2, "0");

function syncScrollLock() {
  document.body.classList.toggle("locked", !menu.hidden || !!document.querySelector("dialog[open]"));
}

function closeMenu(returnFocus = false) {
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Deschide meniul");
  menu.hidden = true;
  main.inert = false;
  syncScrollLock();
  if (returnFocus) toggle.focus();
}

toggle.addEventListener("click", () => {
  if (!menu.hidden) return closeMenu(true);
  toggle.setAttribute("aria-expanded", "true");
  toggle.setAttribute("aria-label", "Închide meniul");
  menu.hidden = false;
  main.inert = true;
  syncScrollLock();
  menu.querySelector("a:not([hidden])").focus();
});
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));
window.addEventListener("resize", () => {
  if (window.innerWidth > 700 && !menu.hidden) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (menu.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu(true);
  }
  if (event.key !== "Tab") return;
  const controls = [toggle, ...menu.querySelectorAll("a:not([hidden])")];
  const first = controls[0], last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 100);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Services: preserve native keyboard and disclosure behavior.
document.querySelectorAll(".service").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".service").forEach((other) => {
      if (other !== item) other.open = false;
    });
    const image = document.querySelector("#service-image");
    image.src = item.dataset.image;
    image.alt = item.dataset.alt;
    document.querySelector("#service-image-caption").textContent = item.dataset.caption;
  });
});

// Gallery filters and accessible full-size image dialog.
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const galleryItems = [...document.querySelectorAll(".gallery-item")];
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((other) => {
      other.classList.toggle("selected", other === button);
      other.setAttribute("aria-pressed", String(other === button));
    });
    galleryItems.forEach((item) => {
      item.hidden = button.dataset.filter !== "all" && item.dataset.category !== button.dataset.filter;
    });
    document.querySelector(".gallery-grid").classList.toggle("filtered", button.dataset.filter !== "all");
  });
});

const photoButtons = [...document.querySelectorAll(".gallery-open")];
const lightbox = document.querySelector("#lightbox");
let photoIndex = 0;

function showPhoto(index) {
  if (!photoButtons.length) return;
  photoIndex = (index + photoButtons.length) % photoButtons.length;
  const button = photoButtons[photoIndex];
  const image = document.querySelector("#lightbox-image");
  image.src = button.dataset.image;
  image.alt = button.querySelector("img").alt;
  document.querySelector("#lightbox-title").textContent = button.dataset.title;
  document.querySelector("#lightbox-credit").textContent = button.dataset.credit;
  document.querySelector("#photo-count").textContent =
    formatNumber(photoIndex + 1) + " / " + formatNumber(photoButtons.length);
}

photoButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showPhoto(index);
    lightbox.showModal();
    syncScrollLock();
  });
});
document.querySelector("#photo-prev").addEventListener("click", () => showPhoto(photoIndex - 1));
document.querySelector("#photo-next").addEventListener("click", () => showPhoto(photoIndex + 1));
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    showPhoto(photoIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});
document.querySelector("#photo-prev").hidden = photoButtons.length < 2;
document.querySelector("#photo-next").hidden = photoButtons.length < 2;

// Native dialogs handle focus trapping and returning focus to their trigger.
const privacy = document.querySelector("#privacy-dialog");
document.querySelector("#privacy-open").addEventListener("click", () => {
  privacy.showModal();
  syncScrollLock();
});
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", syncScrollLock);
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

// Review count and navigation adapt when entries are added or removed.
const reviews = window.NEFERTITI_CONTENT?.reviews.items ?? [{
  name: document.querySelector("#review-name").textContent,
  quote: document.querySelector("#review-quote").textContent,
  source: "Recenzie Google"
}];
let reviewIndex = 0;

function showReview(index, animate = false) {
  if (!reviews.length) return;
  reviewIndex = (index + reviews.length) % reviews.length;
  const review = reviews[reviewIndex];
  document.querySelector("#review-quote").textContent = review.quote;
  document.querySelector("#review-name").textContent = review.name;
  document.querySelector("#review-avatar").textContent = Array.from(review.name)[0] ?? "";
  document.querySelector(".review-author > div > span").textContent = review.source;
  document.querySelector("#review-count").textContent =
    formatNumber(reviewIndex + 1) + " / " + formatNumber(reviews.length);
  if (animate && !reducedMotion.matches) {
    document.querySelector(".review-text").animate(
      [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 250, easing: "ease-out" }
    );
  }
}
document.querySelector("#review-prev").addEventListener("click", () => showReview(reviewIndex - 1, true));
document.querySelector("#review-next").addEventListener("click", () => showReview(reviewIndex + 1, true));
document.querySelector("#review-prev").hidden = reviews.length < 2;
document.querySelector("#review-next").hidden = reviews.length < 2;
showReview(0);
document.querySelector("#year").textContent = new Date().getFullYear();

// Reveal animation never hides content for users who prefer reduced motion.
if ("IntersectionObserver" in window) {
  if (!reducedMotion.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(
      ".studio-layout,.section-heading,.gallery-item,.reviews-layout,.faq-intro,.faq-list,.contact-layout"
    ).forEach((element) => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
  }
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".desktop-nav a").forEach((link) =>
          link.classList.toggle("active", link.hash === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-20% 0px -55% 0px" });
  document.querySelectorAll("section[id]").forEach((section) => activeObserver.observe(section));
}
