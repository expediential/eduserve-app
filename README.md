# KARUNYA ONE

**Everything Karunya. One place.** A native, Android-first student companion built with React Native, Expo, TypeScript, and Expo Router. It is an independent development application, not an official university service.

## What is included

- Native phone navigation: Home, Academics, Schedule, Notices, and More
- Attendance analytics with transparent threshold, recovery, and permitted-absence calculations
- Assessment history and target-mark calculator
- Timetable, examinations, notices, fees, digital ID preview, and profile
- An explainable, mock-data-grounded Karunya Assistant interface
- Typed mock provider, FastAPI API boundary, and test coverage for key calculations
- Light/dark/system-aware design tokens and accessible native pressable controls

## Run the mobile app

```bash
npm install
npx expo start
npx expo start --android
```

Use an Android emulator or Expo Go device for development. The Android application id is `com.karunyaone.app`; configure signing/EAS build profiles before release `.apk`/`.aab` builds.

## Run checks

```bash
npm run typecheck
npm test
```

## Optional backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\uvicorn app.main:app --reload
```

Set `EXPO_PUBLIC_API_BASE_URL` using `.env.example` when connecting the mobile service to a local or deployed authorized backend. The mobile app currently uses local mock data by design.

## Data and integration boundary

`src/domain/types.ts` defines `StudentDataProvider`; `src/data/mockStudentProvider.ts` is the active implementation. Future authorized EduServe work belongs behind this interface and `backend/app/provider.py`. Read [the integration policy](docs/eduserve-integration.md) before adding it.

## Limitations

There is no real authentication, payments, digital-ID verification, LLM connection, database, or EduServe integration in this development build. These require university authorization and production infrastructure.
