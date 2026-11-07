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
