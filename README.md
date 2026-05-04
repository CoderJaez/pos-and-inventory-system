# Sari-Sari Store POS & Inventory System

Offline-first **Next.js 16 PWA** for neighborhood sari-sari stores.

## Phase 7 (Polish & Documentation)
This phase adds complete project documentation and operation guides:

- `docs/SETUP_GUIDE.md`
- `docs/MIGRATION_GUIDE.md`
- `docs/DEPLOYMENT_NOTES.md`
- `docs/PWA_INSTALL_GUIDE.md`
- `docs/STAFF_USER_GUIDE.md`

## Quick Start
```bash
npm install
cp .env.example .env.local
npm run db:migrate
npm run dev
```

## Core Commands
```bash
npm run dev
npm run lint
npm run build
npm run db:migrate
npm run db:migrate:undo
```

## Core Routes
- `/pos`
- `/inventory`
- `/reports`
- `POST /api/sales`
- `POST /api/sync/sales`
- `GET /api/reports/summary`
