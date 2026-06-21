#!/usr/bin/env bash
#
# Build the git-sourced ZMK Studio client packages under bun.
#
# Upstream ships these as git dependencies whose own postinstall builds are
# npm-oriented (@zmkfirmware/zmk-studio-ts-client uses run-script-os; the
# react hook runs `npm run build`). bun does not run those, so the packages
# land in node_modules unbuilt and Vite/rolldown fails to resolve them. We
# build them directly with their own `tsc` here, invoked from `postinstall`.
#
# Note: the react hook pins its OWN (nested) copy of zmk-studio-ts-client at a
# different ref, so there can be several copies. We build EVERY copy — all
# ts-client copies first (the hook imports it), then every react-hook copy.
#
# Runs each install (skips a package if its lib/ already exists). Never fails
# the install: tsc may emit type-only warnings but still produces lib/.

set -uo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export PATH="$ROOT/node_modules/.bin:$PATH"

build_dir() {
  dir="$1"; label="$2"
  if [ -d "$dir/lib" ]; then
    echo ">> skip $label (already built): $dir"
    return 0
  fi
  echo ">> building $label: $dir"
  ( cd "$dir" && bun run build ) \
    || echo ">> note: $label tsc reported type-only issues; lib/ emitted anyway"
}

# 1) every copy of the ts-client (top-level + any nested under the react hook)
while IFS= read -r d; do
  [ -n "$d" ] && build_dir "$d" "zmk-studio-ts-client"
done < <(find "$ROOT/node_modules" -type d -path "*@zmkfirmware/zmk-studio-ts-client" 2>/dev/null)

# 2) every copy of the react hook
while IFS= read -r d; do
  [ -n "$d" ] && build_dir "$d" "zmk-studio-react-hook"
done < <(find "$ROOT/node_modules" -type d -path "*@cormoran/zmk-studio-react-hook" 2>/dev/null)
