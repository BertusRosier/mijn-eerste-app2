# API guidance

## Route handlers
- Gebruik NextRequest/NextResponse
- `params` is Promise-typed (Next build types)
- Validate:
  - path params (id) met Zod
  - request.json() met Zod schema

## Responses
- JSON voor errors: `{ error: string }`
- 204 voor succesvolle DELETE zonder body