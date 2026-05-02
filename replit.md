# CIELO Capital Forecast Dashboard

## Overview
CIELO Capital Forecast is an automated geopolitical intelligence and market forecast dashboard built for swing traders and short-term position traders. It displays market data, trade recommendations, geopolitical events, and financial analysis through a 12-view dashboard interface.

## Architecture
- **Type**: Pure static web application (HTML + CSS + JavaScript)
- **Server**: Node.js HTTP server (`server.js`) serving static files on port 5000
- **No backend API** — all data is embedded in `app.js` as a `const DATA` object

## Key Files
- `index.html` — Main dashboard HTML (894 lines), 12 navigation views, sidebar nav, responsive
- `app.js` — Dashboard logic (~4100 lines) — DATA object + all render functions
- `style.css` — Terminal/military aesthetic styling (3736 lines)
- `server.js` — Simple Node.js static file server on port 5000
- `cielo-logo.svg` — Brand logo
- `earth-hero.jpg` — Hero background image
- `cf-deploy.sh` — Cloudflare deploy helper script

## Dashboard Views
1. **Overview** — Trade of the day, prediction summary, KPIs, signals
2. **Markets** — SPY chart, sector performance, ticker table
3. **Geopolitics** — Event timeline with impact severity
4. **Gov Contracts** — Government contracts table and charts
5. **Legislation** — Legislative tracker, bills, federal regulations
6. **World Map** — Interactive Leaflet map with conflict zones
7. **X Signals** — Social media intelligence from analysts
8. **Congressional Trades** — Congressional stock trades
9. **Deep Intel** — Insider trades, WSB sentiment, macro indicators
10. **Macro Intel** — National debt, deficit, defense spending, GDP, CPI
11. **Charts** — 10 prediction charts with candlestick-style data
12. **Long-Term** — 1-3 month prediction charts

## Data System
The `DATA` object in `app.js` is the single source of truth. It is surgically replaced daily by a cron system without touching the render functions. The cron runs at 6:00 AM GST (2:00 AM UTC).

## Libraries (CDN)
- **Chart.js** — Bar, doughnut, radar, line charts
- **chartjs-plugin-annotation** — Chart annotations
- **Leaflet.js** — Interactive world map
- **JetBrains Mono** (Google Fonts) — Primary monospace font

## Running Locally
```bash
node server.js
# Serves on http://0.0.0.0:5000
```

## Deployment
- **Replit**: Autoscale deployment via `node server.js`
- **Cloudflare Pages**: `cielo-forecast.pages.dev` (mapped to cielo.capital)
  - Project: `cielo-forecast`
  - Account ID: `2430eb30601913a01a903944b8ce3f57`

## Design System
- Terminal/intelligence military aesthetic
- Primary font: JetBrains Mono
- Dark backgrounds (#0a0a0f), sharp 2px corners
- Color coding: Green = bullish, Red = bearish, Amber = warning, Blue = info
