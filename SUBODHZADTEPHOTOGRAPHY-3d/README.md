# SUBODH ZADTE PHOTOGRAPHY website

A one-page static website (HTML, CSS and JavaScript, with no build step) for the SUBODH ZADTE PHOTOGRAPHY studio.

## Sections
Hero with the Google rating, Services, a filterable gallery with a lightbox, Packages, About Subodh, Reviews, a WhatsApp booking form with a map, and a floating WhatsApp button.

## Run locally
```
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Deploy to GitHub Pages
1. Push this repo to GitHub.
2. Go to Settings → Pages → Source and choose "Deploy from a branch", with branch `main` and folder `/ (root)`.
3. For a custom domain, add a `CNAME` file containing the domain and point its DNS at GitHub Pages.

## Confirm with the client before going live
- [x] **Photos**: 20 photos from Subodh's Facebook and his portrait are in `images/`. There are no newborn photos yet, so newborn is merged into the Maternity card.
- [ ] **Address**: the Google listing shows "Tirupati Ho. Society, Gut No. 170" without a plot number, and older listings say Waluj MIDC, Bajajnagar. Confirm the address of the new studio.
- [ ] **WhatsApp**: the form and buttons send to +91 95527 73143. Confirm this number is on WhatsApp, or change `WHATSAPP_NUMBER` in `js/main.js` and the `wa.me` links in `index.html`.
- [ ] **Hours**: only the 9:00 AM opening time is known. Add closing time and days in the contact section.
- [ ] **Packages**: the inclusions are typical for this kind of studio and need the client's sign-off. Prices show "Price on enquiry". To show a price, edit the `.price` line, for example `From ₹45,000`.
- [ ] **Reviews**: replace the three placeholder blockquotes with real Google reviews, with each reviewer's permission. Update the 4.9 rating and 135 review count when they change.
- [ ] **Facebook**: add the page link to the footer if wanted.
- [ ] **og:image**: change to an absolute URL once the domain is known.
