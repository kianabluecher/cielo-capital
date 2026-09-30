# Cielo Capital Forecast

The dashboard lives in `site/`, extracted from `CIELO Capital Forecast.zip`. It is a static site: `index.html`, `app.js`, `style.css`.

## Blog: daily news and prediction summary

The **Blog** view (`#blog`, with one post per day at `#blog/YYYY-MM-DD`) shows a daily brief. Each brief has:

- a market snapshot (indices, oil, gold, BTC, 10Y)
- today's top stories, each with a source link
- the 1-3 day prediction: direction, confidence, bull and bear cases, and key levels
- one trade idea, with entry, target and stop
- a watchlist
- a scorecard grading the previous day's call

The files involved:

| Path | Purpose |
|---|---|
| `site/blog.js`, `site/blog.css` | The Blog view. It is kept separate from `app.js` so the daily DATA replacement never touches it. |
| `site/blog/index.json` | Newest-first list of posts |
| `site/blog/posts/<date>.json` | One file per post |
| `scripts/generate_daily_post.py` | Writes the post |
| `.github/workflows/daily-blog.yml` | Runs the script every day at 02:10 UTC (06:10 Dubai), commits the post, and deploys to Cloudflare Pages |

### Setup (GitHub → Settings → Secrets and variables → Actions)

| Secret | Required | Used for |
|---|---|---|
| `ANTHROPIC_API_KEY` | yes | Claude researches the day's news with web search and writes the post |
| `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | optional | Redeploys `site/` to the `cielo-forecast` Pages project after each post |

To publish a post without waiting for the schedule, go to **Actions → Daily blog post → Run workflow**.

### Running locally

```bash
pip install -r scripts/requirements.txt
ANTHROPIC_API_KEY=... python scripts/generate_daily_post.py   # fresh, researched post for today
python scripts/generate_daily_post.py --template             # post from the dashboard DATA snapshot, no API
python -m http.server -d site 8000                           # then open http://localhost:8000/#blog
```

Without an API key, the script uses template mode. That mode dates the post to the dashboard snapshot rather than today, so it never passes stale data off as current.
