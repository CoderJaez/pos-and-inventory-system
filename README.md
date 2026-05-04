# Sari-Sari Store POS & Inventory System

Offline-first **Next.js 16 PWA** for neighborhood sari-sari stores.

## Completed Phases

### Phase 1: Project Setup
- Next.js App Router + TypeScript baseline
- PWA configuration and web manifest
- MySQL + Sequelize bootstrap
- Zustand and Zod foundations

### Phase 2: Database Design
Implemented Sequelize models + migration for:
- `users`
- `categories`
- `suppliers`
- `products`
- `inventory_movements`
- `sales`
- `sale_items`
- `payments`
- `sync_logs`

All core entities include:
- UUID primary keys
- timestamps
- soft-delete (`paranoid` / `deleted_at`) where appropriate
- foreign keys and relational constraints
- indexes for search/reporting/sync performance

## Project Structure

```txt
app/
  api/health/route.ts
  layout.tsx
  offline.tsx
  page.tsx
lib/
  config/env.ts
  db/sequelize.ts
  store/app-store.ts
  validations/product.schema.ts
public/
  manifest.webmanifest
sequelize/
  config.js
  migrations/
    20260504170000-create-phase2-core-tables.js
  models/
    index.js
    user.js
    category.js
    supplier.js
    product.js
    sale.js
    sale-item.js
    payment.js
    inventory-movement.js
    sync-log.js
```

## Environment Setup

```bash
cp .env.example .env.local
```

Update `.env.local` with your MySQL credentials.

## Development Commands

```bash
npm run dev
npm run lint
npm run build
npm run db:migrate
npm run db:migrate:undo
```

## Migration Notes

- Migration file creates all Phase 2 core tables and indexes in dependency-safe order.
- `down` migration drops tables in reverse order.

## Next Phase

Phase 3 will implement Product & Inventory module screens/forms with:
- Product CRUD UI
- category/supplier selectors
- stock adjustments
- low stock indicators
- `react-hook-form` + Zod integration
