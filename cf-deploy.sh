#!/bin/bash
# Cloudflare Pages Deploy Script for CIELO FORECAST Dashboard
# Called by daily cron after updating app.js

CF_TOKEN="uRUVjg3eCZ86aYyY-l-UFpHw3P0OzyjBDiYo7P3e"
CF_ACCOUNT="2430eb30601913a01a903944b8ce3f57"
PROJECT_DIR="/home/user/workspace/forecast-dashboard"

cd "$PROJECT_DIR" && \
CLOUDFLARE_API_TOKEN="$CF_TOKEN" \
CLOUDFLARE_ACCOUNT_ID="$CF_ACCOUNT" \
npx wrangler pages deploy . --project-name cielo-forecast --branch production 2>&1
