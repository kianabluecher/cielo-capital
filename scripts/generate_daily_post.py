#!/usr/bin/env python3
"""Generate the daily CIELO Capital blog post: market news + a summary of predictions.

Two modes:
  * Claude mode (ANTHROPIC_API_KEY set): researches today's news with the web search
    tool, grades yesterday's call, and writes a fresh post.
  * Template mode (no key, or --template): builds a post from the dashboard's
    DATA object in site/app.js, dated to that snapshot's timestamp.

Output:
  site/blog/posts/<YYYY-MM-DD>.json   one file per post
  site/blog/index.json                newest-first list the Blog view reads
"""

import argparse
import datetime as dt
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
APP_JS = SITE / "app.js"
BLOG = SITE / "blog"
POSTS = BLOG / "posts"
INDEX = BLOG / "index.json"

MODEL = "claude-opus-5-5"
FALLBACK_BETA = "server-side-fallback-2026-07-01"

SENTIMENTS = ["BULLISH", "CAUTIOUS BULLISH", "NEUTRAL", "CAUTIOUS BEARISH", "BEARISH", "EXTREME FEAR"]

POST_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "required": ["title", "excerpt", "sentiment", "snapshot", "news", "predictions",
                 "trade_idea", "watchlist", "scorecard", "sources"],
    "properties": {
        "title": {"type": "string"},
        "excerpt": {"type": "string"},
        "sentiment": {"type": "string", "enum": SENTIMENTS},
        "snapshot": {
            "type": "array",
            "items": {
                "type": "object", "additionalProperties": False,
                "required": ["label", "value", "change"],
                "properties": {"label": {"type": "string"}, "value": {"type": "string"},
                               "change": {"type": "string"}},
            },
        },
        "news": {
            "type": "array",
            "items": {
                "type": "object", "additionalProperties": False,
                "required": ["headline", "detail", "impact", "source_url"],
                "properties": {
                    "headline": {"type": "string"},
                    "detail": {"type": "string"},
                    "impact": {"type": "string", "enum": ["CRITICAL", "HIGH", "MODERATE", "LOW"]},
                    "source_url": {"type": "string"},
                },
            },
        },
        "predictions": {
            "type": "object", "additionalProperties": False,
            "required": ["direction", "confidence", "horizon", "summary", "bull_case",
                         "bear_case", "key_levels"],
            "properties": {
                "direction": {"type": "string", "enum": ["BULLISH", "NEUTRAL", "BEARISH"]},
                "confidence": {"type": "string", "enum": ["HIGH", "MODERATE", "LOW"]},
                "horizon": {"type": "string"},
                "summary": {"type": "string"},
                "bull_case": {"type": "string"},
                "bear_case": {"type": "string"},
                "key_levels": {"type": "string"},
            },
        },
        "trade_idea": {
            "type": "object", "additionalProperties": False,
            "required": ["ticker", "name", "action", "entry", "target", "stop", "confidence",
                         "rationale"],
            "properties": {
                "ticker": {"type": "string"}, "name": {"type": "string"},
                "action": {"type": "string"}, "entry": {"type": "string"},
                "target": {"type": "string"}, "stop": {"type": "string"},
                "confidence": {"type": "string", "enum": ["HIGH", "MODERATE", "LOW"]},
                "rationale": {"type": "string"},
            },
        },
        "watchlist": {
            "type": "array",
            "items": {
                "type": "object", "additionalProperties": False,
                "required": ["ticker", "signal", "note"],
                "properties": {"ticker": {"type": "string"}, "signal": {"type": "string"},
                               "note": {"type": "string"}},
            },
        },
        "scorecard": {
            "type": "object", "additionalProperties": False,
            "required": ["previous_call", "outcome", "notes"],
            "properties": {
                "previous_call": {"type": "string"},
                "outcome": {"type": "string", "enum": ["HIT", "MISS", "OPEN", "N/A"]},
                "notes": {"type": "string"},
            },
        },
        "sources": {
            "type": "array",
            "items": {
                "type": "object", "additionalProperties": False,
                "required": ["title", "url"],
                "properties": {"title": {"type": "string"}, "url": {"type": "string"}},
            },
        },
    },
}


