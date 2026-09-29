import { useEffect, useState } from 'react';
import { StudentData } from '@/src/domain/types';
import { studentService } from '@/src/services/studentService';
export function useStudentData() { const [data, setData] = useState<StudentData>(); const [error, setError] = useState(false); useEffect(() => { studentService.getDashboard().then(setData).catch(() => setError(true)); }, []); return { data, error }; }
