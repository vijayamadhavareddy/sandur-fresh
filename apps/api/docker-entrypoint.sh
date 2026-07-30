#!/bin/sh
set -e

# Ensure SQLite and uploads directories exist
if [ -n "$DATABASE_PATH" ]; then
  mkdir -p "$(dirname "$DATABASE_PATH")"
fi

if [ -n "$UPLOAD_DIR" ]; then
  mkdir -p "$UPLOAD_DIR"
fi

# Run migrations if enabled (default: true)
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
  echo "==> Running database migrations..."
  bun run --cwd packages/db db:migrate
fi

exec "$@"

