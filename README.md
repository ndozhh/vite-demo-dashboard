# Vite Demo Dashboard

A small static analytics dashboard built with Vite + React. No backend, no API keys — it exists to be a
realistic-but-disposable app for testing static site deploys (Render, Netlify, Cloudflare Pages, …).

## Features

- **Overview** — KPI cards with month-over-month deltas, plus a revenue line chart and a signups bar chart,
  both hand-rolled SVG (no chart dependency).
- **Orders** — sortable, searchable, status-filtered, paginated table.
- **Activity** — a simple activity feed.
- Hash-based routing (`#/overview`, `#/orders`, `#/activity`) so it works on any static host.
- Dark/light theme toggle, persisted in `localStorage`.
- Build stamp in the sidebar (`env` + build time) — handy for confirming a deploy actually shipped.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploying to Render

The repo includes a `render.yaml` blueprint. In Render: **New → Blueprint**, point at this repo, and it
provisions a static site with:

| Setting | Value |
| --- | --- |
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |
| Rewrite rule | `/*` → `/index.html` (200) |

To set it up manually instead, create a **Static Site** and enter the same build command and publish
directory. `public/_redirects` covers the SPA rewrite on hosts that read that file.

To verify a new deploy went live, check the build timestamp in the sidebar footer.
