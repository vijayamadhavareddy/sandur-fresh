# Sandur Fresh Admin

Vue admin PWA for catalog, inventory, orders, stores, and daily operations.

## Setup

Install workspace dependencies once from the repository root with `bun install`.

Set `VITE_GRAPHQL_URL` to override the default `/graphql` browser endpoint. Set `VITE_API_URL` to the same API origin for image uploads when deploying cross-origin. The API uses `DATABASE_PATH`, `ADMIN_SESSION_COOKIE`, `UPLOAD_DIR`, and `UPLOAD_MAX_BYTES`; see `apps/api/.env.example`.

Create the development administrator while seeding:

```sh
DATABASE_PATH=/absolute/path/to.db ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD='change-me' bun run --cwd packages/db db:seed
```

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
