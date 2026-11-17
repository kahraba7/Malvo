# MALVO Website

Static site (HTML + CSS + JS). Flat structure: all files sit in one folder. No build step, no dependencies, no environment variables.

## Structure
- index.html - page markup
- style.css - all styles (brand tokens at top in :root)
- main.js - menu, scroll effects, projects data, contact form
- favicon.svg, malvo-symbol*.svg, malvo-wordmark.png, og-image.png - logo, favicon and share image

## Add projects
Edit the PROJECTS array at the top of main.js:
{ title:"Name", category:"Web Development", year:"2026", image:"x.jpg", imageAlt:"...", url:"https://..." }

## Deploy on Vercel
1. vercel.com/new -> import the folder (or run `vercel` in it).
2. Framework preset: Other. No build command, output directory: root.

## Before launch
- Replace YOUR-DOMAIN in og:image / twitter:image (index.html) with the real domain, and set canonical + og:url. The share image is og-image.png.
- Fonts load from Google Fonts. For best speed in Egypt, self-host Inter and Space Grotesk (woff2) and preload them.
- Contact form opens the visitor's email app (mailto). Connect Formspree or a Vercel function for real delivery.

## Launch (added)
- Run `./set-domain.sh yourdomain.com` once the domain exists (fills canonical, og:url/image, hreflang, JSON-LD, sitemap, robots).
- Arabic version: ar.html (served at /ar). It reuses main.js/about.js with an `AR` switch and loads rtl.css. Privacy page is English only.
- vercel.json adds security headers and a CSP. If you add analytics or another external script, extend script-src/connect-src.
- Analytics is not installed (needs your provider/ID).

## Fonts (self-hosting)
Run `python3 self-host-fonts.py` once with internet access (before deploying). It downloads Inter, Space Grotesk and Cairo as woff2 into fonts/, switches every page to local fonts.css / fonts-ar.css with preloads, and removes Google hosts from the CSP in vercel.json.

## Kanzel (first project)
- Featured project is defined in the PROJECTS array at the top of main.js (EN/AR text via T()). Assets: kanzel-reel.mp4 (silent 12s loop), kanzel-poster.jpg, kanzel-screens.jpg (phone number blurred).
- The "Restaurants" section (#restaurants) is the Kanzel world, in index.html and ar.html. Styles: kanzel.css (Kanzel's palette and fonts are scoped to .kz). Script: kanzel.js.
  1. Entry: ink -> Kanzel green, arch + logo draw in.
  2. Live phone: the real site in an iframe (data-src on .kz-frame, default https://kanzel-eg.vercel.app/) + a QR for desktop visitors. Small screens load it on tap.
  3. Scroll story: 6 chapters (guest scan, choose, send, waiter, reception, owner) drive the drawn screens. Dish photos kz-d1..6.jpg, logo kz-logo.png. Screens are illustrations: numbers are sample data.
  4. Exit: the green wipes to white and we are back in MALVO's world.
- If the Kanzel domain changes: update data-src, the href of the "Open the full site" link and the QR (see below) in both pages, and frame-src in vercel.json.
- The QR is an inline SVG symbol (#kz-qr). Regenerate it with any QR tool and replace the path in both pages.

## Kanzel story (two phones)
kanzel-sim.js + kanzel-sim.css: autoplay scenario (guest chat, booking, QR scan, order, waiter confirm/edit/decline/cancel, call, sold out). Edit copy and dishes at the top of kanzel-sim.js (TX and DB). Chapter lengths are only used for the progress line.
