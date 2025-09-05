# Validate Hub — Cut 00 (Scaffold)

## Quickstart
1. `npm i`
2. Copia `.env.example` a `.env.local` y ajusta `DATABASE_URL` (formato Postgres):
   `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`
3. Prisma:
   - `npm run db:generate`
   - `npm run db:migrate` (requiere DB válida)
4. Dev: `npm run dev` y visita `http://localhost:3000`
   - Health: `GET /api/health` → `{ "ok": true }`

## Scripts
- `dev`, `build`, `start`, `lint`, `typecheck`, `format`
- `db:generate`, `db:migrate`

&gt; Próximo corte: Auth + Organizations/Workspaces.
