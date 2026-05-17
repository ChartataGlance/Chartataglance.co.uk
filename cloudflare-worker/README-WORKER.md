# ChartataGlance Cloudflare Worker API

This Worker lists screenshots from your Cloudflare R2 bucket so the GitHub Pages website can show a live gallery without manual JSON updates.

## Required Cloudflare setup

1. R2 bucket name: `dax-ai-results` or change it in `wrangler.toml`.
2. Screenshot object keys should use pattern folders:

```text
123buy/123buy_2026-05-17_09-22-31_0.88.png
buywedge/buywedge_2026-05-17_10-44-11_0.82.png
```

3. R2 public/custom image domain:

```text
https://charts.chartataglance.co.uk
```

4. Worker custom domain recommended:

```text
https://api.chartataglance.co.uk
```

The website JavaScript currently uses:

```js
const API_BASE = 'https://api.chartataglance.co.uk/api';
```

Change it in `assets/gallery.js` if your Worker URL is different.

## Deploy with Wrangler

```bash
cd cloudflare-worker
npm install -g wrangler
wrangler login
wrangler deploy
```

Then add a custom domain in Cloudflare:

```text
Workers & Pages → dax-r2-gallery-api → Settings → Domains & Routes → Add Custom Domain
```

Use:

```text
api.chartataglance.co.uk
```

## Test endpoints

```text
https://api.chartataglance.co.uk/api/patterns
https://api.chartataglance.co.uk/api/list?pattern=123buy&limit=20
```

