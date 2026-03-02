# AGENTS.md

## TL;DR
Dit project is Next.js (App Router) + TypeScript + Prisma.
Doel: changes die builden op Vercel en geen type- of schema-rot veroorzaken.

## Setup commands
- Install deps: `npm ci` (lokaal mag `npm install`)
- Dev: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Tests (als aanwezig): `npm test`

## Quality gates (must pass before PR/merge)
- `npm run lint`
- `npm run build`

## Code conventions
- Route handlers: gebruik `NextRequest`/`NextResponse` en **params als Promise**:
  - `type Ctx = { params: Promise<{ id: string }> }`
- Input validatie: altijd Zod op request body/params
- Prisma:
  - Nooit `prisma/dev.db` of andere *.db bestanden committen
  - Migrations zijn leidend

## Safety & security
- Geen secrets in code of repo (ook geen `.env*`)
- Geen PII loggen
- Faal netjes: duidelijke statuscodes + JSON error

## When unsure
- Vraag om een korte verduidelijking in de PR comment voordat je grote refactors doet.