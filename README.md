# Nefertiti Ink & Skin

Site static, pregătit pentru GitHub Pages. **index.html este direct în rădăcina repository-ului.** Fără npm, framework sau build obligatoriu. Fonturile și imaginile sunt locale.

## Publicare pe GitHub Pages

1. Creează repository-ul pe GitHub și încarcă fișierele extrase din arhiva pregătită direct în root. Trebuie să vezi index.html lângă README.md, nu într-un subfolder site sau dist.
2. Păstrează inclusiv folderul .github și fișierul .nojekyll.
3. Deschide **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. În tabul **Actions**, deschide **Publish GitHub Pages** și apasă **Run workflow**. Următoarele commit-uri pe main publică automat actualizările.
5. Deschide URL-ul afișat după finalizarea publicării.

Workflow-ul verifică JavaScript-ul și copiază exclusiv fișierele publice prin scripts/stage.mjs. Nu instalează dependențe și nu cere token personal sau secrete suplimentare. Dacă ramura ta se numește altfel, modifică branches din .github/workflows/pages.yml.

Funcționează atât pe utilizator.github.io/nume-repository/, cât și pe un domeniu propriu. Pentru un domeniu propriu, setează-l mai întâi în Settings → Pages și apoi completează seo.siteUrl în content.js, dacă dorești o adresă canonică explicită.

### Alternativă fără workflow

Poți șterge .github/workflows/pages.yml din repository sau dezactiva acel workflow, apoi alege **Settings → Pages → Deploy from a branch → main → / (root) → Save**. Fișierul .nojekyll dezactivează procesarea Jekyll. La fiecare commit pe ramura aleasă, GitHub republică site-ul.

Alege una dintre cele două metode, pentru a evita publicări duble.

Documentație: [Configurarea sursei GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Actualizări rapide, direct în GitHub

Deschide **content.js**, apasă Edit, modifică valorile și salvează prin Commit changes.

| Ce modifici | Unde |
| --- | --- |
| Telefon, adresă, program, coordonate | content.js → business |
| Instagram, Facebook, Google Maps | content.js → links și googlePlaceId |
| Titlu SEO, descriere, domeniu opțional | content.js → seo |
| Imagine și texte din prima secțiune | content.js → hero |
| Prezentarea studioului | content.js → studio |
| Servicii, descrieri, fotografii | content.js → services |
| Fotografii din galerie | content.js → gallery.items |
| Recenzii, evaluare și sursă | content.js → reviews |
| Atribuirea fotografiilor | content.js → photoCredits |
| Alte texte și structura paginii | index.html |
| Culori, fonturi, spațiere, responsive | styles.css |
| Animații și interacțiuni | app.js |

Nu modifica render-content.js pentru actualizările obișnuite. Acesta aplică datele înainte ca app.js să inițializeze interacțiunile. HTML-ul include și conținut inițial de rezervă; actualizările obișnuite sunt aplicate în browser din content.js.

### Adaugă o fotografie

1. Încarcă imaginea în assets/. Recomandat WebP sau JPEG optimizat.
2. Copiază un obiect din gallery.items în content.js.
3. Completează image, title, alt, category și credit.
4. Folosește o cale ca **assets/tatuaj-nou.webp**, fără slash la început. Literele mari/mici trebuie să coincidă exact cu numele fișierului.
5. Salvează. Numărul imaginilor și navigarea se adaptează automat.

Categoriile existente sunt ink, piercing și skin. Pentru înlocuirea fotografiilor editoriale cu lucrări proprii, actualizează și gallery.label, gallery.note și photoCredits.

### Recenzii și date reale

Recenziile inițiale sunt un instantaneu atribuit sursei indicate, nu un flux sincronizat cu Google. Adaugă doar recenzii reale și păstrează sursa corectă. Fotografiile inițiale sunt editoriale, nu portofoliul salonului.

## Previzualizare locală

Deschide index.html direct în browser sau, dacă ai Node.js instalat:

~~~sh
node server.mjs
~~~

Adresa: http://127.0.0.1:4173/.

Pentru a simula exact publicarea într-un subfolder GitHub Pages:

~~~sh
node server.mjs --base=/nefertiti/ --port=4174
~~~

Adresa: http://127.0.0.1:4174/nefertiti/.

## Fișiere locale

.local-backup/ păstrează versiunea anterioară pentru Sites și materialele de lucru. Nu face parte din repository: este exclus prin .gitignore, împreună cu arhivele și rezultatele verificărilor.

Arhiva nefertiti-github-pages.zip conține doar proiectul pregătit pentru GitHub, cu index.html la nivelul principal. Încarcă fișierele extrase; nu încărca ZIP-ul ca fișier al site-ului.

Nu este configurat încă un repository GitHub sau un domeniu propriu. Configurarea Pages se face o singură dată în repository-ul ales.
