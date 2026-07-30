# syntax=docker/dockerfile:1
# --- Build Stage ---
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy monorepo workspace configuration and dependency manifests
COPY package.json bun.lock tsconfig.json tsconfig.options.json ./
COPY apps/admin/package.json ./apps/admin/

# Install workspace dependencies
RUN bun install --frozen-lockfile

# Copy admin source code
COPY apps/admin ./apps/admin

# Build-time environment variables for Vite
ARG VITE_API_URL=""
ARG VITE_GRAPHQL_URL="/graphql"
ARG VITE_FIREBASE_VAPID_KEY=""

ENV VITE_API_URL=$VITE_API_URL \
    VITE_GRAPHQL_URL=$VITE_GRAPHQL_URL \
    VITE_FIREBASE_VAPID_KEY=$VITE_FIREBASE_VAPID_KEY

# Build the production PWA bundle
RUN bun run --cwd apps/admin build

# --- Runtime Stage ---
FROM nginx:alpine AS runner

# Copy built static files from builder stage
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

# Copy Nginx server configuration
COPY apps/admin/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
