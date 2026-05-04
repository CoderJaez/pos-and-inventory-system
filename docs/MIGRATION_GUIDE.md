# Migration Guide

## Apply latest migrations
```bash
npm run db:migrate
```

## Roll back last migration
```bash
npm run db:migrate:undo
```

## Notes
- Sequelize config path is set via `.sequelizerc`.
- Migration files live in `sequelize/migrations`.
