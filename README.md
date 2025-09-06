# Validate Hub — Cut 00 (Scaffold)

## Quickstart
1. `npm i`
2. Copia `.env.example` a `.env.local` y ajusta `DATABASE_URL` (PostgreSQL):
   `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`
3. Prisma:
   - `npm run db:generate`
   - `npm run db:migrate` (requiere una base de datos válida)
4. Dev: `npm run dev` y visita `http://localhost:3000`
   - Health: `GET /api/health` → `{ "ok": true }`

## Scripts
- `dev`, `build`, `start`, `lint`, `typecheck`, `format`
- `db:generate`, `db:migrate`

## Qué incluye
- Next.js 14 (App Router) + TypeScript + TailwindCSS
- NextAuth con login por email (magic link) y Prisma Adapter
- Modelo multi‑tenant: Organizations, Workspaces y Memberships con roles
- Middleware para proteger `/app` y el flujo de onboarding

> Próximo corte: features de Organizations/Workspaces.
