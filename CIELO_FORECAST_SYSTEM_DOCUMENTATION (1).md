# CIELO CAPITAL FORECAST SYSTEM
## Complete Technical & Operational Documentation

**Version:** 2.0
**Last Updated:** March 13, 2026
**Operator:** Cielo Capital (cielo.agency)
**Live Dashboard:** https://cielo-forecast.pages.dev
**Brand:** Cielo Capital -- clean sans-serif white logo (SVG)

---

## TABLE OF CONTENTS

1. [System Overview](#system-overview)
2. [Core Philosophy & Reasoning Framework](#core-philosophy--reasoning-framework)
3. [Architecture](#architecture)
4. [Data Schema (DATA Object)](#data-schema-data-object)
5. [Dashboard Views & Render Functions](#dashboard-views--render-functions)
6. [Daily Cron Operation](#daily-cron-operation)
7. [Data Collection: API Calls & Sources](#data-collection-api-calls--sources)
8. [Prediction Engine & Trade Logic](#prediction-engine--trade-logic)
9. [Deployment Pipeline](#deployment-pipeline)
10. [Email Digest System](#email-digest-system)
11. [Notification System](#notification-system)
12. [Cron Tracking & State Management](#cron-tracking--state-management)
13. [Design System & Styling](#design-system--styling)
14. [File Structure](#file-structure)
15. [Subscriber System](#subscriber-system)
16. [Connected Services & Credentials](#connected-services--credentials)
17. [Troubleshooting & Maintenance](#troubleshooting--maintenance)
18. [Change Log](#change-log)

---

## SYSTEM OVERVIEW

CIELO Capital Forecast is an automated intelligence dashboard and email digest system built for swing traders and short-term position traders. It runs a daily cron job at 6:00 AM GST (2:00 AM UTC) that:

1. Collects market data, geopolitical intelligence, and unique signals from 15+ sources
2. Generates a structured DATA object with predictions, trade recommendations, and analysis
3. Surgically replaces the DATA section in the dashboard's app.js (preserving all render functions)
4. Deploys to two platforms simultaneously (Perplexity hosting + Cloudflare Pages)
5. Sends a plain-text email digest to subscribers
6. Sends in-app notifications for high-priority alerts
7. Updates cron tracking state for the next run

**Targeting:** Swing traders / short positions. 1-3 day prediction horizon with 1-3 month long-term charts.

---

## CORE PHILOSOPHY & REASONING FRAMEWORK

### Primary Directive
> "Focus on UNIQUE, non-obvious data. Not basic news. The goal is to PREDICT the next 1-3 days for swing traders."

### What We Prioritize (Non-Obvious Signals)
- **Government contracts** -- unusual defense/agency spending patterns
- **Congressional stock trades** -- insider-like signals from politicians
- **Shipping chokepoint disruptions** -- supply chain impact on specific sectors
- **Unusual options activity** -- large block trades signaling institutional bets
- **WSB trending tickers** -- retail momentum and sentiment shifts
- **Insider buying/selling patterns** -- corporate insider transactions
- **Private credit exposure** -- systemic risk indicators
- **Cyber warfare developments** -- emerging threat vectors
- **Energy Secretary / Fed official statements** -- policy signals before market digests them
- **Cross-asset correlations** -- oil-to-airlines, rates-to-banks, VIX-to-options

### What We De-Prioritize
- Basic stock price news ("AAPL up 1%")
- Generic market summaries available everywhere
- Backward-looking analysis without predictive value
- Press release regurgitation

### Prediction Framework

The prediction engine follows this hierarchy:

```
1. MACRO DRIVER IDENTIFICATION
   - What is the #1 force moving markets RIGHT NOW?
   - (e.g., oil prices, Fed policy, geopolitical event, earnings cycle)

2. SIGNAL AGGREGATION
   - Collect 8-12 unique data points from different sources
   - Weight by recency, impact magnitude, and market reaction

3. SECTOR ROTATION ANALYSIS
   - Which sectors benefit from the current macro driver?
   - Which sectors are being destroyed?
   - Where is money flowing TO and FROM?

4. TRADE IDENTIFICATION
   - Find the highest risk/reward setup aligned with the macro driver
   - Entry, target, stop loss with specific price levels
   - Confidence level (HIGH/MODERATE/LOW) with reasoning

5. SCENARIO ANALYSIS
   - Bull case: what reverses the current trend?
   - Bear case: what accelerates it?
   - Key levels: specific prices that trigger regime change
```

### Risk/Reward Requirements
- Minimum 2:1 risk/reward ratio for Trade of the Day
- Always specify entry range, target, and stop loss
- Confidence must be justified with 3+ supporting data points
- Timeframe always stated (1-5 days for swing trades)

---

## ARCHITECTURE

### File Structure

```
/home/user/workspace/
  forecast-dashboard/          # Main dashboard project
    index.html                 # 833 lines -- 12 views, sidebar nav, responsive
    app.js                     # ~5600+ lines -- DATA object + all render functions
    style.css                  # 3736 lines -- military/terminal aesthetic
    cielo-logo.svg             # Brand logo (Cielo Capital, white, clean sans-serif)
    earth-hero.jpg             # Background image
    cf-deploy.sh               # Cloudflare deploy helper script
  cron_tracking/
    1f4d4b31/
      last_run.json            # State persistence between cron runs
  update_data_r{N}.py          # Python script for each run (generates DATA JSON)
  new_data_r{N}.json           # Output JSON from each run
  surgical_replace_r{N}.py     # Script that replaces DATA in app.js
```

### app.js Architecture

```
Lines 1-7:       File header, IIFE wrapper, "use strict"
Lines 8-XXXX:    const DATA = { ... };   <-- REPLACED EACH RUN
Lines XXXX+:     All render functions, event listeners, init()
                 - safeRender() wrapper for error handling
                 - 40+ render functions
                 - Hash-based routing
                 - Chart.js / Leaflet integrations
```

**CRITICAL RULE:** Never rewrite the entire app.js file. Only surgically replace the DATA object between `const DATA = {` and the closing `};`. All render functions must remain intact.

### Surgical Replacement Process

```python
# 1. Find DATA boundaries
start_line = None  # Line with "const DATA = {"
end_line = None    # Line with matching "};"

# 2. Split file
before = lines[:start_line]     # Header (7 lines)
after = lines[end_line+1:]      # All render functions (3000+ lines)

# 3. Generate new DATA
new_data = "const DATA = " + json.dumps(data, indent=2) + ";\n"

# 4. Reassemble
new_content = before + new_data_lines + after

# 5. Verify
- node -c app.js  (syntax check)
- Check render functions exist: safeRender, renderDirectionCards, etc.
```

---

## DATA SCHEMA (DATA Object)

The DATA object is the single source of truth for the entire dashboard. Every view reads from it.

```javascript
const DATA = {
  // === HEADER ===
  timestamp: "2026-03-13T06:00:00+04:00",    // ISO 8601 with timezone
  market_status: "PRE-MARKET",                 // PRE-MARKET | OPEN | CLOSED
  overall_sentiment: "BEARISH",                // BULLISH | CAUTIOUS BULLISH | NEUTRAL | BEARISH | EXTREME FEAR
  prediction_summary: "...",                   // 2-3 sentence headline summary with // separators

  // === TRADE OF THE DAY ===
  trade_of_day: {
    ticker: "XLE",
    name: "Energy Select Sector SPDR",
    action: "LONG",                            // LONG | SHORT | HEDGE
    entry: "$101-$103",                        // Price range
    target: "$112",                            // Take profit level
    stop: "$97",                               // Stop loss level
    confidence: "HIGH",                        // HIGH | MODERATE | LOW
    rationale: "...",                           // 2-3 sentences of reasoning
    timeframe: "1-5 DAYS",                     // Holding period
    risk_level: "MODERATE"                     // LOW | MODERATE | HIGH | EXTREME
  },

  // === WEEKLY PREDICTION ===
  weekly_prediction: "...",                    // Multi-paragraph analysis for prediction summary box

  // === INDICES ===
  indices: {
    sp500: { value: 6672.62, change: -1.52, level: "NOV 2025 LOW" },
    dow:   { value: 46677.85, change: -1.56, level: "BELOW 47000" },
    nasdaq:{ value: 22311.98, change: -1.73, level: "BREAKING DOWN" },
    russell:{ value: 2050, change: -2.1, level: "WEAK" }
  },

  // === ETF TRACKING ===
  spy: { price: 667.27, change: -1.52, volume: "HIGH" },
  qqq: { price: 597.26, change: -1.72, volume: "HIGH" },
  dia: { price: 466.78, change: -1.56, volume: "HIGH" },

  // === SENTIMENT INDICATORS ===
  fear_greed: {
    value: 21,                                 // 0-100 scale
    label: "EXTREME FEAR",                     // EXTREME FEAR | FEAR | NEUTRAL | GREED | EXTREME GREED
    previous: 27                               // Yesterday's value for delta
  },

  vix: {
    value: 30.19,
    change: 12.6,                              // Percent change
    signal: "FEAR SPIKE -- VIX above 30 is crisis territory"
  },

  // === FIXED INCOME ===
  treasuries: {
    us10y: { yield: 4.26, change: 0.05, signal: "..." },
    us2y:  { yield: 3.92, change: -0.02, signal: "..." },
    us30y: { yield: 4.58, change: 0.04, signal: "..." }
  },

  // === COMMODITIES ===
  commodities: {
    wti_crude:  { price: 95.73, change: 9.70, signal: "..." },
    brent_crude:{ price: 100.46, change: 9.20, signal: "..." },
    gold:       { price: 5070.10, change: -1.24, signal: "..." },
    silver:     { price: 86.00, change: -1.50, signal: "..." },
    nat_gas:    { price: 4.85, change: 3.20, signal: "..." }
  },

  // === CRYPTO ===
  crypto: {
    bitcoin:  { price: 70124.45, change: -0.04, signal: "..." },
    ethereum: { price: 2053.17, change: 1.05, signal: "..." }
  },

  // === SECTOR ANALYSIS ===
  sectors: {
    energy:    { change: 5.09, signal: "...", top_movers: ["OXY +5.09%", ...] },
    defense:   { change: -0.50, signal: "...", top_movers: [...] },
    technology:{ change: -1.73, signal: "...", top_movers: [...] },
    financials:{ change: -3.38, signal: "...", top_movers: [...] },
    airlines:  { change: -6.46, signal: "...", top_movers: [...] },
    consumer:  { change: -6.14, signal: "...", top_movers: [...] },
    software:  { change: -6.15, signal: "...", top_movers: [...] }
  },

  // === GEOPOLITICAL EVENTS ===
  geopolitical: {
    status: "IRAN WAR DAY 14 (Mar 13)",
    threat_level: "CRITICAL",                  // LOW | MODERATE | HIGH | CRITICAL
    events: [
      {
        date: "2026-03-12",
        event: "New Ayatollah vows to keep Strait of Hormuz closed",
        impact: "CRITICAL",                    // CRITICAL | HIGH | MODERATE | LOW
        detail: "First public statement from new Supreme Leader..."
      }
      // ... 10-15 events per day
    ]
  },

  // === EARNINGS ===
  earnings_results: [
    {
      ticker: "ADBE",
      name: "Adobe",
      date: "2026-03-12",
      result: "BEAT but CEO RESIGNED",
      eps: "$6.06 vs $5.86 est",
      revenue: "$6.40B vs $6.28B est",
      guidance: "Q2 EPS $5.80-$5.85 vs $5.70 est...",
      reaction: "-6.4% after hours to ~$252",
      detail: "CEO Shantanu Narayen stepping down..."
    }
  ],

  earnings_upcoming: [
    {
      ticker: "UMich",
      name: "Michigan Consumer Sentiment Prelim March",
      date: "2026-03-13",
      time: "10:00 AM ET",
      detail: "KEY DATA: Previous 57.3..."
    }
  ],

  // === WSB TRENDING ===
  wsb_trending: [
    {
      ticker: "SPY",
      mentions: 417,
      sentiment: "BEARISH",                    // BULLISH | BEARISH | MIXED
      detail: "Put buying intensifying..."
    }
    // Top 10 by mention count
  ],

  // === GOVERNMENT ACTIVITY ===
  government_activity: {
    contracts: [
      {
        date: "2026-03-09",
        agency: "ARMY",
        contractor: "M.A. Mortenson Co.",
        value: "$610M",
        description: "...",
        location: "Minneapolis, MN"
      }
    ],
    legislative: [
      {
        bill: "Congressional Stock Trading Ban",
        status: "INTRODUCED",
        detail: "...",
        impact: "Watch PLTR, LMT..."
      }
    ],
    fed_watch: [
      {
        event: "Fed Rate Decision",
        date: "2026-03-19",
        detail: "...",
        probability: "HOLD at 99.5%"
      }
    ]
  },

  // === INSIDER ACTIVITY ===
  insider_activity: [
    { date: "2026-03-11", detail: "262 open market insider transactions..." }
  ],

  // === TECHNICAL LEVELS ===
  key_levels: {
    spy: { support: [660, 650, 640], resistance: [670, 680, 690], pivot: 667 },
    qqq: { support: [590, 580, 570], resistance: [600, 610, 620], pivot: 597 },
    wti: { support: [90, 85, 80], resistance: [100, 110, 120], pivot: 96 },
    vix: { support: [27, 25, 22], resistance: [32, 35, 40], pivot: 30 }
  },

  // === SIGNAL FEED ===
  signals: [
    {
      type: "CRITICAL",                        // CRITICAL | HIGH | MODERATE | LOW
      signal: "BRENT $100 BREACHED...",
      source: "Bloomberg/Goldman Sachs"
    }
    // 12-16 signals, sorted by severity
  ],

  // === X (TWITTER) SIGNALS ===
  x_signals: [
    {
      handle: "@GoldmanSachs",
      content: "Oil could exceed 2008 and 2022 peaks...",
      time: "2026-03-12",
      sentiment: "BEARISH"
    }
    // 5-8 signals from key analysts/institutions
  ],

  // === MARKET MOVERS ===
  market_movers: [
    {
      ticker: "IPI",
      name: "Intrepid Potash",
      change: 10.62,                           // Percent
      detail: "Fertilizer/mining -- commodity play..."
    }
    // Top 10-12 movers (both up and down)
  ],

  // === STOCKS TO WATCH ===
  stocks_to_watch: [
    {
      ticker: "XLE",
      name: "Energy Select SPDR",
      price: 103.00,
      signal: "TRADE OF DAY -- Energy only sector working...",
      action: "LONG"                           // LONG | SHORT | WATCH | HOLD | AVOID | HEDGE
    }
    // 6-8 stocks with actionable signals
  ],

  // === 1-3 DAY PREDICTION ===
  prediction_1_3_day: {
    direction: "BEARISH",                      // BULLISH | BEARISH | NEUTRAL
    confidence: "HIGH",
    summary: "...",
    bull_case: "...",
    bear_case: "...",
    key_levels: "SPY: $660 support / $670 resistance..."
  },

  // === LONG-TERM PREDICTIONS (1-3 MONTH) ===
  long_term_predictions: [
    {
      ticker: "XLE",
      name: "Energy Select Sector SPDR",
      current_price: 103.00,
      prediction_1m: {
        price: 118,
        confidence: "HIGH",
        rationale: "Oil supply crisis has no quick fix..."
      },
      prediction_3m: {
        price: 125,
        confidence: "MODERATE",
        rationale: "If conflict persists, energy stays elevated..."
      },
      catalysts: [
        { date: "2026-03", event: "Hormuz resolution timeline" },
        { date: "2026-04", event: "Q1 earnings + oil price impact" }
      ],
      weekly_prices: [[88,90,87], [90,92,89], ...]  // 25 weeks: [close, high, low]
    }
    // 8-10 tickers with full prediction data + chart data
  ],

  // === SHIPPING CHOKEPOINTS ===
  shipping_chokepoints: {
    hormuz:      { status: "EFFECTIVELY CLOSED", risk: "CRITICAL", detail: "..." },
    suez:        { status: "ELEVATED RISK", risk: "HIGH", detail: "..." },
    bab_el_mandeb:{ status: "DISRUPTED", risk: "HIGH", detail: "..." },
    malacca:     { status: "NORMAL", risk: "LOW", detail: "..." }
  },

  // === WORLD MAP DATA ===
  map_data: {
    conflict_zones: [
      {
        lat: 26.5,
        lng: 56.2,
        label: "STRAIT OF HORMUZ",
        status: "EFFECTIVELY CLOSED",
        detail: "19+ ships damaged..."
      }
      // 8-12 zones with lat/lng for Leaflet markers
    ],
    oil_flow: [
      {
        route: "Hormuz",
        normal_flow: "20M bbl/day",
        current_flow: "~2M bbl/day",
        disruption: "90%"
      }
    ]
  },

  // === TICKER TAPE ===
  ticker_tape: [
    "BRENT $100.46 (+9.2%)",
    "WTI $95.73 (+9.7%)",
    "S&P 500 6,672 (-1.52%)",
    // ... 15-20 scrolling items
  ]
};
```

---

## DASHBOARD VIEWS & RENDER FUNCTIONS

### 12 Navigation Views

| # | View ID | Title | Key Render Functions | Description |
|---|---------|-------|---------------------|-------------|
| 1 | `overview` | Overview | renderDirectionCards, renderYieldCurveChart, renderKeyLevelChart, renderStockPicks, renderKPIs, renderMarketMovers, renderSignalFeed, renderOverviewTrades, renderTickerTape, renderTradeOfDay, renderPredictionSummary, renderStocksToWatch | Main dashboard: trade of day, prediction summary, KPIs, signals, direction cards |
| 2 | `markets` | Markets | renderSPYChart, renderSectorChart, renderFullTickerTable | SPY price chart (30-day), sector performance radar, full ticker table |
| 3 | `geopolitics` | Geopolitics | renderEventTimeline | Timeline of geopolitical events with impact severity colors |
| 4 | `contracts` | Contracts | renderContractsSummary, renderContractsTable, renderContractorsBarChart, renderAgencyDoughnutChart | Government contracts: summary stats, table, bar chart by contractor, agency doughnut |
| 5 | `legislation` | Legislation | renderBillsTable, renderFedRegTable | Legislative tracker: bills, federal regulations, impact analysis |
| 6 | `worldmap` | World Map | renderWorldMap, renderThreatList, renderShippingStats, renderChokepointGrid | Interactive Leaflet map with conflict zones, shipping chokepoints, oil flow data |
| 7 | `xsignals` | X Signals | renderXSignals | Social media intelligence from X/Twitter analysts with sentiment filter chips |
| 8 | `trades` | Trades | renderFullTrades, renderLiveTicker | Full trade recommendations table, live ticker scroll |
| 9 | `intel` | Intel | renderSectorRadar, renderInsiderTrades, renderMacroIndicators, renderWSBSentiment, renderWeatherAlerts, renderEarningsCalendar | Intelligence hub: insider trades, WSB sentiment, macro indicators, earnings calendar |
| 10 | `macrointel` | Macro Intel | renderNationalDebt, renderDeficitChart, renderDefenseSpending, renderInterestRates, renderGDPForecasts, renderCPITracker | Macro-economic dashboard: debt, deficit, defense spending, rates, GDP, CPI |
| 11 | `charts` | Charts (10) | renderPredictionCharts | 10 detailed stock charts with prediction overlay (candlestick-style weekly data with predicted future prices) |
| 12 | `longterm` | Long Term | renderLongTermCharts | Long-term 1-3 month prediction charts for 8-10 tickers |

### Shared Components
- **Ticker Tape** -- Scrolling horizontal tape at top of overview
- **Sidebar Navigation** -- Fixed left sidebar with view links, hamburger menu on mobile
- **safeRender()** -- Error-handling wrapper for all render functions. Catches errors and logs them without crashing the dashboard.

### Chart Libraries Used
- **Chart.js** (CDN) -- Bar charts, doughnut charts, radar charts, line charts
- **Leaflet.js** (CDN) -- Interactive world map with OpenStreetMap tiles
- Native Canvas API for custom candlestick/prediction overlays

---

## DAILY CRON OPERATION

### Cron Schedule
```
ID: 1f4d4b31
Schedule: 0 2 * * * (UTC) = 6:00 AM GST (Dubai)
Task: Daily CIELO Forecast
```

### Step-by-Step Execution Flow

```
STEP 1: READ STATE
  - Read /home/user/workspace/cron_tracking/1f4d4b31/last_run.json
  - Get previous run number, date, key events, prices for comparison

STEP 2: COLLECT MARKET DATA (8-12 search_web calls)
  - Call 1: SPY, QQQ, S&P 500, Nasdaq close prices
  - Call 2: VIX, Fear & Greed Index
  - Call 3: WTI crude, Brent crude, oil prices
  - Call 4: Gold, silver, commodity prices
  - Call 5: 10Y Treasury yield, Bitcoin, Ethereum
  - Call 6: Specific stock closes (ORCL, TSLA, ADBE, LMT, HIMS, etc.)
  - Call 7: Geopolitical events (Iran war, conflicts)
  - Call 8: Earnings results and upcoming releases
  - Call 9: Government contracts, defense spending
  - Call 10: WSB trending tickers (QuiverQuant)
  - Call 11: Unusual options activity, insider trades
  - Call 12: Unique intelligence (private credit, cyber, analyst notes)

STEP 3: GENERATE DATA OBJECT
  - Write Python script: update_data_r{N}.py
  - Script builds complete DATA JSON with all collected intelligence
  - Execute script, capture JSON output to new_data_r{N}.json
  - ~50-90KB of structured data

STEP 4: SURGICAL REPLACEMENT
  - Write surgical_replace_r{N}.py
  - Find DATA boundaries in app.js (const DATA = { ... };)
  - Replace ONLY the DATA section, preserve all render functions
  - Run node -c app.js to verify syntax
  - Verify key render functions still exist

STEP 5: DEPLOY TO PERPLEXITY
  - deploy_website(project_path="/home/user/workspace/forecast-dashboard",
                   site_name="CIELO Capital Forecast",
                   entry_point="index.html")
  - Returns public URL

STEP 6: DEPLOY TO CLOUDFLARE
  - cd /home/user/workspace/forecast-dashboard
  - CLOUDFLARE_API_TOKEN="..." CLOUDFLARE_ACCOUNT_ID="..."
    npx wrangler pages deploy . --project-name cielo-forecast --branch production
  - Updates cielo-forecast.pages.dev (mapped to cielo.capital)

STEP 7: SEND EMAIL DIGEST
  - call_external_tool(tool_name="send_email", source_id="gcal")
  - Plain text only (no HTML, no Markdown)
  - To: info@cielo.agency
  - Subject format: CIELO FORECAST // MMM DD YYYY // TOP 3 HEADLINES
  - Body: Full intelligence brief with sections

STEP 8: SEND NOTIFICATION
  - send_notification() for high-priority alerts
  - Title: short alert headline
  - Body: key alerts summary with dashboard link

STEP 9: UPDATE CRON TRACKING
  - Write updated last_run.json with:
    run_number, timestamp, date, status, trade_of_day,
    market_sentiment, key_events[], prices, deployment status
```

---

## DATA COLLECTION: API CALLS & SOURCES

### Primary Data Sources (via search_web)

| Source | URL Pattern | Data Collected | Frequency |
|--------|-------------|----------------|-----------|
| **Investing.com** | investing.com/indices/...historical-data | SPY, QQQ, S&P 500 OHLC, ADBE, ORCL, LMT, HIMS historical prices | Daily |
| **Yahoo Finance** | finance.yahoo.com/quote/.../history | Stock close prices, after-hours data, BTC-USD, ETH-BTC | Daily |
| **MarketWatch** | marketwatch.com/livecoverage/... | Market summaries, breaking news, VIX data | Daily |
| **CNBC** | cnbc.com/2026/... | Breaking market news, Fed official quotes, oil analysis | Daily |
| **Trading Economics** | tradingeconomics.com/commodity/crude-oil | WTI/Brent crude prices, macro indicators | Daily |
| **CNN Fear & Greed** | cnn.com/markets/fear-and-greed | Fear & Greed Index (0-100) | Daily |
| **Fear & Greed Meter** | feargreedmeter.com | Backup Fear & Greed data | Daily |
| **CBOE** | cboe.com/tradable_products/vix | VIX historical data, futures | Daily |
| **Barchart** | barchart.com/options/unusual-activity | Unusual options activity, VIX futures, market news | Daily |
| **QuiverQuant** | quiverquant.com/wallstreetbets | WSB trending tickers (mentions, sentiment) | Daily |
| **QuiverQuant (Insider)** | quiverquant.com/news/Insider+Stock+Purchases | Insider buying/selling transactions | Daily |
| **QuiverQuant (Congress)** | quiverquant.com/... | Congressional stock trades | As available |
| **Unusual Whales** | unusualwhales.com/politics | Congressional & Senate stock trades | As available |
| **BLS** | bls.gov/news.release/... | CPI, PPI, employment data | On release days |
| **U of Michigan** | sca.isr.umich.edu | Consumer Sentiment Index | Monthly (prelim + final) |
| **USAGOLD** | usagold.com/daily-gold-price-history | Gold spot price | Daily |
| **CoinMarketCap** | coinmarketcap.com/currencies/bitcoin/historical-data | Bitcoin/crypto historical prices | Daily |
| **150Currency** | 150currency.com | Gold price per ounce/gram | Daily |
| **Al Jazeera** | aljazeera.com/news/... | Geopolitical intelligence (conflicts, war updates) | Daily |
| **Reuters** | reuters.com/... | Earnings, corporate news, oil analysis | Daily |
| **Bloomberg** (via search) | bloomberg.com/... | Energy markets, credit analysis, analyst notes | Daily |
| **Goldman Sachs** (via search) | Search for analyst notes | Oil forecasts, market outlook | As available |
| **Department of War** | war.gov/News/Contracts | Government defense contracts ($7.5M+) | Daily |
| **HSToday** | hstoday.us/... | Department of War contract summaries | Daily |
| **Investopedia** | investopedia.com/... | Market summaries, earnings analysis | Daily |
| **TheStreet** | thestreet.com/investing/... | Market news, sector analysis | Daily |
| **Zacks** | zacks.com/stock/news/... | Earnings surprises, estimates | On earnings days |
| **TipRanks** | tipranks.com/news/... | Earnings calendar, analyst ratings | Weekly |

### Perplexity Finance API (source_id: "finance")

When connected, provides structured financial data:

```python
# Tool discovery
list_external_tools(queries=["finance_"])

# Available tools (all via call_external_tool with source_id="finance"):
finance_quotes              # Real-time quotes: price, change, P/E, market cap
finance_ohlcv_histories     # Historical OHLC price data (CSV)
finance_financials          # Income statement, balance sheet, cash flow
finance_earnings            # Earnings transcripts, EPS history, beat/miss
finance_earnings_schedule   # When companies report next
finance_company_profile     # CEO, industry, employees, description
finance_company_peers       # Comparable companies
finance_market_gainers      # Top gaining stocks today
finance_market_losers       # Top losing stocks today
finance_market_most_active  # Highest volume today
finance_market_sentiment    # Overall market sentiment
finance_ticker_sentiment    # Bull/bear analysis per ticker
finance_politician_trades   # Congressional stock transactions
finance_politician_holdings # Politician portfolios
finance_holdings            # Institutional holders, insider transactions
finance_etf_holdings        # ETF constituent breakdown
finance_segments            # Revenue segment breakdowns, KPIs
finance_estimates           # Consensus analyst estimates
finance_analyst_research    # Price targets, upgrades/downgrades
finance_fundamentals        # Valuation multiples time-series
finance_massive             # Raw API pass-through (options, macro, tick data)
```

**Example finance API calls:**

```python
# Get real-time quotes
call_external_tool(
    tool_name="finance_quotes",
    source_id="finance",
    arguments={
        "ticker_symbols": ["SPY", "QQQ", "AAPL", "TSLA"],
        "fields": ["price", "change", "changesPercentage", "pe", "marketCap"]
    }
)

# Get historical prices for chart data
call_external_tool(
    tool_name="finance_ohlcv_histories",
    source_id="finance",
    arguments={
        "ticker_symbols": ["SPY"],
        "start_date_yyyy_mm_dd": "2026-01-01",
        "end_date_yyyy_mm_dd": "2026-03-12"
    }
)

# Get earnings results
call_external_tool(
    tool_name="finance_earnings",
    source_id="finance",
    arguments={
        "ticker_symbol": "ADBE",
        "as_of_fiscal_year": 2026,
        "as_of_fiscal_quarter": 1,
        "data_types": ["earnings_history"]
    }
)

# Get market sentiment
call_external_tool(
    tool_name="finance_market_sentiment",
    source_id="finance",
    arguments={}
)

# Get congressional trades
call_external_tool(
    tool_name="finance_politician_trades",
    source_id="finance",
    arguments={}
)

# Get RSI via Massive API
call_external_tool(
    tool_name="finance_massive",
    source_id="finance",
    arguments={
        "pathname": "/v1/indicators/rsi/SPY",
        "params": {"timespan": 14, "limit": 50}
    }
)

# Get treasury yields via Massive API
call_external_tool(
    tool_name="finance_massive",
    source_id="finance",
    arguments={
        "pathname": "/fed/v1/treasury-yields",
        "params": {"date.gte": "2026-03-01", "limit": 20}
    }
)
```

### Search Query Patterns

Each `search_web` call uses 3 parallel queries. Here are the typical patterns:

```python
# Market close data
search_web(queries=[
    "SPY QQQ market close March 12 2026",
    "S&P 500 Nasdaq March 12 2026 close prices",
    "VIX fear greed index March 12 2026"
])

# Oil and commodities
search_web(queries=[
    "WTI crude oil price March 12 2026 close",
    "gold price March 12 2026 ounce",
    "10 year treasury yield March 12 2026"
])

# Geopolitical intelligence
search_web(queries=[
    "Iran war day 13 March 12 2026 latest",
    "Strait Hormuz oil tanker attack March 2026",
    "Goldman Sachs oil forecast March 2026"
])

# Earnings and unique signals
search_web(queries=[
    "ADBE Adobe earnings after hours March 12 2026",
    "Dollar General DG earnings results March 12",
    "unusual options activity March 12 2026"
])

# WSB and insider data
search_web(queries=[
    "quiverquant wallstreetbets trending tickers March 2026",
    "congressional stock trading March 2026",
    "insider stock purchases March 2026"
])

# Government contracts
search_web(queries=[
    "US government contracts awarded March 2026 defense",
    "Department of War contracts March 2026",
    "defense spending appropriations 2026"
])

# Crypto
search_web(queries=[
    "bitcoin BTC-USD close price March 12 2026",
    "ethereum price March 12 2026",
    "crypto market March 2026"
])

# Sector winners/losers
search_web(queries=[
    "energy stocks OXY MPC winners March 12 2026",
    "airline stocks losers oil price March 12 2026",
    "bank stocks financial sector March 12 2026"
])
```

### Email System (via Gmail/gcal connector)

```python
# Send email digest
call_external_tool(
    tool_name="send_email",
    source_id="gcal",
    arguments={
        "action": {
            "action": "send",
            "to": ["info@cielo.agency"],
            "subject": "CIELO FORECAST // MAR 13 2026 // TOP HEADLINES",
            "body": "PLAIN TEXT ONLY -- no HTML, no Markdown",
            "in_reply_to": null
        },
        "user_prompt": null
    }
)
```

---

## PREDICTION ENGINE & TRADE LOGIC

### Trade of the Day Selection Process

```
1. IDENTIFY THE DOMINANT MACRO THEME
   - What single factor is driving 80%+ of price action?
   - Examples: Oil crisis, CPI surprise, Fed pivot, earnings season

2. FIND THE SECTOR WITH HIGHEST CONVICTION
   - If oil is rising: LONG energy (XLE, OXY, MPC, VLO)
   - If oil is crashing airlines: SHORT airlines or LONG inverse
   - If VIX is spiking: LONG VIX products or inverse ETFs
   - If earnings are the catalyst: Play the specific stock

3. DETERMINE ENTRY/TARGET/STOP
   - Entry: Recent support/consolidation zone (not chasing)
   - Target: Next resistance level or measured move
   - Stop: Below key support (never more than 50% of target distance)
   - Risk/Reward: Minimum 2:1, prefer 2.5:1 or better

4. ASSIGN CONFIDENCE
   - HIGH: 3+ confirming signals, clear trend, institutional backing
   - MODERATE: 2 confirming signals, some headwinds
   - LOW: Speculative, one strong signal but high uncertainty
```

### Weekly Price Array Format (for Charts)

The `weekly_prices` array in `long_term_predictions` provides data for the prediction charts:

```javascript
weekly_prices: [
    [close, high, low],  // Week 1 (oldest historical)
    [close, high, low],  // Week 2
    // ... 12-13 historical weeks
    [current_price, high, low],  // Current week (index ~11-12)
    // ... 12-13 predicted weeks
    [predicted_close, predicted_high, predicted_low]  // Final week
]
// Total: 25 data points (approximately 6 months: 3 months history + 3 months forward)
```

### Scenario Analysis Framework

Every prediction includes three scenarios:

```
BULL CASE: "What reverses the bearish trend?"
- Identify specific catalysts (ceasefire, earnings beat, Fed pivot)
- Quantify upside: "SPY bounces 3-5% to $690"
- Assign probability implicitly through language

BEAR CASE: "What accelerates the current trend?"
- Identify escalation triggers (more attacks, credit contagion, VIX spike)
- Quantify downside: "SPY breaks $660, targets $640"
- Flag systemic risks

KEY LEVELS: "What price triggers change?"
- Support levels (3 tiers: immediate, secondary, panic)
- Resistance levels (3 tiers)
- Pivot price where bias shifts
```

---

## DEPLOYMENT PIPELINE

### Dual Deployment

```bash
# 1. Perplexity Hosting
deploy_website(
    project_path="/home/user/workspace/forecast-dashboard",
    site_name="CIELO Capital Forecast",
    entry_point="index.html",
    should_validate=false  # Skip validation for speed during cron
)

# 2. Cloudflare Pages (for cielo.capital domain)
cd /home/user/workspace/forecast-dashboard
CLOUDFLARE_API_TOKEN="uRUVjg3eCZ86aYyY-l-UFpHw3P0OzyjBDiYo7P3e" \
CLOUDFLARE_ACCOUNT_ID="2430eb30601913a01a903944b8ce3f57" \
npx wrangler pages deploy . \
  --project-name cielo-forecast \
  --branch production
```

### Cloudflare Configuration
- **Account ID:** 2430eb30601913a01a903944b8ce3f57
- **Pages Project:** cielo-forecast
- **Production URL:** cielo-forecast.pages.dev
- **Custom Domain:** cielo.capital (if configured)
- **API Token:** uRUVjg3eCZ86aYyY-l-UFpHw3P0OzyjBDiYo7P3e

---

## EMAIL DIGEST SYSTEM

### Format Requirements
- **Plain text ONLY** -- no HTML, no Markdown (Gmail connector requirement)
- **Subject format:** `CIELO FORECAST // MMM DD YYYY // TOP 3 HEADLINES`
- **Sections separated by** `========================================`

### Standard Email Template Structure

```
CIELO CAPITAL DAILY INTELLIGENCE BRIEF
March 13, 2026 | 06:00 GST | Pre-Market

========================================
MARKET PULSE
========================================
Sentiment: [OVERALL]
Fear & Greed Index: [VALUE] ([LABEL])
VIX: [VALUE] ([CHANGE])

[INDICES WITH PRICES AND CHANGES]
[COMMODITIES: OIL, GOLD]
[CRYPTO: BTC]

========================================
TRADE OF THE DAY: [TICKER] ([NAME]) [ACTION]
========================================
Entry: [RANGE] | Target: [PRICE] | Stop: [PRICE]
Confidence: [LEVEL]
Rationale: [2-3 sentences]

========================================
CRITICAL INTELLIGENCE
========================================
[TAGGED EVENTS: [CRITICAL], [HIGH], [MODERATE]]
[Each event gets 2-3 sentences of detail]

========================================
STOCKS TO WATCH
========================================
[Numbered list with ticker, signal, action]

========================================
1-3 DAY PREDICTION: [DIRECTION]
========================================
[Summary paragraph]
[Bull case]
[Bear case]
[Key levels]

========================================
DASHBOARD: https://cielo-forecast.pages.dev
========================================

-- CIELO CAPITAL INTELLIGENCE --
This is an automated forecast. Not financial advice.
```

---

## NOTIFICATION SYSTEM

### In-App Notification

```python
send_notification(
    title="CIELO ALERT // [SHORT HEADLINE]",
    body="[Key alerts with data]\n\nTRADE OF DAY: [TICKER] [ACTION]\n\nDashboard: https://cielo-forecast.pages.dev",
    schedule_description="Daily -- 6:00AM GST",
    url="https://cielo-forecast.pages.dev"
)
```

### Notification Triggers
- VIX above 30 (crisis)
- Fear & Greed below 25 (extreme fear) or above 75 (extreme greed)
- Oil price moves >5% in a day
- Major geopolitical escalation
- Earnings surprises >10% on major tickers
- Flash crashes or circuit breakers

---

## CRON TRACKING & STATE MANAGEMENT

### State File: `/home/user/workspace/cron_tracking/1f4d4b31/last_run.json`

```json
{
  "run_number": 5,
  "timestamp": "2026-03-13T06:10:00+04:00",
  "date": "2026-03-13",
  "status": "SUCCESS",
  "trade_of_day": "XLE LONG (Entry $101-103, Target $112, Stop $97)",
  "market_sentiment": "BEARISH",
  "key_events": [
    "New Ayatollah Mojtaba Khamenei vows to keep Hormuz closed",
    "Iraq shuts ALL oil terminal operations after tanker attacks",
    "Brent crude breaches $100 -- first since Aug 2022"
  ],
  "data_refreshed": true,
  "dashboard_deployed": true,
  "cloudflare_deployed": true,
  "email_sent": true,
  "stocks_watched": ["XLE", "OXY", "MPC", "ADBE", "LMT", "SPY"],
  "spy_close": 667.27,
  "qqq_close": 597.26,
  "vix": 30.19,
  "wti": 95.73,
  "brent": 100.46,
  "fear_greed": 21,
  "previous_trade": "ADBE LONG -- FAILED (CEO exit caused -6.4% AH drop)"
}
```

### State Usage
- Previous prices used to calculate deltas ("was X yesterday, now Y")
- Previous trade evaluated for accountability
- Run number incremented each execution
- Key events provide context continuity

---

## DESIGN SYSTEM & STYLING

### Terminal/Intelligence Aesthetic

```css
/* Core Design Tokens */
--font-mono: 'JetBrains Mono', monospace;     /* Primary font */
--border-radius: 2px;                          /* Sharp corners (max 2px) */
--border: 1px solid rgba(255,255,255,0.1);     /* 1px border outlines */
--bg-primary: #0a0a0f;                         /* Dark background */
--bg-card: #111118;                            /* Card background */
--text-primary: #e0e0e0;                       /* Light text */
--accent-green: #00ff88;                       /* Bullish / positive */
--accent-red: #ff4444;                         /* Bearish / negative */
--accent-amber: #ffaa00;                       /* Warning / moderate */
--accent-blue: #4488ff;                        /* Info / neutral */
```

### Style Rules
- **Sharp corners only** -- 2px max border-radius everywhere
- **Monospace UPPERCASE labels** -- All section headers, labels, tags
- **1px border outlines** -- Every card, container, input has subtle borders
- **JetBrains Mono** -- Primary font for everything
- **Military/intelligence terminal aesthetic** -- Dark backgrounds, grid layouts, data-dense
- **Color coding:** Green = bullish/positive, Red = bearish/negative, Amber = warning, Blue = info

### Brand
- **Name:** Cielo Capital (NOT "CLO CAPITAL")
- **Logo:** Clean sans-serif white SVG (`cielo-logo.svg`)
- **Logo placement:** Top of sidebar, 110x46px

---

## SUBSCRIBER SYSTEM

A signup form is integrated on the dashboard allowing users to subscribe for daily email digests.

### Implementation
- HTML form in the dashboard footer or dedicated section
- Submissions stored via Google Sheets connector (`google_sheets__pipedream`)
- Daily email sent to all subscribers on the list

### Connected Service
```python
# Google Sheets (subscriber storage)
source_id: "google_sheets__pipedream"
status: CONNECTED
```

---

## CONNECTED SERVICES & CREDENTIALS

| Service | Source ID | Status | Usage |
|---------|-----------|--------|-------|
| Gmail | `gcal` | CONNECTED | Send daily email digest (plain text only) |
| Google Sheets | `google_sheets__pipedream` | CONNECTED | Subscriber list storage |
| Perplexity Finance | `finance` | DISCONNECTED | Structured market data (use search_web as fallback) |
| Cloudflare Pages | N/A (CLI) | CONNECTED | Deploy via wrangler CLI with API token |

### Credential Locations
- Cloudflare API Token: In cron task description (env var injection)
- Gmail: OAuth via gcal connector
- Google Sheets: OAuth via google_sheets__pipedream connector
- Perplexity Finance: OAuth (needs reconnection)

---

## TROUBLESHOOTING & MAINTENANCE

### Common Issues

**Dashboard not loading:**
1. Check `node -c app.js` for syntax errors
2. Verify DATA object boundaries weren't corrupted
3. Check if render functions were accidentally overwritten
4. Re-deploy to both platforms

**DATA replacement fails:**
1. Verify line boundaries: `grep -n "^const DATA = " app.js`
2. Check for `};` on its own line as DATA end marker
3. Ensure Python JSON output is valid: `python -m json.tool new_data.json`

**Email not sending:**
1. Verify gcal connector is CONNECTED
2. Body must be plain text (no HTML/Markdown)
3. Check `in_reply_to` is set to `null` for new emails

**Cloudflare deploy fails:**
1. Verify API token hasn't expired
2. Check account ID is correct
3. Ensure `npx wrangler` is available (npm global)

### Maintenance Tasks
- Monitor cron tracking for consecutive failures
- Reconnect Perplexity Finance API when available
- Review and update stock watchlist based on market conditions
- Clean up old `update_data_r{N}.py` and `new_data_r{N}.json` files periodically
- Review CSS for any new view additions

---

## CHANGE LOG

| Run | Date | Key Changes |
|-----|------|-------------|
| 1 | 2026-03-09 | Initial dashboard build, 8 views |
| 2 | 2026-03-10 | Added charts page (10 prediction charts), long-term page, interactive world map |
| 3 | 2026-03-11 | Added subscriber signup form, fixed logo (Cielo Capital), Cloudflare Pages setup |
| 4 | 2026-03-12 | Daily cron run: CPI data, ORCL gap, Iran War Day 12, ADBE trade of day |
| 5 | 2026-03-13 | Daily cron run: Oil $100, market crash, ADBE CEO exit, XLE trade of day, Iraq port shutdown |

---

## APPENDIX: SAMPLE SEARCH QUERY MATRIX

Each daily run uses approximately 8-12 `search_web` calls with 3 queries each (24-36 total queries). Here is the full query matrix template:

```
BATCH 1: Index/ETF Closes
  "SPY QQQ market close [DATE]"
  "S&P 500 Nasdaq [DATE] close prices"
  "VIX fear greed index [DATE]"

BATCH 2: Oil & Commodities
  "WTI crude oil price [DATE] close"
  "Brent crude [DATE] price"
  "gold price [DATE] ounce"

BATCH 3: Rates & Crypto
  "10 year treasury yield [DATE]"
  "bitcoin BTC-USD close [DATE]"
  "ethereum price [DATE]"

BATCH 4: Geopolitical
  "[CURRENT CONFLICT] latest [DATE]"
  "[SPECIFIC EVENT] [DATE]"
  "[REGION] [IMPACT TOPIC] [DATE]"

BATCH 5: Earnings
  "[TICKER] earnings results [DATE]"
  "[TICKER] after hours stock price [DATE]"
  "upcoming earnings [DATE RANGE]"

BATCH 6: Specific Stocks
  "[TICKER1] stock price close [DATE]"
  "[TICKER2] [TICKER3] stock price [DATE]"
  "[SECTOR] stocks [DATE]"

BATCH 7: Unique Intelligence
  "unusual options activity [DATE]"
  "congressional stock trading [MONTH YEAR]"
  "private credit exposure banks [MONTH YEAR]"

BATCH 8: WSB & Social
  "quiverquant wallstreetbets trending [MONTH YEAR]"
  "insider stock purchases [DATE]"
  "[SECTOR] analyst upgrade downgrade [DATE]"

BATCH 9: Government
  "US government contracts defense [MONTH YEAR]"
  "Department of War contracts [DATE]"
  "[SPECIFIC POLICY] [DATE]"

BATCH 10: Macro Data (on release days)
  "CPI [MONTH YEAR] result"
  "PPI [MONTH YEAR] result"
  "Michigan consumer sentiment [MONTH YEAR]"
```

---

*This document is the complete operational manual for the CIELO Capital Forecast system. It contains all knowledge, reasoning frameworks, API calls, data schemas, and procedures needed to operate, maintain, or rebuild the system from scratch.*

*Generated by Cielo Capital Intelligence System -- March 13, 2026*
