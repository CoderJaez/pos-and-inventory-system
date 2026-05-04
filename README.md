# Sari-Sari Store POS & Inventory System

Offline-first **Next.js 16 PWA** for neighborhood sari-sari stores.

## Completed Phases
- Phase 1: Setup
- Phase 2: Database Design
- Phase 3: Product & Inventory
- Phase 4: POS Checkout
- Phase 5: Offline Mode (Initial)

## Phase 5 Highlights
- Local offline sales queue in `localStorage`
- Automatic queue sync when device returns online
- Duplicate sync protection via `offlineReference`
- `/api/sync/sales` endpoint for conflict-safe sync flow
- Visible online/offline status badge in home header
- POS checkout fallback: failed/ offline checkout is queued instead of lost

## Routes
- `/pos`
- `/inventory`
- `POST /api/sales`
- `POST /api/sync/sales`

## Dev Commands
```bash
npm run dev
npm run lint
npm run db:migrate
```
