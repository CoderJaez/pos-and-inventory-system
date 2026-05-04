# Sari-Sari Store POS & Inventory System

Offline-first **Next.js 16 PWA** for neighborhood sari-sari stores.

## Completed Phases
- Phase 1: Setup
- Phase 2: Database Design
- Phase 3: Product & Inventory Module
- Phase 4: POS Module (Initial)

## Phase 4 Highlights
- `/pos` checkout screen with:
  - product quick buttons and search
  - cart with quantity + manual price override
  - payment method toggle (Cash / GCash)
  - cash received + automatic change calculation
  - one-tap complete sale flow
- `POST /api/sales` transaction endpoint with DB transaction:
  - create sale
  - create sale items
  - deduct inventory
  - create inventory movement logs
  - create payment record

## Current Core Routes
- `/inventory`
- `/inventory/new`
- `/pos`
- `GET/POST /api/products`
- `POST /api/inventory/adjust`
- `POST /api/sales`

## Dev Commands
```bash
npm run dev
npm run lint
npm run db:migrate
```
Phase 1 baseline for an offline-first **Next.js 16 PWA** optimized for neighborhood sari-sari stores.

## Phase 1 Scope

- Next.js App Router + TypeScript baseline
- PWA configuration and web manifest
- MySQL + Sequelize bootstrap
- Zustand app store bootstrap
- Zod validation bootstrap
- Folder layout for phased feature delivery

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- MySQL (`mysql2`)
- Sequelize + `sequelize-cli`
- Zustand
- Zod + `react-hook-form` + resolvers
- SweetAlert2
- `@ducanh2912/next-pwa`

## Project Structure

```txt
app/
  api/health/route.ts
  layout.tsx
  offline.tsx
  page.tsx
components/
  common/
lib/
  config/env.ts
  db/sequelize.ts
  store/app-store.ts
  validations/product.schema.ts
public/
  icons/
  manifest.webmanifest
sequelize/
  config.js
  migrations/
  models/
  seeders/
```

## Environment Setup

1. Copy sample env file:

```bash
cp .env.example .env.local
```

2. Update database values in `.env.local`.

## Development Commands

```bash
npm run dev
npm run build
npm run lint
npm run db:migrate
npm run db:migrate:undo
```

## Sequelize CLI Notes

- `.sequelizerc` points CLI paths to `sequelize/*`
- Config is loaded from `sequelize/config.js`

## PWA Notes

- Manifest is served from `public/manifest.webmanifest`
- Offline fallback route: `/offline`
- Service worker generation is enabled in production builds

## Phase 2 Preview

Next phase creates the database models and migrations for:

- users
- categories
- suppliers
- products
- inventory_movements
- sales
- sale_items
- payments
- sync_logs

with indexes, relationships, and soft-delete where appropriate.
