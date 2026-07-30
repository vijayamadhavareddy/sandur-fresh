# Sandur Fresh Admin

Vue admin PWA for catalog, inventory, orders, stores, and daily operations.

## Setup

Install workspace dependencies once from the repository root with `bun install`.

Set `VITE_GRAPHQL_URL` to override the default `/graphql` browser endpoint. Set `VITE_API_URL` to the same API origin for image uploads when deploying cross-origin. The API uses `DATABASE_PATH`, `ADMIN_SESSION_COOKIE`, `UPLOAD_DIR`, and `UPLOAD_MAX_BYTES`; see `apps/api/.env.example`.

Provision the development administrator via the Setup Page on first launch at `http://localhost:5173/setup` using the configured `ADMIN_SETUP_SECRET`.


## Codegen

Export the API schema, then generate the client whenever the backend schema or operations change:

```sh
DATABASE_PATH=/absolute/path/to.db bun run --cwd apps/api graphql:schema
bun run --cwd apps/admin codegen
```

`VITE_GRAPHQL_SCHEMA` can override the default `apps/api/schema.graphql` input.

## Run

- Development: `moon run admin:dev`
- Typecheck: `moon run admin:typecheck`
- Production build: `moon run admin:build`
- Lint: `bun run --cwd apps/admin lint`

The Vite server proxies `/api` and `/graphql` to `http://localhost:3000`. Authentication uses HTTP-only cookies, so the API must permit credentialed requests when hosted cross-origin.

## Cloudflare Pages Deployment

Deploy directly from Git or via Wrangler:

- **Framework preset**: None / Vue.js / Vite
- **Build command**: `bun run --cwd apps/admin build` (or root `moon run admin:build`)
- **Build output directory**: `apps/admin/dist`
- **Node/Bun version**: Bun 1.x or Node.js 22+

### Routing & Headers
- `public/_redirects`: Configured with `/* /index.html 200` to support Vue Router HTML5 history mode across all deep links.
- `public/_headers`: Pre-configured for immutable caching of hashed `/assets/*` and proper revalidation of service workers (`sw.js`, `firebase-messaging-sw.js`).

### Environment Variables
Set the following variables in Cloudflare Pages dashboard under **Settings > Environment variables**:
- `VITE_GRAPHQL_URL`: URL to your Cloudflare Worker GraphQL endpoint (e.g. `https://api.example.com/graphql` or `/graphql` if proxied on the same domain).
- `VITE_API_URL`: Base URL to your Cloudflare Worker REST API (e.g. `https://api.example.com` or empty for same domain).
- `VITE_FIREBASE_VAPID_KEY`: (Optional) Web Push public key for FCM push notifications.

