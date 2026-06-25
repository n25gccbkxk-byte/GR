#!/usr/bin/env bash
# The Real LSAT of Atlanta -- local launcher for macOS.
#
# Double-click this file in Finder to launch the app:
#   1. Starts a local server in this folder
#   2. Opens the app at http://localhost:8765 in Safari
#   3. Close the Terminal window (or press Ctrl+C) to stop the server.
#
# Requires Python 3 (preinstalled on modern macOS; if missing, the
# script will tell you where to get it).

set -u
cd "$(dirname "$0")"

PORT=8765
URL="http://localhost:${PORT}"

# --- Find Python 3 ----------------------------------------------------
PY=""
if command -v python3 >/dev/null 2>&1; then
  PY=python3
elif command -v python >/dev/null 2>&1; then
  if python -c 'import sys; sys.exit(0 if sys.version_info[0] == 3 else 1)' 2>/dev/null; then
    PY=python
  fi
fi

if [ -z "${PY}" ]; then
  echo "------------------------------------------------------------"
  echo "  Python 3 is required to run the local server."
  echo "  Install it from https://www.python.org/downloads/macos/"
  echo "  or run:  xcode-select --install"
  echo "------------------------------------------------------------"
  read -r -p "Press Return to close..." _ || true
  exit 1
fi

# --- Pick an open port (try up to 10 above default) -------------------
attempts=0
while lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
  URL="http://localhost:${PORT}"
  attempts=$((attempts + 1))
  if [ "${attempts}" -gt 10 ]; then
    echo "Could not find an open port near 8765. Close other servers and try again."
    read -r -p "Press Return to close..." _ || true
    exit 1
  fi
done

# --- Cleanly stop the server on exit ----------------------------------
SERVER_PID=""
cleanup() {
  if [ -n "${SERVER_PID}" ]; then
    kill "${SERVER_PID}" 2>/dev/null || true
    wait "${SERVER_PID}" 2>/dev/null || true
  fi
  echo ""
  echo "Server stopped. You can close this window."
}
trap cleanup EXIT INT TERM

# --- Banner -----------------------------------------------------------
cat <<EOF

  ============================================================
   The Real LSAT of Atlanta
   Local server: ${URL}
   Press Ctrl+C or close this window to stop the server.
  ============================================================

EOF

# --- Start the server and open Safari ---------------------------------
"${PY}" -m http.server "${PORT}" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER_PID=$!

# Give the server a moment to bind before opening the browser
sleep 0.6

if [ -d "/Applications/Safari.app" ]; then
  open -a Safari "${URL}" 2>/dev/null || open "${URL}"
else
  open "${URL}"
fi

# Keep the script alive while the server runs in the background
wait "${SERVER_PID}"
