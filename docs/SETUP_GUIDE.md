# Setup Guide

## 1) Prerequisites
- Node.js 20+
- MySQL 8+
- npm

## 2) Install dependencies
```bash
npm install
```

## 3) Configure environment
```bash
cp .env.example .env.local
```
Update DB values.

## 4) Run migrations
```bash
npm run db:migrate
```

## 5) Start app
```bash
npm run dev
```
Open `http://localhost:3000`.
