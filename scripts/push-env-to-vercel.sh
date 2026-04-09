#!/usr/bin/env bash
# Push variables from a local env file to Vercel (default: .env.local → Production).
#
# Prerequisites:
#   1. vercel login   (or VERCEL_TOKEN with env write scope)
#   2. vercel link    (creates .vercel/project.json; already gitignored)
#
# Usage:
#   bash scripts/push-env-to-vercel.sh [.env.local]
#
# Optional: comma-separated targets (default production only)
#   VERCEL_ENV_TARGETS=production,preview bash scripts/push-env-to-vercel.sh
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ENV_FILE="${1:-.env.local}"
VERCEL_CMD="${VERCEL_CMD:-npx vercel@37.4.0}"
TARGETS="${VERCEL_ENV_TARGETS:-production}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "error: env file not found: $ENV_FILE" >&2
  exit 1
fi

if [[ ! -f .vercel/project.json ]]; then
  echo "error: link this directory to a Vercel project first, e.g.:" >&2
  echo "  pnpm exec vercel link --yes" >&2
  echo "  # or: pnpm exec vercel link -p <your-project-name>" >&2
  exit 1
fi

IFS=',' read -r -a TARGET_ARR <<< "$TARGETS"

while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^[[:space:]]*# ]] && continue
  [[ -z "${line// /}" ]] && continue

  key="${line%%=*}"
  value="${line#*=}"

  if [[ "$key" == "$line" ]]; then
    echo "error: line has no '=': $line" >&2
    exit 1
  fi

  # Trim surrounding whitespace on key (values are used as-is after first '=').
  key="${key#"${key%%[![:space:]]*}"}"
  key="${key%"${key##*[![:space:]]}"}"

  for target in "${TARGET_ARR[@]}"; do
    target="${target#"${target%%[![:space:]]*}"}"
    target="${target%"${target##*[![:space:]]}"}"
    [[ -z "$target" ]] && continue
    echo "→ $key → $target (sensitive)"
    printf "%s" "$value" | $VERCEL_CMD env add "$key" "$target" --sensitive --force
  done
done <"$ENV_FILE"

echo "Done. Check: pnpm exec vercel env ls production"
