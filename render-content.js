/* Applies content.js before app.js connects the interactive controls. */
(() => {
  "use strict";
  const content = window.NEFERTITI_CONTENT;
  if (!content) return; // The initial HTML remains readable if configuration fails.

  const $ = (selector) => document.querySelector(selector);
  const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const lines = (values) => values.map(escape).join("<br>");
  const number = (index) => String(index + 1).padStart(2, "0");
  const setText = (selector, value) => { const el = $(selector); if (el) el.textContent = value; };
  const image = (selector, item) => {
    const el = $(selector);
    el.setAttribute("src", item.image);
    el.alt = item.alt;
  };
  const externalLink = (href, text) =>
    '<a href="' + escape(href) + '" target="_blank" rel="noopener noreferrer">' + escape(text) + "</a>";

  const { business, links, seo, hero, studio, services, gallery, reviews } = content;
  document.title = seo.title;
  $('meta[name="description"]').content = seo.description;
  $('meta[property="og:title"]').content = business.name;
  $('meta[property="og:description"]').content = seo.description;
  document.querySelectorAll("[data-link]").forEach((link) => {
    if (links[link.dataset.link]) link.href = links[link.dataset.link];
  });

  setText(".brand > span", business.wordmark);
  $(".brand").setAttribute("aria-label", business.name + ", început");
  setText(".footer-wordmark", business.wordmark);
  setText("[data-business-name]", business.name);
  setText(".map-caption strong", business.name);
  setText(".mobile-menu > p", business.city.toUpperCase() + " · " + business.street.toUpperCase());
  setText(".footer-bottom > span", business.city.toUpperCase() + ", " + business.country.toUpperCase());
  $(".hero .eyebrow").innerHTML = '<span class="tiny-star" aria-hidden="true">✳</span> ' +
    escape(business.city.toUpperCase() + ", " + business.country.toUpperCase());
  $(".contact-phone").textContent = business.phone;
  $(".contact-phone").href = "tel:" + business.phoneInternational;
  $(".contact-details address").innerHTML = escape(business.street) + "<br>" +
    escape(business.city + ", " + business.postalCode);
  $(".contact-details > div:nth-child(2) > p").innerHTML = business.hours
    .map((row) => escape(row.days) + " <strong>" + escape(row.hours) + "</strong>").join("<br>");

  const mapQuery = business.name + " " + business.street + ", " + business.city + " " + business.postalCode;
  const map = $(".map-wrap iframe");
  const embedUrl = "https://maps.google.com/maps?" + new URLSearchParams({
    q: mapQuery, output: "embed", iwloc: "near"
  });
  // Avoid a second Google Maps request when the location has not changed.
  if (new URL(map.src).searchParams.get("q") !== mapQuery) map.src = embedUrl;
  map.title = "Google Maps: " + mapQuery;
  $(".map-caption .button").href = "https://www.google.com/maps/dir/?" + new URLSearchParams({
    api: "1", destination: mapQuery, destination_place_id: content.googlePlaceId
  });
  setText(".map-caption > div > span",
    Math.abs(business.latitude).toFixed(6) + "° " + (business.latitude >= 0 ? "N" : "S") +
    " · " + Math.abs(business.longitude).toFixed(6) + "° " + (business.longitude >= 0 ? "E" : "W"));

  image(".hero-image img", hero);
  $("#hero-title").innerHTML = escape(hero.title[0]) + "<br><span>" +
    escape(hero.title[1]) + "</span><br><em>" + escape(hero.title[2]) + "</em>";
  $(".hero-bottom p").innerHTML = lines(hero.description);
  $(".studio-layout h2").innerHTML = escape(studio.title[0]) + "<br><em>" + escape(studio.title[1]) + "</em>";
  setText(".studio-copy > p:first-child", studio.lead);
  setText(".studio-copy > p:nth-child(2)", studio.text);

  $(".services-list").innerHTML = services.map((service, i) =>
    '<details class="service" name="services"' + (i === 0 ? " open" : "") +
    ' data-image="' + escape(service.image) + '" data-alt="' + escape(service.alt) +
    '" data-caption="' + number(i) + " / " + escape(service.label) + '">' +
    '<summary><span class="service-number">' + number(i) + "</span><span>" + lines(service.title) +
    '</span><span class="expand" aria-hidden="true">+</span></summary>' +
    '<div class="service-body"><p>' + escape(service.description) + '</p><div class="service-tags">' +
    service.tags.map((tag) => "<span>" + escape(tag) + "</span>").join("") +
    '</div><a href="#contact" class="text-link">' + escape(service.action) +
    ' <span aria-hidden="true">+</span></a></div></details>'
  ).join("");
  if (services.length) {
    image("#service-image", services[0]);
    setText("#service-image-caption", "01 / " + services[0].label);
  }
  $("#servicii").hidden = services.length === 0;

  setText(".gallery-tools > p", gallery.label);
  $(".gallery-note").innerHTML = escape(gallery.note) + " " + externalLink(links.instagram, "Instagram") + ".";
  $(".gallery-grid").innerHTML = gallery.items.map((item, i) =>
    '<figure class="gallery-item" data-category="' + escape(item.category) + '">' +
    '<button type="button" class="gallery-open" aria-label="Mărește imaginea: ' + escape(item.title) +
    '" data-image="' + escape(item.image) + '" data-title="' + escape(item.title) +
    '" data-credit="' + escape(item.credit) + '"><img src="' + escape(item.image) +
    '" alt="' + escape(item.alt) + '" loading="lazy" width="900" height="1200">' +
    '<span class="zoom-icon" aria-hidden="true">+</span></button><figcaption><span>' +
    escape(item.title) + "</span><span>" + number(i) + " / " + escape(item.category.toUpperCase()) +
    "</span></figcaption></figure>"
  ).join("");
  $(".gallery-filters").hidden = gallery.items.length === 0;
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.hidden = button.dataset.filter !== "all" &&
      !gallery.items.some((item) => item.category === button.dataset.filter);
  });

  setText(".rating > strong", reviews.rating);
  setText(".rating p", reviews.ratingLabel);
  $(".rating-source a").href = reviews.sourceUrl;
  setText(".rating-source a", reviews.sourceLabel);
  $("#recenzii").hidden = reviews.items.length === 0;
  document.querySelectorAll('a[href="#recenzii"], a[href="#servicii"]').forEach((link) => {
    link.hidden = $(link.hash).hidden;
  });

  $("#photo-credits").innerHTML = content.photoCredits.authors
    .map((author) => externalLink(author.url, author.name)).join("; ") + ". " + escape(content.photoCredits.note);

  // Resolve the deployment URL automatically; no hardcoded hosting provider.
  let siteUrl = seo.siteUrl;
  if (!siteUrl && /^https?:$/.test(location.protocol)) siteUrl = new URL("./", location.href).href;
  if (siteUrl) {
    let canonical = $('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical); }
    canonical.href = siteUrl;
  }
  const schema = {
    "@context": "https://schema.org", "@type": "BeautySalon",
    name: business.name, telephone: business.phoneInternational,
    address: { "@type": "PostalAddress", streetAddress: business.street,
      addressLocality: business.city, postalCode: business.postalCode, addressCountry: business.countryCode },
    geo: { "@type": "GeoCoordinates", latitude: business.latitude, longitude: business.longitude },
    openingHours: business.structuredHours, sameAs: [links.instagram, links.facebook], hasMap: links.googleMaps
  };
  if (siteUrl) schema.url = siteUrl;
  $('script[type="application/ld+json"]').textContent = JSON.stringify(schema);
})();
