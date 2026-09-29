# Architecture

Karunya One is a native React Native/Expo application. Expo Router owns phone-first navigation; feature screens call a small application service, which receives typed `StudentData` through `StudentDataProvider`.

```
Expo React Native UI → studentService → StudentDataProvider → Mock provider | authorized provider
                                      ↓
                                  FastAPI API boundary
```

All attendance and target-mark calculations are deterministic TypeScript functions in `src/domain/academic.ts`. The assistant view uses only those functions and supplied mock data; an LLM cannot calculate or invent student facts.

The FastAPI project is a separate deployment unit. Its provider protocol mirrors the mobile provider boundary, making an authorized integration replaceable without changing screen code.

## Security baseline

No credentials are checked in. Do not add a production data provider until the university supplies documented authorization. Production work must add authenticated sessions, server-side authorization, request validation, rate limits, audit-safe logs, encrypted secrets, and a PostgreSQL data store.
