# syntax=docker/dockerfile:1
FROM oven/bun:1-alpine AS base

WORKDIR /app

# Copy monorepo workspace configuration and dependency manifests
COPY package.json bun.lock tsconfig.json tsconfig.options.json ./
COPY packages/db/package.json ./packages/db/
COPY apps/api/package.json ./apps/api/

# Install workspace dependencies
RUN bun install --frozen-lockfile

# Copy packages and api source code
COPY packages/db ./packages/db
COPY apps/api ./apps/api

# Set permissions for entrypoint script
RUN chmod +x ./apps/api/docker-entrypoint.sh

# Default runtime configuration
ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_PATH=/app/data/sandur.db \
    UPLOAD_DIR=/app/data/uploads

# Create persistent storage directories
RUN mkdir -p /app/data /app/data/uploads

EXPOSE 3000

ENTRYPOINT ["./apps/api/docker-entrypoint.sh"]
CMD ["bun", "run", "--cwd", "apps/api", "start"]
