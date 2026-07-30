# Sandur Fresh API

Quick-commerce backend (rapid grocery / essentials delivery) built with:

- **Bun** + TypeScript (strict)
- **Hono** HTTP framework
- **Drizzle ORM** + SQLite (`bun:sqlite`)
- **Zod** validation
- **GraphQL Yoga** + **drizzle-graphql** (catalog reads + custom service-backed mutations)

## Architecture

Three-layer flow only:

```
Router → Handler → Service → Repository → DB
```

- Services return `Result<T, DomainError>` (no expected throws)
- Repositories are the only place Drizzle queries live
- GraphQL critical paths call the **same services** as REST (no CRUD bypass for cart/orders/inventory)

## Environments & Deployment

The API supports dual runtime execution:

1. **Cloudflare Workers (Edge / Production)**
   - Database: **Cloudflare D1** (`drizzle-orm/d1`) via `DB` binding
   - Storage: **Cloudflare R2** (`BUCKET` binding) for product images
   - Password Hashing: Universal WebCrypto bcrypt (`bcrypt-ts`)
   - Development server: `bun run worker:dev` (or `moon run api:worker-dev`)
   - Deployment: `bun run worker:deploy` (or `moon run api:deploy`)

2. **Local Bun Server (Development / Testing / Scripting)**
   - Database: Local SQLite file via `bun:sqlite` with `DATABASE_PATH`
   - Storage: Local filesystem (`UPLOAD_DIR`, default `./data/uploads`)
   - Development server: `bun run dev` (or `moon run api:run`)
   - Tests: `bun test` (or `moon run api:test`)

## Setup

### Prerequisites

- [Bun](https://bun.sh) (latest)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (included in devDependencies)

### Install

```sh
cp .env.example .env
bun install
```

### Database (Local Bun)

SQLite file is created automatically under `data/` (or `DATABASE_PATH`).

```sh
bun run --cwd packages/db db:generate
bun run --cwd packages/db db:migrate
```

### Initial Admin Setup

When starting with a fresh database instance:
1. Ensure `ADMIN_SETUP_SECRET` is set in your environment (defaults to `sandur-admin-setup-secret` for local development).
2. Open the Admin Console at `/setup`.
3. Provide the `ADMIN_SETUP_SECRET`, name, phone, email, and password to provision the master administrator account.
4. Once created, add categories, products, stores, and inventory directly within the admin console.

### Database (Cloudflare D1)

```sh
# Apply migrations to remote D1
bun x wrangler d1 migrations apply sandur-fresh-db --remote

# Apply migrations to local D1 preview
bun x wrangler d1 migrations apply sandur-fresh-db --local
```

### Run

- **Bun local dev**: `bun run dev` (http://localhost:3000)
- **Cloudflare Worker dev**: `bun run worker:dev` (http://localhost:8787)

## Scripts


| Script | Description |
|--------|-------------|
| `bun run dev` | Hot-reload server |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run lint` | Biome check (lint + format) |
| `bun run lint:fix` | Biome auto-fix |
| `bun run format` | Biome format |
| `bun test` | Unit tests |
| `bun run db:generate` | Generate migrations |
| `bun run db:migrate` | Apply migrations |
| `bun run db:studio` | Drizzle Studio |


## Auth (phone / OTP)

1. `POST /api/v1/auth/otp/request` `{ "phone": "+919876543210" }`
2. `POST /api/v1/auth/otp/verify` `{ "phone": "+919876543210", "code": "000000" }`
3. Use `Authorization: Bearer <token>` on protected routes

In non-production, `DEV_OTP` (default `000000`) is always accepted.

Seeded phones:

- Customer: `+919876543210`
- Admin: `+919999999999`

## REST (v1)

Base: `/api/v1`

| Method | Path | Notes |
|--------|------|-------|
| GET | `/health` | DB connectivity |
| POST | `/auth/otp/request` | |
| POST | `/auth/otp/verify` | returns token |
| GET/PATCH | `/me` | auth |
| GET/POST | `/me/addresses` | auth |
| PATCH/DELETE | `/me/addresses/:id` | auth |
| GET | `/categories` | |
| GET | `/products` | `page`, `limit`, `categoryId`, `q`, `storeId` |
| GET | `/products/:id` | |
| GET | `/stores` | |
| GET | `/stores/:id/inventory` | |
| GET/DELETE | `/cart` | auth |
| POST | `/cart/items` | auth; server recalculates prices |
| PATCH/DELETE | `/cart/items/:id` | auth |
| POST | `/orders` | auth + **`Idempotency-Key` header** |
| GET | `/orders` | auth |
| GET | `/orders/:id` | auth |
| POST | `/orders/:id/cancel` | auth |
| PATCH | `/orders/:id/status` | **admin** |
| GET | `/delivery/serviceability` | `lat`+`lng` or `addressId` |
| GET | `/delivery/slots` | auth + `addressId` |

### Envelopes

Success:

```json
{ "data": { } }
```

List:

```json
{ "data": [], "meta": { "page": 1, "limit": 20, "total": 0 } }
```

Error:

```json
{ "error": { "code": "NOT_FOUND", "message": "..." }, "requestId": "..." }
```

Money fields are integer **paise** (₹1 = 100).

## GraphQL

Endpoint: `POST/GET /graphql`

- Catalog tables (`products`, `categories`, `stores`) expose **read** queries from drizzle-graphql (list limits capped)
- **No** auto-generated insert/update/delete for orders, cart, or inventory
- Custom mutations/queries delegate to services: `addToCart`, `checkout`, `cancelOrder`, `updateOrderStatus`, `myCart`, `myOrders`, `checkServiceability`, `availableDeliverySlots`, `updateProfile`, `addAddress`

Pass the same Bearer token. GraphiQL/introspection follows `GRAPHQL_INTROSPECTION` / non-production defaults.

## Order lifecycle

```
PLACED → PACKED → OUT_FOR_DELIVERY → DELIVERED
   └──────┴──────── CANCELLED (where allowed)
```

Invalid transitions return `CONFLICT` (HTTP 409 / GraphQL `extensions.code`).

Checkout decrements stock and creates the order in a **single DB transaction**.

## Project layout

See `src/modules/*` for domain modules and `src/graphql/` for Yoga + custom resolvers.
