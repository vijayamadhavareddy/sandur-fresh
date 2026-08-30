# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Sandur Fresh: a quick-commerce (rapid grocery/essentials delivery) monorepo.

- `apps/api` — Hono REST/GraphQL backend (source of truth for business logic), runs on either Bun (local dev, `bun:sqlite`) or Cloudflare Workers (`wrangler`, D1 + R2)
- `apps/admin` — Vue (RC) + Vite PWA admin console, talks to the API only via GraphQL
- `apps/sf_customer` — standalone Flutter/GetX customer mobile app
- `packages/db` — shared Drizzle ORM client and schema, published as `@sf/db`; supports both `bun:sqlite` (local) and Cloudflare D1 (deployed) backends behind one `Db` type

This is a moonrepo workspace (`apps/*`, `packages/*`) backed by Bun workspaces. Install once from the root with `bun install`; never create npm/pnpm/yarn lockfiles. `.moon/toolchains.yml` syncs TypeScript project references/path aliases — keep `moon.yml` task inputs/outputs accurate when adding generated files or build steps.

Run moon commands from the repo root. Project IDs: `api`, `admin`, `db`, `sf_consumer` (note: the Flutter folder is named `sf_customer` but its moon project id is `sf_consumer`). Moon tasks come **only** from each project's `moon.yml` — package.json scripts are not automatically moon tasks.

## Commands

**Database** — always pass the same `DATABASE_PATH` to every command below (API, migrations, seed); defaults disagree across the codebase and `packages/db/src/client.ts` has no fallback, so relative paths resolve from the invoking command's cwd.

```sh
DATABASE_PATH=/absolute/path/to.db moon run db:generate   # after editing packages/db/src/schema/*; commit the generated migrations
DATABASE_PATH=/absolute/path/to.db moon run db:migrate     # apply migrations
DATABASE_PATH=/absolute/path/to.db moon run db:push        # disposable local iteration only, skip for real changes
DATABASE_PATH=/absolute/path/to.db moon run db:seed        # seed catalog + demo users/admin
moon run db:studio
moon run db:lint
moon run db:typecheck
```

**API**

```sh
DATABASE_PATH=/absolute/path/to.db moon run api:run   # hot-reload dev server, http://localhost:3000
bun run --cwd apps/api lint
bun run --cwd apps/api typecheck
bun --cwd apps/api test                    # all tests
bun --cwd apps/api test tests/pricing.test.ts   # single file
bun run --cwd apps/api graphql:schema      # export apps/api/schema.graphql (needed before admin codegen)
bun run --cwd apps/api worker:dev          # run against wrangler (D1/R2 bindings) instead of Bun+bun:sqlite
bun run --cwd apps/api deploy              # wrangler deploy
```

**Admin**

```sh
moon run admin:dev                          # Vite dev server on :5173, proxies /api and /graphql to :3000
bun run --cwd apps/admin lint
moon run admin:typecheck                    # focused vue-tsc check
moon run admin:build                        # vue-tsc --noEmit + vite build
bun run --cwd apps/admin codegen            # regenerate GraphQL client after schema/operations change (needs schema.graphql exported first)
```

**Flutter (`sf_customer` / moon id `sf_consumer`)**

```sh
moon run sf_consumer:get
moon run sf_consumer:analyze
moon run sf_consumer:test
moon run sf_consumer:test -- test/widget_test.dart   # single file
moon run sf_consumer:run
moon run sf_consumer:build-apk
moon run sf_consumer:fastlane-android-bundle
moon run sf_consumer:fastlane-android-beta
moon run sf_consumer:fastlane-ios-beta
```

Do not run `get`/`analyze`/`test`/`run` concurrently for the Flutter app — they race on SDK/project ephemeral files.

TypeScript packages use package-local Biome configs (100 columns, double quotes, semicolons). Don't run the formatter over generated migration files or the admin's `src/api/generated/*`.

## Architecture

### API: strict layered flow

`Router → Handler → Service → Repository → DB` — this order is load-bearing, not a suggestion:

- **Repositories** (`*.repo.ts`) are the *only* place Drizzle queries live.
- **Services** (`*.service.ts`) hold business logic and return `Result<T, DomainError>` (`apps/api/src/shared/result.ts`) for expected failures — never throw for domain errors (`notFound`, `validationError`, `conflict`, `outOfStock`, `unauthorized`, `forbidden`, defined in `apps/api/src/shared/errors.ts`). `toHttpStatus`/`toErrorBody` map these to REST responses, `toGraphQLError` maps them to GraphQL.
- **Handlers** (`*.handlers.ts`) adapt Hono requests to service calls; **routers** (`*.router.ts`) wire handlers to paths/middleware.
- Wiring happens once, by hand, in `apps/api/src/container.ts` (no DI framework) — services and their deps are constructed there and exported for both REST routers and GraphQL resolvers to share.
- Modules live under `apps/api/src/modules/<name>/` (admin, cart, delivery, orders, products, users) and generally have `.repo.ts`, `.service.ts`, `.handlers.ts`, `.router.ts`, `.schemas.ts` (Zod).

### GraphQL sits beside REST, not above it

