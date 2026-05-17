export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (!env.DAX_RESULTS_BUCKET) {
      return json({ error: "Missing R2 binding: DAX_RESULTS_BUCKET" }, 500, corsHeaders);
    }

    if (url.pathname === "/api/patterns") {
      return json({
        patterns: ["123buy", "buywedge", "reverseup", "bottom", "dbl_top", "oscilation"]
      }, 200, corsHeaders);
    }

    if (url.pathname === "/api/list") {
      const pattern = cleanPrefix(url.searchParams.get("pattern") || "123buy");
      const limit = clamp(Number(url.searchParams.get("limit") || 60), 1, 1000);
      const cursor = url.searchParams.get("cursor") || undefined;
      const prefix = `${pattern}/`;

      const listed = await env.DAX_RESULTS_BUCKET.list({
        prefix,
        limit,
        cursor
      });

      const publicBase = (env.PUBLIC_R2_BASE_URL || "https://charts.chartataglance.co.uk").replace(/\/$/, "");

      const objects = listed.objects
        .filter(obj => isImage(obj.key))
        .sort((a, b) => new Date(b.uploaded || 0) - new Date(a.uploaded || 0))
        .map(obj => ({
          key: obj.key,
          name: obj.key.split("/").pop(),
          pattern,
          size: obj.size,
          uploaded: obj.uploaded,
          url: `${publicBase}/${encodeURI(obj.key).replace(/%2F/g, "/")}`,
          confidence: confidenceFromName(obj.key),
          date: dateFromName(obj.key)
        }));

      return json({
        pattern,
        count: objects.length,
        truncated: listed.truncated,
        cursor: listed.cursor || null,
        objects
      }, 200, corsHeaders);
    }

    return json({
      service: "ChartataGlance DAX AI R2 Gallery API",
      endpoints: [
        "/api/list?pattern=123buy&limit=60",
        "/api/patterns"
      ]
    }, 200, corsHeaders);
  }
};

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data, null, 2), { status, headers });
}

function cleanPrefix(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) || "123buy";
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function isImage(key) {
  return /\.(png|jpe?g|webp|gif)$/i.test(key);
}

function confidenceFromName(key) {
  const match = key.match(/_(0\.\d{2}|1\.00)\.(png|jpg|jpeg|webp|gif)$/i);
  return match ? match[1] : "";
}

function dateFromName(key) {
  const match = key.match(/(20\d{2}-\d{2}-\d{2})_(\d{2}-\d{2}-\d{2})/);
  return match ? `${match[1]} ${match[2].replaceAll("-", ":")}` : "";
}
