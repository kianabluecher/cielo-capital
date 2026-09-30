#!/bin/bash
# Cloudflare Pages Deploy Script for CIELO FORECAST Dashboard
# Called by daily cron after updating app.js.
# Requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID in the environment.
set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN is not set}"
: "${CLOUDFLARE_ACCOUNT_ID:?CLOUDFLARE_ACCOUNT_ID is not set}"
PROJECT_DIR="${PROJECT_DIR:-$(cd "$(dirname "$0")/../site" && pwd)}"

cd "$PROJECT_DIR"
npx wrangler pages deploy . --project-name cielo-forecast --branch production 2>&1