`apps/api/src/graphql/schema.ts` builds catalog **read** queries automatically via `drizzle-graphql` (list results capped via `withLimitCap`), but deliberately omits auto-generated mutations for orders/cart/inventory. Custom resolvers in `graphql/resolvers/*` call the *same services* used by REST handlers — there is exactly one code path per business operation, never a GraphQL-only or REST-only bypass for cart, checkout, order status, or stock changes. When adding a mutation, look at how `resolvers/orders.ts` or `resolvers/cart.ts` delegate to `container.ts` services rather than writing new logic in the resolver.

### Auth

Phone/OTP flow (`POST /api/v1/auth/otp/request` then `/verify`); in non-production the `DEV_OTP` env var (default `000000`) always works. Auth middleware (`apps/api/src/shared/middleware/auth.ts`) resolves a user from either a `Bearer` token or the `ADMIN_SESSION_COOKIE` cookie — `optionalAuth` runs globally, `requireAuth`/`requireAdmin` gate specific routes/routers. The resolver function is injected at startup via `setAuthResolver` in `app.ts` rather than imported directly, to avoid a circular dependency between auth middleware and the users service.

### Dual runtime: Bun (local) vs Cloudflare Workers (deployed)

The API runs unmodified on both targets. `packages/db/src/client.ts#createDb` picks the backend: pass a `D1Database` binding to get `createD1Db` (Drizzle D1 driver, with a transaction fallback since D1 lacks real `BEGIN`), or call with no args to get `createBunDb` (`bun:sqlite`, using `DATABASE_PATH`). `apps/api/wrangler.jsonc` aliases `bun:sqlite` to `src/shims/bun-sqlite.ts` (a no-op stub) so the Bun-only code path still type-checks/bundles under `wrangler`. Cloudflare bindings (`DB`, `BUCKET`, env vars) are typed in `apps/api/src/types/hono.ts` (`CloudflareBindings`) and threaded into `container.ts#createContainer`. File storage abstracts the same way: `shared/common.ts#getStorage` returns an `R2StorageService` when `env.BUCKET` is present, else `LocalStorageService` (writes under `UPLOAD_DIR`). Never write code that assumes one runtime — go through `createDb`/`getStorage` rather than importing `bun:sqlite` or R2 directly outside those two files.

### OTP providers and notifications

`apps/api/src/modules/otp/` defines an `OtpProvider` interface (`sendOtp`/`verifyOtp` returning `Result`) with swappable implementations (`dev.provider.ts` always succeeds with `DEV_OTP`, `mock.provider.ts`, `two-factor.provider.ts` for the 2Factor SMS API); `otp.factory.ts#createOtpProvider` picks one from `OTP_PROVIDER`/`OTP_API_KEY` env vars, wired in `container.ts`. `apps/api/src/modules/notifications/` handles push notification delivery (`notifications.service.ts` + `shared/push.ts#sendPush`, injectable via `container.ts` for tests) and an SSE-style `events.router.ts` alongside the CRUD `notifications.router.ts`.

### Orders and money

- Order status is a strict state machine (`apps/api/src/modules/orders/order-status.ts`): `PLACED → PACKED → OUT_FOR_DELIVERY → DELIVERED`, with `CANCELLED` reachable only from `PLACED`/`PACKED`. Invalid transitions return `CONFLICT`. Every transition is recorded via `createOrderStatusHistory`.
- Checkout (`orders.service.ts#checkout`) decrements stock and creates the order + order items in **one DB transaction**; on failure inside the transaction it throws tagged errors (`EMPTY_CART`, `OUT_OF_STOCK`) that are caught and converted back into `DomainError`s outside the transaction. Checkout requires an `Idempotency-Key` header; a replayed key returns the original order rather than erroring.
- All money fields (API and DB) are integer **paise** (₹1 = 100) — never floats. Pricing math (subtotal, savings, delivery fee, total) is centralized in `apps/api/src/shared/pricing.ts`; free delivery threshold and flat fee constants live there.

### Response envelopes (REST)

Success: `{ data: ... }`. Paginated list: `{ data: [...], meta: { page, limit, total } }`. Error: `{ error: { code, message }, requestId }`. Error `code` is one of the `ErrorCode` values in `shared/errors.ts` and doubles as the GraphQL error's `extensions.code`.

### Admin app

Vue 3 (`rc` channel — pinned via `package.json` `overrides`, not swappable per-dependency) + Vite + Tailwind v4 + Pinia + vee-validate/zod + TanStack Vue Query. GraphQL-only client (`src/api/client.ts`), typed via `@graphql-codegen` from `apps/api/schema.graphql` + `src/api/operations.graphql` — regenerate with the codegen command above whenever the API schema or `.graphql` operations change; don't hand-edit `src/api/generated/*`. Auth uses HTTP-only cookies (`stores/auth.ts` + `ADMIN_SESSION_COOKIE`), so cross-origin deployments need credentialed CORS on the API. Feature code is organized by domain under `src/features/<domain>/{queries,mutations,validation}.ts`, with page components in `src/pages/`.

### db package (`@sf/db`)

Change schema only under `packages/db/src/schema/` (one file per domain table group, barrel-exported from `schema/index.ts`), then regenerate/apply migrations as described above — never hand-edit files under `packages/db/migrations/`. Exposes `db` client and raw schema via the `.`/`./schema` package exports.

### Flutter customer app

GetX-based (bindings/controllers/screens), talks to the API's REST v1 endpoints. `lib/controllers/` holds GetX controllers per domain (auth, cart, catalog, checkout, orders, home, address); `lib/middlewares/auth_middleware.dart` guards routes.
