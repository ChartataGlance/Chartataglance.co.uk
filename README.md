# ChartataGlance AI DAX Pattern Website

This package contains a static GitHub Pages website plus a Cloudflare Worker API for live R2 screenshot galleries.

## What is included

- `index.html` — updated SEO homepage
- `ai-results.html` — AI DAX pattern results page
- `assets/gallery.js` — loads live screenshots from Worker API
- `cloudflare-worker/` — Worker that lists R2 objects by pattern folder
- `python-auto-upload-example.py` — Python R2 upload helper for your DAX AI detector
- `robots.txt` and `sitemap.xml`

## Architecture

```text
DAX AI detection
→ screenshot saved
→ Python uploads image to Cloudflare R2
→ Worker API lists R2 objects
→ GitHub Pages gallery loads latest screenshots automatically
→ Telegram alerts send chart screenshot
```

## Important URLs

- Website: `https://chartataglance.co.uk/`
- Gallery page: `https://chartataglance.co.uk/ai-results.html`
- R2 image domain: `https://charts.chartataglance.co.uk/`
- Worker API recommended domain: `https://api.chartataglance.co.uk/`

## Deploy website

Upload these files to your GitHub Pages repository and push.

## Deploy Worker

See `cloudflare-worker/README-WORKER.md`.

## Note

This is for AI-assisted market-structure research and educational use only. It is not financial advice.
