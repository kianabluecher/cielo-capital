/* CIELO CAPITAL FORECAST v2.0 — Dashboard Application Logic */
(function () {
  "use strict";

  // ============================================================
  // DATA
  // ============================================================
const DATA = {
  "timestamp": "2026-04-12T06:00:00+04:00",
  "market_status": "WEEKEND",
  "run_number": 11,
  "last_updated": "April 12, 2026 06:00 Dubai",
  "next_update": "April 13, 2026 06:00 Dubai",
  "alert_level": "ELEVATED",
  "alert_message": "ISLAMABAD TALKS 15HR SESSION -- FACE-TO-FACE HISTORIC -- DAY 2 TODAY | US NAVY MINE CLEARING IN HORMUZ -- IRGC THREATENS RETALIATION | BANK EARNINGS WEEK BEGINS MONDAY",
  "market_summary": "Markets closed for weekend. Islamabad talks ran 15 HOURS across 3 sessions Saturday. HISTORIC: highest-level US-Iran face-to-face since 1979 Revolution. Vance/Witkoff/Kushner met Ghalibaf/Araghchi directly. Talks resume Sunday. Meanwhile, US Navy destroyers transited Strait of Hormuz for mine-clearing -- IRGC issued 30-minute countdown warning and threatened 'severe consequences'. Iran calls US demands 'excessive' on Hormuz control. Separate battlefield: Israel struck 200+ Hezbollah targets in 24 hours. Lebanon death toll past 2,000. Crypto sliding -- BTC -1.97% to $71,644 as weekend risk-off sets in. Oil futures $96.57 (Fri close) but physical dated Brent hit $131.97 Thursday before easing. Goldman warns Brent averages $100+ if Hormuz stays shut another month. Bank mega-earnings begin Monday: GS, then JPM/C/WFC Tuesday, then MS/BAC Wednesday.",
  "top_prediction": "TALKS EXTENDED = CEASEFIRE HOLDS. The 15-hour marathon and agreement to reconvene Sunday signals BOTH sides want a deal. Expect ceasefire to survive the weekend. However, Hormuz mine-clearing showdown is a SEPARATE track -- IRGC brinkmanship could trigger a localized incident. Monday gap: if Sunday talks produce a framework, expect oil futures -5-8% and equities +1-2%. If talks collapse, oil +$10 and VIX spikes above 25.",
  "indices": {
    "sp500": {
      "value": "6,816.89",
      "change": "-0.11%",
      "signal": "NEUTRAL",
      "note": "Best week since Nov (+3.5%). Closed flat Fri. Monday gap depends entirely on Islamabad outcome."
    },
    "nasdaq": {
      "value": "22,903",
      "change": "+0.35%",
      "signal": "BULLISH",
      "note": "8-day win streak. Exited correction territory. Tech momentum intact but vulnerable to weekend headline risk."
    },
    "dow": {
      "value": "47,917",
      "change": "-0.56%",
      "signal": "NEUTRAL",
      "note": "Underperforming tech. JPM/GS earnings Monday-Tuesday = catalyst."
    },
    "russell": {
      "value": "2,630",
      "change": "-0.20%",
      "signal": "BEARISH",
      "note": "Small caps lagging. CPI shock + sentiment crash = recession signal for domestics."
    },
    "vix": {
      "value": "19.23",
      "change": "-1.33%",
      "signal": "CAUTIOUS",
      "note": "Below 20 = market complacent. Weekend headline risk not priced in. Watch for spike Monday AM."
    }
  },
  "commodities": {
    "oil_wti": {
      "value": "$96.57",
      "change": "-1.33%",
      "signal": "VOLATILE",
      "note": "Futures vs physical divergence WIDENING. Dated Brent $131.97 vs futures $96.57. Goldman: $100+ Brent avg if Hormuz shut another month. US mine clearing = bullish for reopening but IRGC threat complicates."
    },
    "gold": {
      "value": "$4,787",
      "change": "-0.64%",
      "signal": "BULLISH",
      "note": "Profit-taking after record run. CPI shock + stagflation fears = structural bid. Buy dips to $4,700."
    },
    "natgas": {
      "value": "N/A",
      "change": "N/A",
      "signal": "ELEVATED",
      "note": "LNG rerouting around Hormuz continues. European gas prices elevated."
    }
  },
  "crypto": {
    "btc": {
      "value": "$71,644",
      "change": "-1.97%",
      "signal": "CAUTIOUS",
      "note": "Weekend selloff. Down from $73,086. Risk-off ahead of Islamabad Day 2. Key support $70,000. If talks produce deal, bounce to $75K+."
    },
    "eth": {
      "value": "$2,218",
      "change": "-2.98%",
      "signal": "BEARISH",
      "note": "Underperforming BTC. Ratio deteriorating. $2,100 support critical."
    }
  },
  "yields": {
    "us10y": {
      "value": "4.15%",
      "change": "+2bps",
      "signal": "HAWKISH",
      "note": "CPI +0.9% MoM = Fed cannot cut in 2026. Rate HIKE back on table if May/June CPI stays elevated. 4.30% upside risk."
    },
    "us2y": {
      "value": "3.95%",
      "change": "+3bps",
      "signal": "HAWKISH",
      "note": "2s10s curve steepening = market pricing higher-for-longer + potential recession. No rate relief coming."
    }
  },
  "trade_of_day": {
    "ticker": "UAL",
    "name": "United Airlines Holdings",
    "action": "LONG / HOLD",
    "entry": "$96.30",
    "current": "$96.40",
    "pnl": "+$0.10 (+0.10%)",
    "target": "$115",
    "stop": "$83",
    "thesis": "Islamabad talks EXTENDED 15 hours = ceasefire likely holds = oil stays range-bound or declines = airline fuel costs improve. Friday pullback to $96.40 (-1.30%) = noise. CPI +0.9% does NOT change fuel thesis -- airlines benefit from FALLING oil, not from consumer prices. Macro risk: sentiment 47.6 all-time low could reduce discretionary travel. But UAL is 60% business/international -- less exposed to consumer sentiment. CATALYST: if Sunday talks produce framework on Hormuz, Monday gap up $3-5. If talks fail, hold through volatility -- $83 stop provides 14% downside cushion.",
    "risk_factors": "Islamabad talks collapse (unlikely given extension), oil spike above $110 (would need Hormuz escalation), consumer recession (sentiment signals possible but not imminent)"
  },
  "weekly_prediction": "CRITICAL WEEK: Islamabad Day 2 (Sunday) defines everything. The 15-hour Saturday session signals serious engagement. Expect ceasefire extension announcement by Sunday evening. If framework emerges: oil futures drop to $88-92, equities gap up 1-2%, gold dips $50-80, VIX sub-18. If talks stall without collapse: status quo continues, ceasefire likely extended anyway. WORST CASE: IRGC mine-clearing confrontation escalates -- this is the underpriced tail risk. Oil $110+, VIX 28+, BTC $65K. Bank earnings (GS Mon, JPM/C/WFC Tue, MS/BAC Wed) will set financial sector tone. JPM consensus $5.49 EPS on $48.9B revenue -- expect beat given trading revenue from oil volatility. Retail Sales Tuesday will confirm/deny consumer slowdown from 47.6 sentiment read.",
  "geopolitical": {
    "islamabad_talks": {
      "status": "ACTIVE -- DAY 2 TODAY",
      "signal": "HIGH IMPACT",
      "detail": "15 HOURS across 3 sessions Saturday. HISTORIC: highest-level US-Iran face-to-face since 1979 Islamic Revolution. Trilateral format (US-Iran-Pakistan). Vance/Witkoff/Kushner met Ghalibaf/Araghchi DIRECTLY -- not proximity format. Talks went past midnight. Iran says 'differences remain' but agreed to reconvene Sunday. Pakistan official says 'progressing in right direction'. Key sticking points: Hormuz control, nuclear enrichment, Lebanon, frozen assets ($6B). Iran has 10-point plan. US has 15-point counter. Agreement to extend = BOTH sides want deal. Next: Sunday session critical -- expect late-night readout.",
      "key_players": "US: Vance, Witkoff, Kushner, Andrew Baker (Deputy NSA). Iran: Ghalibaf (Parliament Speaker), Araghchi (FM). Pakistan: PM Sharif, FM Dar, Army Chief Munir."
    },
    "hormuz": {
      "status": "CONTESTED -- US MINE CLEARING BEGUN",
      "signal": "CRITICAL",
      "detail": "USS Frank E. Peterson (DDG-121) and USS Michael Murphy (DDG-112) transited Strait and began mine-clearing ops. CENTCOM Adm. Brad Cooper: 'establishing a new passage' for commercial shipping. IRGC response: 30-minute countdown warning to US warships. Iran denies US ships transited. IRGC says 'severe consequences' for military vessels. Iran claims US retreated after warning. Reports of IRGC drone launched toward destroyers. This is the MOST DANGEROUS track -- separate from diplomatic talks. Only 2 ships crossed Strait on Saturday (lowest since ceasefire). Iran wants to charge tolls in crypto/yuan. Trump: 'all 28 of their mine-dropper boats lying at bottom of the sea'. Underwater drones joining clearance effort in coming days.",
      "shipping_status": "Only ~12 vessels have transited since ceasefire Tuesday. Pre-war: ~50-60/day. Shipping companies waiting for security guarantees."
    },
    "lebanon": {
      "status": "ESCALATING",
      "signal": "DESTABILIZING",
      "detail": "Israel struck 200+ Hezbollah targets in 24 hours. Death toll past 2,000 since March 2. IDF says 1,400+ Hezbollah fighters killed. 2 IDF soldiers wounded Saturday. Israel has NOT struck Beirut since Wednesday (US pressure). Iran demands Lebanon ceasefire as precondition for deal. Vance says Lebanon 'not up for discussion' in Islamabad. This disconnect is the #1 spoiler for the talks."
    },
    "iran_leadership": {
      "status": "DEGRADED BUT FUNCTIONAL",
      "detail": "Khamenei reportedly 'disfigured' but 'mentally sharp' per Reuters. Communicating with delegation. Hegseth listed systematic elimination of Iranian leadership. New supreme leader in contact with Islamabad delegation. 70-strong Iranian delegation signals seriousness."
    },
    "ceasefire": {
      "status": "HOLDING -- 6 DAYS REMAINING",
      "expiry": "April 21, 2026",
      "detail": "2-week ceasefire announced April 8. Expires April 21. Both sides honoring it on US-Iran direct conflict. BUT Israel-Lebanon not covered. Key question: will talks produce extension beyond April 21?"
    }
  },
  "sectors": {
    "energy": {
      "signal": "SELL / AVOID",
      "detail": "XLE $56.94 (-0.68%). Caught between two forces: if talks succeed, oil drops further and energy stocks follow. If talks fail, oil spikes but recession risk rises. Lose-lose for energy sector in near term. Physical-futures gap ($131 vs $96) = market expects normalization."
    },
    "airlines": {
      "signal": "BUY",
      "detail": "UAL $96.40, DAL $67.82. Active trade thesis intact. 15-hour talks = ceasefire likely extends = oil stays below $100 = fuel costs improve. Airlines are the DIRECT BENEFICIARY of peace deal. Earnings catalyst: DAL reports April 16. Macro risk: consumer sentiment 47.6 could reduce leisure travel."
    },
    "financials": {
      "signal": "BUY",
      "detail": "GS $907.80 (+0.45%), JPM $309.87 (-0.15%), WFC $85.42, BAC $52.54. MEGA EARNINGS WEEK. GS Monday: est $16.35 EPS, $16.9B rev. JPM Tuesday: est $5.49 EPS, $48.9B rev. Trading desks likely crushed it -- oil volatility = record commodity trading revenue. WFC: est $1.58 EPS, $21.8B rev. Expect beats across the board."
    },
    "tech": {
      "signal": "HOLD / BUY DIPS",
      "detail": "QQQ $611.07 (+0.14%). 8-day streak = stretched but momentum intact. CPI doesn't change tech thesis (pricing power). Risk: VIX spike on Hormuz escalation would hit growth stocks hardest. Watch for rotation into value if bank earnings crush expectations."
    },
    "gold_miners": {
      "signal": "BUY",
      "detail": "GLD $437.13. Gold $4,787 structural bid from: CPI shock, stagflation fears, geopolitical premium, central bank buying. Dip to $4,700 = buy zone. If talks fail, $5,000+ target."
    },
    "defense": {
      "signal": "HOLD",
      "detail": "Benefiting from elevated conflict but Islamabad progress could trigger rotation out. IRGC mine-clearing confrontation keeps floor under defense names."
    },
    "real_estate": {
      "signal": "SELL",
      "detail": "CPI +0.9% MoM kills rate cut hopes entirely. Higher for longer = continued pressure on REITs and homebuilders. Mortgage rates headed to 7%+."
    },
    "life_insurance": {
      "signal": "BUY",
      "detail": "Higher-for-longer rates = wider spreads = higher investment income. MET, PRU benefit from 4.15% 10Y. Often overlooked sector."
    },
    "shipping_tankers": {
      "signal": "SPECULATIVE HOLD",
      "detail": "Binary outcome. If Hormuz reopens fully: tanker rates normalize, FRO/STNG decline. If stays restricted: elevated rates persist. Only 12 ships through since ceasefire vs 50-60/day pre-war."
    },
    "cybersecurity": {
      "signal": "HOLD",
      "detail": "Structural tailwind from state-sponsored cyber threats during conflict. PANW, CRWD elevated."
    }
  },
  "watchlist": [
    {
      "ticker": "UAL",
      "price": "$96.40",
      "signal": "BUY THE DIP",
      "note": "Active trade. -1.30% Fri = entry. Islamabad extension = bullish catalyst."
    },
    {
      "ticker": "GS",
      "price": "$907.80",
      "signal": "BUY BEFORE EARNINGS",
      "note": "Reports Monday. Est $16.35 EPS. Trading rev likely record on oil volatility."
    },
    {
      "ticker": "JPM",
      "price": "$309.87",
      "signal": "BUY BEFORE EARNINGS",
      "note": "Reports Tuesday. Est $5.49 EPS, $48.9B rev. Bellwether for financials."
    },
    {
      "ticker": "GLD",
      "price": "$437.13",
      "signal": "BUY DIPS",
      "note": "CPI shock + stagflation = structural gold bid. $4,700 support."
    },
    {
      "ticker": "QQQ",
      "price": "$611.07",
      "signal": "HOLD / BUY DIPS",
      "note": "8-day streak. Stretched but momentum intact. Tech pricing power insulates from CPI."
    },
    {
      "ticker": "BTC",
      "price": "$71,644",
      "signal": "HOLD / BUY $70K",
      "note": "Weekend risk-off. $70K support. Peace deal = $75K+. Talk failure = $65K."
    },
    {
      "ticker": "WFC",
      "price": "$85.42",
      "signal": "BUY BEFORE EARNINGS",
      "note": "Reports Tue. Est $1.58 EPS. +14% YoY growth expected."
    },
    {
      "ticker": "DAL",
      "price": "$67.82",
      "signal": "HOLD",
      "note": "Reports Apr 16. Fuel thesis same as UAL. Secondary airline play."
    },
    {
      "ticker": "USO",
      "price": "$124.82",
      "signal": "AVOID",
      "note": "Physical-futures divergence distorts ETF. Wait for Hormuz clarity."
    },
    {
      "ticker": "XLE",
      "price": "$56.94",
      "signal": "SELL",
      "note": "Lose-lose setup. Peace = oil drops. War = recession risk. Either way energy sector pressured."
    }
  ],
  "macro_data": {
    "cpi": {
      "headline": "+3.3% YoY",
      "mom": "+0.9% MoM",
      "signal": "STAGFLATION RISK",
      "detail": "Biggest monthly jump since 2022. Transport +5.2%, Housing/Energy +3.9%. War-driven but sticky. Fed rate cut pushed to late 2026 MINIMUM."
    },
    "consumer_sentiment": {
      "value": "47.6",
      "signal": "ALL-TIME LOW",
      "detail": "University of Michigan. Lowest since survey began in 1952 (74-year low). ALL demographics, ages, affiliations declined. 1-year business expectations plunged 20%. 98% surveyed BEFORE ceasefire -- may improve slightly in next read but damage is structural."
    },
    "fed_outlook": {
      "next_meeting": "April 28, 2026",
      "signal": "HOLD CERTAIN",
      "detail": "No rate cut possible after +0.9% CPI. If May/June CPI stays elevated, rate HIKE enters discussion. Powell will be hawkish. Market pricing zero cuts in 2026 now."
    },
    "retail_sales": {
      "release": "April 14 (Tuesday)",
      "signal": "WATCH",
      "detail": "March retail sales. Expect weakness given 47.6 sentiment. Could confirm consumer pullback. Important for recession narrative."
    },
    "earnings_calendar": [
      {
        "date": "Apr 13 (Mon)",
        "companies": "GS",
        "note": "Goldman Q1. Est $16.35 EPS, $16.9B rev."
      },
      {
        "date": "Apr 14 (Tue)",
        "companies": "JPM, C, WFC",
        "note": "Big bank day. JPM est $5.49 EPS. WFC est $1.58 EPS."
      },
      {
        "date": "Apr 15 (Wed)",
        "companies": "MS, BAC",
        "note": "MS + Bank of America. Completes bank earnings."
      },
      {
        "date": "Apr 16 (Thu)",
        "companies": "DAL, UNH",
        "note": "Delta Air Lines + UnitedHealth Group."
      }
    ]
  },
  "key_levels": {
    "sp500_support": "6,700",
    "sp500_resistance": "6,900",
    "nasdaq_support": "22,500",
    "nasdaq_resistance": "23,300",
    "oil_support": "$90",
    "oil_resistance": "$105",
    "gold_support": "$4,700",
    "gold_resistance": "$5,000",
    "btc_support": "$70,000",
    "btc_resistance": "$75,000",
    "vix_floor": "17",
    "vix_ceiling": "25"
  },
  "unique_intelligence": [
    "IRGC issued 30-MINUTE COUNTDOWN to US destroyers in Hormuz -- radio intercept recorded by civilian ship (WSJ). This is the underpriced tail risk. A single mine or missile incident could unravel everything.",
    "Iran demanding TOLLS on Strait of Hormuz in CRYPTOCURRENCY or CHINESE YUAN -- not USD. This signals Iran planning for post-deal leverage regardless of outcome.",
    "Only 12 ships total have transited Hormuz since ceasefire (vs 50-60/day pre-war). Shipping companies refuse to move without security guarantees even WITH ceasefire.",
    "70-PERSON Iranian delegation in Islamabad -- unusually large. Includes 'suite of experts' across nuclear, military, economic tracks. Signals intent for comprehensive deal, not just ceasefire extension.",
    "Goldman Sachs: if Hormuz stays shut 1 more month, Brent averages $100+ for ALL of 2026. If 2+ months, $120 Q3 / $115 Q4.",
    "Trump: 'Whether we make a deal or not makes no difference to me. The reason is because we've won.' This combative posture WHILE talks are underway signals domestic political play, not negotiating strategy.",
    "Dated Brent hit $144.42 TUESDAY (before ceasefire) then dropped to $131.97 Thursday. Still $35+ above futures. Physical market still in crisis mode.",
    "CENTCOM deploying UNDERWATER DRONES for mine clearing in coming days. This is the first autonomous mine-clearing operation in naval history.",
    "Iran's Khamenei reportedly 'disfigured' but 'mentally sharp' -- communicating with Islamabad delegation. New supreme leader dynamics add unpredictability.",
    "GS earnings MONDAY (not Tuesday as widely expected) -- could set tone for entire bank earnings week. Trading desks likely generated record commodity/FX revenue from Hormuz volatility.",
    "Correction to earnings schedule: GS reports Monday April 13, JPM/C/WFC report Tuesday April 14, MS/BAC report Wednesday April 15."
  ],
  "charts_data": {
    "sp500_history": [
      {
        "date": "Apr 1",
        "close": 6550
      },
      {
        "date": "Apr 2",
        "close": 6580
      },
      {
        "date": "Apr 3",
        "close": 6520
      },
      {
        "date": "Apr 4",
        "close": 6610
      },
      {
        "date": "Apr 7",
        "close": 6670
      },
      {
        "date": "Apr 8",
        "close": 6725
      },
      {
        "date": "Apr 9",
        "close": 6825
      },
      {
        "date": "Apr 10",
        "close": 6817
      }
    ],
    "oil_history": [
      {
        "date": "Apr 1",
        "close": 108.5
      },
      {
        "date": "Apr 2",
        "close": 106.2
      },
      {
        "date": "Apr 3",
        "close": 104.8
      },
      {
        "date": "Apr 4",
        "close": 103.1
      },
      {
        "date": "Apr 7",
        "close": 101.2
      },
      {
        "date": "Apr 8",
        "close": 98.5
      },
      {
        "date": "Apr 9",
        "close": 97.9
      },
      {
        "date": "Apr 10",
        "close": 96.6
      }
    ],
    "gold_history": [
      {
        "date": "Apr 1",
        "close": 4620
      },
      {
        "date": "Apr 2",
        "close": 4655
      },
      {
        "date": "Apr 3",
        "close": 4690
      },
      {
        "date": "Apr 4",
        "close": 4720
      },
      {
        "date": "Apr 7",
        "close": 4745
      },
      {
        "date": "Apr 8",
        "close": 4800
      },
      {
        "date": "Apr 9",
        "close": 4818
      },
      {
        "date": "Apr 10",
        "close": 4787
      }
    ],
    "btc_history": [
      {
        "date": "Apr 1",
        "close": 69500
      },
      {
        "date": "Apr 2",
        "close": 70200
      },
      {
        "date": "Apr 3",
        "close": 69800
      },
      {
        "date": "Apr 4",
        "close": 71100
      },
      {
        "date": "Apr 7",
        "close": 71950
      },
      {
        "date": "Apr 8",
        "close": 72500
      },
      {
        "date": "Apr 9",
        "close": 71200
      },
      {
        "date": "Apr 10",
        "close": 73086
      },
      {
        "date": "Apr 12",
        "close": 71644
      }
    ],
    "vix_history": [
      {
        "date": "Apr 1",
        "close": 26.5
      },
      {
        "date": "Apr 2",
        "close": 25.8
      },
      {
        "date": "Apr 3",
        "close": 24.2
      },
      {
        "date": "Apr 4",
        "close": 23.1
      },
      {
        "date": "Apr 7",
        "close": 22.0
      },
      {
        "date": "Apr 8",
        "close": 20.5
      },
      {
        "date": "Apr 9",
        "close": 19.5
      },
      {
        "date": "Apr 10",
        "close": 19.2
      }
    ],
    "ual_history": [
      {
        "date": "Apr 1",
        "close": 88.5
      },
      {
        "date": "Apr 2",
        "close": 89.2
      },
      {
        "date": "Apr 3",
        "close": 90.8
      },
      {
        "date": "Apr 4",
        "close": 92.1
      },
      {
        "date": "Apr 7",
        "close": 94.3
      },
      {
        "date": "Apr 8",
        "close": 96.3
      },
      {
        "date": "Apr 9",
        "close": 97.7
      },
      {
        "date": "Apr 10",
        "close": 96.4
      }
    ],
    "prediction_lines": {
      "sp500_bull": [
        {
          "date": "Apr 10",
          "value": 6817
        },
        {
          "date": "Apr 14",
          "value": 6920
        },
        {
          "date": "Apr 18",
          "value": 6980
        }
      ],
      "sp500_bear": [
        {
          "date": "Apr 10",
          "value": 6817
        },
        {
          "date": "Apr 14",
          "value": 6700
        },
        {
          "date": "Apr 18",
          "value": 6550
        }
      ],
      "oil_bull": [
        {
          "date": "Apr 10",
          "value": 96.6
        },
        {
          "date": "Apr 14",
          "value": 105
        },
        {
          "date": "Apr 18",
          "value": 112
        }
      ],
      "oil_bear": [
        {
          "date": "Apr 10",
          "value": 96.6
        },
        {
          "date": "Apr 14",
          "value": 90
        },
        {
          "date": "Apr 18",
          "value": 85
        }
      ],
      "gold_bull": [
        {
          "date": "Apr 10",
          "value": 4787
        },
        {
          "date": "Apr 14",
          "value": 4850
        },
        {
          "date": "Apr 18",
          "value": 4950
        }
      ],
      "gold_bear": [
        {
          "date": "Apr 10",
          "value": 4787
        },
        {
          "date": "Apr 14",
          "value": 4720
        },
        {
          "date": "Apr 18",
          "value": 4680
        }
      ],
      "btc_bull": [
        {
          "date": "Apr 12",
          "value": 71644
        },
        {
          "date": "Apr 14",
          "value": 74000
        },
        {
          "date": "Apr 18",
          "value": 76500
        }
      ],
      "btc_bear": [
        {
          "date": "Apr 12",
          "value": 71644
        },
        {
          "date": "Apr 14",
          "value": 69000
        },
        {
          "date": "Apr 18",
          "value": 65000
        }
      ],
      "ual_bull": [
        {
          "date": "Apr 10",
          "value": 96.4
        },
        {
          "date": "Apr 14",
          "value": 101
        },
        {
          "date": "Apr 18",
          "value": 107
        }
      ],
      "ual_bear": [
        {
          "date": "Apr 10",
          "value": 96.4
        },
        {
          "date": "Apr 14",
          "value": 93
        },
        {
          "date": "Apr 18",
          "value": 88
        }
      ]
    }
  },
  "long_term_prediction": {
    "timeframe": "1-3 MONTHS (April - June 2026)",
    "scenarios": {
      "bull_case": {
        "probability": "40%",
        "thesis": "Islamabad produces framework deal. Hormuz reopens over 4-6 weeks. Oil drops to $80-85. Fed holds but signals dovish tilt. Earnings season beats. Consumer sentiment recovers from 47.6 to 55+.",
        "targets": {
          "sp500": "7,200-7,400",
          "oil": "$78-85",
          "gold": "$4,500-4,700",
          "btc": "$80,000-90,000",
          "ual": "$115-125"
        }
      },
      "base_case": {
        "probability": "40%",
        "thesis": "Ceasefire extended but no comprehensive deal. Hormuz partially reopens with Iranian toll system. Oil range-bound $90-100. Fed holds hawkish. Mixed earnings. Consumer sentiment stabilizes 48-52.",
        "targets": {
          "sp500": "6,600-6,900",
          "oil": "$88-102",
          "gold": "$4,700-5,000",
          "btc": "$68,000-75,000",
          "ual": "$95-110"
        }
      },
      "bear_case": {
        "probability": "20%",
        "thesis": "Talks collapse. IRGC mine-clearing confrontation escalates. Ceasefire expires April 21 without renewal. Oil spikes $120+. CPI stays above 3%. Fed forced to hike. Consumer recession materializes.",
        "targets": {
          "sp500": "5,800-6,200",
          "oil": "$115-140",
          "gold": "$5,200-5,500",
          "btc": "$50,000-60,000",
          "ual": "$70-83"
        }
      }
    },
    "key_dates": [
      "Apr 12-13: Islamabad talks Day 2-3 (deal framework?)",
      "Apr 13-15: Bank mega-earnings (GS, JPM, C, WFC, MS, BAC)",
      "Apr 14: March Retail Sales (consumer health check)",
      "Apr 21: Ceasefire expiry (HARD DEADLINE)",
      "Apr 28: FOMC meeting (hold + hawkish guidance)",
      "May 2: April jobs report",
      "May 13: April CPI (confirms/denies stagflation)",
      "Jun 10-11: FOMC (first real rate decision point)",
      "Jun 15: Estimated Hormuz full reopening (bull case)"
    ]
  },
  "heatmap_data": [
    {
      "sector": "Airlines",
      "d1": 2,
      "d3": 5,
      "w1": 8,
      "signal": "STRONG BUY"
    },
    {
      "sector": "Financials",
      "d1": 1,
      "d3": 3,
      "w1": 5,
      "signal": "BUY"
    },
    {
      "sector": "Tech",
      "d1": 0,
      "d3": 1,
      "w1": 3,
      "signal": "HOLD"
    },
    {
      "sector": "Gold/Miners",
      "d1": -1,
      "d3": 1,
      "w1": 4,
      "signal": "BUY DIPS"
    },
    {
      "sector": "Crypto",
      "d1": -2,
      "d3": 2,
      "w1": 5,
      "signal": "HOLD"
    },
    {
      "sector": "Defense",
      "d1": 0,
      "d3": -1,
      "w1": -2,
      "signal": "HOLD"
    },
    {
      "sector": "Energy",
      "d1": -1,
      "d3": -3,
      "w1": -5,
      "signal": "SELL"
    },
    {
      "sector": "Real Estate",
      "d1": -1,
      "d3": -2,
      "w1": -4,
      "signal": "SELL"
    },
    {
      "sector": "Shipping",
      "d1": -1,
      "d3": 0,
      "w1": -2,
      "signal": "SPECULATIVE"
    },
    {
      "sector": "Life Insurance",
      "d1": 1,
      "d3": 2,
      "w1": 3,
      "signal": "BUY"
    },
    {
      "sector": "Cybersecurity",
      "d1": 0,
      "d3": 1,
      "w1": 2,
      "signal": "HOLD"
    },
    {
      "sector": "Consumer Disc.",
      "d1": -1,
      "d3": -2,
      "w1": -3,
      "signal": "AVOID"
    }
  ],
  "risk_matrix": [
    {
      "risk": "IRGC mine-clearing confrontation",
      "probability": "25%",
      "impact": "EXTREME",
      "detail": "30-min countdown + drone launch = one mistake from escalation. This is the #1 tail risk not priced by markets."
    },
    {
      "risk": "Islamabad talks collapse",
      "probability": "15%",
      "impact": "HIGH",
      "detail": "15-hour session + agreement to reconvene makes collapse unlikely. But 'excessive demands' rhetoric = real friction."
    },
    {
      "risk": "Lebanon escalation spoils talks",
      "probability": "30%",
      "impact": "HIGH",
      "detail": "200+ targets in 24 hours. Iran demands Lebanon ceasefire. Vance says not on table. This disconnect = #1 spoiler."
    },
    {
      "risk": "CPI stays elevated May/June",
      "probability": "45%",
      "impact": "MEDIUM",
      "detail": "If transport/housing inflation persists, Fed rate HIKE enters discussion. Would crush equities and real estate."
    },
    {
      "risk": "Consumer recession Q3",
      "probability": "30%",
      "impact": "HIGH",
      "detail": "47.6 sentiment = historically precedes recessions by 2-4 quarters. Retail sales Tuesday will be first confirmation."
    },
    {
      "risk": "Ceasefire expires April 21",
      "probability": "20%",
      "impact": "EXTREME",
      "detail": "Without extension, full hostilities resume. Oil $130+, equities -10%, gold $5,500. Talks progress makes renewal likely."
    }
  ],
  "sources": [
    {
      "name": "Fox News",
      "url": "https://www.foxnews.com/live-news/trump-iran-war-strait-hormuz-pakistan-talks-israel-04-11-26",
      "topic": "Islamabad talks 15 hours"
    },
    {
      "name": "NPR/WJSU",
      "url": "https://www.wjsu.org/top-stories-from-npr/2026-04-11/u-s-iran-peace-talks-underway-in-islamabad-after-weeks-of-frantic-diplomacy",
      "topic": "US Navy mine clearing + talks"
    },
    {
      "name": "Al Jazeera",
      "url": "https://www.aljazeera.com/news/2026/4/11/us-says-two-naval-ships-transited-strait-of-hormuz-for-mine-clearing",
      "topic": "Hormuz mine clearing CENTCOM"
    },
    {
      "name": "Le Monde",
      "url": "https://www.lemonde.fr/en/international/article/2026/04/12/talks-between-iran-and-the-us-extend-into-second-day-as-strait-of-hormuz-showdown-deepens_6752324_4.html",
      "topic": "Talks Day 2 + IRGC threats"
    },
    {
      "name": "Eurasia Review",
      "url": "https://www.eurasiareview.com/12042026-iran-says-talks-pause-after-15-hours-to-resume-despite-differences-while-us-tight-lipped/",
      "topic": "15 hours confirmed"
    },
    {
      "name": "Fortune",
      "url": "https://fortune.com/2026/04/11/iran-war-us-warships-strait-of-hormuz-transit-irgc-ceasefir-talks/",
      "topic": "IRGC 30-min countdown"
    },
    {
      "name": "Republic World",
      "url": "https://www.republicworld.com/world-news/strait-of-hormuz-crisis-iran-warns-severe-punishment-as-us-navy-warships-begin-mine-clearing-operation-amid-peace-talks",
      "topic": "IRGC threats + crypto tolls"
    },
    {
      "name": "CNBC",
      "url": "https://www.cnbc.com/2026/04/10/oil-prices-dated-brent-energy-iran-war-ceasefire-strait-of-hormuz.html",
      "topic": "Dated Brent $131.97 physical"
    },
    {
      "name": "Goldman/OilPrice",
      "url": "https://oilprice.com/Latest-Energy-News/World-News/Goldman-Another-Month-of-Hormuz-Closure-Means-Over-100-Brent-Throughout-2026.html",
      "topic": "Goldman $100+ Brent forecast"
    },
    {
      "name": "AlphaStreet",
      "url": "https://news.alphastreet.com/bank-earnings-preview-a-look-at-the-top-banks-set-to-report-q1-2026-results-next-week/",
      "topic": "Bank earnings preview"
    },
    {
      "name": "Times of Israel",
      "url": "https://www.timesofisrael.com/idf-and-hezbollah-trade-strikes-rockets-as-israel-and-lebanon-gear-up-for-direct-talks/",
      "topic": "Israel 200+ strikes Lebanon"
    },
    {
      "name": "CENTCOM",
      "url": "https://www.centcom.mil/MEDIA/PRESS-RELEASES/Press-Release-View/Article/4457220/us-forces-start-mine-clearance-mission-in-strait-of-hormuz/",
      "topic": "Official mine clearing announcement"
    },
    {
      "name": "CBS News",
      "url": "https://www.cbsnews.com/news/strait-of-hormuz-naval-destroyers-cross-centcom-iran-mines/",
      "topic": "Mine clearing + autonomous drones"
    },
    {
      "name": "BBC",
      "url": "https://www.bbc.com/news/live/cn4v0xm9y0kt",
      "topic": "Day 2 continuation confirmed"
    },
    {
      "name": "Perplexity Finance",
      "url": "https://perplexity.ai/finance/UAL",
      "topic": "Live quotes"
    }
  ]
};



// DATA COMPATIBILITY SHIM — normalize property names & build missing structures
(function shimData() {
  // === 1. Build DATA.tickers from indices/gainers/losers/most_active ===
  if (!DATA.tickers) {
    DATA.tickers = {};
    if (DATA.indices) {
      // Daily runs have emitted indices as both an array and a {key: {...}} map.
      var indexList = Array.isArray(DATA.indices) ? DATA.indices : Object.keys(DATA.indices).map(function(k) {
        return Object.assign({ name: k }, DATA.indices[k]);
      });
      indexList.forEach(function(idx) {
        var sym = (idx.symbol || idx.name || '').replace(/[^A-Z0-9]/g, '');
        var nameMap = {
          'S&P 500':'SPY','SP500':'SPY','SPX':'SPY',
          'NASDAQ':'QQQ','NASDAQ-100':'QQQ','NDX':'QQQ',
          'DOW':'DIA','DJIA':'DIA','DOW JONES':'DIA',
          'RUSSELL':'IWM','RUSSELL 2000':'IWM','RUT':'IWM',
          'VIX':'VIX','CBOE VIX':'VIX',
          'US DOLLAR':'DXY','DXY':'DXY','DOLLAR INDEX':'DXY',
          'GOLD':'GLD','GLD':'GLD','XAUUSD':'GLD',
          'OIL':'USO','CRUDE':'USO','WTI':'USO','USO':'USO','CRUDE OIL':'USO',
          'BITCOIN':'BTCUSD','BTC':'BTCUSD','BTCUSD':'BTCUSD','BTC-USD':'BTCUSD'
        };
        var key = sym;
        var upperName = ((idx.name || '') + '').toUpperCase();
        Object.keys(nameMap).forEach(function(n) {
          if (upperName.indexOf(n) !== -1 || sym === n) key = nameMap[n];
        });
        if (idx.symbol) key = idx.symbol.replace(/[^A-Z0-9]/g, '');
        DATA.tickers[key] = {
          price: parseFloat(idx.value) || parseFloat(idx.price) || 0,
          pct: parseFloat(idx.change) || parseFloat(idx.pct) || parseFloat(idx.change_pct) || 0,
          name: idx.name || key
        };
      });
    }
    ['gainers','losers','most_active'].forEach(function(list) {
      if (DATA[list]) {
        DATA[list].forEach(function(item) {
          var sym = (item.ticker || item.symbol || '').replace(/[^A-Z0-9]/g, '');
          if (sym && !DATA.tickers[sym]) {
            DATA.tickers[sym] = {
              price: parseFloat(item.price) || 0,
              pct: parseFloat(item.change_pct) || parseFloat(item.pct) || parseFloat(item.change) || 0,
              name: item.name || item.company || sym
            };
          }
        });
      }
    });
    ['USO','LMT','NVDA','SPY','GLD','BTCUSD','DXY','RTX','PLTR','MSFT','GOOG','QQQ','VIX','AAPL','TSLA','AMD','META'].forEach(function(sym) {
      if (!DATA.tickers[sym]) DATA.tickers[sym] = { price: 0, pct: 0, change: 0, name: sym };
    });
    // Ensure every ticker has a 'change' field
    Object.keys(DATA.tickers).forEach(function(sym) {
      var t = DATA.tickers[sym];
      if (t.change === undefined) t.change = t.price ? +(t.price * t.pct / 100).toFixed(2) : 0;
    });
  }

  // === 2. fear_greed_index ===
  if (DATA.fear_greed_index === undefined) {
    var vix = DATA.tickers.VIX;
    DATA.fear_greed_index = (vix && vix.price > 0) ? Math.max(0, Math.min(100, Math.round(100 - (vix.price * 2.5)))) : 50;
  }

  // === 3. Alias mismatched property names ===
  // geopolitical_events / geopolitical_signals <- geopolitical
  if (!DATA.geopolitical_events && DATA.geopolitical) DATA.geopolitical_events = DATA.geopolitical;
  if (!DATA.geopolitical_signals && DATA.geopolitical) DATA.geopolitical_signals = DATA.geopolitical;
  // government_contracts <- contracts (normalize field names)
  if (!DATA.government_contracts && DATA.contracts) {
    DATA.government_contracts = DATA.contracts.map(function(c) {
      return {
        recipient: c.recipient || c.contractor || c.company || 'N/A',
        desc: c.desc || c.description || '',
        amount: c.amount || c.value || '$0',
        agency: c.agency || 'N/A',
        date: c.date || '',
        significance: c.significance || ''
      };
    });
  }
  // sector_radar <- sector_watchlist
  if (!DATA.sector_radar && DATA.sector_watchlist) {
    DATA.sector_radar = DATA.sector_watchlist.map(function(s) {
      var sig = (s.signal || '').toUpperCase();
      var isBull = sig.indexOf('LONG') !== -1 || sig.indexOf('BULL') !== -1 || sig.indexOf('BUY') !== -1;
      var isHold = sig.indexOf('HOLD') !== -1 || sig.indexOf('NEUTRAL') !== -1;
      var dir = isBull ? 'bullish' : (isHold ? 'neutral' : 'bearish');
      return {
        sector: s.sector || 'N/A',
        direction: dir,
        arrow: isBull ? '\u25B2' : (isHold ? '\u25B6' : '\u25BC'),
        signal: s.ticker + ' ' + (s.signal || '') + (s.note ? ' — ' + s.note.substring(0, 60) : '')
      };
    });
  }
  // stocks_to_watch <- sector_watchlist
  if (!DATA.stocks_to_watch && DATA.sector_watchlist) {
    DATA.stocks_to_watch = DATA.sector_watchlist.map(function(s) {
      var sig = (s.signal || '').toUpperCase();
      var isBull = sig.indexOf('LONG') !== -1 || sig.indexOf('BULL') !== -1 || sig.indexOf('BUY') !== -1;
      return {
        ticker: s.ticker || '???',
        name: s.sector || s.ticker || '',
        sector: s.sector || 'N/A',
        direction: isBull ? 'bullish' : 'bearish',
        price: s.entry ? parseFloat(String(s.entry).replace(/[^\d.]/g, '')) || 0 : 0,
        target: s.target ? parseFloat(String(s.target).replace(/[^\d.]/g, '')) || 0 : 0,
        catalyst: s.note || s.signal || '',
        confidence: (s.signal || 'medium').toLowerCase().indexOf('hold') !== -1 ? 'medium' : 'high',
        timeframe: '1-3 DAYS',
        sectorColor: null,
        entry: s.entry,
        stop: s.stop,
        signal: s.signal,
        note: s.note
      };
    });
  }
  // wsb_sentiment <- wsb_trending
  if (!DATA.wsb_sentiment && DATA.wsb_trending) DATA.wsb_sentiment = DATA.wsb_trending;
  // macro_indicators <- macro
  if (!DATA.macro_indicators && DATA.macro) DATA.macro_indicators = DATA.macro;
  // global_macro <- macro
  if (!DATA.global_macro && DATA.macro) DATA.global_macro = DATA.macro;
  // federal_register <- legislation
  if (!DATA.federal_register && DATA.legislation) DATA.federal_register = DATA.legislation;
  // shipping_intel fallback
  if (!DATA.shipping_intel) DATA.shipping_intel = { chokepoints: [], routes: [], stats: {} };
  if (!DATA.shipping_intel.chokepoints) DATA.shipping_intel.chokepoints = [];
  // weather_alerts fallback
  if (!DATA.weather_alerts) DATA.weather_alerts = [];
  // crypto_sentiment fallback
  if (!DATA.crypto_sentiment) DATA.crypto_sentiment = [];
  // insider_trades fallback
  if (!DATA.insider_trades) DATA.insider_trades = [];
  // treasury_yields fallback
  if (!DATA.treasury_yields && DATA.macro) {
    DATA.treasury_yields = [
      { maturity: '2Y', yield: DATA.macro.treasury_2y || 0 },
      { maturity: '10Y', yield: DATA.macro.treasury_10y || 0 },
      { maturity: '30Y', yield: DATA.macro.treasury_30y || 0 }
    ];
  }
  if (!DATA.treasury_yields) DATA.treasury_yields = [];
  // treasury_fiscal fallback
  if (!DATA.treasury_fiscal) DATA.treasury_fiscal = {};

  // === 4. forecast object (renderTradeOfDay uses DATA.forecast.daily_picks) ===
  if (!DATA.forecast) {
    DATA.forecast = {
      daily_picks: DATA.trade_of_day ? [DATA.trade_of_day] : [],
      summary: DATA.prediction_summary || '',
      sectors: []
    };
  }
  if (!DATA.forecast.sectors) {
    // Build sectors from sector_watchlist
    if (DATA.sector_watchlist) {
      DATA.forecast.sectors = DATA.sector_watchlist.map(function(s) {
        var sig = (s.signal || '').toUpperCase();
        var isBull = sig.indexOf('LONG') !== -1 || sig.indexOf('BULL') !== -1 || sig.indexOf('BUY') !== -1;
        var isHold = sig.indexOf('HOLD') !== -1 || sig.indexOf('NEUTRAL') !== -1;
        return {
          name: s.sector || 'N/A',
          direction: isBull ? 'bullish' : (isHold ? 'neutral' : 'bearish'),
          arrow: isBull ? '\u25B2' : (isHold ? '\u25B6' : '\u25BC'),
          confidence: 'medium',
          detail: s.ticker + ' ' + (s.signal || '') + (s.note ? ' \u2014 ' + s.note.substring(0, 80) : '')
        };
      });
    } else {
      DATA.forecast.sectors = [];
    }
  }
})();

// HELPERS
  // ============================================================
  function formatNum(n) {
    if (n === null || n === undefined) return "\u2014";
    n = typeof n === 'number' ? n : parseFloat(n);
    if (isNaN(n)) return "\u2014";
    if (Math.abs(n) >= 1000) return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return n.toFixed(2);
  }

  function formatPrice(n) {
    if (n === null || n === undefined) return "$\u2014";
    n = typeof n === 'number' ? n : parseFloat(n);
    if (isNaN(n)) return "$\u2014";
    if (n >= 10000) return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return "$" + formatNum(n);
  }

  function formatBigMoney(n) {
    if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B";
    if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
    return "$" + n.toLocaleString("en-US");
  }

  function pctClass(pct) {
    return pct >= 0 ? "positive" : "negative";
  }

  function arrow(pct) {
    return pct >= 0 ? "\u25b2" : "\u25bc";
  }

  function timeAgo(isoStr) {
    var now = new Date("2026-03-09T00:57:00+04:00");
    var then = new Date(isoStr);
    var diff = Math.floor((now - then) / 60000);
    if (diff < 60) return diff + "m ago";
    if (diff < 1440) return Math.floor(diff / 60) + "h ago";
    return Math.floor(diff / 1440) + "d ago";
  }

  function formatEngagement(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return String(n);
  }

  function severityClass(sig) {
    if (sig.category === "conflict") return "severity-conflict";
    if (sig.category === "markets") return "severity-market";
    return "severity-intel";
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "className") node.className = attrs[k];
        else if (k === "innerHTML") node.innerHTML = attrs[k];
        else if (k === "textContent") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (children) {
      if (typeof children === "string") node.innerHTML = children;
      else if (Array.isArray(children)) {
        children.forEach(function (c) { if (c) node.appendChild(c); });
      }
    }
    return node;
  }

  // Shared Chart.js tooltip config
  var chartTooltipConfig = {
    backgroundColor: "#18181b",
    borderColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    titleFont: { family: "Inter", size: 12 },
    bodyFont: { family: "JetBrains Mono", size: 12 },
    titleColor: "#fafafa",
    bodyColor: "#a1a1aa",
    padding: 10,
    displayColors: false
  };

  // ============================================================
  // NAVIGATION
  // ============================================================
  var pageTitles = {
    overview: "Overview",
    markets: "Markets",
    geopolitics: "Geopolitical Intelligence",
    contracts: "Government Contracts",
    legislation: "Legislation & Regulation",
    worldmap: "World Map",
    xsignals: "X Signals Intelligence",
    trades: "Congressional Trades"
  };

  function switchView(viewName) {
    document.querySelectorAll(".view").forEach(function (v) { v.classList.remove("active"); });
    document.querySelectorAll(".nav-item").forEach(function (n) { n.classList.remove("active"); });

    var viewEl = document.getElementById("view-" + viewName);
    var navEl = document.querySelector('[data-view="' + viewName + '"]');
    if (viewEl) viewEl.classList.add("active");
    if (navEl) navEl.classList.add("active");

    var titleEl = document.getElementById("pageTitle");
    if (titleEl) titleEl.textContent = pageTitles[viewName] || viewName;

    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("mainContent").scrollTop = 0;

    // Leaflet maps need invalidateSize when container becomes visible
    if (viewName === "geopolitics" && leafletMaps["geoMapSvg"]) {
      setTimeout(function () { leafletMaps["geoMapSvg"].invalidateSize(); }, 150);
    }
    if (viewName === "worldmap" && leafletMaps["worldMapSvg"]) {
      setTimeout(function () { leafletMaps["worldMapSvg"].invalidateSize(); }, 150);
    }
  }

  function handleHash() {
    var hash = window.location.hash.replace("#", "") || "overview";
    switchView(hash);
  }

  window.addEventListener("hashchange", handleHash);

  document.querySelectorAll(".nav-item").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      var view = item.getAttribute("data-view");
      window.location.hash = view;
    });
  });

  var hamburgerBtn = document.getElementById("hamburgerBtn");
  var sidebar = document.getElementById("sidebar");
  var sidebarOverlay = document.getElementById("sidebarOverlay");

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", function () {
      sidebar.classList.remove("open");
    });
  }

  // ============================================================
  // RENDER: FORECAST DIRECTION CARDS
  // ============================================================
  function renderDirectionCards() {
    var container = document.getElementById("directionCards");
    if (!container) return;
    container.innerHTML = "";

    DATA.forecast.sectors.forEach(function (s) {
      var dirClass = s.direction === "bullish" ? "bullish" : s.direction === "bearish" ? "bearish" : s.direction === "neutral" ? "neutral" : "mixed";
      var dirLabel = s.direction === "bullish" ? "BULLISH" : s.direction === "bearish" ? "BEARISH" : s.direction === "neutral" ? "NEUTRAL" : "MIXED";
      var confClass = s.confidence;

      var card = el("div", { className: "direction-card" });
      card.innerHTML =
        '<div class="dc-top">' +
          '<span class="dc-sector">' + s.name + '</span>' +
          '<span class="dc-arrow ' + dirClass + '">' + s.arrow + '</span>' +
        '</div>' +
        '<div class="dc-direction ' + dirClass + '">' + dirLabel + '</div>' +
        '<span class="dc-confidence ' + confClass + '">' + s.confidence.toUpperCase() + '</span>' +
        '<div class="dc-reason">' + s.reasoning + '</div>';
      container.appendChild(card);
    });
  }

  // ============================================================
  // RENDER: TREASURY YIELD CURVE CHART
  // ============================================================
  function renderYieldCurveChart() {
    var ctx = document.getElementById("yieldCurveChart");
    if (!ctx) return;

    var maturities = ["1m", "3m", "1y", "2y", "5y", "10y", "30y"];
    var labels = ["1M", "3M", "1Y", "2Y", "5Y", "10Y", "30Y"];
    var latest = DATA.treasury_yields[DATA.treasury_yields.length - 1];
    var prev = DATA.treasury_yields[0];

    var latestData = maturities.map(function (m) { return latest[m]; });
    var prevData = maturities.map(function (m) { return prev[m]; });

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: latest.date,
            data: latestData,
            borderColor: "#20808D",
            backgroundColor: "rgba(32,128,141,0.08)",
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: "#20808D",
            pointBorderColor: "#09090b",
            pointBorderWidth: 2
          },
          {
            label: prev.date,
            data: prevData,
            borderColor: "rgba(161,161,170,0.4)",
            borderWidth: 1.5,
            borderDash: [6, 4],
            fill: false,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: "rgba(161,161,170,0.4)",
            pointBorderColor: "#09090b",
            pointBorderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            align: "end",
            labels: {
              color: "#a1a1aa",
              font: { family: "Inter", size: 10 },
              boxWidth: 20,
              boxHeight: 2,
              padding: 12
            }
          },
          tooltip: Object.assign({}, chartTooltipConfig, {
            callbacks: {
              label: function (ctx2) {
                return ctx2.dataset.label + ": " + ctx2.parsed.y.toFixed(2) + "%";
              }
            }
          })
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.03)" },
            ticks: { color: "#52525b", font: { family: "JetBrains Mono", size: 10 } }
          },
          y: {
            grid: { color: "rgba(255,255,255,0.03)" },
            ticks: {
              color: "#52525b",
              font: { family: "JetBrains Mono", size: 10 },
              callback: function (v) { return v.toFixed(1) + "%"; }
            }
          }
        }
      }
    });
  }

  // ============================================================
  // RENDER: KEY LEVEL MONITOR CHART
  // ============================================================
  function renderKeyLevelChart() {
    var ctx = document.getElementById("keyLevelChart");
    if (!ctx) return;
    if (!DATA.forecast || !DATA.forecast.key_levels) return;

    var symbols = ["SPY", "GLD", "USO", "DXY"];
    var kl = DATA.forecast.key_levels;

    // Normalize: position within support-resistance range as percentage
    var normalizedCurrent = [];
    var bgColors = [];
    var borderColors = [];
    var labelTexts = [];

    symbols.forEach(function (sym) {
      var s = kl[sym];
      var range = s.resistance - s.support;
      var pct = ((s.current - s.support) / range) * 100;
      normalizedCurrent.push(pct);

      var prefix = sym === "DXY" ? "" : "$";
      labelTexts.push(prefix + s.current.toFixed(sym === "DXY" ? 2 : 0));

      if (pct > 60) {
        bgColors.push("rgba(239,68,68,0.2)");
        borderColors.push("#f87171");
      } else if (pct < 40) {
        bgColors.push("rgba(34,197,94,0.2)");
        borderColors.push("#4ade80");
      } else {
        bgColors.push("rgba(234,179,8,0.2)");
        borderColors.push("#facc15");
      }
    });

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: symbols,
        datasets: [
          {
            label: "Position in range",
            data: normalizedCurrent,
            backgroundColor: bgColors,
            borderColor: borderColors,
            borderWidth: 1.5,
            barPercentage: 0.6
          }
        ]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: Object.assign({}, chartTooltipConfig, {
            callbacks: {
              title: function (items) {
                return symbols[items[0].dataIndex];
              },
              label: function (ctx2) {
                var idx = ctx2.dataIndex;
                var sym = symbols[idx];
                var s = kl[sym];
                var prefix = sym === "DXY" ? "" : "$";
                return "Current: " + prefix + s.current + " | Support: " + prefix + s.support + " | Resistance: " + prefix + s.resistance;
              }
            }
          })
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            grid: { color: "rgba(255,255,255,0.03)" },
            ticks: {
              color: "#52525b",
              font: { family: "Inter", size: 9 },
              maxRotation: 0,
              callback: function (v) {
                if (v === 0) return "Support";
                if (v === 50) return "Mid";
                if (v === 100) return "Resistance";
                return "";
              }
            }
          },
          y: {
            grid: { display: false },
            ticks: { color: "#a1a1aa", font: { family: "Inter", size: 11, weight: "500" } }
          }
        }
      }
    });
  }

  // ============================================================
  // RENDER: STOCK PICKS TABLE
  // ============================================================
  function renderStockPicks() {
    var container = document.getElementById("stockPicksTable");
    if (!container) return;

    var html = '<table class="data-table"><thead><tr><th>Ticker</th><th>Action</th><th>Target</th><th>Rationale</th><th>Risk</th></tr></thead><tbody>';
    DATA.forecast.daily_picks.forEach(function (pick) {
      html += "<tr>" +
        '<td class="num" style="font-weight:600;color:var(--color-text)">' + pick.ticker + "</td>" +
        '<td><span class="action-badge ' + pick.actionClass + '">' + pick.action + "</span></td>" +
        '<td class="num" style="font-weight:500;color:var(--color-text)">' + pick.target + "</td>" +
        '<td style="max-width:300px;color:var(--color-text-muted)">' + pick.rationale + "</td>" +
        '<td style="max-width:200px;font-size:var(--text-xxs);color:var(--color-text-muted)">' + pick.risk + "</td>" +
        "</tr>";
    });
    html += "</tbody></table>";
    container.innerHTML = html;
  }

  // ============================================================
  // RENDER: KPI CARDS
  // ============================================================
  function renderKPIs() {
    var kpis = [
      { key: "SPY", label: "S&P 500" },
      { key: "GLD", label: "Gold" },
      { key: "USO", label: "Oil", alert: true },
      { key: "BTCUSD", label: "Bitcoin" },
      { key: "DXY", label: "DXY" }
    ];

    var container = document.getElementById("kpiRow");
    container.innerHTML = "";

    kpis.forEach(function (kpi) {
      var t = DATA.tickers[kpi.key] || { price: 0, pct: 0, change: 0, name: kpi.key };
      var isUp = t.pct >= 0;
      var card = el("div", { className: "kpi-card" });
      card.innerHTML =
        '<div class="kpi-label">' + kpi.label + "</div>" +
        '<div class="kpi-value">' + formatPrice(t.price) + "</div>" +
        '<div class="kpi-delta ' + (isUp ? "up" : "down") + '">' +
        arrow(t.pct) + " " + (isUp ? "+" : "") + t.pct.toFixed(2) + "% (" + (isUp ? "+" : "") + formatNum(t.change) + ")</div>";

      if (kpi.alert) {
        card.innerHTML += '<span class="kpi-alert-badge">ALERT</span>';
      }
      container.appendChild(card);
    });
  }

  // ============================================================
  // RENDER: MARKET MOVERS TABLE
  // ============================================================
  function renderMarketMovers() {
    var sectors = { "Tech/AI": [], "Defense": [], "Macro": [], "Commodities": [] };
    Object.keys(DATA.tickers).forEach(function (sym) {
      var t = DATA.tickers[sym];
      var s = t.sector || "Macro";
      if (!sectors[s]) sectors[s] = [];
      sectors[s].push({ sym: sym, data: t });
    });

    var html = '<table class="data-table"><thead><tr><th>Ticker</th><th>Name</th><th>Price</th><th>Change</th><th>%</th><th>MCap</th></tr></thead><tbody>';

    ["Tech/AI", "Defense", "Macro", "Commodities"].forEach(function (sector) {
      html += '<tr><td colspan="6" class="sector-label">' + sector + "</td></tr>";
      sectors[sector].forEach(function (item) {
        var t = item.data;
        var cls = pctClass(t.pct);
        html += "<tr>" +
          '<td class="num" style="font-weight:600;color:var(--color-text)">' + item.sym + "</td>" +
          "<td>" + t.name + "</td>" +
          '<td class="num">' + formatPrice(t.price) + "</td>" +
          '<td class="num ' + cls + '">' + (t.change >= 0 ? "+" : "") + formatNum(t.change) + "</td>" +
          '<td class="num ' + cls + '">' + (t.pct >= 0 ? "+" : "") + t.pct.toFixed(2) + "%</td>" +
          '<td class="num" style="color:var(--color-text-muted)">' + (t.mcap || "\u2014") + "</td>" +
          "</tr>";
      });
    });

    html += "</tbody></table>";
    document.getElementById("marketMoversTable").innerHTML = html;
  }

  // ============================================================
  // RENDER: SIGNAL FEED
  // ============================================================
  function renderSignalFeed() {
    var container = document.getElementById("signalFeed");
    container.innerHTML = "";

    DATA.geopolitical_signals.forEach(function (sig) {
      var item = el("div", { className: "signal-item " + severityClass(sig) });
      item.innerHTML =
        '<div class="signal-header">' +
        '<div class="signal-avatar">' + sig.source.charAt(0).toUpperCase() + "</div>" +
        '<span class="signal-source">' + sig.source + "</span>" +
        '<span class="signal-time">' + timeAgo(sig.time) + "</span>" +
        "</div>" +
        '<div class="signal-text">' + sig.text + "</div>" +
        '<div class="signal-engagement">' + formatEngagement(sig.engagement) + " engagements</div>";
      container.appendChild(item);
    });
  }

  // ============================================================
  // RENDER: OVERVIEW TRADES TABLE
  // ============================================================
  function renderOverviewTrades() {
    var html = '<table class="data-table"><thead><tr><th>Date</th><th>Politician</th><th>Ticker</th><th>Type</th><th>Amount</th></tr></thead><tbody>';
    DATA.politician_trades.forEach(function (trade) {
      var typeClass = trade.type === "Buy" ? "positive" : "negative";
      html += "<tr>" +
        '<td class="num">' + trade.date + "</td>" +
        "<td>" + trade.politician + "</td>" +
        '<td class="num" style="font-weight:600">' + trade.ticker + "</td>" +
        '<td class="' + typeClass + '">' + trade.type + "</td>" +
        '<td class="num">' + trade.amount + "</td>" +
        "</tr>";
    });
    html += "</tbody></table>";
    document.getElementById("overviewTradesTable").innerHTML = html;
  }

  // ============================================================
  // RENDER: TICKER TAPE
  // ============================================================
  function renderTickerTape() {
    var container = document.getElementById("tickerTape");
    var items = "";
    var syms = Object.keys(DATA.tickers);

    for (var r = 0; r < 2; r++) {
      syms.forEach(function (sym) {
        var t = DATA.tickers[sym];
        var cls = pctClass(t.pct);
        items += '<div class="ticker-item"><span class="ticker-symbol">' + sym + '</span><span class="ticker-price">' + formatPrice(t.price) + '</span><span class="' + cls + ' num" style="font-size:var(--text-xs)">' + (t.pct >= 0 ? "+" : "") + t.pct.toFixed(2) + "%</span></div>";
      });
    }
    container.innerHTML = items;
  }

  // ============================================================
  // RENDER: SPY CHART
  // ============================================================
  function renderSPYChart() {
    var ctx = document.getElementById("spyChart");
    if (!ctx) return;

    var labels = [];
    var prices = [];
    var basePrice = 695;
    for (var i = 0; i < 30; i++) {
      var d = new Date(2026, 1, 7 + i);
      labels.push((d.getMonth() + 1) + "/" + d.getDate());
      basePrice += (Math.random() - 0.55) * 8;
      if (basePrice < 665) basePrice = 665 + Math.random() * 3;
      if (basePrice > 700) basePrice = 698 - Math.random() * 3;
      prices.push(Math.round(basePrice * 100) / 100);
    }
    prices[29] = 672.38;

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "SPY",
          data: prices,
          borderColor: "#f87171",
          backgroundColor: "rgba(239, 68, 68, 0.05)",
          borderWidth: 1.5,
          fill: true,
          tension: 0.3,
          pointRadius: 0,
          pointHitRadius: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: Object.assign({}, chartTooltipConfig, {
            callbacks: {
              label: function (ctx2) { return "$" + ctx2.parsed.y.toFixed(2); }
            }
          })
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.03)" },
            ticks: { color: "#52525b", font: { family: "JetBrains Mono", size: 10 }, maxRotation: 0, maxTicksLimit: 8 }
          },
          y: {
            grid: { color: "rgba(255,255,255,0.03)" },
            ticks: {
              color: "#52525b",
              font: { family: "JetBrains Mono", size: 10 },
              callback: function (v) { return "$" + v; }
            }
          }
        }
      }
    });
  }

  // ============================================================
  // RENDER: SECTOR CHART
  // ============================================================
  function renderSectorChart() {
    var ctx = document.getElementById("sectorChart");
    if (!ctx) return;

    var sectorPerf = {};
    Object.keys(DATA.tickers).forEach(function (sym) {
      var t = DATA.tickers[sym];
      var s = t.sector;
      if (!sectorPerf[s]) sectorPerf[s] = { total: 0, count: 0 };
      sectorPerf[s].total += t.pct;
      sectorPerf[s].count++;
    });

    var sectorNames = ["Tech/AI", "Defense", "Macro", "Commodities"];
    var sectorColors = ["#60a5fa", "#20808D", "#a1a1aa", "#facc15"];
    var sectorData = sectorNames.map(function (s) {
      return sectorPerf[s] ? Math.round((sectorPerf[s].total / sectorPerf[s].count) * 100) / 100 : 0;
    });

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: sectorNames,
        datasets: [{
          data: sectorData,
          backgroundColor: sectorColors.map(function (c) { return c + "40"; }),
          borderColor: sectorColors,
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: Object.assign({}, chartTooltipConfig, {
            callbacks: {
              label: function (ctx2) { return ctx2.parsed.x.toFixed(2) + "%"; }
            }
          })
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.03)" },
            ticks: {
              color: "#52525b",
              font: { family: "JetBrains Mono", size: 10 },
              callback: function (v) { return v + "%"; }
            }
          },
          y: {
            grid: { display: false },
            ticks: { color: "#a1a1aa", font: { family: "Inter", size: 12 } }
          }
        }
      }
    });
  }

  // ============================================================
  // RENDER: FULL TICKER TABLE
  // ============================================================
  function renderFullTickerTable() {
    var html = '<table class="data-table"><thead><tr><th>Ticker</th><th>Name</th><th>Sector</th><th>Price</th><th>Change</th><th>%</th><th>MCap</th></tr></thead><tbody>';
    Object.keys(DATA.tickers).forEach(function (sym) {
      var t = DATA.tickers[sym];
      var cls = pctClass(t.pct);
      html += "<tr>" +
        '<td class="num" style="font-weight:600;color:var(--color-text)">' + sym + "</td>" +
        "<td>" + t.name + "</td>" +
        '<td><span class="badge badge-blue">' + t.sector + "</span></td>" +
        '<td class="num">' + formatPrice(t.price) + "</td>" +
        '<td class="num ' + cls + '">' + (t.change >= 0 ? "+" : "") + formatNum(t.change) + "</td>" +
        '<td class="num ' + cls + '">' + (t.pct >= 0 ? "+" : "") + t.pct.toFixed(2) + "%</td>" +
        '<td class="num" style="color:var(--color-text-muted)">' + (t.mcap || "\u2014") + "</td>" +
        "</tr>";
    });
    html += "</tbody></table>";
    document.getElementById("fullTickerTable").innerHTML = html;
  }

  // ============================================================
  // RENDER: ENHANCED CONTRACTS
  // ============================================================
  function renderContractsSummary() {
    var container = document.getElementById("contractsSummary");
    if (!container) return;

    var totalAmount = 0;
    DATA.government_contracts.forEach(function (c) { totalAmount += c.amount; });

    container.innerHTML =
      '<div class="summary-card"><div class="summary-label">Total tracked</div><div class="summary-value">' + formatBigMoney(totalAmount) + '</div><div class="summary-detail">Across ' + DATA.government_contracts.length + ' major contracts</div></div>' +
      '<div class="summary-card"><div class="summary-label">Largest award</div><div class="summary-value" style="font-size:var(--text-lg)">Boeing</div><div class="summary-detail">$22.3B \u2014 International Space Station</div></div>' +
      '<div class="summary-card"><div class="summary-label">Top agency</div><div class="summary-value" style="font-size:var(--text-lg)">NASA</div><div class="summary-detail">5 contracts, ~$31.4B total</div></div>';
  }

  function renderContractsTable() {
    var html = '<table class="data-table"><thead><tr><th>Recipient</th><th>Award</th><th>Description</th><th>Agency</th><th>Start</th></tr></thead><tbody>';
    DATA.government_contracts.forEach(function (c) {
      var desc = c.desc.length > 50 ? c.desc.substring(0, 50) + "\u2026" : c.desc;
      html += "<tr>" +
        '<td style="font-weight:500;max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + c.recipient + "</td>" +
        '<td class="num" style="font-weight:600;color:var(--color-green)">' + formatBigMoney(c.amount) + "</td>" +
        '<td style="max-width:260px;color:var(--color-text-muted)">' + desc + "</td>" +
        '<td style="font-weight:500">' + c.agency + "</td>" +
        '<td class="num">' + c.date + "</td>" +
        "</tr>";
    });
    html += "</tbody></table>";
    document.getElementById("contractsTable").innerHTML = html;
  }

  function renderContractorsBarChart() {
    var ctx = document.getElementById("contractorsBarChart");
    if (!ctx) return;

    // Aggregate by recipient
    var byRecipient = {};
    DATA.government_contracts.forEach(function (c) {
      var name = c.recipient.replace(/(THE |, LLC|, INC\.|CORP\.?| INC| - FEDERAL)/g, "").trim();
      if (!byRecipient[name]) byRecipient[name] = 0;
      byRecipient[name] += c.amount;
    });

    var sorted = Object.keys(byRecipient).map(function (k) { return { name: k, amount: byRecipient[k] }; });
    sorted.sort(function (a, b) { return b.amount - a.amount; });
    var top5 = sorted.slice(0, 5);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: top5.map(function (r) { return r.name.length > 18 ? r.name.substring(0, 18) + "\u2026" : r.name; }),
        datasets: [{
          data: top5.map(function (r) { return r.amount / 1e9; }),
          backgroundColor: ["rgba(32,128,141,0.3)", "rgba(32,128,141,0.25)", "rgba(32,128,141,0.2)", "rgba(32,128,141,0.15)", "rgba(32,128,141,0.1)"],
          borderColor: "#20808D",
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: Object.assign({}, chartTooltipConfig, {
            callbacks: {
              label: function (ctx2) { return "$" + ctx2.parsed.x.toFixed(1) + "B"; }
            }
          })
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.03)" },
            ticks: {
              color: "#52525b",
              font: { family: "JetBrains Mono", size: 10 },
              callback: function (v) { return "$" + v + "B"; }
            }
          },
          y: {
            grid: { display: false },
            ticks: { color: "#a1a1aa", font: { family: "Inter", size: 10 } }
          }
        }
      }
    });
  }

  function renderAgencyDoughnutChart() {
    var ctx = document.getElementById("agencyDoughnutChart");
    if (!ctx) return;

    var byAgency = {};
    DATA.government_contracts.forEach(function (c) {
      var agency = c.agency.split("/")[0].trim();
      if (!byAgency[agency]) byAgency[agency] = 0;
      byAgency[agency] += c.amount;
    });

    var sorted = Object.keys(byAgency).map(function (k) { return { name: k, amount: byAgency[k] }; });
    sorted.sort(function (a, b) { return b.amount - a.amount; });

    var colors = ["#20808D", "#3b82f6", "#facc15", "#f97316", "#a78bfa", "#f87171"];

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: sorted.map(function (a) { return a.name; }),
        datasets: [{
          data: sorted.map(function (a) { return a.amount / 1e9; }),
          backgroundColor: colors.slice(0, sorted.length).map(function (c) { return c + "60"; }),
          borderColor: colors.slice(0, sorted.length),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "55%",
        plugins: {
          legend: {
            display: true,
            position: "right",
            labels: {
              color: "#a1a1aa",
              font: { family: "Inter", size: 10 },
              boxWidth: 12,
              boxHeight: 12,
              padding: 8
            }
          },
          tooltip: Object.assign({}, chartTooltipConfig, {
            callbacks: {
              label: function (ctx2) { return ctx2.label + ": $" + ctx2.parsed.toFixed(1) + "B"; }
            }
          })
        }
      }
    });
  }

  // ============================================================
  // RENDER: BILLS TABLE
  // ============================================================
  function renderBillsTable() {
    var bills = [
      { bill: "H.R.4521 CHIPS+ Act Extension", status: "Committee", statusClass: "status-committee", sponsor: "Rep. Smith", topic: "Semiconductors", lastAction: "Referred to subcommittee" },
      { bill: "S.2847 AI Defense Authorization", status: "Floor Vote", statusClass: "status-floor", sponsor: "Sen. Warner", topic: "AI/Defense", lastAction: "Passed Senate 72-28" },
      { bill: "H.R.5102 Iran Sanctions Enhancement", status: "Committee", statusClass: "status-committee", sponsor: "Rep. McCaul", topic: "Sanctions", lastAction: "Markup scheduled" },
      { bill: "S.3001 Critical Minerals Security", status: "Introduced", statusClass: "status-introduced", sponsor: "Sen. Manchin", topic: "Supply Chain", lastAction: "First reading" }
    ];

    var html = '<table class="data-table"><thead><tr><th>Bill</th><th>Status</th><th>Sponsor</th><th>Topic</th><th>Last Action</th></tr></thead><tbody>';
    bills.forEach(function (b) {
      html += "<tr>" +
        '<td style="font-weight:500">' + b.bill + "</td>" +
        '<td><span class="badge ' + (b.status === "Floor Vote" ? "badge-green" : b.status === "Committee" ? "badge-gold" : "badge-blue") + '">' + b.status + "</span></td>" +
        "<td>" + b.sponsor + "</td>" +
        '<td><span class="badge badge-teal">' + b.topic + "</span></td>" +
        '<td style="color:var(--color-text-muted)">' + b.lastAction + "</td>" +
        "</tr>";
    });
    html += "</tbody></table>";
    document.getElementById("billsTable").innerHTML = html;
  }

  // ============================================================
  // RENDER: FEDERAL REGISTER TABLE
  // ============================================================
  function renderFedRegTable() {
    var html = '<table class="data-table"><thead><tr><th>Document</th><th>Agency</th><th>Type</th><th>Published</th></tr></thead><tbody>';
    DATA.federal_register.forEach(function (r) {
      html += "<tr>" +
        '<td style="font-weight:500">' + r.title + "</td>" +
        '<td style="font-weight:600">' + r.agency + "</td>" +
        '<td><span class="badge ' + (r.type === "Final Rule" ? "badge-red" : r.type === "Proposed Rule" ? "badge-gold" : r.type === "Presidential Document" ? "badge-teal" : "badge-blue") + '">' + r.type + "</span></td>" +
        '<td class="num">' + r.date + "</td>" +
        "</tr>";
    });
    html += "</tbody></table>";
    document.getElementById("fedRegTable").innerHTML = html;
  }

  // ============================================================
  // RENDER: EVENT TIMELINE
  // ============================================================
  function renderEventTimeline() {
    var container = document.getElementById("eventTimeline");
    container.innerHTML = "";

    DATA.geopolitical_events.forEach(function (evt) {
      var colorClass = evt.severity === "critical" ? "red" : evt.severity === "high" ? "orange" : "blue";
      var item = el("div", { className: "timeline-item " + colorClass });
      item.innerHTML =
        '<div class="timeline-time">' + evt.date + "</div>" +
        '<div class="timeline-text"><strong>' + evt.title + '</strong><br>' + evt.desc + "</div>" +
        '<div class="timeline-source">' + evt.source + "</div>";
      container.appendChild(item);
    });
  }

  // ============================================================
  // RENDER: INTERACTIVE LEAFLET MAP
  // ============================================================
  var leafletMaps = {};

  function renderWorldMap(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var isFullMap = (containerId === "worldMapSvg");

    // Destroy existing map if re-rendering
    if (leafletMaps[containerId]) {
      leafletMaps[containerId].remove();
      leafletMaps[containerId] = null;
    }

    // Clear container
    container.innerHTML = "";

    // Map center and zoom
    var center = isFullMap ? [25, 35] : [28, 45];
    var zoom = isFullMap ? 2.5 : 3;

    var map = L.map(container, {
      center: center,
      zoom: zoom,
      zoomControl: false,
      attributionControl: false,
      minZoom: 2,
      maxZoom: 14,
      worldCopyJump: true,
      maxBoundsViscosity: 0.8
    });

    // CARTO Dark Matter tiles — free, no API key
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19
    }).addTo(map);

    // Labels layer on top
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
      pane: "overlayPane"
    }).addTo(map);

    // Custom zoom controls top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Attribution bottom-right small
    L.control.attribution({ position: "bottomright", prefix: false })
      .addAttribution('<span style="color:#52525b;font-size:9px">CARTO</span>')
      .addTo(map);

    // ---- CONFLICT ZONE OVERLAYS ----
    // Middle East conflict zone
    var middleEastZone = L.polygon([
      [38, 25], [38, 65], [12, 65], [12, 35], [22, 25]
    ], {
      color: "rgba(239,68,68,0.25)",
      fillColor: "rgba(239,68,68,0.04)",
      fillOpacity: 0.5,
      weight: 1,
      dashArray: "6 4"
    }).addTo(map);

    // ---- SHIPPING ROUTES ----
    var shippingRoutes = {
      hormuz_blocked: {
        coords: [[26.56, 56.25], [26.0, 56.5], [25.3, 57.0], [24.5, 58.0]],
        color: "#ef4444",
        weight: 3,
        dashArray: "4 10",
        label: "STRAIT OF HORMUZ — BLOCKED"
      },
      cape_reroute: {
        coords: [
          [26.0, 56.5], [22, 60], [15, 55], [10, 50], [5, 45],
          [0, 42], [-5, 38], [-10, 35], [-20, 30], [-30, 25],
          [-34.5, 18.5], [-34.5, 15], [-30, 10], [-20, 5],
          [-10, 2], [0, 0], [10, -5], [25, -10], [35, -5],
          [40, 0], [48, 0], [50, 2]
        ],
        color: "#60a5fa",
        weight: 2,
        dashArray: "10 8",
        label: "Cape of Good Hope reroute (+14 days)"
      },
      bab_el_mandeb: {
        coords: [[12.6, 43.3], [13.5, 42.5], [15, 42], [18, 40], [20, 38.5]],
        color: "#fb923c",
        weight: 2,
        dashArray: "8 6",
        label: "Bab el-Mandeb — Elevated risk"
      },
      suez_canal: {
        coords: [[29.95, 32.55], [30.45, 32.35], [31.26, 32.32]],
        color: "#eab308",
        weight: 2,
        dashArray: "6 6",
        label: "Suez Canal — Restricted"
      },
      malacca: {
        coords: [[1.2, 103.8], [2.5, 101.5], [4.0, 100.0], [5.5, 98.0]],
        color: "#20808D",
        weight: 1.5,
        dashArray: "8 6",
        label: "Strait of Malacca — Normal"
      }
    };

    Object.keys(shippingRoutes).forEach(function (key) {
      var route = shippingRoutes[key];
      var polyline = L.polyline(route.coords, {
        color: route.color,
        weight: route.weight,
        dashArray: route.dashArray,
        opacity: 0.7,
        className: "shipping-route-line"
      }).addTo(map);
      polyline.bindPopup(
        '<div style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:#fafafa;background:#18181b;border:1px solid #27272a;padding:8px 12px;border-radius:2px;text-transform:uppercase;letter-spacing:0.05em">' +
        route.label + '</div>',
        { className: "clo-popup", closeButton: false }
      );
    });

    // ---- BLOCKED X marker on Hormuz ----
    var hormuzIcon = L.divIcon({
      className: "hormuz-blocked-icon",
      html: '<div style="color:#ef4444;font-family:\'JetBrains Mono\',monospace;font-weight:700;font-size:11px;text-shadow:0 0 8px rgba(239,68,68,0.8);letter-spacing:0.1em;white-space:nowrap;text-transform:uppercase">✕ BLOCKED</div>',
      iconSize: [80, 20],
      iconAnchor: [40, 10]
    });
    L.marker([26.56, 56.25], { icon: hormuzIcon, interactive: false }).addTo(map);

    // ---- THREAT HOTSPOT MARKERS ----
    var hotspots = [
      { lat: 32.43, lng: 53.69, color: "#ef4444", label: "Iran", detail: "Active conflict — Missile attacks continuing. IDF striking oil infrastructure. Khamenei killed.", severity: "CRITICAL", pulse: true },
      { lat: 31.77, lng: 35.22, color: "#ef4444", label: "Israel", detail: "Active conflict — Multiple impacts in Tel Aviv. 3rd US carrier en route.", severity: "CRITICAL", pulse: true },
      { lat: 33.89, lng: 35.50, color: "#ef4444", label: "Lebanon", detail: "Active conflict — Hezbollah posture elevated, IDF northern front active.", severity: "CRITICAL", pulse: true },
      { lat: 26.56, lng: 56.25, color: "#f97316", label: "Strait of Hormuz", detail: "EFFECTIVELY CLOSED — Day 10. 92% traffic reduction. 200+ vessels stranded. IRGC threats active.", severity: "CRITICAL", pulse: true },
      { lat: 12.6, lng: 43.3, color: "#f97316", label: "Bab el-Mandeb", detail: "Elevated — Houthi resumed attacks on shipping since Feb 28.", severity: "HIGH", pulse: true },
      { lat: 15.55, lng: 48.52, color: "#eab308", label: "Yemen", detail: "Houthi activity ongoing, diverting Hormuz traffic.", severity: "HIGH", pulse: true },
      { lat: 25.29, lng: 51.53, color: "#eab308", label: "Qatar", detail: "US missile-defense radar destroyed. 5-8yr rebuild, $1.1B cost.", severity: "HIGH", pulse: false },
      { lat: 26.07, lng: 50.55, color: "#eab308", label: "Bahrain", detail: "US missile-defense radar destroyed. China's 98% gallium control complicates rebuild.", severity: "HIGH", pulse: false },
      { lat: -34.36, lng: 18.47, color: "#60a5fa", label: "Cape of Good Hope", detail: "Congestion rising from mass rerouting. Container rates +40%. +14 days transit.", severity: "ELEVATED", pulse: false },
      { lat: 30.05, lng: 31.23, color: "#eab308", label: "Suez Canal", detail: "Drastically reduced traffic from Hormuz+Houthi closures.", severity: "ELEVATED", pulse: false },
      { lat: 38.9, lng: -77.04, color: "#20808D", label: "Washington DC", detail: "US CENTCOM coordinating. 3,000+ strikes launched. Emergency defense spending authorized.", severity: "ALLIED", pulse: false }
    ];

    // Add US military assets markers
    var militaryAssets = [
      { lat: 25.0, lng: 65.0, label: "USS Carrier Group", detail: "3rd carrier en route to Persian Gulf", color: "#20808D" },
      { lat: 32.0, lng: 34.0, label: "US CENTCOM — Eastern Med", detail: "Naval assets positioned off Israeli coast", color: "#20808D" },
      { lat: 11.5, lng: 43.15, label: "Camp Lemonnier — Djibouti", detail: "US Africa Command base. Monitoring Bab el-Mandeb.", color: "#20808D" }
    ];

    function createPulsingIcon(color, size, pulse) {
      var pulseRing = pulse
        ? '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:' + (size * 4) + 'px;height:' + (size * 4) + 'px;border-radius:50%;border:1.5px solid ' + color + ';opacity:0;animation:leaflet-pulse 2s ease-out infinite"></div>' +
          '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:' + (size * 3) + 'px;height:' + (size * 3) + 'px;border-radius:50%;border:1px solid ' + color + ';opacity:0;animation:leaflet-pulse 2s ease-out 0.5s infinite"></div>'
        : "";
      return L.divIcon({
        className: "threat-marker-icon",
        html: '<div style="position:relative;width:' + (size * 4) + 'px;height:' + (size * 4) + 'px">' +
          pulseRing +
          '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + color + ';box-shadow:0 0 ' + (size * 2) + 'px ' + color + ',0 0 ' + (size * 4) + 'px ' + color + '40;"></div>' +
          '</div>',
        iconSize: [size * 4, size * 4],
        iconAnchor: [size * 2, size * 2]
      });
    }

    function createMilitaryIcon() {
      return L.divIcon({
        className: "military-marker-icon",
        html: '<div style="width:10px;height:10px;border:1.5px solid #20808D;border-radius:1px;transform:rotate(45deg);background:rgba(32,128,141,0.2);box-shadow:0 0 8px rgba(32,128,141,0.5)"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
    }

    var popupStyle = 'style="font-family:\'JetBrains Mono\',monospace;font-size:11px;line-height:1.5;max-width:260px;"';

    hotspots.forEach(function (h) {
      var marker = L.marker([h.lat, h.lng], {
        icon: createPulsingIcon(h.color, h.severity === "CRITICAL" ? 8 : 6, h.pulse),
        zIndexOffset: h.severity === "CRITICAL" ? 1000 : 500
      }).addTo(map);

      var sevColor = h.severity === "CRITICAL" ? "#ef4444" : h.severity === "HIGH" ? "#f97316" : h.severity === "ELEVATED" ? "#eab308" : "#20808D";
      marker.bindPopup(
        '<div ' + popupStyle + '>' +
        '<div style="color:' + sevColor + ';font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">' + h.label + '</div>' +
        '<div style="display:inline-block;padding:1px 6px;border:1px solid ' + sevColor + ';color:' + sevColor + ';font-size:9px;letter-spacing:0.1em;margin-bottom:6px;border-radius:1px">' + h.severity + '</div>' +
        '<div style="color:#a1a1aa;font-size:10px;line-height:1.5">' + h.detail + '</div>' +
        '</div>',
        { className: "clo-popup", maxWidth: 280 }
      );
    });

    militaryAssets.forEach(function (m) {
      var marker = L.marker([m.lat, m.lng], {
        icon: createMilitaryIcon()
      }).addTo(map);

      marker.bindPopup(
        '<div ' + popupStyle + '>' +
        '<div style="color:#20808D;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">' + m.label + '</div>' +
        '<div style="color:#a1a1aa;font-size:10px">' + m.detail + '</div>' +
        '</div>',
        { className: "clo-popup", maxWidth: 250 }
      );
    });

    // ---- CHOKEPOINT LABEL MARKERS ----
    var chokeLabels = [
      { lat: 27.5, lng: 56.5, text: "HORMUZ", color: "#ef4444" },
      { lat: 12.0, lng: 44.5, text: "BAB EL-MANDEB", color: "#fb923c" },
      { lat: 31.8, lng: 32.0, text: "SUEZ", color: "#eab308" },
      { lat: 2.0, lng: 102.0, text: "MALACCA", color: "#20808D" }
    ];

    if (isFullMap) {
      chokeLabels.forEach(function (cl) {
        var labelIcon = L.divIcon({
          className: "chokepoint-label-icon",
          html: '<div style="font-family:\'JetBrains Mono\',monospace;font-size:9px;font-weight:600;color:' + cl.color + ';letter-spacing:0.12em;text-shadow:0 0 6px ' + cl.color + '40;white-space:nowrap;text-transform:uppercase">' + cl.text + '</div>',
          iconSize: [100, 14],
          iconAnchor: [50, -8]
        });
        L.marker([cl.lat, cl.lng], { icon: labelIcon, interactive: false }).addTo(map);
      });
    }

    // Store reference for cleanup
    leafletMaps[containerId] = map;

    // Force invalidate size after a tick (layout may not be settled)
    setTimeout(function () { map.invalidateSize(); }, 100);
    setTimeout(function () { map.invalidateSize(); }, 500);
  }

  // ============================================================
  // RENDER: THREAT LIST (World Map sidebar)
  // ============================================================
  function renderThreatList() {
    var container = document.getElementById("threatList");
    if (!container) return;

    var threats = [
      { name: "Iran \u2014 Active conflict", detail: "Missile attacks on Israel continuing. IDF striking Iranian oil infrastructure.", severity: "critical" },
      { name: "Israel \u2014 Active conflict", detail: "Multiple impacts in Tel Aviv. 3rd US carrier en route.", severity: "critical" },
      { name: "Strait of Hormuz \u2014 Closed", detail: "Day 7. Only 1 transit on March 3. 200+ vessels stranded.", severity: "critical" },
      { name: "Russia intel sharing", detail: "Relaying US warship positions to Iran since Feb 28.", severity: "critical" },
      { name: "Lebanon \u2014 Spillover risk", detail: "Hezbollah posture elevated. IDF northern front active.", severity: "high" },
      { name: "Bab el-Mandeb", detail: "Houthi activity ongoing, diverted Hormuz traffic.", severity: "high" },
      { name: "Qatar / Bahrain radars", detail: "US missile-defense radars destroyed. 5-8yr rebuild.", severity: "high" },
      { name: "Cape of Good Hope", detail: "Congestion rising from mass rerouting.", severity: "elevated" }
    ];

    container.innerHTML = "";
    threats.forEach(function (t) {
      var item = el("div", { className: "threat-item " + t.severity });
      item.innerHTML =
        '<div class="threat-name">' + t.name + '</div>' +
        '<div class="threat-detail">' + t.detail + '</div>' +
        '<span class="threat-severity sev-' + t.severity + '">' + t.severity.toUpperCase() + '</span>';
      container.appendChild(item);
    });
  }

  // ============================================================
  // RENDER: SHIPPING STATS
  // ============================================================
  function renderShippingStats() {
    var container = document.getElementById("shippingStats");
    if (!container) return;

    container.innerHTML =
      '<div class="shipping-stat"><div class="stat-value critical">200+</div><div class="stat-label">Vessels stranded</div></div>' +
      '<div class="shipping-stat"><div class="stat-value critical">70%</div><div class="stat-label">Traffic drop at Hormuz</div></div>' +
      '<div class="shipping-stat"><div class="stat-value">6</div><div class="stat-label">Major carriers suspended</div></div>' +
      '<div class="shipping-stat"><div class="stat-value">$1M+</div><div class="stat-label">Rerouting cost per voyage</div></div>';
  }

  // ============================================================
  // RENDER: CHOKEPOINT GRID
  // ============================================================
  function renderChokepointGrid() {
    var container = document.getElementById("chokepointGrid");
    if (!container) return;

    var anchorIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cp-icon"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>';

    var statusMap = {
      "closed": "status-closed",
      "elevated": "status-elevated",
      "restricted": "status-elevated",
      "normal": "status-monitoring",
      "congested": "status-congested"
    };

    var statusLabel = {
      "closed": "CLOSED",
      "elevated": "HIGH",
      "restricted": "ELEVATED",
      "normal": "MONITORING",
      "congested": "CONGESTED"
    };

    container.innerHTML = "";
    DATA.shipping_intel.chokepoints.forEach(function (cp) {
      var card = el("div", { className: "chokepoint-card" });
      card.innerHTML =
        '<div class="cp-header">' + anchorIcon + '<span class="cp-name">' + cp.name + '</span></div>' +
        '<div><span class="cp-status ' + (statusMap[cp.status] || "status-monitoring") + '">' + (statusLabel[cp.status] || cp.status.toUpperCase()) + '</span></div>' +
        '<div class="cp-note">' + cp.note + '</div>';
      container.appendChild(card);
    });
  }

  // ============================================================
  // RENDER: X SIGNALS FEED
  // ============================================================
  function renderXSignals(filter) {
    filter = filter || "all";
    var container = document.getElementById("xSignalFeed");
    container.innerHTML = "";

    var signals = DATA.geopolitical_signals.filter(function (s) {
      if (filter === "all") return true;
      return s.category === filter;
    });

    signals.forEach(function (sig) {
      var post = el("div", { className: "x-post" });
      post.innerHTML =
        '<div class="x-post-header">' +
        '<div class="x-avatar">' + sig.source.charAt(0).toUpperCase() + "</div>" +
        "<div>" +
        '<div class="x-handle">' + sig.source + "</div>" +
        '<div class="x-at">@' + sig.source.replace(/\s+/g, "").toLowerCase() + "</div>" +
        "</div>" +
        '<span class="x-time">' + timeAgo(sig.time) + "</span>" +
        "</div>" +
        '<div class="x-text">' + sig.text + "</div>" +
        '<div class="x-metrics">' +
        '<span class="x-metric"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> ' + formatEngagement(sig.engagement) + "</span>" +
        '<span class="x-metric"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg> ' + formatEngagement(Math.floor(sig.engagement * 0.15)) + "</span>" +
        "</div>";
      container.appendChild(post);
    });
  }

  // X Signal filter chips
  document.querySelectorAll("#xFilterChips .chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll("#xFilterChips .chip").forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      renderXSignals(chip.getAttribute("data-filter"));
    });
  });

  // ============================================================
  // RENDER: CONGRESSIONAL TRADES (Full view)
  // ============================================================
  function renderFullTrades() {
    var summaryContainer = document.getElementById("tradesSummary");
    summaryContainer.innerHTML =
      '<div class="summary-card"><div class="summary-label">Total Trades</div><div class="summary-value">8</div><div class="summary-detail">Feb 3 \u2013 Mar 2, 2026</div></div>' +
      '<div class="summary-card"><div class="summary-label">Top Buyer</div><div class="summary-value" style="font-size:var(--text-lg)">McCormick</div><div class="summary-detail">3 trades, $1.25M\u2013$2M</div></div>' +
      '<div class="summary-card"><div class="summary-label">Most Traded</div><div class="summary-value" style="font-size:var(--text-lg)">MSFT, AMZN</div><div class="summary-detail">Tech sector dominance</div></div>';

    var html = '<table class="data-table"><thead><tr><th>Date</th><th>Politician</th><th>Ticker</th><th>Type</th><th>Amount</th></tr></thead><tbody>';
    DATA.politician_trades.forEach(function (trade) {
      var typeClass = trade.type === "Buy" ? "positive" : "negative";
      html += "<tr>" +
        '<td class="num">' + trade.date + "</td>" +
        '<td style="font-weight:500">' + trade.politician + "</td>" +
        '<td class="num" style="font-weight:600">' + trade.ticker + "</td>" +
        '<td class="' + typeClass + '" style="font-weight:600">' + trade.type + "</td>" +
        '<td class="num">' + trade.amount + "</td>" +
        "</tr>";
    });
    html += "</tbody></table>";
    document.getElementById("fullTradesTable").innerHTML = html;
  }

  // ============================================================
  // RENDER: LIVE TICKER BAR (Overview)
  // ============================================================
  function renderLiveTicker() {
    var container = document.getElementById("liveTickerTrack");
    if (!container) return;

    var items = [];

    // Dynamically build ticker items from available data
    function addTicker(sym) {
      var t = DATA.tickers ? DATA.tickers[sym] : null;
      if (t) items.push({ type: "ticker", sym: sym, pct: t.pct || 0 });
    }
    function addValue(label, val) {
      if (val !== undefined && val !== null) items.push({ type: "value", label: label, value: String(val) });
    }

    // Add geopolitical alerts from data
    if (DATA.geopolitical_events && DATA.geopolitical_events.length) {
      DATA.geopolitical_events.slice(0, 3).forEach(function(evt, idx) {
        var headline = evt.headline || evt.title || evt.event || '';
        if (headline) {
          var dot = (evt.severity === 'critical' || idx === 0) ? 'red' : 'yellow';
          items.push({ type: "alert", dot: dot, text: headline.substring(0, 60) });
        }
      });
    }

    // Core indices
    addTicker("SPY"); addTicker("QQQ"); addTicker("NVDA");
    // Commodities
    addTicker("USO"); addTicker("GLD");
    // BTC value
    var btc = DATA.tickers ? DATA.tickers.BTCUSD : null;
    if (btc && btc.price > 0) addValue("BTC", "$" + btc.price.toLocaleString("en-US", { maximumFractionDigits: 0 }));
    // DXY
    var dxy = DATA.tickers ? DATA.tickers.DXY : null;
    if (dxy && dxy.price > 0) addValue("DXY", dxy.price.toFixed(2));
    // Fear & Greed
    if (DATA.fear_greed_index !== undefined) addValue("Fear & Greed", DATA.fear_greed_index);
    // More tickers
    addTicker("LMT"); addTicker("RTX"); addTicker("PLTR");
    addTicker("MSFT"); addTicker("GOOG"); addTicker("TSLA");

    // If no items, show placeholder
    if (items.length === 0) {
      container.innerHTML = '<span class="live-ticker-item"><span class="ticker-alert">AWAITING DATA FEED...</span></span>';
      return;
    }

    function buildItemHTML(item) {
      if (item.type === "alert") {
        return '<span class="live-ticker-item"><span class="ticker-dot ' + item.dot + '"></span><span class="ticker-alert">' + item.text + '</span></span>';
      }
      if (item.type === "ticker") {
        var t = DATA.tickers[item.sym];
        if (!t) return '';
        var cls = t.pct >= 0 ? "ticker-up" : "ticker-down";
        var sign = t.pct >= 0 ? "+" : "";
        return '<span class="live-ticker-item"><span class="ticker-sym">' + item.sym + '</span><span class="' + cls + '">' + sign + (typeof t.pct === 'number' ? t.pct.toFixed(2) : '0.00') + '%</span></span>';
      }
      if (item.type === "value") {
        return '<span class="live-ticker-item"><span class="ticker-sym">' + item.label + '</span><span>' + item.value + '</span></span>';
      }
      return '';
    }

    var html = '';
    for (var r = 0; r < 2; r++) {
      for (var i = 0; i < items.length; i++) {
        var itemHtml = buildItemHTML(items[i]);
        if (itemHtml) {
          if (html) html += '<span class="live-ticker-sep">\u00b7</span>';
          html += itemHtml;
        }
      }
    }
    container.innerHTML = html;
  }

  // ============================================================
  // RENDER: TRADE OF THE DAY
  // ============================================================
  function renderTradeOfDay() {
    if (!DATA.forecast || !DATA.forecast.daily_picks || !DATA.forecast.daily_picks.length) return;
    var pick = DATA.forecast.daily_picks[0];
    if (!pick || !pick.ticker) return;
    var tickerData = DATA.tickers[pick.ticker] || { price: 0, pct: 0, name: pick.ticker };

    function parsePrice(str) {
      if (!str) return 0;
      var nums = String(str).match(/[\d.]+/g);
      if (!nums || !nums.length) return 0;
      return parseFloat(nums[0]);
    }
    var direction = (pick.direction || 'LONG').toUpperCase();
    var isShort = direction.indexOf('SHORT') !== -1;
    var dirBadge = isShort ? 'SHORT \u2193' : 'LONG \u2191';
    var dirClass = isShort ? 'short' : 'long';
    var dirColor = isShort ? '#f87171' : '#4ade80';
    var entryVal = pick.entry || '$0';
    var targetVal = pick.target || '$0';
    var stopVal = pick.stop || '$0';
    var timeframe = pick.timeframe || '2-5 DAYS';
    var confidence = (pick.confidence || 'MEDIUM').toUpperCase();
    var sigStrength = confidence === 'HIGH' ? 4 : confidence === 'MEDIUM' ? 3 : 2;

    var detailsPanel = document.getElementById("tradeDetailsPanel");
    if (detailsPanel) {
      var barsHTML = '';
      for (var b = 0; b < 5; b++) {
        barsHTML += '<div class="signal-bar' + (b < sigStrength ? ' active' : '') + '"></div>';
      }

      detailsPanel.innerHTML =
        '<div class="trade-ticker-row">' +
          '<span class="trade-ticker-sym">' + pick.ticker + '</span>' +
          '<span class="trade-ticker-name">' + (tickerData.name || pick.ticker) + '</span>' +
          '<span class="trade-direction-badge ' + dirClass + '">' + dirBadge + '</span>' +
        '</div>' +
        '<div class="trade-levels">' +
          '<div class="trade-level"><div class="trade-level-label">Entry</div><div class="trade-level-value entry">' + entryVal + '</div></div>' +
          '<div class="trade-level"><div class="trade-level-label">Target</div><div class="trade-level-value target">' + targetVal + '</div></div>' +
          '<div class="trade-level"><div class="trade-level-label">Stop Loss</div><div class="trade-level-value stop">' + stopVal + '</div></div>' +
        '</div>' +
        '<div class="trade-meta-row">' +
          '<div class="trade-meta-item"><span class="trade-meta-label">Confidence</span><span class="trade-meta-value">' + confidence + '</span></div>' +
          '<div class="trade-meta-item"><span class="trade-meta-label">Timeframe</span><span class="trade-meta-value">' + timeframe + '</span></div>' +
          '<div class="trade-meta-item"><span class="trade-meta-label">Direction</span><span class="trade-meta-value" style="color:' + dirColor + '">' + direction + '</span></div>' +
        '</div>' +
        '<div style="margin-bottom:var(--space-3)">' +
          '<div class="trade-meta-label" style="margin-bottom:4px">Signal Strength</div>' +
          '<div class="trade-signal-strength">' + barsHTML + '</div>' +
        '</div>' +
        '<div class="trade-rationale">' +
          '<div class="trade-rationale-label">Rationale</div>' +
          (pick.rationale || 'No rationale available') +
        '</div>';
    }

    var ctx = document.getElementById("tradeOfDayChart");
    if (!ctx) return;

    var entryPrice = parsePrice(entryVal) || (tickerData.price || 50);
    var targetPrice = parsePrice(targetVal) || entryPrice * (isShort ? 0.93 : 1.07);
    var stopLoss = parsePrice(stopVal) || entryPrice * (isShort ? 1.04 : 0.96);
    var spread = Math.abs(targetPrice - stopLoss) * 0.8;
    var base = entryPrice;
    var histPrices = [];
    for (var h = 9; h >= 0; h--) {
      histPrices.push(+(base + (Math.random() - 0.5) * spread * 0.4 - (h * spread * 0.02)).toFixed(2));
    }
    histPrices[9] = entryPrice;
    var projPrices = [];
    for (var p = 0; p < 10; p++) projPrices.push(null);
    var steps = 4;
    for (var s = 0; s <= steps; s++) {
      projPrices.push(+(entryPrice + (targetPrice - entryPrice) * (s / steps)).toFixed(2));
    }
    var labels = ["D-9","D-8","D-7","D-6","D-5","D-4","D-3","D-2","D-1","NOW","+1","+2","+3","+4"];

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Price",
            data: histPrices.concat([null, null, null, null]),
            borderColor: "#a1a1aa",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 2,
            pointBackgroundColor: "#a1a1aa",
            pointBorderColor: "#09090b",
            pointBorderWidth: 1,
            fill: false
          },
          {
            label: "Projection",
            data: projPrices,
            borderColor: "#20808D",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [6, 4],
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: "#20808D",
            pointBorderColor: "#09090b",
            pointBorderWidth: 1,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: Object.assign({}, chartTooltipConfig, {
            callbacks: {
              label: function (ctx2) {
                return ctx2.dataset.label + ": $" + ctx2.parsed.y;
              }
            }
          }),
          annotation: undefined
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.03)" },
            ticks: { color: "#52525b", font: { family: "JetBrains Mono", size: 10 } }
          },
          y: {
            min: Math.min(entryPrice, targetPrice, stopLoss) - spread * 0.5,
            max: Math.max(entryPrice, targetPrice, stopLoss) + spread * 0.5,
            grid: { color: "rgba(255,255,255,0.03)" },
            ticks: {
              color: "#52525b",
              font: { family: "JetBrains Mono", size: 10 },
              callback: function (v) { return "$" + v; }
            }
          }
        }
      },
      plugins: [{
        id: "tradeLevels",
        afterDraw: function (chart) {
          var yScale = chart.scales.y;
          var xScale = chart.scales.x;
          var drawCtx = chart.ctx;
          var chartArea = chart.chartArea;

          function drawLine(yVal, color, label, dashPattern) {
            var yPixel = yScale.getPixelForValue(yVal);
            if (yPixel < chartArea.top || yPixel > chartArea.bottom) return;
            drawCtx.save();
            drawCtx.strokeStyle = color;
            drawCtx.lineWidth = 1;
            drawCtx.setLineDash(dashPattern || [6, 4]);
            drawCtx.beginPath();
            drawCtx.moveTo(chartArea.left, yPixel);
            drawCtx.lineTo(chartArea.right, yPixel);
            drawCtx.stroke();

            drawCtx.fillStyle = color;
            drawCtx.font = "600 10px 'JetBrains Mono'";
            drawCtx.textAlign = "right";
            drawCtx.fillText(label + " $" + yVal, chartArea.right - 4, yPixel - 4);
            drawCtx.restore();
          }

          // Shaded area between entry and target
          var entryY = yScale.getPixelForValue(entryPrice);
          var targetY = yScale.getPixelForValue(targetPrice);
          drawCtx.save();
          drawCtx.fillStyle = "rgba(34, 197, 94, 0.06)";
          drawCtx.fillRect(chartArea.left, targetY, chartArea.right - chartArea.left, entryY - targetY);
          drawCtx.restore();

          drawLine(entryPrice, "#4ade80", "ENTRY", [6, 4]);
          drawLine(targetPrice, "#60a5fa", "TARGET", [6, 4]);
          drawLine(stopLoss, "#f87171", "STOP", [4, 4]);
        }
      }]
    });
  }

  // ============================================================
  // RENDER: PREDICTION SUMMARY
  // ============================================================
  function renderPredictionSummary() {
    var el = document.getElementById("predictionSummary");
    if (!el || !DATA.forecast.prediction_summary) return;
    var ps = DATA.forecast.prediction_summary;
    var today = ps.today;
    var week = ps.week_ahead;

    // Today's signals HTML
    var signalsHTML = '';
    today.key_signals.forEach(function(s) {
      signalsHTML += '<div class="ps-signal">' +
        '<span class="ps-signal-icon">' + s.icon + '</span>' +
        '<span class="ps-signal-text">' + s.text + '</span>' +
        '<span class="ps-signal-src">' + s.source + '</span>' +
      '</div>';
    });

    // Week catalysts HTML
    var catsHTML = '';
    week.catalysts.forEach(function(c) {
      var impactClass = c.impact === 'critical' ? 'ps-impact-critical' : c.impact === 'high' ? 'ps-impact-high' : 'ps-impact-med';
      catsHTML += '<div class="ps-catalyst">' +
        '<span class="ps-cat-date">' + c.date + '</span>' +
        '<span class="ps-cat-event">' + c.event + '</span>' +
        '<span class="ps-cat-impact ' + impactClass + '">' + c.impact.toUpperCase() + '</span>' +
      '</div>';
    });

    // Confidence bar
    var todayBarColor = today.confidence >= 75 ? '#ef4444' : today.confidence >= 50 ? '#eab308' : '#22c55e';
    var weekBarColor = week.confidence >= 75 ? '#ef4444' : week.confidence >= 50 ? '#eab308' : '#22c55e';

    // Determine today bias color
    var biasClass = today.bias.indexOf('BEARISH') >= 0 ? 'ps-bias-bear' : today.bias.indexOf('BULLISH') >= 0 ? 'ps-bias-bull' : 'ps-bias-neutral';

    el.innerHTML =
      '<div class="ps-header">' +
        '<div class="ps-header-left">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
          '<span class="ps-header-title">PREDICTION ENGINE</span>' +
        '</div>' +
        '<span class="ps-header-sub">Synthesized from 15 data sources</span>' +
      '</div>' +
      '<div class="ps-columns">' +
        '<div class="ps-col ps-col-today">' +
          '<div class="ps-col-top">' +
            '<span class="ps-col-label">TODAY\'S PREDICTION</span>' +
            '<span class="ps-bias ' + biasClass + '">' + today.bias + '</span>' +
          '</div>' +
          '<div class="ps-confidence">' +
            '<span class="ps-conf-label">CONFIDENCE</span>' +
            '<div class="ps-conf-bar-bg">' +
              '<div class="ps-conf-bar" style="width:' + today.confidence + '%;background:' + todayBarColor + '"></div>' +
            '</div>' +
            '<span class="ps-conf-val">' + today.confidence + '%</span>' +
          '</div>' +
          '<div class="ps-summary-text">' + today.summary + '</div>' +
          '<div class="ps-signals-label">KEY SIGNALS</div>' +
          '<div class="ps-signals">' + signalsHTML + '</div>' +
        '</div>' +
        '<div class="ps-divider"></div>' +
        '<div class="ps-col ps-col-week">' +
          '<div class="ps-col-top">' +
            '<span class="ps-col-label">WEEK AHEAD (MAR 10\u201314)</span>' +
            '<span class="ps-bias ps-bias-neutral">' + week.bias + '</span>' +
          '</div>' +
          '<div class="ps-confidence">' +
            '<span class="ps-conf-label">CONFIDENCE</span>' +
            '<div class="ps-conf-bar-bg">' +
              '<div class="ps-conf-bar" style="width:' + week.confidence + '%;background:' + weekBarColor + '"></div>' +
            '</div>' +
            '<span class="ps-conf-val">' + week.confidence + '%</span>' +
          '</div>' +
          '<div class="ps-summary-text">' + week.summary + '</div>' +
          '<div class="ps-signals-label">CATALYSTS THIS WEEK</div>' +
          '<div class="ps-catalysts">' + catsHTML + '</div>' +
        '</div>' +
      '</div>';
  }

  // ============================================================
  // RENDER: STOCKS TO WATCH
  // ============================================================
  function renderStocksToWatch() {
    var container = document.getElementById("stocksToWatchGrid");
    if (!container) return;

    var html = '';
    for (var i = 0; i < DATA.stocks_to_watch.length; i++) {
      var s = DATA.stocks_to_watch[i];
      var dirClass = s.direction === "bullish" ? "bullish" : "bearish";
      var arrowChar = s.direction === "bullish" ? "\u25B2" : "\u25BC";
      var targetClass = s.direction === "bullish" ? "up" : "down";
      var confClass = "conf-" + s.confidence;
      var sectorBg = s.sectorColor ? "background:" + s.sectorColor + "18;color:" + s.sectorColor : "";

      html += '<div class="stw-card ' + dirClass + '">';
      html += '<div class="stw-card-top">';
      html += '<span class="stw-ticker">' + s.ticker + '</span>';
      html += '<span class="stw-sector-tag" style="' + sectorBg + '">' + s.sector + '</span>';
      html += '</div>';
      html += '<div class="stw-company">' + s.name + '</div>';
      html += '<div class="stw-price-row">';
      html += '<span class="stw-price">$' + formatNum(s.price) + '</span>';
      html += '<span class="stw-arrow">' + arrowChar + '</span>';
      html += '<span class="stw-target ' + targetClass + '">$' + formatNum(s.target) + '</span>';
      html += '</div>';
      html += '<div class="stw-catalyst">' + s.catalyst + '</div>';
      html += '<div class="stw-meta-row">';
      html += '<span class="stw-meta-badge timeframe">' + s.timeframe + '</span>';
      html += '<span class="stw-meta-badge ' + confClass + '">' + s.confidence.toUpperCase() + '</span>';
      html += '</div>';
      html += '</div>';
    }
    container.innerHTML = html;
  }

  // ============================================================
  // RENDER: SECTOR RADAR
  // ============================================================
  function renderSectorRadar() {
    var container = document.getElementById("sectorRadarTrack");
    if (!container) return;

    var html = '';
    for (var i = 0; i < DATA.sector_radar.length; i++) {
      var s = DATA.sector_radar[i];
      var cardClass = "sr-" + s.direction;
      var arrowClass = s.direction === "bullish" ? "up" : (s.direction === "bearish" ? "down" : "flat");

      html += '<div class="sr-card ' + cardClass + '">';
      html += '<div class="sr-top">';
      html += '<span class="sr-sector">' + s.sector + '</span>';
      html += '<span class="sr-arrow ' + arrowClass + '">' + s.arrow + '</span>';
      html += '</div>';
      html += '<div class="sr-signal">' + s.signal + '</div>';
      html += '</div>';
    }
    container.innerHTML = html;
  }

  // ============================================================
  // RENDER: INSIDER TRADES (SEC EDGAR)
  // ============================================================
  function renderInsiderTrades() {
    var container = document.getElementById("insiderTradesTable");
    if (!container) return;
    var html = '<table><thead><tr><th>DATE</th><th>INSIDER</th><th>COMPANY</th><th>TICKER</th><th>TYPE</th><th>SHARES</th><th>VALUE</th></tr></thead><tbody>';
    for (var i = 0; i < DATA.insider_trades.length; i++) {
      var t = DATA.insider_trades[i];
      var typeClass = t.type === "Purchase" ? "positive" : "negative";
      html += '<tr>';
      html += '<td>' + t.date + '</td>';
      html += '<td>' + t.insider + '</td>';
      html += '<td>' + t.company + '</td>';
      html += '<td class="mono">' + t.ticker + '</td>';
      html += '<td class="' + typeClass + '">' + t.type.toUpperCase() + '</td>';
      html += '<td>' + t.shares + '</td>';
      html += '<td class="mono">' + t.value + '</td>';
      html += '</tr>';
    }
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  // ============================================================
  // RENDER: MACRO INDICATORS (FRED)
  // ============================================================
  function renderMacroIndicators() {
    var container = document.getElementById("macroGrid");
    if (!container) return;
    var m = DATA.macro_indicators;
    var indicators = [
      { label: "FED FUNDS RATE", value: m.fed_funds_rate.value + "%", prev: m.fed_funds_rate.prev + "%", trend: m.fed_funds_rate.trend, updated: m.fed_funds_rate.updated, icon: "\u{1F3E6}" },
      { label: "VIX", value: m.vix.value.toFixed(2), prev: m.vix.prev.toFixed(2), trend: m.vix.trend, updated: m.vix.updated, icon: "\u26A1" },
      { label: "UNEMPLOYMENT", value: m.unemployment.value + "%", prev: m.unemployment.prev + "%", trend: m.unemployment.trend, updated: m.unemployment.updated, icon: "\u{1F4CA}" },
      { label: "CPI INDEX", value: m.cpi.value.toFixed(1), prev: m.cpi.prev.toFixed(1), trend: m.cpi.trend, updated: m.cpi.updated, icon: "\u{1F4B0}" },
      { label: "CONSUMER SENTIMENT", value: m.consumer_sentiment.value.toFixed(1), prev: m.consumer_sentiment.prev.toFixed(1), trend: m.consumer_sentiment.trend, updated: m.consumer_sentiment.updated, icon: "\u{1F4C8}" },
      { label: "10Y-2Y SPREAD", value: m.yield_spread_10y2y.value.toFixed(2) + "%", prev: m.yield_spread_10y2y.prev.toFixed(2) + "%", trend: m.yield_spread_10y2y.trend, updated: m.yield_spread_10y2y.updated, icon: "\u{1F4C9}" }
    ];
    var html = '';
    for (var i = 0; i < indicators.length; i++) {
      var ind = indicators[i];
      var trendClass = (ind.trend === "rising" || ind.trend === "improving" || ind.trend === "growing" || ind.trend === "steepening") ? "trend-up" : (ind.trend === "declining" ? "trend-down" : "trend-neutral");
      var trendArrow = trendClass === "trend-up" ? "\u25B2" : (trendClass === "trend-down" ? "\u25BC" : "\u2192");
      html += '<div class="macro-card">';
      html += '<div class="macro-label">' + ind.label + '</div>';
      html += '<div class="macro-value">' + ind.value + '</div>';
      html += '<div class="macro-meta">';
      html += '<span class="macro-prev">prev: ' + ind.prev + '</span>';
      html += '<span class="macro-trend ' + trendClass + '">' + trendArrow + ' ' + ind.trend + '</span>';
      html += '</div>';
      html += '<div class="macro-updated">Updated: ' + ind.updated + '</div>';
      html += '</div>';
    }
    container.innerHTML = html;
  }

  // ============================================================
  // RENDER: WSB SENTIMENT (ApeWisdom)
  // ============================================================
  function renderWSBSentiment() {
    var container = document.getElementById("wsbTable");
    if (!container) return;
    var html = '<table><thead><tr><th>#</th><th>TICKER</th><th>NAME</th><th>MENTIONS</th><th>UPVOTES</th><th>24H RANK</th><th>MOMENTUM</th></tr></thead><tbody>';
    for (var i = 0; i < DATA.wsb_sentiment.length; i++) {
      var w = DATA.wsb_sentiment[i];
      var momClass = "wsb-" + w.momentum;
      var rankDelta = w.rank_24h - w.rank;
      var rankArrow = rankDelta > 0 ? "\u25B2" + rankDelta : (rankDelta < 0 ? "\u25BC" + Math.abs(rankDelta) : "\u2014");
      var rankClass = rankDelta > 0 ? "positive" : (rankDelta < 0 ? "negative" : "");
      html += '<tr>';
      html += '<td>' + w.rank + '</td>';
      html += '<td class="mono">' + w.ticker + '</td>';
      html += '<td>' + w.name + '</td>';
      html += '<td>' + w.mentions + '</td>';
      html += '<td>' + w.upvotes + '</td>';
      html += '<td class="' + rankClass + '">' + rankArrow + '</td>';
      html += '<td><span class="wsb-momentum ' + momClass + '">' + w.momentum.toUpperCase() + '</span></td>';
      html += '</tr>';
    }
    html += '</tbody></table>';
    container.innerHTML = html;

    // Also render the crypto mini-section
    var cryptoEl = document.getElementById("cryptoSentiment");
    if (cryptoEl && DATA.crypto_sentiment) {
      var ch = '';
      for (var j = 0; j < DATA.crypto_sentiment.length; j++) {
        var c = DATA.crypto_sentiment[j];
        var cClass = c.momentum === "bearish" ? "negative" : (c.momentum === "neutral" ? "" : "positive");
        ch += '<span class="crypto-tag ' + cClass + '">' + c.ticker + ' <small>' + c.mentions + ' mentions | ' + c.upvotes + ' votes</small></span>';
      }
      cryptoEl.innerHTML = ch;
    }
  }

  // ============================================================
  // RENDER: WEATHER ALERTS (NWS)
  // ============================================================
  function renderWeatherAlerts() {
    var container = document.getElementById("weatherAlertsList");
    if (!container) return;
    var html = '';
    for (var i = 0; i < DATA.weather_alerts.length; i++) {
      var a = DATA.weather_alerts[i];
      var sevClass = a.severity === "Severe" ? "wx-severe" : "wx-moderate";
      var impactClass = a.port_impact.indexOf("Moderate") === 0 ? "wx-impact-mod" : (a.port_impact.indexOf("Minor") === 0 || a.port_impact.indexOf("Low") === 0 ? "wx-impact-low" : "wx-impact-none");
      html += '<div class="wx-alert ' + sevClass + '">';
      html += '<div class="wx-alert-top">';
      html += '<span class="wx-state">' + a.state + '</span>';
      html += '<span class="wx-event">' + a.event + '</span>';
      html += '<span class="wx-severity ' + sevClass + '">' + a.severity.toUpperCase() + '</span>';
      html += '</div>';
      html += '<div class="wx-area">' + a.area + '</div>';
      html += '<div class="wx-headline">' + a.headline + '</div>';
      html += '<div class="wx-impact ' + impactClass + '">PORT IMPACT: ' + a.port_impact + '</div>';
      html += '</div>';
    }
    if (DATA.weather_alerts.length === 0) {
      html = '<div class="wx-clear">No severe weather alerts affecting major ports</div>';
    }
    container.innerHTML = html;
  }


  // ============================================================
  // MACRO INTELLIGENCE VIEW RENDERERS
  // ============================================================

  function renderNationalDebt() {
    var el = document.getElementById("nationalDebtPanel");
    if (!el) return;
    var d = DATA.treasury_fiscal.national_debt;
    var totalT = (d.total / 1e12).toFixed(3);
    var publicT = (d.public_held / 1e12).toFixed(3);
    var intraT = (d.intragov / 1e12).toFixed(3);
    var dailyB = (d.daily_change / 1e9).toFixed(2);
    var dailySign = d.daily_change >= 0 ? "+" : "";
    el.innerHTML =
      '<div class="debt-stat-grid">' +
        '<div class="debt-stat">' +
          '<div class="debt-stat-label">TOTAL NATIONAL DEBT</div>' +
          '<div class="debt-stat-value debt-value-xl">$' + totalT + 'T</div>' +
          '<div class="debt-stat-sub">As of ' + d.date + '</div>' +
        '</div>' +
        '<div class="debt-stat">' +
          '<div class="debt-stat-label">HELD BY PUBLIC</div>' +
          '<div class="debt-stat-value">$' + publicT + 'T</div>' +
          '<div class="debt-stat-sub">' + ((d.public_held / d.total) * 100).toFixed(1) + '% of total</div>' +
        '</div>' +
        '<div class="debt-stat">' +
          '<div class="debt-stat-label">INTRAGOVERNMENTAL</div>' +
          '<div class="debt-stat-value">$' + intraT + 'T</div>' +
          '<div class="debt-stat-sub">' + ((d.intragov / d.total) * 100).toFixed(1) + '% of total</div>' +
        '</div>' +
        '<div class="debt-stat">' +
          '<div class="debt-stat-label">DAILY CHANGE</div>' +
          '<div class="debt-stat-value ' + (d.daily_change >= 0 ? "color-red" : "color-green") + '">' + dailySign + '$' + dailyB + 'B</div>' +
          '<div class="debt-stat-sub">24-hour change</div>' +
        '</div>' +
      '</div>';
  }

  function renderDeficitChart() {
    var el = document.getElementById("deficitChart");
    if (!el) return;
    var months = DATA.treasury_fiscal.deficit_by_month;
    var labels = months.map(function(m) { return m.month.split(" ")[0].substring(0,3); });
    var receiptsData = months.map(function(m) { return (m.receipts / 1e9).toFixed(1); });
    var outlaysData = months.map(function(m) { return (m.outlays / 1e9).toFixed(1); });
    new Chart(el, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          { label: "Receipts ($B)", data: receiptsData, backgroundColor: "rgba(34,197,94,0.7)", borderColor: "rgba(34,197,94,1)", borderWidth: 1, borderRadius: 2 },
          { label: "Outlays ($B)", data: outlaysData, backgroundColor: "rgba(239,68,68,0.7)", borderColor: "rgba(239,68,68,1)", borderWidth: 1, borderRadius: 2 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "#a1a1aa", font: { family: "'JetBrains Mono',monospace", size: 10 } } } },
        scales: {
          x: { ticks: { color: "#52525b", font: { family: "'JetBrains Mono',monospace", size: 10 } }, grid: { color: "rgba(255,255,255,0.04)" } },
          y: { ticks: { color: "#52525b", font: { family: "'JetBrains Mono',monospace", size: 10 }, callback: function(v) { return "$" + v + "B"; } }, grid: { color: "rgba(255,255,255,0.04)" } }
        }
      }
    });
  }

  function renderDefenseSpending() {
    var el = document.getElementById("defenseSpendingPanel");
    if (!el) return;
    var d = DATA.treasury_fiscal.defense_spending;
    var janB = (d.jan_2026 / 1e9).toFixed(1);
    var fytdB = (d.fytd_2026 / 1e9).toFixed(1);
    var priorB = (d.fytd_prior / 1e9).toFixed(1);
    el.innerHTML =
      '<div class="defense-spend-row">' +
        '<div class="defense-spend-item">' +
          '<div class="defense-spend-label">JAN 2026 OUTLAYS</div>' +
          '<div class="defense-spend-val">$' + janB + 'B</div>' +
        '</div>' +
        '<div class="defense-spend-item">' +
          '<div class="defense-spend-label">FY2026 FYTD</div>' +
          '<div class="defense-spend-val">$' + fytdB + 'B</div>' +
        '</div>' +
        '<div class="defense-spend-item">' +
          '<div class="defense-spend-label">FY2025 FYTD (PRIOR)</div>' +
          '<div class="defense-spend-val">$' + priorB + 'B</div>' +
        '</div>' +
        '<div class="defense-spend-item">' +
          '<div class="defense-spend-label">YOY CHANGE</div>' +
          '<div class="defense-spend-val color-green">+' + d.yoy_change_pct.toFixed(1) + '%</div>' +
        '</div>' +
      '</div>';
  }

  function renderInterestRates() {
    var el = document.getElementById("interestRatesChart");
    if (!el) return;
    var d = DATA.treasury_fiscal.interest_rates;
    var labels = ["Bills", "Notes", "Bonds", "TIPS", "FRN", "Total Mkt"];
    var values = [d.bills, d.notes, d.bonds, d.tips, d.frn, d.total_marketable];
    new Chart(el, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Avg Interest Rate %",
          data: values,
          backgroundColor: values.map(function(v) { return v > 3.5 ? "rgba(239,68,68,0.7)" : v > 2 ? "rgba(234,179,8,0.7)" : "rgba(34,197,94,0.7)"; }),
          borderWidth: 1,
          borderRadius: 2,
          borderColor: "rgba(255,255,255,0.1)"
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#52525b", font: { family: "'JetBrains Mono',monospace", size: 10 }, callback: function(v) { return v + "%"; } }, grid: { color: "rgba(255,255,255,0.04)" } },
          y: { ticks: { color: "#a1a1aa", font: { family: "'JetBrains Mono',monospace", size: 10 } }, grid: { display: false } }
        }
      }
    });
  }

  function renderGDPForecasts() {
    var el = document.getElementById("gdpForecastTable");
    if (!el) return;
    var rows = DATA.global_macro.gdp_forecasts_imf;
    var html = '<table class="data-table"><thead><tr>' +
      '<th>COUNTRY</th><th>2025F</th><th>2026F</th><th>TREND</th>' +
      '</tr></thead><tbody>';
    rows.forEach(function(r) {
      var diff = r.y2026 - r.y2025;
      var trend = diff > 0.2 ? "\u25B2 ACCEL" : diff < -0.2 ? "\u25BC DECEL" : "\u2192 STABLE";
      var trendClass = diff > 0.2 ? "color-green" : diff < -0.2 ? "color-red" : "color-muted";
      html += '<tr>' +
        '<td>' + r.flag + ' <strong>' + r.country + '</strong></td>' +
        '<td>' + r.y2025.toFixed(1) + '%</td>' +
        '<td>' + r.y2026.toFixed(1) + '%</td>' +
        '<td class="' + trendClass + '">' + trend + '</td>' +
        '</tr>';
    });
    html += '</tbody></table>';
    el.innerHTML = html;
  }

  function renderCPITracker() {
    var el = document.getElementById("cpiTracker");
    if (!el) return;
    var d = DATA.global_macro.bls_cpi;
    var monthChange = ((d.latest.value - d.prev.value) / d.prev.value * 100).toFixed(2);
    el.innerHTML =
      '<div class="cpi-grid">' +
        '<div class="cpi-item">' +
          '<div class="cpi-label">CPI-U LATEST</div>' +
          '<div class="cpi-val">' + d.latest.value.toFixed(1) + '</div>' +
          '<div class="cpi-sub">' + d.latest.period + '</div>' +
        '</div>' +
        '<div class="cpi-item">' +
          '<div class="cpi-label">MONTH-OVER-MONTH</div>' +
          '<div class="cpi-val ' + (parseFloat(monthChange) > 0.3 ? "color-red" : "color-green") + '">+' + monthChange + '%</div>' +
          '<div class="cpi-sub">vs ' + d.prev.period + '</div>' +
        '</div>' +
        '<div class="cpi-item">' +
          '<div class="cpi-label">YOY INFLATION</div>' +
          '<div class="cpi-val ' + (d.yoy_inflation_pct > 3 ? "color-red" : d.yoy_inflation_pct > 2 ? "color-orange" : "color-green") + '">' + d.yoy_inflation_pct.toFixed(1) + '%</div>' +
          '<div class="cpi-sub">Annual rate</div>' +
        '</div>' +
        '<div class="cpi-item">' +
          '<div class="cpi-label">2025 ANNUAL AVG</div>' +
          '<div class="cpi-val">' + d.annual_2025.toFixed(1) + '</div>' +
          '<div class="cpi-sub">vs 2024: ' + d.annual_2024.toFixed(1) + '</div>' +
        '</div>' +
      '</div>';
  }

  function renderEarningsCalendar() {
    var el = document.getElementById("earningsCalendar");
    if (!el) return;
    var rows = DATA.earnings_calendar;
    var html = '<table class="data-table"><thead><tr>' +
      '<th>DATE</th><th>TICKER</th><th>COMPANY</th><th>EST EPS</th><th>ACTUAL</th><th>SURPRISE</th>' +
      '</tr></thead><tbody>';
    rows.forEach(function(r) {
      var actual = r.actual_eps !== null ? "$" + r.actual_eps.toFixed(2) : '<span class="badge badge-teal" style="font-size:9px;padding:1px 6px">UPCOMING</span>';
      var surprise = r.surprise_pct !== null ? (r.surprise_pct >= 0 ? "+" : "") + r.surprise_pct.toFixed(1) + "%" : "\u2014";
      var surpriseClass = r.surprise_pct !== null ? (r.surprise_pct >= 0 ? "color-green" : "color-red") : "";
      html += '<tr>' +
        '<td>' + r.date + '</td>' +
        '<td><strong>' + r.ticker + '</strong></td>' +
        '<td>' + r.name + '</td>' +
        '<td>$' + r.estimate_eps.toFixed(2) + '</td>' +
        '<td>' + actual + '</td>' +
        '<td class="' + surpriseClass + '">' + surprise + '</td>' +
        '</tr>';
    });
    html += '</tbody></table>';
    el.innerHTML = html;
  }

  // ============================================================
  // CHARTS — ENHANCED PREDICTION CHARTS WITH TRENDLINES, 
  // CANDLESTICK BARS, ANNOTATIONS & STOP LOSSES
  // ============================================================

  // Custom plugin: draw OHLC candlestick bars behind the line
  var candlestickPlugin = {
    id: "candlestickBars",
    beforeDatasetsDraw: function(chart) {
      var meta = chart.getDatasetMeta(0); // first dataset = historical close
      if (!meta || !meta.data) return;
      var ctx = chart.ctx;
      var yAxis = chart.scales.y;
      var stock = chart._cloStock;
      if (!stock || !stock.history) return;
      var history = stock.history;
      ctx.save();
      for (var i = 0; i < history.length; i++) {
        var point = meta.data[i];
        if (!point) continue;
        var x = point.x;
        var oY = yAxis.getPixelForValue(history[i].o);
        var cY = yAxis.getPixelForValue(history[i].c);
        var hY = yAxis.getPixelForValue(history[i].h);
        var lY = yAxis.getPixelForValue(history[i].l);
        var isBull = history[i].c >= history[i].o;
        var barWidth = Math.max(2, (chart.chartArea.right - chart.chartArea.left) / (meta.data.length * 2.5));
        // Wick (high-low line)
        ctx.strokeStyle = isBull ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, hY);
        ctx.lineTo(x, lY);
        ctx.stroke();
        // Body (open-close rect)
        ctx.fillStyle = isBull ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)";
        ctx.strokeStyle = isBull ? "rgba(34,197,94,0.6)" : "rgba(239,68,68,0.6)";
        ctx.lineWidth = 1;
        var top = Math.min(oY, cY);
        var height = Math.max(Math.abs(cY - oY), 1);
        ctx.fillRect(x - barWidth / 2, top, barWidth, height);
        ctx.strokeRect(x - barWidth / 2, top, barWidth, height);
      }
      ctx.restore();
    }
  };

  // Custom plugin: draw volume bars at the bottom of the chart
  var volumePlugin = {
    id: "volumeBars",
    afterDatasetsDraw: function(chart) {
      var stock = chart._cloStock;
      if (!stock || !stock.history) return;
      var meta = chart.getDatasetMeta(0);
      if (!meta || !meta.data) return;
      var ctx = chart.ctx;
      var chartArea = chart.chartArea;
      var history = stock.history;
      // Find max volume
      var maxVol = 0;
      history.forEach(function(h) { if (h.v > maxVol) maxVol = h.v; });
      if (maxVol === 0) return;
      var volHeight = (chartArea.bottom - chartArea.top) * 0.12; // 12% of chart height
      var baseY = chartArea.bottom;
      ctx.save();
      ctx.globalAlpha = 0.35;
      for (var i = 0; i < history.length; i++) {
        var point = meta.data[i];
        if (!point) continue;
        var x = point.x;
        var barH = (history[i].v / maxVol) * volHeight;
        var isBull = history[i].c >= history[i].o;
        var barWidth = Math.max(2, (chartArea.right - chartArea.left) / (meta.data.length * 2.5));
        ctx.fillStyle = isBull ? "rgba(34,197,94,0.6)" : "rgba(239,68,68,0.6)";
        ctx.fillRect(x - barWidth / 2, baseY - barH, barWidth, barH);
      }
      ctx.restore();
    }
  };

  // Custom plugin: draw prediction zone shading
  var predZonePlugin = {
    id: "predictionZone",
    beforeDatasetsDraw: function(chart) {
      var stock = chart._cloStock;
      if (!stock || !stock.history) return;
      var histLen = stock.history.length;
      var meta = chart.getDatasetMeta(0);
      if (!meta || !meta.data || histLen >= meta.data.length) return;
      var ctx = chart.ctx;
      var chartArea = chart.chartArea;
      // Get the x position of the last historical point
      var lastHistPoint = meta.data[histLen - 1];
      if (!lastHistPoint) return;
      var xStart = lastHistPoint.x;
      ctx.save();
      // Draw vertical dashed line at prediction boundary
      ctx.strokeStyle = "rgba(32,128,141,0.4)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(xStart, chartArea.top);
      ctx.lineTo(xStart, chartArea.bottom);
      ctx.stroke();
      // Shade prediction zone
      ctx.fillStyle = "rgba(32,128,141,0.03)";
      ctx.fillRect(xStart, chartArea.top, chartArea.right - xStart, chartArea.bottom - chartArea.top);
      // Label
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(32,128,141,0.5)";
      ctx.font = "600 9px 'JetBrains Mono'";
      ctx.textAlign = "center";
      ctx.fillText("PREDICTION", xStart + (chartArea.right - xStart) / 2, chartArea.top + 14);
      ctx.restore();
    }
  };

  // Helper: compute linear regression trendline
  function computeTrendline(points) {
    var n = points.length;
    if (n < 2) return null;
    var sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    points.forEach(function(p, i) {
      sumX += i;
      sumY += p;
      sumXY += i * p;
      sumX2 += i * i;
    });
    var slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    var intercept = (sumY - slope * sumX) / n;
    return { slope: slope, intercept: intercept, startVal: intercept, endVal: slope * (n - 1) + intercept };
  }

  // Helper: find swing highs and swing lows for trendlines
  function findSwingPoints(history, lookback) {
    var highs = [];
    var lows = [];
    lookback = lookback || 3;
    for (var i = lookback; i < history.length - lookback; i++) {
      var isHigh = true;
      var isLow = true;
      for (var j = 1; j <= lookback; j++) {
        if (history[i].h <= history[i - j].h || history[i].h <= history[i + j].h) isHigh = false;
        if (history[i].l >= history[i - j].l || history[i].l >= history[i + j].l) isLow = false;
      }
      if (isHigh) highs.push({ idx: i, val: history[i].h });
      if (isLow) lows.push({ idx: i, val: history[i].l });
    }
    return { highs: highs, lows: lows };
  }

  function renderPredictionCharts() {
    var grid = document.getElementById("chartsGrid");
    if (!grid) return;
    var preds = DATA.chart_predictions;
    if (!preds || !preds.length) { grid.innerHTML = '<div class="chart-empty">NO CHART DATA AVAILABLE</div>'; return; }
    grid.innerHTML = "";
    preds.forEach(function(stock, idx) {
      var card = document.createElement("div");
      card.className = "chart-card";
      var dirClass = stock.direction === "LONG" ? "dir-long" : "dir-short";
      var rsiClass = stock.rsi > 70 ? "rsi-hot" : stock.rsi < 30 ? "rsi-cold" : "rsi-neutral";
      var lastPrice = stock.history[stock.history.length - 1].c;
      var firstPrice = stock.history[0].c;
      var totalPct = ((lastPrice - firstPrice) / firstPrice * 100).toFixed(1);
      var pctSign = parseFloat(totalPct) >= 0 ? "+" : "";
      var pctClass = parseFloat(totalPct) >= 0 ? "color-green" : "color-red";
      var targetPct = ((stock.target - lastPrice) / lastPrice * 100).toFixed(1);
      var riskPct = ((lastPrice - stock.stop_loss) / lastPrice * 100).toFixed(1);
      var rrRatio = (Math.abs(stock.target - stock.entry) / Math.abs(stock.entry - stock.stop_loss)).toFixed(1);
      card.innerHTML =
        '<div class="chart-card-header">' +
          '<div class="chart-card-title-row">' +
            '<div class="chart-card-ticker">' +
              '<span class="chart-ticker-sym">' + stock.ticker + '</span>' +
              '<span class="chart-price-now">$' + lastPrice.toFixed(2) + '</span>' +
              '<span class="' + pctClass + ' chart-pct">' + pctSign + totalPct + '%</span>' +
            '</div>' +
            '<div class="chart-card-badges">' +
              '<span class="badge ' + dirClass + '">' + stock.direction + '</span>' +
              '<span class="badge badge-conf">CONF ' + stock.confidence + '%</span>' +
            '</div>' +
          '</div>' +
          '<div class="chart-card-meta">' +
            '<span class="chart-ticker-name">' + stock.name + '</span>' +
            '<span class="chart-card-sector" style="border-color:' + stock.sectorColor + ';color:' + stock.sectorColor + '">' + stock.sector + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="chart-card-canvas-wrap">' +
          '<canvas id="predChart' + idx + '"></canvas>' +
        '</div>' +
        '<div class="chart-card-legend">' +
          '<span class="cl-item cl-hist"><span class="cl-swatch" style="background:#e2e8f0"></span>PRICE</span>' +
          '<span class="cl-item cl-pred"><span class="cl-swatch" style="background:#20808D;"></span>PREDICTION</span>' +
          '<span class="cl-item"><span class="cl-swatch" style="background:#ef4444"></span>STOP</span>' +
          '<span class="cl-item"><span class="cl-swatch" style="background:#22c55e"></span>ENTRY</span>' +
          '<span class="cl-item"><span class="cl-swatch" style="background:#a855f7"></span>RESIST</span>' +
          '<span class="cl-item"><span class="cl-swatch" style="background:#fbbf24"></span>SUPPORT</span>' +
        '</div>' +
        '<div class="chart-card-levels">' +
          '<div class="chart-level">' +
            '<span class="level-label">ENTRY</span>' +
            '<span class="level-val color-green">$' + stock.entry + '</span>' +
          '</div>' +
          '<div class="chart-level">' +
            '<span class="level-label">TARGET</span>' +
            '<span class="level-val color-teal">$' + stock.target + ' (+' + targetPct + '%)</span>' +
          '</div>' +
          '<div class="chart-level">' +
            '<span class="level-label">STOP LOSS</span>' +
            '<span class="level-val color-red">$' + stock.stop_loss + ' (-' + riskPct + '%)</span>' +
          '</div>' +
          '<div class="chart-level">' +
            '<span class="level-label">RSI (14)</span>' +
            '<span class="level-val ' + rsiClass + '">' + stock.rsi + '</span>' +
          '</div>' +
          '<div class="chart-level">' +
            '<span class="level-label">R:R RATIO</span>' +
            '<span class="level-val color-teal">' + rrRatio + ':1</span>' +
          '</div>' +
          '<div class="chart-level">' +
            '<span class="level-label">SUPPORT</span>' +
            '<span class="level-val" style="color:#fbbf24">$' + stock.support + '</span>' +
          '</div>' +
          '<div class="chart-level">' +
            '<span class="level-label">RESISTANCE</span>' +
            '<span class="level-val" style="color:#a855f7">$' + stock.resistance + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="chart-card-rationale">' +
          '<div class="rationale-label">RATIONALE</div>' +
          '<div class="rationale-text">' + stock.rationale + '</div>' +
          '<div class="rationale-label" style="margin-top:6px">RISK</div>' +
          '<div class="rationale-text risk-text">' + stock.risk + '</div>' +
        '</div>';
      grid.appendChild(card);
      // Build the enhanced chart
      buildPredictionChart(idx, stock);
    });
  }

  function buildPredictionChart(idx, stock) {
    var canvas = document.getElementById("predChart" + idx);
    if (!canvas) return;
    var ctx = canvas.getContext("2d");

    // Historical data
    var histDates = stock.history.map(function(h) { return h.d.slice(5); });
    var histClose = stock.history.map(function(h) { return h.c; });
    var histHigh = stock.history.map(function(h) { return h.h; });
    var histLow = stock.history.map(function(h) { return h.l; });

    // Prediction data
    var predDates = stock.prediction.map(function(p) { return p.d.slice(5); });
    var predClose = stock.prediction.map(function(p) { return p.c; });

    // Combined labels
    var allLabels = histDates.concat(predDates);
    var histLen = histDates.length;
    var totalLen = allLabels.length;

    // Historical close dataset
    var histDataset = histClose.concat(new Array(predDates.length).fill(null));

    // Prediction dataset (bridge from last historical point)
    var predDataset = new Array(histLen - 1).fill(null);
    predDataset.push(histClose[histLen - 1]);
    predDataset = predDataset.concat(predClose);

    // Horizontal level lines
    var stopLine = new Array(totalLen).fill(stock.stop_loss);
    var entryLine = new Array(totalLen).fill(stock.entry);
    var targetLine = new Array(totalLen).fill(stock.target);
    var supportLine = new Array(totalLen).fill(stock.support);
    var resistanceLine = new Array(totalLen).fill(stock.resistance);

    // High/Low range
    var highData = histHigh.concat(new Array(predDates.length).fill(null));
    var lowData = histLow.concat(new Array(predDates.length).fill(null));

    // Calculate Y range
    var allVals = histClose.concat(predClose).concat([stock.support, stock.resistance, stock.stop_loss, stock.target, stock.entry]);
    var minY = Math.min.apply(null, allVals);
    var maxY = Math.max.apply(null, allVals);
    var padding = (maxY - minY) * 0.12;

    // Compute trendlines from swing points
    var swings = findSwingPoints(stock.history, 2);
    var trendAnnotations = {};

    // Upper trendline (connecting swing highs)
    if (swings.highs.length >= 2) {
      var h1 = swings.highs[swings.highs.length - 2];
      var h2 = swings.highs[swings.highs.length - 1];
      trendAnnotations.upperTrend = {
        type: "line",
        xMin: h1.idx,
        xMax: Math.min(h2.idx + 4, totalLen - 1),
        yMin: h1.val,
        yMax: h2.val + (h2.val - h1.val) / (h2.idx - h1.idx) * 4,
        borderColor: "rgba(168,85,247,0.4)",
        borderWidth: 1,
        borderDash: [4, 3],
        label: {
          display: false
        }
      };
    }

    // Lower trendline (connecting swing lows)
    if (swings.lows.length >= 2) {
      var l1 = swings.lows[swings.lows.length - 2];
      var l2 = swings.lows[swings.lows.length - 1];
      trendAnnotations.lowerTrend = {
        type: "line",
        xMin: l1.idx,
        xMax: Math.min(l2.idx + 4, totalLen - 1),
        yMin: l1.val,
        yMax: l2.val + (l2.val - l1.val) / (l2.idx - l1.idx) * 4,
        borderColor: "rgba(251,191,36,0.4)",
        borderWidth: 1,
        borderDash: [4, 3],
        label: {
          display: false
        }
      };
    }

    // Annotated price level labels on the right side of chart
    trendAnnotations.stopLabel = {
      type: "label",
      xValue: totalLen - 1,
      yValue: stock.stop_loss,
      content: "STOP $" + stock.stop_loss,
      color: "#ef4444",
      font: { family: "'JetBrains Mono'", size: 9, weight: "700" },
      position: "end",
      xAdjust: 0,
      yAdjust: -10,
      backgroundColor: "rgba(239,68,68,0.1)",
      borderRadius: 1,
      padding: { top: 2, bottom: 2, left: 4, right: 4 }
    };
    trendAnnotations.entryLabel = {
      type: "label",
      xValue: totalLen - 1,
      yValue: stock.entry,
      content: "ENTRY $" + stock.entry,
      color: "#22c55e",
      font: { family: "'JetBrains Mono'", size: 9, weight: "700" },
      position: "end",
      xAdjust: 0,
      yAdjust: -10,
      backgroundColor: "rgba(34,197,94,0.1)",
      borderRadius: 1,
      padding: { top: 2, bottom: 2, left: 4, right: 4 }
    };
    trendAnnotations.targetLabel = {
      type: "label",
      xValue: totalLen - 1,
      yValue: stock.target,
      content: "TARGET $" + stock.target,
      color: "#20808D",
      font: { family: "'JetBrains Mono'", size: 9, weight: "700" },
      position: "end",
      xAdjust: 0,
      yAdjust: -10,
      backgroundColor: "rgba(32,128,141,0.1)",
      borderRadius: 1,
      padding: { top: 2, bottom: 2, left: 4, right: 4 }
    };

    // Stop loss line annotation (bold, prominent)
    trendAnnotations.stopLine = {
      type: "line",
      yMin: stock.stop_loss,
      yMax: stock.stop_loss,
      borderColor: "rgba(239,68,68,0.7)",
      borderWidth: 1.5,
      borderDash: [8, 4]
    };
    trendAnnotations.entryLineA = {
      type: "line",
      yMin: stock.entry,
      yMax: stock.entry,
      borderColor: "rgba(34,197,94,0.5)",
      borderWidth: 1,
      borderDash: [4, 4]
    };
    trendAnnotations.targetLineA = {
      type: "line",
      yMin: stock.target,
      yMax: stock.target,
      borderColor: "rgba(32,128,141,0.5)",
      borderWidth: 1,
      borderDash: [4, 4]
    };
    trendAnnotations.supportLineA = {
      type: "line",
      yMin: stock.support,
      yMax: stock.support,
      borderColor: "rgba(251,191,36,0.35)",
      borderWidth: 1,
      borderDash: [3, 3]
    };
    trendAnnotations.resistLineA = {
      type: "line",
      yMin: stock.resistance,
      yMax: stock.resistance,
      borderColor: "rgba(168,85,247,0.35)",
      borderWidth: 1,
      borderDash: [3, 3]
    };

    var chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: allLabels,
        datasets: [
          {
            label: "Price",
            data: histDataset,
            borderColor: "#e2e8f0",
            backgroundColor: "transparent",
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 3,
            tension: 0.1,
            fill: false,
            order: 2
          },
          {
            label: "High",
            data: highData,
            borderColor: "transparent",
            backgroundColor: "transparent",
            borderWidth: 0,
            pointRadius: 0,
            fill: false,
            tension: 0.1,
            order: 10
          },
          {
            label: "Low",
            data: lowData,
            borderColor: "transparent",
            backgroundColor: "rgba(226,232,240,0.03)",
            borderWidth: 0,
            pointRadius: 0,
            fill: "-1",
            tension: 0.1,
            order: 10
          },
          {
            label: "Prediction",
            data: predDataset,
            borderColor: "#20808D",
            backgroundColor: "rgba(32,128,141,0.08)",
            borderWidth: 2.5,
            borderDash: [6, 4],
            pointRadius: function(context) { return context.dataIndex >= histLen ? 4 : 0; },
            pointBackgroundColor: "#20808D",
            pointBorderColor: "#0d1117",
            pointBorderWidth: 2,
            tension: 0.25,
            fill: false,
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          annotation: {
            annotations: trendAnnotations
          },
          tooltip: {
            backgroundColor: "rgba(10,12,16,0.95)",
            titleColor: "#e2e8f0",
            bodyColor: "#94a3b8",
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 1,
            titleFont: { family: "'JetBrains Mono'", size: 11, weight: "600" },
            bodyFont: { family: "'JetBrains Mono'", size: 10 },
            displayColors: true,
            filter: function(item) {
              return item.dataset.label !== "High" && item.dataset.label !== "Low";
            },
            callbacks: {
              label: function(context) {
                var label = context.dataset.label || "";
                if (context.parsed.y !== null) {
                  label += ": $" + context.parsed.y.toFixed(2);
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.03)", drawBorder: false },
            ticks: {
              color: "#475569",
              font: { family: "'JetBrains Mono'", size: 9 },
              maxRotation: 45,
              autoSkip: true,
              maxTicksLimit: 10
            }
          },
          y: {
            position: "right",
            min: minY - padding,
            max: maxY + padding,
            grid: { color: "rgba(255,255,255,0.03)", drawBorder: false },
            ticks: {
              color: "#475569",
              font: { family: "'JetBrains Mono'", size: 9 },
              callback: function(value) { return "$" + value.toFixed(0); }
            }
          }
        }
      },
      plugins: [candlestickPlugin, volumePlugin, predZonePlugin]
    });
    // Store reference to stock data for custom plugins
    chartInstance._cloStock = stock;
    chartInstance.update();
  }

    // ============================================================
  // INIT
  // ============================================================

  // ============================================================
  // LONG-TERM PREDICTION CHARTS (1-3 MONTH HORIZON)
  // ============================================================
  function renderLongTermCharts() {
    var grid = document.getElementById("longtermGrid");
    if (!grid) return;
    var preds = DATA.long_term_predictions;
    if (!preds || !preds.length) { grid.innerHTML = '<div class="chart-empty">NO LONG-TERM DATA AVAILABLE</div>'; return; }
    grid.innerHTML = "";

    preds.forEach(function(stock, idx) {
      var card = document.createElement("div");
      card.className = "lt-chart-card";

      var lastPrice = stock.history[stock.history.length - 1].c;
      var firstPrice = stock.history[0].c;
      var totalPct = ((lastPrice - firstPrice) / firstPrice * 100).toFixed(1);
      var pctSign = parseFloat(totalPct) >= 0 ? "+" : "";
      var pctClass = parseFloat(totalPct) >= 0 ? "color-green" : "color-red";
      var peStr = stock.pe < 0 ? "N/A" : stock.pe.toFixed(1) + "x";

      // Build scenario HTML
      var scenarioHTML = "";
      stock.scenarios.forEach(function(sc) {
        var impactClass = sc.impact === "critical" ? "impact-critical" : sc.impact === "high" ? "impact-high" : "impact-medium";
        var probColor = sc.probability >= 40 ? "#22c55e" : sc.probability >= 30 ? "#f59e0b" : "#ef4444";
        scenarioHTML +=
          '<div class="lt-scenario">' +
            '<div class="lt-scenario-header">' +
              '<span class="lt-scenario-name">' + sc.name + '</span>' +
              '<span class="lt-scenario-prob" style="color:' + probColor + '">' + sc.probability + '%</span>' +
            '</div>' +
            '<div class="lt-scenario-trigger">' + sc.trigger + '</div>' +
            '<div class="lt-scenario-meta">' +
              '<span class="badge ' + impactClass + '">' + sc.impact.toUpperCase() + '</span>' +
              '<span class="lt-scenario-timeline">' + sc.timeline + '</span>' +
              '<span class="lt-scenario-target">TARGET $' + sc.target + '</span>' +
            '</div>' +
          '</div>';
      });

      // Build catalyst timeline HTML
      var catalystHTML = "";
      stock.catalysts.forEach(function(cat) {
        var impactClass = cat.impact === "critical" ? "cat-critical" : cat.impact === "high" ? "cat-high" : "cat-medium";
        catalystHTML +=
          '<div class="lt-catalyst ' + impactClass + '">' +
            '<span class="lt-catalyst-date">' + cat.date + '</span>' +
            '<span class="lt-catalyst-event">' + cat.event + '</span>' +
            '<span class="lt-catalyst-impact">' + cat.impact.toUpperCase() + '</span>' +
          '</div>';
      });

      card.innerHTML =
        '<div class="lt-card-header">' +
          '<div class="lt-card-title-row">' +
            '<div class="lt-card-ticker">' +
              '<span class="lt-ticker-sym">' + stock.ticker + '</span>' +
              '<span class="lt-price-now">$' + lastPrice.toFixed(2) + '</span>' +
              '<span class="' + pctClass + ' lt-pct">' + pctSign + totalPct + '% (90D)</span>' +
            '</div>' +
            '<div class="lt-card-badges">' +
              '<span class="badge badge-outline" style="border-color:' + stock.sectorColor + ';color:' + stock.sectorColor + '">' + stock.sector + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="lt-card-meta">' +
            '<span class="lt-ticker-name">' + stock.name + '</span>' +
            '<span class="lt-meta-item">P/E ' + peStr + '</span>' +
            '<span class="lt-meta-item">MCAP ' + stock.mcap + '</span>' +
            '<span class="lt-meta-item">52W ' + stock.yearLow.toFixed(0) + '-' + stock.yearHigh.toFixed(0) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="lt-dormant-box">' +
          '<div class="lt-dormant-label">WHY THIS STOCK</div>' +
          '<div class="lt-dormant-text">' + stock.dormant_reason + '</div>' +
        '</div>' +
        '<div class="lt-chart-canvas-wrap">' +
          '<canvas id="ltChart' + idx + '"></canvas>' +
        '</div>' +
        '<div class="lt-chart-legend">' +
          '<span class="cl-item"><span class="cl-swatch" style="background:#94a3b8"></span>PRICE</span>' +
          '<span class="cl-item"><span class="cl-swatch" style="background:#22c55e"></span>BULL</span>' +
          '<span class="cl-item"><span class="cl-swatch" style="background:#f59e0b"></span>BASE</span>' +
          '<span class="cl-item"><span class="cl-swatch" style="background:#ef4444"></span>BEAR</span>' +
        '</div>' +
        '<div class="lt-scenarios-section">' +
          '<div class="lt-section-label">SCENARIO ANALYSIS</div>' +
          scenarioHTML +
        '</div>' +
        '<div class="lt-catalysts-section">' +
          '<div class="lt-section-label">CATALYST TIMELINE</div>' +
          catalystHTML +
        '</div>';

      grid.appendChild(card);
      buildLongTermChart(idx, stock);
    });
  }

  function buildLongTermChart(idx, stock) {
    var canvas = document.getElementById("ltChart" + idx);
    if (!canvas) return;
    var ctx = canvas.getContext("2d");

    var histDates = stock.history.map(function(h) { return h.d.slice(5); });
    var histClose = stock.history.map(function(h) { return h.c; });

    var predBullDates = stock.prediction_bull.map(function(p) { return p.d.slice(5); });
    var predBullClose = stock.prediction_bull.map(function(p) { return p.c; });
    var predBaseClose = stock.prediction_base.map(function(p) { return p.c; });
    var predBearClose = stock.prediction_bear.map(function(p) { return p.c; });

    var allLabels = histDates.concat(predBullDates);
    var histLen = histDates.length;
    var totalLen = allLabels.length;

    // Historical dataset
    var histDataset = histClose.concat(new Array(predBullDates.length).fill(null));

    // Bull line (bridges from last hist)
    var bullDataset = new Array(histLen - 1).fill(null);
    bullDataset.push(histClose[histLen - 1]);
    bullDataset = bullDataset.concat(predBullClose);

    // Base line
    var baseDataset = new Array(histLen - 1).fill(null);
    baseDataset.push(histClose[histLen - 1]);
    baseDataset = baseDataset.concat(predBaseClose);

    // Bear line
    var bearDataset = new Array(histLen - 1).fill(null);
    bearDataset.push(histClose[histLen - 1]);
    bearDataset = bearDataset.concat(predBearClose);

    // Bull zone fill (upper bound)
    var bullFill = new Array(histLen - 1).fill(null);
    bullFill.push(histClose[histLen - 1]);
    bullFill = bullFill.concat(predBullClose);

    // Bear zone fill (lower bound)
    var bearFill = new Array(histLen - 1).fill(null);
    bearFill.push(histClose[histLen - 1]);
    bearFill = bearFill.concat(predBearClose);

    // Y-axis range
    var allVals = histClose.concat(predBullClose).concat(predBearClose);
    var minY = Math.min.apply(null, allVals);
    var maxY = Math.max.apply(null, allVals);
    var padding = (maxY - minY) * 0.1;

    // Scenario target annotations
    var annotations = {};
    stock.scenarios.forEach(function(sc, i) {
      var color = i === 0 ? "#22c55e" : i === 1 ? "#f59e0b" : "#ef4444";
      annotations["target" + i] = {
        type: "line",
        yMin: sc.target,
        yMax: sc.target,
        borderColor: color,
        borderWidth: 1,
        borderDash: [4, 4],
        label: {
          display: true,
          content: "$" + sc.target,
          position: "end",
          color: color,
          font: { family: "'JetBrains Mono'", size: 9, weight: "700" },
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: 1,
          padding: { top: 2, bottom: 2, left: 4, right: 4 }
        }
      };
    });

    // Vertical line at prediction boundary
    annotations.predBoundary = {
      type: "line",
      xMin: histLen - 1,
      xMax: histLen - 1,
      borderColor: "rgba(148,163,184,0.3)",
      borderWidth: 1,
      borderDash: [3, 3],
      label: {
        display: true,
        content: "NOW",
        position: "start",
        color: "#94a3b8",
        font: { family: "'JetBrains Mono'", size: 8 },
        backgroundColor: "transparent"
      }
    };

    new Chart(ctx, {
      type: "line",
      data: {
        labels: allLabels,
        datasets: [
          {
            label: "Price",
            data: histDataset,
            borderColor: "#94a3b8",
            backgroundColor: "transparent",
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.1,
            order: 1
          },
          {
            label: "Bull",
            data: bullDataset,
            borderColor: "#22c55e",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [6, 3],
            pointRadius: 0,
            tension: 0.3,
            order: 2
          },
          {
            label: "Base",
            data: baseDataset,
            borderColor: "#f59e0b",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [6, 3],
            pointRadius: 0,
            tension: 0.3,
            order: 3
          },
          {
            label: "Bear",
            data: bearDataset,
            borderColor: "#ef4444",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [6, 3],
            pointRadius: 0,
            tension: 0.3,
            order: 4
          },
          {
            label: "Bull Zone",
            data: bullFill,
            borderColor: "transparent",
            backgroundColor: "rgba(34,197,94,0.08)",
            fill: "+1",
            pointRadius: 0,
            tension: 0.3,
            order: 5
          },
          {
            label: "Bear Zone",
            data: bearFill,
            borderColor: "transparent",
            backgroundColor: "rgba(239,68,68,0.08)",
            fill: false,
            pointRadius: 0,
            tension: 0.3,
            order: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: {
          mode: "index",
          intersect: false
        },
        plugins: {
          legend: { display: false },
          annotation: {
            annotations: annotations
          },
          tooltip: {
            backgroundColor: "rgba(15,23,42,0.95)",
            titleFont: { family: "'JetBrains Mono'", size: 10 },
            bodyFont: { family: "'JetBrains Mono'", size: 10 },
            borderColor: "rgba(148,163,184,0.2)",
            borderWidth: 1,
            callbacks: {
              label: function(ctx2) {
                if (ctx2.raw === null) return null;
                return ctx2.dataset.label + ": $" + ctx2.raw.toFixed(2);
              }
            }
          },
          filler: { propagate: true }
        },
        scales: {
          x: {
            grid: { color: "rgba(148,163,184,0.06)" },
            ticks: {
              color: "#64748b",
              font: { family: "'JetBrains Mono'", size: 8 },
              maxRotation: 45,
              autoSkip: true,
              maxTicksLimit: 12
            }
          },
          y: {
            min: minY - padding,
            max: maxY + padding,
            grid: { color: "rgba(148,163,184,0.06)" },
            ticks: {
              color: "#64748b",
              font: { family: "'JetBrains Mono'", size: 9 },
              callback: function(val) { return "$" + val.toFixed(0); }
            }
          }
        }
      },
      plugins: [
        {
          id: "ltPredZone",
          beforeDraw: function(chart) {
            var meta = chart.getDatasetMeta(0);
            if (!meta.data || meta.data.length < histLen) return;
            var xPixel = meta.data[histLen - 1].x;
            var area = chart.chartArea;
            var drawCtx = chart.ctx;
            drawCtx.save();
            drawCtx.fillStyle = "rgba(148,163,184,0.03)";
            drawCtx.fillRect(xPixel, area.top, area.right - xPixel, area.bottom - area.top);
            drawCtx.restore();
          }
        }
      ]
    });
  }


  function safeRender(name, fn) {
    try { fn(); } catch(e) { console.warn('[CIELO] ' + name + ' skipped:', e.message); }
  }

  function init() {
    // New overview sections
    safeRender('liveTicker', renderLiveTicker);
    safeRender('tradeOfDay', renderTradeOfDay);
    safeRender('predictionSummary', renderPredictionSummary);
    safeRender('stocksToWatch', renderStocksToWatch);
    safeRender('sectorRadar', renderSectorRadar);

    // Forecast section (hero)
    safeRender('directionCards', renderDirectionCards);
    safeRender('yieldCurveChart', renderYieldCurveChart);
    safeRender('keyLevelChart', renderKeyLevelChart);
    safeRender('stockPicks', renderStockPicks);

    // Overview
    safeRender('kpis', renderKPIs);
    safeRender('marketMovers', renderMarketMovers);
    safeRender('signalFeed', renderSignalFeed);
    safeRender('overviewTrades', renderOverviewTrades);

    // Markets
    safeRender('tickerTape', renderTickerTape);
    safeRender('spyChart', renderSPYChart);
    safeRender('sectorChart', renderSectorChart);
    safeRender('fullTickerTable', renderFullTickerTable);

    // Contracts (enhanced)
    safeRender('contractsSummary', renderContractsSummary);
    safeRender('contractsTable', renderContractsTable);
    safeRender('contractorsBarChart', renderContractorsBarChart);
    safeRender('agencyDoughnutChart', renderAgencyDoughnutChart);

    // Legislation
    safeRender('billsTable', renderBillsTable);
    safeRender('fedRegTable', renderFedRegTable);

    // Geopolitics
    safeRender('eventTimeline', renderEventTimeline);
    safeRender('geoMap', function() { renderWorldMap("geoMapSvg"); });

    // World Map (enhanced)
    safeRender('worldMap', function() { renderWorldMap("worldMapSvg"); });
    safeRender('threatList', renderThreatList);
    safeRender('shippingStats', renderShippingStats);
    safeRender('chokepointGrid', renderChokepointGrid);

    // X Signals
    safeRender('xSignals', function() { renderXSignals("all"); });

    // Trades
    safeRender('fullTrades', renderFullTrades);

    // New API integrations
    safeRender('insiderTrades', renderInsiderTrades);
    safeRender('macroIndicators', renderMacroIndicators);
    safeRender('wsbSentiment', renderWSBSentiment);
    safeRender('weatherAlerts', renderWeatherAlerts);

    // Macro Intelligence view
    safeRender('nationalDebt', renderNationalDebt);
    safeRender('deficitChart', renderDeficitChart);
    safeRender('defenseSpending', renderDefenseSpending);
    safeRender('interestRates', renderInterestRates);
    safeRender('gdpForecasts', renderGDPForecasts);
    safeRender('cpiTracker', renderCPITracker);
    safeRender('earningsCalendar', renderEarningsCalendar);

    // Prediction Charts
    safeRender('predictionCharts', renderPredictionCharts);

    // Long-Term Prediction Charts
    safeRender('longTermCharts', renderLongTermCharts);

    // Hash routing
    handleHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// ============================
// SUBSCRIBE HANDLER
// ============================
var SUBSCRIBE_API = ''; // Will be set to Google Apps Script Web App URL
var _cieloSubs = []; // in-memory subscriber list (session only)

function handleSubscribe(e) {
  e.preventDefault();
  var email = document.getElementById('subscribeEmail').value.trim().toLowerCase();
  var btn = document.getElementById('subscribeBtn');
  var btnText = btn.querySelector('.subscribe-btn-text');
  var btnLoading = btn.querySelector('.subscribe-btn-loading');
  var status = document.getElementById('subscribeStatus');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = '// ERROR: INVALID EMAIL FORMAT';
    status.className = 'subscribe-status error';
    return false;
  }

  if (_cieloSubs.indexOf(email) !== -1) {
    status.textContent = '// ALREADY SUBSCRIBED: ' + email.toUpperCase();
    status.className = 'subscribe-status info';
    return false;
  }

  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  btn.disabled = true;
  status.textContent = '// PROCESSING...';
  status.className = 'subscribe-status info';

  // If API endpoint is configured, send to Google Apps Script
  if (SUBSCRIBE_API) {
    fetch(SUBSCRIBE_API, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    })
    .then(function() { completeSubscribe(email, btn, btnText, btnLoading, status); })
    .catch(function() { completeSubscribe(email, btn, btnText, btnLoading, status); });
  } else {
    // No API yet -- show success after brief delay
    setTimeout(function() {
      completeSubscribe(email, btn, btnText, btnLoading, status);
    }, 800);
  }

  return false;
}

function completeSubscribe(email, btn, btnText, btnLoading, status) {
  if (_cieloSubs.indexOf(email) === -1) _cieloSubs.push(email);
  btnText.textContent = 'SUBSCRIBED';
  btnText.style.display = 'inline';
  btnLoading.style.display = 'none';
  status.textContent = '// CONFIRMED: ' + email.toUpperCase() + ' ADDED TO DAILY BRIEFING';
  status.className = 'subscribe-status success';
  document.getElementById('subscribeEmail').value = '';
  setTimeout(function() { btnText.textContent = 'SUBSCRIBE'; btn.disabled = false; }, 3000);
}
