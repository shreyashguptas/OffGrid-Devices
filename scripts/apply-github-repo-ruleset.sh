#!/usr/bin/env bash
# Apply (or update) a GitHub repository ruleset so `main` requires PRs + green CI job `quality`.
# Requires: gh CLI, repo admin rights, and a token with rulesets write access.
# Vercel Deployment Checks must still be enabled in the Vercel dashboard (see docs/ci.md).

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PAYLOAD="$ROOT/scripts/config/github-ruleset-main.json"
RULESET_NAME="OffGrid: CI required on main"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: https://cli.github.com/"
  exit 1
fi

if [[ ! -f "$PAYLOAD" ]]; then
  echo "Missing $PAYLOAD"
  exit 1
fi

REPO_SLUG="${GITHUB_REPOSITORY:-$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || true)}"
if [[ -z "$REPO_SLUG" ]]; then
  echo "Could not detect repository. Run from a git clone or set GITHUB_REPOSITORY=owner/repo."
  exit 1
fi

echo "Repository: $REPO_SLUG"
echo "Ruleset payload: $PAYLOAD"

EXISTING_ID="$(
  gh api "repos/${REPO_SLUG}/rulesets" 2>/dev/null \
    | RULESET_NAME="$RULESET_NAME" python3 -c "
import json, os, sys
name = os.environ['RULESET_NAME']
try:
    rulesets = json.load(sys.stdin)
except json.JSONDecodeError:
    sys.exit(0)
if not isinstance(rulesets, list):
    sys.exit(0)
for r in rulesets:
    if r.get('name') == name:
        print(r['id'], end='')
        break
" || true
)"

if [[ -n "${EXISTING_ID}" ]]; then
  echo "Updating ruleset id=$EXISTING_ID"
  gh api "repos/${REPO_SLUG}/rulesets/${EXISTING_ID}" -X PUT --input "$PAYLOAD"
  echo "Done (updated)."
else
  echo "Creating ruleset"
  gh api "repos/${REPO_SLUG}/rulesets" -X POST --input "$PAYLOAD"
  echo "Done (created)."
fi

echo ""
echo "Next: In Vercel → Project → Settings → Deployment Checks, add the GitHub check for job \"quality\" so production traffic waits for CI."
echo "See docs/ci.md → \"Production gating\"."
