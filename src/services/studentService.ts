import { MockStudentDataProvider } from '@/src/data/mockStudentProvider';
import { StudentData, StudentDataProvider } from '@/src/domain/types';
const provider: StudentDataProvider = new MockStudentDataProvider();
export const studentService = { getDashboard: (): Promise<StudentData> => provider.getStudentData() };
// Swap the provider here only after the university supplies authorized credentials/API access.
