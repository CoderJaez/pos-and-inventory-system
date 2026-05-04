# Sari-Sari Store POS & Inventory System

Offline-first **Next.js 16 PWA** for neighborhood sari-sari stores.

## Completed Phases

### Phase 1: Project Setup
### Phase 2: Database Design
### Phase 3: Product & Inventory Module (Initial)

Implemented in this phase:
- Inventory list page with low-stock highlighting
- Add-product form (`react-hook-form` + `zod`)
- Product creation API route
- Stock adjustment UI and API route
- Server-side product list/adjust actions via Sequelize models

## Key Routes
- `/inventory` - product list + quick stock adjust
- `/inventory/new` - add product form
- `GET /api/products` - list products
- `POST /api/products` - create product
- `POST /api/inventory/adjust` - stock in/out adjustment

## Dev Commands

```bash
npm run dev
npm run lint
npm run db:migrate
```
