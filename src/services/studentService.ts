import { StudentData } from '@/src/domain/types';
import { UnifiedDataService } from './unifiedDataService';
const unified = new UnifiedDataService();
export const studentService = { getDashboard: async (): Promise<StudentData> => (await unified.getSnapshot()).data, getSnapshot: () => unified.getSnapshot() };
// Replace mock providers only after written authorization and official integration credentials.