# ------------------------------------------------------------------ helpers

def load_dashboard_data():
    """Extract the `const DATA = {...};` object from app.js."""
    src = APP_JS.read_text(encoding="utf-8")
    marker = "const DATA = "
    start = src.index(marker) + len(marker)
    depth, in_str, esc = 0, False, False
    for i in range(start, len(src)):
        c = src[i]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                in_str = False
        elif c == '"':
            in_str = True
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return json.loads(src[start:i + 1])
    raise ValueError("DATA object not terminated in app.js")


def load_index():
    if INDEX.exists():
        return json.loads(INDEX.read_text(encoding="utf-8"))
    return {"updated": None, "posts": []}


def latest_post_before(index, date_str):
    for entry in index["posts"]:
        if entry["date"] < date_str:
            path = POSTS / f"{entry['slug']}.json"
            if path.exists():
                return json.loads(path.read_text(encoding="utf-8"))
    return None


def save_post(post, index):
    POSTS.mkdir(parents=True, exist_ok=True)
    (POSTS / f"{post['slug']}.json").write_text(
        json.dumps(post, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    entry = {k: post[k] for k in ("date", "slug", "title", "excerpt", "sentiment")}
    entry["direction"] = post["predictions"]["direction"]
    posts = [p for p in index["posts"] if p["slug"] != post["slug"]] + [entry]
    posts.sort(key=lambda p: p["date"], reverse=True)
    index = {"updated": post["published_at"], "posts": posts}
    INDEX.write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def _pick(d, *keys, default=""):
    for k in keys:
        if isinstance(d, dict) and d.get(k) not in (None, ""):
            return d[k]
    return default


# ------------------------------------------------------------ template mode

def _truncate(text, limit):
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(" ", 1)[0].rstrip(" .,;:-") + "…"


def build_template_post(data, previous):
    ts = data.get("timestamp", "")
    date_str = ts[:10] if ts else dt.date.today().isoformat()

    snapshot = []
    labels = {
        ("indices", "sp500"): "S&P 500", ("indices", "nasdaq"): "Nasdaq",
        ("indices", "dow"): "Dow", ("commodities", "oil_wti"): "WTI Crude",
        ("commodities", "gold"): "Gold", ("crypto", "btc"): "Bitcoin",
        ("yields", "us10y"): "US 10Y",
    }
    for (group, key), label in labels.items():
        item = data.get(group, {}).get(key)
        if item:
            snapshot.append({"label": label, "value": str(_pick(item, "value", "price")),
                             "change": str(_pick(item, "change"))})

    news = []
    for key, ev in (data.get("geopolitical") or {}).items():
        if isinstance(ev, dict) and ev.get("detail"):
            sig = str(ev.get("signal", "")).upper()
            impact = "CRITICAL" if "CRITICAL" in sig else "HIGH" if "HIGH" in sig else "MODERATE"
            news.append({"headline": f"{key.replace('_', ' ').title()}: {ev.get('status', '')}".strip(": "),
                         "detail": ev["detail"], "impact": impact, "source_url": ""})
    for line in (data.get("unique_intelligence") or [])[:4]:
        news.append({"headline": line.split(" -- ")[0][:120], "detail": line,
                     "impact": "MODERATE", "source_url": ""})

    lt = data.get("long_term_prediction", {}).get("scenarios", {})
    tod = data.get("trade_of_day", {})
    top = data.get("top_prediction", "")
    direction = "NEUTRAL"
    upper = (top + " " + data.get("weekly_prediction", "")).upper()
    if "BULLISH" in upper and "BEARISH" not in upper:
        direction = "BULLISH"
    elif "BEARISH" in upper and "BULLISH" not in upper:
        direction = "BEARISH"

    kl = data.get("key_levels", {})
    key_levels = " | ".join(f"{k.replace('_', ' ').upper()}: {v}" for k, v in kl.items())

    headline = top.split(".")[0].strip() or "Daily market brief"
    return {
        "date": date_str,
        "slug": date_str,
        "published_at": ts or dt.datetime.now(dt.timezone.utc).isoformat(),
        "generated_by": "template",
        "title": headline.title() if headline.isupper() else headline,
        "excerpt": _truncate(data.get("market_summary") or top, 280),
        "sentiment": "NEUTRAL",
        "snapshot": snapshot,
        "news": news[:8],
        "predictions": {
            "direction": direction,
            "confidence": "MODERATE",
            "horizon": "1-3 days",
            "summary": top or data.get("weekly_prediction", ""),
            "bull_case": _pick(lt.get("bull_case", {}), "thesis"),
            "bear_case": _pick(lt.get("bear_case", {}), "thesis"),
            "key_levels": key_levels,
        },
        "trade_idea": {
            "ticker": tod.get("ticker", ""), "name": tod.get("name", ""),
            "action": tod.get("action", ""), "entry": tod.get("entry", ""),
            "target": tod.get("target", ""), "stop": tod.get("stop", ""),
            "confidence": tod.get("confidence", "MODERATE"),
            "rationale": _pick(tod, "thesis", "rationale"),
        },
        "watchlist": [{"ticker": w.get("ticker", ""), "signal": w.get("signal", ""),
                       "note": w.get("note", "")} for w in data.get("watchlist", [])[:8]],
        "scorecard": {
            "previous_call": previous["trade_idea"]["ticker"] + " " + previous["trade_idea"]["action"]
            if previous else "",
            "outcome": "N/A", "notes": "Automated grading requires Claude mode.",
        },
        "sources": [],
    }


# -------------------------------------------------------------- Claude mode

SYSTEM_PROMPT = """You are the head analyst at Cielo Capital, writing the daily public brief for \
swing traders (1-3 day horizon, with a 1-3 month backdrop).

House view: prioritise non-obvious, forward-looking signals (government contracts, \
congressional and insider trades, unusual options activity, shipping chokepoints, Fed and \
energy-official statements, cross-asset moves) over generic recaps. Every claim about a price, \
level or event must come from a source you found today; if you could not confirm a number, \
say so rather than estimating it. Trade ideas need an entry range, target and stop with at \
least 2:1 reward-to-risk and at least three supporting data points. Be candid when a prior \
call missed."""


def research(client, date_str, dashboard, previous):
    prev_block = json.dumps({k: previous[k] for k in ("date", "predictions", "trade_idea")},
                            indent=2) if previous else "None - this is the first post."
    dash_block = json.dumps({k: dashboard.get(k) for k in (
        "timestamp", "top_prediction", "trade_of_day", "key_levels", "watchlist")}, indent=2)

    prompt = f"""Today is {date_str} (UTC). Research and draft today's brief.

1. Search for the latest closes / levels: S&P 500, Nasdaq, Dow, VIX, CNN Fear & Greed, \
WTI and Brent, gold, 10Y yield, Bitcoin.
2. Find the 5-8 most market-relevant stories from the last 24 hours (macro data, Fed, \
geopolitics, earnings, policy, notable unusual options / insider / congressional activity).
3. Grade the previous published call below against what actually happened (HIT, MISS or \
OPEN if still live), with numbers.
4. Give your 1-3 day market prediction (direction, confidence, bull case, bear case, key \
levels), one trade idea, and a 4-6 name watchlist.

Write a thorough research brief in prose with the source URL after each fact. It will be \
turned into a structured post in a second step.

Previous published call:
{prev_block}

Last dashboard snapshot (may be stale - treat as background, verify before reusing):
{dash_block}"""

    messages = [{"role": "user", "content": prompt}]
    tools = [{"type": "web_search_20260209", "name": "web_search", "max_uses": 20}]
    seen_sources = {}

    for _ in range(6):  # pause_turn continuations
        with client.beta.messages.stream(
            model=MODEL,
            max_tokens=64000,
            system=SYSTEM_PROMPT,
            thinking={"type": "adaptive"},
            output_config={"effort": "high"},
            tools=tools,
            messages=messages,
            betas=[FALLBACK_BETA],
            fallbacks="default",
        ) as stream:
            response = stream.get_final_message()

        for block in response.content:
            if block.type == "web_search_tool_result" and isinstance(block.content, list):
                for r in block.content:
                    if getattr(r, "url", None):
                        seen_sources.setdefault(r.url, getattr(r, "title", "") or r.url)

        if response.stop_reason == "refusal":
            raise RuntimeError(f"Research request declined: {response.stop_details}")
        if response.stop_reason == "pause_turn":
            messages.append({"role": "assistant", "content": response.content})
            continue
        break
    else:
        raise RuntimeError("Research did not finish after repeated pause_turn continuations")

    brief = "\n".join(b.text for b in response.content if b.type == "text").strip()
    if not brief:
        raise RuntimeError(f"Research returned no text (stop_reason={response.stop_reason})")
    return brief, seen_sources


def structure(client, date_str, brief):
    prompt = f"""Convert this research brief for {date_str} into the blog post JSON.

- title: sharp, specific headline (no date, no clickbait).
- excerpt: 1-2 sentence summary for the blog index.
- snapshot: the key market levels you have confirmed values for.
- news: 5-8 items, most important first; source_url must be a URL cited in the brief, or "".
- predictions / trade_idea / watchlist: from the brief's forecast section.
- scorecard: the grade of the previous call; outcome N/A if there was no previous call.
- sources: every distinct URL cited in the brief with a short title.

Brief:
{brief}"""
    response = client.beta.messages.create(
        model=MODEL,
        max_tokens=16000,
        thinking={"type": "adaptive"},
        output_config={"effort": "medium",
                       "format": {"type": "json_schema", "schema": POST_SCHEMA}},
        messages=[{"role": "user", "content": prompt}],
        betas=[FALLBACK_BETA],
        fallbacks="default",
    )
    if response.stop_reason == "refusal":
        raise RuntimeError(f"Formatting request declined: {response.stop_details}")
    if response.stop_reason == "max_tokens":
        raise RuntimeError("Formatting response hit max_tokens")
    text = next(b.text for b in response.content if b.type == "text")
    return json.loads(text)


def build_claude_post(date_str, dashboard, previous):
    import anthropic

    client = anthropic.Anthropic()
    brief, seen = research(client, date_str, dashboard, previous)
    post = structure(client, date_str, brief)

    # Only keep links that actually came back from web search.
    post["sources"] = [s for s in post["sources"] if s["url"] in seen] or \
        [{"title": t, "url": u} for u, t in list(seen.items())[:12]]
    for item in post["news"]:
        if item["source_url"] not in seen:
            item["source_url"] = ""

    post.update({
        "date": date_str,
        "slug": date_str,
        "published_at": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "generated_by": "claude",
    })
    return post


# --------------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--template", action="store_true", help="build from site/app.js DATA, no API calls")
    ap.add_argument("--date", help="post date (YYYY-MM-DD, Claude mode only); default today UTC")
    ap.add_argument("--force", action="store_true", help="overwrite an existing post for the date")
    args = ap.parse_args()

    index = load_index()
    dashboard = load_dashboard_data()
    use_claude = not args.template and bool(os.environ.get("ANTHROPIC_API_KEY"))

    if use_claude:
        date_str = args.date or dt.datetime.now(dt.timezone.utc).date().isoformat()
    else:
        if not args.template:
            print("ANTHROPIC_API_KEY not set - falling back to template mode.", file=sys.stderr)
        date_str = (dashboard.get("timestamp") or "")[:10] or dt.date.today().isoformat()

    if (POSTS / f"{date_str}.json").exists() and not args.force:
        print(f"Post for {date_str} already exists; nothing to do (use --force to regenerate).")
        return 0

    previous = latest_post_before(index, date_str)
    if use_claude:
        post = build_claude_post(date_str, dashboard, previous)
    else:
        post = build_template_post(dashboard, previous)

    save_post(post, index)
    print(f"Wrote site/blog/posts/{post['slug']}.json ({post['generated_by']}): {post['title']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
