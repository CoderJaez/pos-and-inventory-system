# Deployment Notes

## Environment
Set required variables from `.env.example` in deployment platform.

## Build and start
```bash
npm run build
npm run start
```

## Database
- Ensure MySQL is reachable from the app host.
- Run migrations before switching traffic.

## PWA
- Service worker is active in production mode.
- Validate manifest and offline page after deploy.
