/*
 * MODIFICĂ AICI datele salonului, imaginile, serviciile și recenziile.
 * Salvează fișierul și fă commit pe GitHub. Nu este necesar npm sau un build.
 * Pentru imagini folosește căi relative: "assets/nume.webp", fără "/" la început.
 * Păstrează ghilimelele și virgulele. Nu publica aici parole sau chei API.
 */
window.NEFERTITI_CONTENT = {
  business: {
    name: "Nefertiti Ink & Skin",
    wordmark: "NEFERTITI",
    phone: "0751 163 900",
    phoneInternational: "+40751163900",
    street: "Strada Revoluției 17",
    city: "Târgu Mureș",
    postalCode: "540043",
    country: "România",
    countryCode: "RO",
    latitude: 46.54777,
    longitude: 24.564093,
    hours: [
      { days: "Luni – Vineri", hours: "10:00 – 19:00" },
      { days: "Sâmbătă – Duminică", hours: "Închis" }
    ],
    // Pentru motoarele de căutare: Mo, Tu, We, Th, Fr, Sa, Su.
    structuredHours: ["Mo-Fr 10:00-19:00"]
  },

  links: {
    instagram: "https://www.instagram.com/nefertiti.ink.skin/",
    facebook: "https://www.facebook.com/p/Nefertiti-Ink-Skin-61556219766909/",
    googleMaps: "https://share.google/hbjqYqt9l9sk5Y411"
  },
  googlePlaceId: "ChIJBwr1XQC3S0cRP41KOsV2lz0",

  seo: {
    title: "Nefertiti Ink & Skin | Tatuaje, piercing & epilare definitivă · Târgu Mureș",
    description: "Pielea ta. Povestea ta. Tatuaje personalizate, piercing și epilare definitivă la Nefertiti Ink & Skin, Târgu Mureș, Strada Revoluției 17.",
    // Lasă gol: adresa este detectată automat, inclusiv pe GitHub Pages.
    // Poți completa ulterior domeniul tău, de exemplu https://exemplu.ro/
    siteUrl: ""
  },

  hero: {
    image: "assets/hero.webp",
    alt: "Detaliu din procesul de tatuare, surprins în alb-negru",
    title: ["PIELEA TA.", "POVESTEA", "ta."],
    description: ["Artă care te reprezintă.", "Grijă care se simte."]
  },

  studio: {
    title: ["Nu urmezi un tipar.", "Îl creezi."],
    lead: "Un tatuaj cu sens. Un piercing care te definește. Piele în care te simți bine.",
    text: "La Nefertiti Ink & Skin, totul începe cu tine. Cu ideile tale, cu stilul tău și cu felul în care vrei să te exprimi. În studioul nostru din Târgu Mureș, le dăm spațiu să prindă formă."
  },

  services: [
    {
      title: ["Tatuaje", "personalizate"],
      label: "INK",
      image: "assets/detail.webp",
      alt: "Prim-plan editorial al unui tatuaj realizat cu atenție",
      description: "O idee, o amintire, o parte din tine. Descoperă un tatuaj gândit în jurul poveștii tale, de la prima schiță până la detaliul final.",
      tags: ["DESIGN PERSONALIZAT", "IDENTITATE"],
      action: "Povestește-ne ideea ta"
    },
    {
      title: ["Piercing"],
      label: "PIERCING",
      image: "assets/piercing.webp",
      alt: "Detaliu editorial cu bijuterii pentru piercing în ureche",
      description: "Un detaliu mic. O expresie puternică. Vorbim despre zona dorită, bijuterie și îngrijire, pentru o alegere care se potrivește stilului tău.",
      tags: ["STIL PERSONAL", "DETALII CARE CONTEAZĂ"],
      action: "Hai să vorbim despre piercing"
    },
    {
      title: ["Epilare", "definitivă"],
      label: "SKIN",
      image: "assets/skin.webp",
      alt: "Imagine editorială: îngrijirea pielii într-un cabinet cosmetic",
      description: "Mai mult confort în rutina ta. Discutăm despre pielea ta, zonele dorite și așteptări, înainte de a stabili împreună pașii potriviți.",
      tags: ["ÎNGRIJIRE PERSONALIZATĂ", "CONFORT"],
      action: "Află mai multe"
    }
  ],

  gallery: {
    // Pentru lucrări autentice, schimbă și această etichetă și nota de mai jos.
    label: "INSPIRAȚIE & ATMOSFERĂ",
    note: "Selecție de imagini editoriale. Portofoliul salonului este disponibil pe",
    // Poți adăuga oricâte imagini, copiind un obiect din listă.
    // category: "ink", "piercing" sau "skin".
    items: [
      {
        category: "ink",
        title: "Arta tatuajului",
        image: "assets/detail.webp",
        alt: "Mâini cu mănuși negre lucrând la un tatuaj",
        credit: "Fotografie editorială: R.D. Smith / Unsplash"
      },
      {
        category: "piercing",
        title: "Expresie în detalii",
        image: "assets/piercing.webp",
        alt: "Bijuterii delicate pentru piercing în ureche",
        credit: "Fotografie editorială: Amin Zabardast / Unsplash"
      },
      {
        category: "skin",
        title: "Timp pentru tine",
        image: "assets/skin.webp",
        alt: "Imagine editorială: îngrijirea pielii într-un cabinet cosmetic",
        credit: "Fotografie editorială: Anna Shvets / Pexels"
      }
    ]
  },

  reviews: {
    rating: "5,0",
    ratingLabel: "Evaluare publicată",
    sourceLabel: "BeautySalon123",
    sourceUrl: "https://beautysalon123.ro/nefertiti-ink-skin-strada-revolutiei-17-targu-mures-540043/",
    // Adaugă doar recenzii reale, cu sursa lor.
    items: [
      {
        name: "Dia Dia",
        quote: "Profesionalism si rezultate garantate. Foarte multumita!",
        source: "Recenzie Google"
      },
      {
        name: "Amalia Lenta",
        quote: "experienta a fost super placuta si relaxanta, recomand cu cel mai mare drag!",
        source: "Recenzie Google"
      }
    ]
  },

  photoCredits: {
    note: "Aceste imagini ilustrează serviciile și nu reprezintă lucrări ale salonului.",
    authors: [
      { name: "R.D. Smith / Unsplash", url: "https://unsplash.com/photos/tattoo-artist-working-on-client-with-black-gloves-BcKz2-jPcRk" },
      { name: "Amin Zabardast / Unsplash", url: "https://unsplash.com/photos/_wUusQ40Lz8" },
      { name: "Anna Shvets / Pexels", url: "https://www.pexels.com/photo/a-cosmetologist-doing-beauty-treatment-to-a-woman-4586751/" }
    ]
  }
};
