import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { StudentData } from '@/src/domain/types';
import { studentService } from '@/src/services/studentService';

type StudentSnapshotState = { data?: StudentData; error: boolean; loading: boolean; lastUpdated?: string; reload: () => Promise<void> };
const StudentSnapshotContext = createContext<StudentSnapshotState | null>(null);

export function StudentSnapshotProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<StudentData>();
  const [lastUpdated, setLastUpdated] = useState<string>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    setLoading(true); setError(false);
    try { const snapshot = await studentService.getSnapshot(); setData(snapshot.data); setLastUpdated(snapshot.lastUpdated); }
    catch { setError(true); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void Promise.resolve().then(reload); }, [reload]);
  const value = useMemo(() => ({ data, error, loading, lastUpdated, reload }), [data, error, loading, lastUpdated, reload]);
  return <StudentSnapshotContext.Provider value={value}>{children}</StudentSnapshotContext.Provider>;
}

export function useStudentData() {
  const value = useContext(StudentSnapshotContext);
  if (!value) throw new Error('StudentSnapshotProvider is required');
  return value;
}
