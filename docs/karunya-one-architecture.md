# Karunya One architecture

```
React Native / Expo Router UI
          ↓
studentService → UnifiedDataService → provider interfaces
          ↓                ↓
  deterministic calculators  Mock EduServe / KIDS / University providers
          ↓
 FastAPI boundary for future authorized service integration
```

`UnifiedDataService` exposes a normalized demo snapshot and configurable source-priority policy. UI code never sees KIDS/EduServe-specific fields. `AcademicGuide` is deterministic/offline and cites its inputs; it is not an LLM.
