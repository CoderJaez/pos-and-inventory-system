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
