# CIELO Capital Forecast

**Automated Geopolitical Intelligence & Market Forecast Dashboard**

Live Dashboard: [cielo-forecast.pages.dev](https://cielo-forecast.pages.dev)

## Overview

CIELO Capital Forecast is an automated intelligence dashboard and email digest system built for swing traders and short-term position traders. It collects data from 15+ sources, generates predictions, and deploys a live dashboard daily.

## Features

- **12 Dashboard Views**: Overview, Markets, Geopolitics, Gov Contracts, Legislation, World Map, X Signals, Congressional Trades, Deep Intel, Macro Intel, Charts, Long-Term
- **Trade of the Day**: Daily high-conviction trade setup with entry/target/stop
- **Prediction Engine**: 1-3 day and 1-3 month forecasts with scenario analysis
- **Interactive World Map**: Leaflet.js map with conflict zones, shipping routes, chokepoints
- **40+ Chart Components**: Chart.js candlestick, prediction, sector, yield curve charts
- **Real-time Signals**: Geopolitical alerts, insider trades, WSB sentiment, congressional trades

## Architecture

```
forecast-dashboard/
  index.html          # Dashboard HTML (12 views, sidebar nav, responsive)
  app.js              # DATA object + 40+ render functions
  style.css           # Terminal/intelligence aesthetic (dark theme)
  cielo-logo.svg      # Brand logo
  earth-hero.jpg      # Hero background
  cf-deploy.sh        # Cloudflare Pages deploy script
```

## Tech Stack

- **Frontend**: Vanilla JavaScript (IIFE pattern)
- **Charts**: Chart.js + chartjs-plugin-annotation
- **Maps**: Leaflet.js with CARTO Dark Matter tiles
- **Fonts**: Inter + JetBrains Mono
- **Hosting**: Cloudflare Pages
- **Design**: Military/terminal aesthetic, dark theme, monospace typography

## Data Sources

Perplexity Finance, SEC EDGAR, FRED, ApeWisdom, NWS, USASpending, Congress.gov, Federal Register, X/Twitter, US Treasury, IMF, World Bank, BLS

## Deployment

```bash
# Deploy to Cloudflare Pages
cd forecast-dashboard
./cf-deploy.sh
```

## Brand

- **Name**: Cielo Capital
- **Operator**: [cielo.agency](https://cielo.agency)
- **Version**: 2.0

---

*CIELO CAPITAL FORECAST v2.0 | Powered by Cielo Capital*
