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

## Setup

### Prerequisites

- [Bun](https://bun.sh) (latest) — includes SQLite via `bun:sqlite` (no separate DB server)

### Install

```sh
cp .env.example .env
# optional: edit DATABASE_PATH (default ./data/sandur.db)

bun install
```

### Database

SQLite file is created automatically under `data/` (or `DATABASE_PATH`).

```sh
bun run db:generate   # after schema changes
bun run db:migrate
bun run db:seed
```

For quick local iteration you can also use `bun run db:push`.

### Run

```sh
bun run dev
# http://localhost:3000
```

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
| `bun run db:seed` | Seed catalog + demo users |
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
