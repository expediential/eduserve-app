# KARUNYA ONE

**Everything Karunya. One place.** A native, Android-first student companion built with React Native, Expo, TypeScript, and Expo Router. It is an independent development application, not an official university service.

## What is included

- Native phone navigation: Home, Academics, Schedule, Notices, and More
- Attendance analytics with transparent threshold, recovery, and permitted-absence calculations
- Assessment history and target-mark calculator
- Timetable, examinations, notices, fees, digital ID preview, and profile
- An offline Academic Guide with explainable, deterministic answers from student data
- Typed mock provider, FastAPI API boundary, and test coverage for key calculations
- Light/dark/system-aware design tokens and accessible native pressable controls

## Sign-in status

The application includes a **development-only demo sign-in** so the protected app flow can be exercised without collecting university credentials. It opens the fictional James Martin data already packaged with the application; an email and a password of four or more characters work locally and are not transmitted or retained.

This is not EduServe sign-in. Real sign-in needs a university-authorized identity provider, backend session storage, server-side token handling, account recovery, rate limits, and a privacy review. The typed `/api/auth/login` contract exists as the integration boundary, but intentionally returns `501` until that authorization exists.

## Run the mobile app

```bash
npm install
npx expo start
npx expo start --android
```

Use an Android emulator or Expo Go device for development. The Android application id is `com.karunyaone.app`; configure signing/EAS build profiles before release `.apk`/`.aab` builds.

For APK installation, use Android 7.0 (API 24) or newer, remove an earlier copy of Karunya One if Android reports a signing conflict, and allow installation from the browser/files app that opened the download. The current build uses a stable EAS signing identity so newer builds can update earlier EAS builds.

## Run checks

```bash
npm run typecheck
npm run lint
npm test
npx expo export --platform android --output-dir dist
```

The export command verifies the production Android JavaScript bundle. A distributable APK is created separately through the EAS `preview` profile:

```bash
npx eas-cli build --platform android --profile preview
```

The final cloud build page supplies the signed APK download. Do not rename it to `.aab`; an APK and an AAB are different Android formats.

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

The app uses a single in-memory student snapshot for all screens, so Home, attendance, marks, timetable, calendar, search, and the deterministic Academic Guide always refer to the same fictional James Martin record. The visible “demo data” freshness label is deliberately not a live-sync claim.

## Limitations

There is no real authentication, payments, digital-ID verification, LLM connection, database, or EduServe integration in this development build. These require university authorization and production infrastructure.
