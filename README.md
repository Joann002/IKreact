# Dynamic Data Setup

- DB: Prisma + SQLite (`prisma/schema.prisma`)
- Prisma client: `src/lib/prisma.ts`
- APIs: `src/app/api/{tasks,projects,goals,challenges}` (+ `[id]` routes)
- Pages wired to APIs: Tasks, Projects, Goals, Challenges (GET + create via POST)

## Setup
```bash
npm install
printf 'DATABASE_URL="file:./dev.db"\n' > .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Inspect DB
```bash
npx prisma studio
```

## API overview
- Tasks: `GET /api/tasks`, `POST /api/tasks`, `GET|PATCH|DELETE /api/tasks/:id`
- Projects: `GET /api/projects`, `POST /api/projects`, `GET|PATCH|DELETE /api/projects/:id`
- Goals: `GET /api/goals`, `POST /api/goals`, `GET|PATCH|DELETE /api/goals/:id`
- Challenges: `GET /api/challenges`, `POST /api/challenges`, `GET|PATCH|DELETE /api/challenges/:id`

Notes
- SQLite limitation: `Project.team` is stored as a JSON string. The page parses it to an array.
- Client-side fetch uses `cache: 'no-store'` for fresh reads after writes.

## Next steps
- Add auth (NextAuth) and scope data by user
- Move to Postgres (Supabase/Neon): update `datasource` + run migrations
- Add validation (Zod), error handling, and optimistic UI (SWR/React Query)
