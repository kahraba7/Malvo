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
