# Repository Guide

## Workspace

- This is a moonrepo workspace over `apps/*` and `packages/*`, backed by Bun workspaces for JS dependencies. Install once from the root with `bun install`; do not create npm/pnpm/yarn lockfiles.
- `apps/api`: Bun + Hono REST/GraphQL server; entrypoints are `src/index.ts` and `src/app.ts`.
- `packages/db`: shared Drizzle/Bun SQLite client and schema, exported as `@sf/db`; migrations belong here.
- `apps/admin`: Vue RC + Vite PWA. Its dev server proxies `/api` to `http://localhost:3000`.
- `apps/sf_customer`: standalone Flutter/GetX customer app; run direct Flutter commands from this directory.

## Moonrepo

- Run moon commands from the repository root. Project IDs are `api`, `admin`, `db`, and `sf_consumer` (the Flutter folder name is `sf_customer`, but its explicit moon ID differs).
- Tasks come only from each project's `moon.yml`; package scripts are not automatically moon tasks. API exposes only `api:run`; DB exposes generation, migration, push, studio, lint, and typecheck targets.
- `.moon/toolchains.yml` synchronizes TypeScript project references and path aliases. Keep task inputs/outputs in the relevant `moon.yml` accurate when adding generated files or build steps.

## Database

- Always set `DATABASE_PATH` explicitly when running the API or migrations, and point both at the same file. Defaults currently disagree, `packages/db/src/client.ts` has no fallback, and relative paths resolve from the command's working directory.
- Change schema only under `packages/db/src/schema/`. Then run `DATABASE_PATH=/absolute/path/to.db moon run db:generate` and commit the generated `packages/db/migrations/` files; apply with the same path and `moon run db:migrate` (or use `db:push` only for disposable local iteration).
- First-time setup: open Admin UI at `/setup` and enter the `ADMIN_SETUP_SECRET` to configure master admin.

## API Conventions

- Preserve the flow router -> handler -> service -> repository -> DB. Drizzle queries stay in repositories; expected domain failures are `Result<T, DomainError>`, not exceptions.
- REST and GraphQL critical mutations must call the same services; do not expose generated CRUD writes for cart, orders, or inventory.
- Money values in the API/database are integer paise. Checkout stock decrement and order creation must remain one transaction.

## Commands

- API dev: `DATABASE_PATH=/absolute/path/to.db moon run api:run`
- API verification: `bun run --cwd apps/api lint`, then `bun run --cwd apps/api typecheck`, then `bun --cwd apps/api test`
- One API test file: `bun --cwd apps/api test tests/pricing.test.ts`
- DB verification: `moon run db:lint`, then `moon run db:typecheck`; DB operations are `db:generate`, `db:migrate`, `db:push`, and `db:studio`.
- Admin dev: `moon run admin:dev`; verify with `bun run --cwd apps/admin lint`, then `moon run admin:build` (`build` includes `vue-tsc`). Focused typecheck: `moon run admin:typecheck`.
- Flutter setup: `moon run sf_consumer:get`; verify with `moon run sf_consumer:analyze`, then `moon run sf_consumer:test`. Do not combine these targets in one invocation because concurrent Flutter processes race on SDK/project ephemeral files. One file: `moon run sf_consumer:test -- test/widget_test.dart`.
- Flutter run/release APK: `moon run sf_customer:run` / `moon run sf_customer:build-apk` / `moon run sf_customer:fastlane-android-bundle` / `moon run sf_customer:fastlane-android-beta` / `moon run sf_customer:fastlane-android-firebase` / `moon run sf_customer:fastlane-ios-beta`.
- TypeScript formatting/lint rules are package-local Biome configs (100 columns, double quotes, semicolons). Do not format generated migration files.
