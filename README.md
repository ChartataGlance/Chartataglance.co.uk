# ChartataGlance AI Website

Static GitHub-ready website for ChartataGlance.

## Files

- `index.html` — updated homepage
- `ai-results.html` — separate AI prediction gallery page
- `assets/style.css` — shared responsive design
- `assets/main.js` — date/time script
- `assets/gallery.js` — pattern gallery loader
- `data/*.json` — separate Cloudflare image lists per pattern
- `sitemap.xml` — SEO sitemap
- `robots.txt` — search crawler config

## How to add Cloudflare screenshots

Open the JSON file for the pattern, for example:

`data/123buy.json`

Replace the sample image URL:

`https://imagedelivery.net/YOUR_CLOUDFLARE_ACCOUNT_HASH/REPLACE_IMAGE_ID/public`

with your real Cloudflare image URL.

## Telegram CTA

Current Telegram link used:

https://t.me/ChartataGlance

Change it in `index.html` and `ai-results.html` if needed.

## GitHub hosting

Upload all files to your GitHub Pages repository root.
